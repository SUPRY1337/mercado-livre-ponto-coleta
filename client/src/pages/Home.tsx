import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Camera,
  ScanFace,
  X,
  Check,
  CheckCircle2,
  Clock3,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Store,
  Truck,
} from "lucide-react";
import { canSubmitPreCadastro, getPostSubmitState } from "@/lib/preCadastro";

const benefits = [
  { icon: PackageCheck, title: "Operação organizada", text: "Receba, armazene e entregue encomendas com um fluxo simples." },
  { icon: MapPin, title: "Mais conveniência", text: "Ofereça um endereço acessível para a retirada de pedidos." },
  { icon: Clock3, title: "Gestão clara", text: "Defina horários e acompanhe cada etapa com transparência." },
];

export default function Home() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [faceCentered, setFaceCentered] = useState(false);
  const [checkingFace, setCheckingFace] = useState(false);
  const [livenessStep, setLivenessStep] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const canSubmit = canSubmitPreCadastro({ name, cpf, email, phone, city, consent });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (getPostSubmitState(canSubmit) !== "confirmation") return;
    setCameraError("");
    setCameraOpen(true);
  }

  const livenessPrompts = ["Centralize o rosto no oval", "Vire levemente o rosto para a direita", "Vire levemente o rosto para a esquerda", "Olhe para a câmera e sorria"];

  useEffect(() => {
    if (!cameraOpen) return;
    let cancelled = false;
    let timer: number | undefined;
    navigator.mediaDevices?.getUserMedia({ video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 720 } }, audio: false })
      .then((stream) => {
        if (cancelled) { stream.getTracks().forEach((track) => track.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.onloadedmetadata = () => setCameraReady(true); }
        type Detector = new (options?: { fastMode?: boolean; maxDetectedFaces?: number }) => { detect(video: HTMLVideoElement): Promise<Array<{ boundingBox: { x: number; y: number; width: number; height: number } }>> };
        const FaceDetector = (window as Window & { FaceDetector?: Detector }).FaceDetector;
        if (!FaceDetector) { setCameraReady(true); setFaceDetected(true); setFaceCentered(true); return; }
        const detector = new FaceDetector({ fastMode: true, maxDetectedFaces: 1 });
        timer = window.setInterval(async () => {
          const video = videoRef.current;
          if (!video || video.readyState < 2 || cancelled) return;
          try { const face = (await detector.detect(video))[0]?.boundingBox; const centered = Boolean(face && face.x > video.videoWidth * .14 && face.x + face.width < video.videoWidth * .86 && face.y > video.videoHeight * .08 && face.y + face.height < video.videoHeight * .92); setFaceDetected(Boolean(face)); setFaceCentered(centered); } catch { setFaceDetected(true); setFaceCentered(true); }
        }, 220);
      })
      .catch(() => setCameraError("A câmera não foi autorizada. Libere o acesso nas configurações do navegador para continuar."));
    return () => { cancelled = true; if (timer) window.clearInterval(timer); streamRef.current?.getTracks().forEach((track) => track.stop()); streamRef.current = null; };
  }, [cameraOpen]);

  useEffect(() => {
    if (!cameraOpen || !faceCentered || cameraError || livenessStep >= livenessPrompts.length) return;
    const timer = window.setTimeout(() => setLivenessStep((step) => Math.min(step + 1, livenessPrompts.length)), 1800);
    return () => window.clearTimeout(timer);
  }, [cameraOpen, faceCentered, cameraError, livenessStep]);

  function closeCamera() { streamRef.current?.getTracks().forEach((track) => track.stop()); streamRef.current = null; setCameraOpen(false); setCheckingFace(false); setCameraReady(false); setFaceDetected(false); setFaceCentered(false); setLivenessStep(0); }
  function finishFaceCheck() { if (!cameraReady || !faceDetected || !faceCentered || livenessStep < livenessPrompts.length) return; setCheckingFace(true); window.setTimeout(() => { closeCamera(); setSubmitted(true); }, 1800); }

  if (cameraOpen) {
    const ready = cameraReady && faceDetected && faceCentered;
    const complete = livenessStep >= livenessPrompts.length;
    return (
      <main className="min-h-screen bg-[#071d27] px-4 py-5 text-white sm:px-8 sm:py-8"><div className="mx-auto max-w-6xl"><header className="mb-6 flex items-center justify-between"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl border border-[#f5c451]/40 bg-[#f5c451]/10 text-[#f5c451]"><ScanFace size={21} /></span><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#f5c451]">PONTOHUB · segurança</p><p className="text-sm font-bold text-white/80">Verificação guiada</p></div></div><button type="button" onClick={closeCamera} aria-label="Fechar verificação" className="rounded-full border border-white/15 p-2 text-white/60 hover:bg-white/10 hover:text-white"><X size={19} /></button></header><div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center"><div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d2a36] p-3"><div className="relative overflow-hidden rounded-[1.5rem] bg-[#05141b]"><video ref={videoRef} autoPlay muted playsInline className="aspect-[4/3] w-full object-cover" /><div className="pointer-events-none absolute inset-0 grid place-items-center"><div className={`h-[72%] w-[48%] rounded-[48%] border-[3px] transition-all ${complete || ready ? "border-[#65e6a4] shadow-[0_0_0_999px_rgba(5,20,27,.3),0_0_35px_rgba(101,230,164,.4)]" : "border-[#f5c451] shadow-[0_0_0_999px_rgba(5,20,27,.4)]"}`} /></div><div className="absolute bottom-5 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#071d27]/85 px-4 py-3 text-center backdrop-blur-xl"><p className="text-xs font-black uppercase tracking-[.15em] text-[#f5c451]">{complete ? "Concluído" : ready ? `Etapa ${Math.max(livenessStep, 1)} de ${livenessPrompts.length}` : "Aguardando câmera"}</p><p className="mt-1 text-sm font-bold">{complete ? "Verificação concluída" : ready ? livenessPrompts[Math.min(livenessStep, livenessPrompts.length - 1)] : "Permita o acesso à câmera"}</p></div></div></div><aside className="rounded-[2rem] border border-white/10 bg-white/[.06] p-6 backdrop-blur-xl"><p className="text-[10px] font-black uppercase tracking-[.18em] text-white/45">Etapa final do cadastro</p><h1 className="mt-2 text-2xl font-black tracking-tight">Confirme sua presença</h1><p className="mt-4 text-sm leading-6 text-white/60">Siga as instruções na tela. A câmera é usada somente nesta etapa.</p><div className="mt-6 space-y-3">{livenessPrompts.map((prompt, index) => <div key={prompt} className={`flex items-center gap-3 rounded-xl border p-3 ${index < livenessStep ? "border-[#65e6a4]/35 bg-[#65e6a4]/10" : "border-white/8 bg-black/10"}`}><span className={`grid size-7 place-items-center rounded-full text-xs font-black ${index < livenessStep ? "bg-[#65e6a4] text-[#071d27]" : "bg-white/10 text-white/45"}`}>{index < livenessStep ? "✓" : index + 1}</span><span className="text-xs font-bold text-white/80">{prompt}</span></div>)}</div><div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-[#f5c451] to-[#65e6a4] transition-all" style={{ width: `${(livenessStep / livenessPrompts.length) * 100}%` }} /></div>{cameraError && <div className="mt-5 rounded-xl border border-[#ff9d9d]/30 bg-[#ff6868]/10 p-3 text-xs font-semibold text-[#ffb1b1]">{cameraError}</div>}<div className="mt-6 rounded-xl border border-white/8 bg-black/10 p-3 text-[11px] leading-5 text-white/45"><strong className="text-white/70">Privacidade:</strong> esta etapa usa a câmera localmente e não envia imagens nem declara identidade biométrica.</div><button type="button" disabled={!complete || checkingFace || Boolean(cameraError)} onClick={finishFaceCheck} className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#f5c451] px-5 font-black text-[#071d27] transition hover:bg-[#ffda6c] disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/35"><Camera size={19} />{checkingFace ? "Finalizando..." : complete ? "Concluir cadastro" : "Siga as instruções"}</button></aside></div></div></main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f4f7f8] text-[#102a43]">
        <header className="border-b border-[#dce6ea] bg-white">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-5 lg:px-8">
            <span className="grid size-11 place-items-center rounded-xl bg-[#123f52] text-[#f5c451]"><Store size={23} /></span>
            <span><strong className="block text-sm font-black tracking-[.08em] text-[#123f52]">PONTOHUB</strong><span className="text-xs font-semibold text-[#718396]">rede de pontos de coleta</span></span>
          </div>
        </header>
        <section className="mx-auto flex min-h-[calc(100vh-82px)] max-w-3xl items-center px-5 py-16 lg:px-8">
          <div className="w-full rounded-[2rem] border border-[#dce6ea] bg-white p-8 text-center shadow-[0_24px_70px_rgba(16,42,67,.12)] sm:p-14">
            <div className="mx-auto mb-7 grid size-20 place-items-center rounded-full bg-[#e4f6ee] text-[#16815f]"><CheckCircle2 size={42} /></div>
            <p className="mb-3 text-sm font-black uppercase tracking-[.18em] text-[#16815f]">Cadastro recebido</p>
            <h1 className="mx-auto max-w-xl text-3xl font-black tracking-tight sm:text-5xl">Seu ponto está em análise.</h1>
            <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-[#5d7083] sm:text-lg">Recebemos os dados do seu estabelecimento. Nossa equipe entrará em contato em breve pelos canais informados.</p>
            <div className="mx-auto mt-8 flex max-w-md items-start gap-3 rounded-2xl bg-[#f2f7f8] p-4 text-left text-sm leading-6 text-[#53687b]"><ShieldCheck className="mt-0.5 shrink-0 text-[#16815f]" size={20} /><span>Seus dados foram registrados para avaliação da operação do ponto de coleta.</span></div>
            <a href="." className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#123f52] px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#0c3140]">Voltar ao início <ArrowRight size={18} /></a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7fafb] text-[#102a43]">
      <div className="absolute inset-x-0 top-0 -z-0 h-[620px] bg-[radial-gradient(circle_at_78%_8%,rgba(245,196,81,.2),transparent_34%),linear-gradient(135deg,#e8f2f2_0%,#f7fafb_58%)]" />
      <header className="relative z-10 border-b border-[#dce6ea]/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="." className="flex items-center gap-3" aria-label="PontoHub início">
            <span className="grid size-11 place-items-center rounded-xl bg-[#123f52] text-[#f5c451] shadow-[0_8px_20px_rgba(18,63,82,.18)]"><Store size={23} /></span>
            <span><strong className="block text-sm font-black tracking-[.08em] text-[#123f52]">PONTOHUB</strong><span className="text-xs font-semibold text-[#718396]">rede de pontos de coleta</span></span>
          </a>
          <span className="hidden items-center gap-2 rounded-full border border-[#dce6ea] bg-white px-3 py-2 text-xs font-bold text-[#53687b] sm:flex"><ShieldCheck size={14} className="text-[#16815f]" /> operação segura</span>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-12 lg:grid-cols-[1fr_500px] lg:items-center lg:px-8 lg:pb-24 lg:pt-20">
        <div className="relative max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#123f52] px-3.5 py-2 text-xs font-black uppercase tracking-[.14em] text-white shadow-lg shadow-[#123f52]/15"><PackageCheck size={14} className="text-[#f5c451]" /> operação simplificada</div>
          <h1 className="text-4xl font-black leading-[1.03] tracking-[-.04em] text-[#102a43] sm:text-6xl">Transforme seu espaço em um <span className="text-[#16815f]">ponto de coleta.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#53687b] sm:text-lg">Cadastre seu estabelecimento para receber, organizar e entregar encomendas com uma operação profissional, conveniente e transparente.</p>
          <div className="relative mt-9 grid gap-4 sm:grid-cols-3">{benefits.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-[#dce6ea] bg-white/90 p-4 shadow-sm"><Icon size={21} className="mb-5 text-[#16815f]" /><strong className="block text-sm">{title}</strong><span className="mt-1 block text-xs leading-5 text-[#718396]">{text}</span></div>)}</div>
          <div className="mt-8 flex items-center gap-3 text-sm font-bold text-[#53687b]"><Truck size={20} className="text-[#123f52]" /> Mais praticidade para lojistas e clientes</div>
        </div>

        <div className="rounded-[2rem] border border-[#dce6ea] bg-white p-6 shadow-[0_24px_70px_rgba(16,42,67,.14)] sm:p-8">
          <div className="mb-7 flex items-start justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[.16em] text-[#16815f]">Seja um parceiro</p><h2 className="mt-2 text-2xl font-black tracking-tight">Cadastre seu ponto</h2></div><div className="rounded-2xl bg-[#fff3d1] p-3 text-[#123f52]"><MapPin size={24} /></div></div>
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div><label htmlFor="name" className="mb-2 block text-sm font-bold text-[#29445e]">Nome do responsável <span className="text-[#b94a48]">*</span></label><input id="name" value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" placeholder="Nome e sobrenome" className="h-12 w-full rounded-xl border border-[#c7d4dd] bg-[#fbfdfe] px-4 text-sm outline-none transition placeholder:text-[#8c9baa] focus:border-[#16815f] focus:ring-4 focus:ring-[#16815f]/10" /></div>
            <div><label htmlFor="cpf" className="mb-2 block text-sm font-bold text-[#29445e]">CPF ou CNPJ <span className="text-[#b94a48]">*</span></label><input id="cpf" value={cpf} onChange={(event) => setCpf(event.target.value)} required inputMode="numeric" placeholder="Documento do responsável ou estabelecimento" className="h-12 w-full rounded-xl border border-[#c7d4dd] bg-[#fbfdfe] px-4 text-sm outline-none transition placeholder:text-[#8c9baa] focus:border-[#16815f] focus:ring-4 focus:ring-[#16815f]/10" /></div>
            <div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="email" className="mb-2 block text-sm font-bold text-[#29445e]">E-mail <span className="text-[#b94a48]">*</span></label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" placeholder="voce@empresa.com" className="h-12 w-full rounded-xl border border-[#c7d4dd] bg-[#fbfdfe] px-4 text-sm outline-none transition placeholder:text-[#8c9baa] focus:border-[#16815f] focus:ring-4 focus:ring-[#16815f]/10" /></div><div><label htmlFor="phone" className="mb-2 block text-sm font-bold text-[#29445e]">WhatsApp <span className="text-[#b94a48]">*</span></label><input id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} required inputMode="tel" placeholder="(00) 00000-0000" className="h-12 w-full rounded-xl border border-[#c7d4dd] bg-[#fbfdfe] px-4 text-sm outline-none transition placeholder:text-[#8c9baa] focus:border-[#16815f] focus:ring-4 focus:ring-[#16815f]/10" /></div></div>
            <div><label htmlFor="city" className="mb-2 block text-sm font-bold text-[#29445e]">Cidade e UF <span className="text-[#b94a48]">*</span></label><input id="city" value={city} onChange={(event) => setCity(event.target.value)} required placeholder="Ex.: São Paulo - SP" className="h-12 w-full rounded-xl border border-[#c7d4dd] bg-[#fbfdfe] px-4 text-sm outline-none transition placeholder:text-[#8c9baa] focus:border-[#16815f] focus:ring-4 focus:ring-[#16815f]/10" /></div>
            <div className="rounded-xl border border-[#dce6ea] bg-[#f7fafb] p-4"><div className="flex gap-3"><ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#16815f]" /><p className="text-xs leading-5 text-[#617688]">Seus dados serão utilizados apenas para avaliar o cadastro do ponto e entrar em contato sobre a operação.</p></div></div>
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-5 text-[#53687b]"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="mt-0.5 size-4 accent-[#16815f]" /><span>Li o aviso de privacidade e autorizo o contato sobre o cadastro. <span className="text-[#b94a48]">*</span></span></label>
            <button type="submit" disabled={!canSubmit} className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#123f52] px-5 font-extrabold text-white shadow-lg shadow-[#123f52]/20 transition hover:-translate-y-0.5 hover:bg-[#0c3140] active:translate-y-0 disabled:cursor-not-allowed disabled:bg-[#b7c5cc] disabled:shadow-none focus:outline-none focus:ring-4 focus:ring-[#16815f]/25">Enviar cadastro <ArrowRight size={19} className="transition group-hover:translate-x-1" /></button>
            <p className="text-center text-xs text-[#8c9baa]">Campos com * são obrigatórios.</p>
          </form>
        </div>
      </section>
      <footer className="relative z-10 border-t border-[#dce6ea] bg-white/80"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-[#718396] sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>© 2026 PontoHub · rede independente de pontos de coleta</span><span className="inline-flex items-center gap-1.5"><Check size={13} /> simplicidade e transparência</span></div></footer>
    </main>
  );
}
