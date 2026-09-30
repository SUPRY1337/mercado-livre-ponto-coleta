import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  ScanFace,
  X,
  Check,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileUp,
  Handshake,
  Landmark,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { canSubmitPreCadastro, formatCpf, getPostSubmitState, isValidCpf } from "@/lib/preCadastro";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Clareza em cada etapa",
    text: "Informações objetivas para você entender o processo antes de avançar.",
  },
  {
    icon: Handshake,
    title: "Atendimento responsável",
    text: "Uma análise cuidadosa, com comunicação transparente e respeito aos seus dados.",
  },
  {
    icon: Clock3,
    title: "Acompanhe com tranquilidade",
    text: "Após o cadastro, nossa equipe orientará os próximos passos por e-mail.",
  },
];

export default function Home() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [fileName, setFileName] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [faceCentered, setFaceCentered] = useState(false);
  const [checkingFace, setCheckingFace] = useState(false);
  const [livenessStep, setLivenessStep] = useState(0);
  const [touchedCpf, setTouchedCpf] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const cpfIsValid = useMemo(() => isValidCpf(cpf), [cpf]);
  const nameIsValid = name.trim().split(/\s+/).filter(Boolean).length >= 2;
  const canSubmit = canSubmitPreCadastro({ name, cpf, fileName, consent });
  const homeUrl = import.meta.env.BASE_URL;
  const livenessPrompts = ["Centralize o rosto no oval", "Vire levemente o rosto para a direita", "Vire levemente o rosto para a esquerda", "Olhe para a câmera e sorria"];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (getPostSubmitState(canSubmit) !== "confirmation") return;
    setCameraError("");
    setCameraOpen(true);
  }

  useEffect(() => {
    if (!cameraOpen) return;
    let cancelled = false;
    let detectorTimer: number | undefined;
    navigator.mediaDevices?.getUserMedia({ video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 720 } }, audio: false })
      .then((stream) => {
        if (cancelled) { stream.getTracks().forEach((track) => track.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.onloadedmetadata = () => setCameraReady(true); }
        type Detector = new (options?: { fastMode?: boolean; maxDetectedFaces?: number }) => { detect(video: HTMLVideoElement): Promise<Array<{ boundingBox: { x: number; y: number; width: number; height: number } }>> };
        const FaceDetector = (window as Window & { FaceDetector?: Detector }).FaceDetector;
        if (!FaceDetector) { setCameraReady(true); setFaceDetected(true); setFaceCentered(true); return; }
        const detector = new FaceDetector({ fastMode: true, maxDetectedFaces: 1 });
        detectorTimer = window.setInterval(async () => {
          const video = videoRef.current;
          if (!video || video.readyState < 2 || cancelled) return;
          try {
            const face = (await detector.detect(video))[0]?.boundingBox;
            const centered = Boolean(face && face.x > video.videoWidth * 0.14 && face.x + face.width < video.videoWidth * 0.86 && face.y > video.videoHeight * 0.08 && face.y + face.height < video.videoHeight * 0.92);
            setFaceDetected(Boolean(face)); setFaceCentered(centered);
          } catch { setFaceDetected(true); setFaceCentered(true); }
        }, 220);
      })
      .catch(() => setCameraError("A câmera não foi autorizada. Libere o acesso nas configurações do navegador para continuar."));
    return () => { cancelled = true; if (detectorTimer) window.clearInterval(detectorTimer); streamRef.current?.getTracks().forEach((track) => track.stop()); streamRef.current = null; };
  }, [cameraOpen]);

  useEffect(() => {
    if (!cameraOpen || !faceCentered || cameraError || livenessStep >= livenessPrompts.length) return;
    const timer = window.setTimeout(() => setLivenessStep((step) => Math.min(step + 1, livenessPrompts.length)), 1800);
    return () => window.clearTimeout(timer);
  }, [cameraOpen, faceCentered, cameraError, livenessStep, livenessPrompts.length]);

  function closeCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop()); streamRef.current = null; setCameraOpen(false); setCheckingFace(false); setCameraReady(false); setFaceDetected(false); setFaceCentered(false); setLivenessStep(0);
  }

  function finishFaceCheck() {
    if (!cameraReady || !faceDetected || !faceCentered || livenessStep < livenessPrompts.length) return;
    setCheckingFace(true);
    window.setTimeout(() => { closeCamera(); setFileName(""); setSubmitted(true); }, 1800);
  }

  if (cameraOpen) {
    const ready = cameraReady && faceDetected && faceCentered;
    const complete = livenessStep >= livenessPrompts.length;
    return (
      <main className="min-h-screen bg-[#071d27] px-4 py-5 text-white sm:px-8 sm:py-8">
        <div className="mx-auto max-w-6xl"><header className="mb-6 flex items-center justify-between"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl border border-[#d5ad36]/40 bg-[#d5ad36]/10 text-[#f2c94c]"><ScanFace size={21} /></span><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#d5ad36]">OPTACRED · verificação segura</p><p className="text-sm font-bold text-white/80">Prova de vida guiada</p></div></div><button type="button" onClick={closeCamera} aria-label="Fechar verificação" className="rounded-full border border-white/15 p-2 text-white/60 transition hover:bg-white/10 hover:text-white"><X size={19} /></button></header>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d2a36] p-3 shadow-[0_30px_100px_rgba(0,0,0,.35)]"><div className="relative overflow-hidden rounded-[1.5rem] bg-[#05141b]"><video ref={videoRef} autoPlay muted playsInline className="aspect-[4/3] w-full object-cover" /><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(5,20,27,.64)_70%)]" /><div className="pointer-events-none absolute inset-0 grid place-items-center"><div className={`relative h-[72%] w-[48%] rounded-[48%] border-[3px] transition-all duration-500 ${complete ? "border-[#65e6a4] shadow-[0_0_0_999px_rgba(5,20,27,.3),0_0_50px_rgba(101,230,164,.6)]" : ready ? "border-[#65e6a4] shadow-[0_0_0_999px_rgba(5,20,27,.3),0_0_35px_rgba(101,230,164,.35)]" : "border-[#f2c94c] shadow-[0_0_0_999px_rgba(5,20,27,.4),0_0_28px_rgba(242,201,76,.3)]"}`}><span className="absolute -left-1 -top-1 size-5 rounded-tl-lg border-l-2 border-t-2 border-current" /><span className="absolute -right-1 -top-1 size-5 rounded-tr-lg border-r-2 border-t-2 border-current" /><span className="absolute -bottom-1 -left-1 size-5 rounded-bl-lg border-b-2 border-l-2 border-current" /><span className="absolute -bottom-1 -right-1 size-5 rounded-br-lg border-b-2 border-r-2 border-current" /></div></div><div className="absolute bottom-5 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#071d27]/85 px-4 py-3 text-center backdrop-blur-xl"><p className="text-xs font-black uppercase tracking-[.15em] text-[#d5ad36]">{complete ? "Concluído" : ready ? `Etapa ${Math.max(livenessStep, 1)} de ${livenessPrompts.length}` : "Aguardando câmera"}</p><p className="mt-1 text-sm font-bold text-white">{complete ? "Prova de vida simulada aprovada" : ready ? livenessPrompts[Math.min(livenessStep, livenessPrompts.length - 1)] : "Permita o acesso à câmera"}</p></div></div></div>
            <aside className="rounded-[2rem] border border-white/10 bg-white/[.06] p-6 backdrop-blur-xl sm:p-7"><div className="flex items-center justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-white/45">Etapa 2 de 2</p><h1 className="mt-2 text-2xl font-black tracking-tight">Confirme que é você</h1></div><span className="grid size-11 place-items-center rounded-2xl bg-[#d5ad36]/15 text-[#f2c94c]"><Camera size={22} /></span></div><p className="mt-4 text-sm leading-6 text-white/60">Siga as instruções na tela. A sequência leva poucos segundos e acontece no seu dispositivo.</p><div className="mt-6 space-y-3">{livenessPrompts.map((prompt, index) => <div key={prompt} className={`flex items-center gap-3 rounded-xl border p-3 transition ${index < livenessStep ? "border-[#65e6a4]/35 bg-[#65e6a4]/10" : index == livenessStep && ready ? "border-[#f2c94c]/45 bg-[#f2c94c]/10" : "border-white/8 bg-black/10"}`}><span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-black ${index < livenessStep ? "bg-[#65e6a4] text-[#071d27]" : index == livenessStep && ready ? "bg-[#f2c94c] text-[#071d27]" : "bg-white/10 text-white/45"}`}>{index < livenessStep ? "✓" : index + 1}</span><span className={`text-xs font-bold ${index <= livenessStep ? "text-white" : "text-white/35"}`}>{prompt}</span></div>)}</div><div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-[#d5ad36] to-[#65e6a4] transition-all duration-500" style={{ width: `${(livenessStep / livenessPrompts.length) * 100}%` }} /></div>{cameraError && <div className="mt-5 rounded-xl border border-[#ff9d9d]/30 bg-[#ff6868]/10 p-3 text-xs font-semibold leading-5 text-[#ffb1b1]">{cameraError}</div>}<div className="mt-6 rounded-xl border border-white/8 bg-black/10 p-3 text-[11px] leading-5 text-white/45"><strong className="text-white/70">Simulação transparente:</strong> esta etapa demonstra uma prova de vida guiada, mas não identifica a pessoa, não compara biometria e não envia imagens.</div><button type="button" disabled={!complete || checkingFace || Boolean(cameraError)} onClick={finishFaceCheck} className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#d5ad36] px-5 font-black text-[#071d27] transition hover:bg-[#f2c94c] disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/35">{checkingFace ? "Finalizando verificação..." : complete ? "Concluir verificação" : "Siga as instruções acima"}</button>{cameraError && <button type="button" onClick={() => { setCameraError(""); closeCamera(); window.setTimeout(() => setCameraOpen(true), 0); }} className="mt-3 w-full text-xs font-bold text-[#f2c94c]">Tentar novamente</button>}</aside>
          </div>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f5f8fb] text-[#102a43]">
        <header className="border-b border-[#d9e3eb] bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
            <a href={homeUrl} className="flex items-center gap-3" aria-label="Voltar para início">
              <span className="grid size-11 place-items-center rounded-xl bg-[#0d5865] text-[#d5ad36] shadow-[0_8px_20px_rgba(13,88,101,.18)]"><Landmark size={23} strokeWidth={2.2} /></span>
              <span><strong className="block text-[14px] font-black leading-none tracking-[.04em] text-[#0d5865]">OPTACRED</strong><span className="text-xs font-semibold text-[#718396]">análise de ressarcimento</span></span>
            </a>
          </div>
        </header>
        <section className="mx-auto flex min-h-[calc(100vh-78px)] max-w-3xl items-center px-5 py-16 text-center lg:px-8">
          <div className="w-full rounded-[2rem] border border-[#d9e3eb] bg-white p-8 shadow-[0_24px_70px_rgba(16,42,67,.12)] sm:p-14">
            <div className="mx-auto mb-7 grid size-20 place-items-center rounded-full bg-[#e2f3ef] text-[#0d786e]"><CheckCircle2 size={42} /></div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[.18em] text-[#0d786e]">Cadastro recebido</p>
            <h1 className="mx-auto max-w-xl text-3xl font-black tracking-tight text-[#102a43] sm:text-5xl">Seu cadastro foi enviado.</h1>
            <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-[#5d7083] sm:text-lg">Sua solicitação foi enviada para análise. Entraremos em contato em breve pelos canais informados.</p>
            <div className="mx-auto mt-8 flex max-w-md items-start gap-3 rounded-2xl bg-[#f2f7f8] p-4 text-left text-sm leading-6 text-[#53687b]"><ShieldCheck className="mt-0.5 shrink-0 text-[#0d786e]" size={20} /><span>Esta etapa registra apenas os dados básicos informados e não captura documentos ou biometria.</span></div>
            <a href={homeUrl} className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#0d5865] px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#094652] focus:outline-none focus:ring-4 focus:ring-[#0d786e]/25">Voltar ao início <ArrowRight size={18} /></a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7fafb] text-[#102a43]">
      <div className="absolute inset-x-0 top-0 -z-0 h-[560px] bg-[radial-gradient(circle_at_78%_8%,rgba(213,173,54,.16),transparent_34%),linear-gradient(135deg,#e9f3f3_0%,#f7fafb_58%)]" />
      <header className="relative z-10 border-b border-[#d9e3eb]/80 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href={homeUrl} className="flex items-center gap-3" aria-label="OPTACRED Ressarcimento — início">
            <span className="grid size-11 place-items-center rounded-xl bg-[#0d5865] text-[#d5ad36] shadow-[0_8px_20px_rgba(13,88,101,.18)]"><Landmark size={23} strokeWidth={2.2} /></span>
            <span><strong className="block text-[14px] font-black leading-none tracking-[.04em] text-[#0d5865]">OPTACRED</strong><span className="text-xs font-semibold text-[#718396]">análise de ressarcimento</span></span>
          </a>
          <span className="hidden items-center gap-2 rounded-full border border-[#d9e3eb] bg-white px-3 py-2 text-xs font-bold text-[#53687b] sm:flex"><LockKeyhole size={14} className="text-[#0d786e]" /> dados protegidos</span>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-12 lg:grid-cols-[1fr_500px] lg:items-center lg:px-8 lg:pb-24 lg:pt-20">
        <div className="absolute -right-16 top-16 hidden h-72 w-[520px] opacity-30 lg:block" aria-hidden="true"><svg viewBox="0 0 520 290" fill="none"><path d="M14 224C110 76 190 74 268 132C346 190 385 232 456 155C476 133 493 106 510 76" stroke="#0d786e" strokeWidth="2" strokeDasharray="8 10" /><circle cx="14" cy="224" r="8" fill="#d5ad36" stroke="#0d5865" strokeWidth="3" /><circle cx="268" cy="132" r="8" fill="#d5ad36" stroke="#0d5865" strokeWidth="3" /><circle cx="510" cy="76" r="8" fill="#d5ad36" stroke="#0d5865" strokeWidth="3" /></svg></div>
        <div className="relative max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#0d5865] px-3.5 py-2 text-xs font-bold uppercase tracking-[.14em] text-white shadow-lg shadow-[#0d5865]/15"><BadgeCheck size={14} className="text-[#d5ad36]" /> ressarcimento com clareza</div>
          <h1 className="text-4xl font-black leading-[1.03] tracking-[-.04em] text-[#102a43] sm:text-6xl">Seu pedido de ressarcimento começa com <span className="text-[#0d786e]">clareza.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#53687b] sm:text-lg">Preencha os dados básicos para registrar sua solicitação. O envio de documento é opcional nesta etapa.</p>
          <div className="relative mt-9 grid gap-4 sm:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-[#d9e3eb] bg-white/85 p-4 shadow-sm"><Icon size={21} className="mb-5 text-[#0d786e]" /><strong className="block text-sm">{title}</strong><span className="mt-1 block text-xs leading-5 text-[#718396]">{text}</span></div>)}
          </div>
        </div>

        <div id="pre-cadastro" className="rounded-[2rem] border border-[#d9e3eb] bg-white p-6 shadow-[0_24px_70px_rgba(16,42,67,.14)] sm:p-8">
          <div className="mb-7 flex items-start justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-[#0d786e]">Solicitação</p><h2 className="mt-2 text-2xl font-black tracking-tight">Análise de ressarcimento</h2></div><div className="rounded-2xl bg-[#f7edcf] p-3 text-[#0d5865]"><FileCheck2 size={24} /></div></div>
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div><label htmlFor="name" className="mb-2 block text-sm font-bold text-[#29445e]">Nome completo <span className="text-[#b94a48">*</span></label><input id="name" value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" placeholder="Como aparece no seu documento" className="h-12 w-full rounded-xl border border-[#c7d4dd] bg-[#fbfdfe] px-4 text-sm outline-none transition placeholder:text-[#8c9baa] focus:border-[#0d786e] focus:ring-4 focus:ring-[#0d786e]/10" />{name.length > 0 && !nameIsValid && <p className="mt-2 text-xs font-semibold text-[#a74342]" role="alert">Digite seu nome e sobrenome.</p>}</div>
            <div><label htmlFor="cpf" className="mb-2 block text-sm font-bold text-[#29445e]">CPF <span className="text-[#b94a48">*</span></label><div className="relative"><input id="cpf" value={cpf} onBlur={() => setTouchedCpf(true)} onChange={(event) => { setCpf(formatCpf(event.target.value)); setTouchedCpf(true); }} required inputMode="numeric" autoComplete="off" placeholder="000.000.000-00" aria-describedby="cpf-help cpf-status" className={`h-12 w-full rounded-xl border bg-[#fbfdfe] px-4 pr-11 text-sm outline-none transition placeholder:text-[#8c9baa] focus:ring-4 focus:ring-[#0d786e]/10 ${touchedCpf && cpf.length > 0 ? (cpfIsValid ? "border-[#299276] focus:border-[#299276]" : "border-[#b94a48] focus:border-[#b94a48]") : "border-[#c7d4dd] focus:border-[#0d786e]"}`} />{touchedCpf && cpf.length > 0 && <span className={`absolute right-4 top-1/2 -translate-y-1/2 ${cpfIsValid ? "text-[#299276]" : "text-[#b94a48]"}`} aria-hidden="true">{cpfIsValid ? <Check size={20} /> : <span className="text-xs font-black">!</span>}</span>}</div><p id="cpf-help" className="mt-2 text-xs text-[#718396]">Usaremos o CPF exclusivamente para análise do cadastro.</p>{touchedCpf && cpf.length > 0 && !cpfIsValid && <p id="cpf-status" className="mt-1 text-xs font-semibold text-[#a74342]" role="alert">Confira os números informados.</p>}{touchedCpf && cpfIsValid && <p id="cpf-status" className="mt-1 text-xs font-semibold text-[#299276]">CPF válido.</p>}</div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.14em] text-[#8293a1]"><span className="size-2 rounded-full bg-[#d5ad36] ring-2 ring-[#0d5865]" /><span className="h-px w-8 bg-[#9bb1bc]" /><span className="size-2 rounded-full bg-[#d5ad36] ring-2 ring-[#0d5865]" /><span>documento opcional</span></div><div><label htmlFor="address-proof" className="mb-2 block text-sm font-bold text-[#29445e]">Comprovante de endereço <span className="text-[#b94a48">*</span></label><label htmlFor="address-proof" className="flex min-h-24 cursor-pointer items-center gap-4 rounded-xl border border-dashed border-[#9bb1bc] bg-[#f6fafb] px-4 py-4 transition hover:border-[#0d786e] hover:bg-[#eff8f7] focus-within:ring-4 focus-within:ring-[#0d786e]/10"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e2f3ef] text-[#0d786e]"><FileUp size={22} /></span><span className="min-w-0"><strong className="block truncate text-sm">{fileName || "Selecione um arquivo"}</strong><span className="mt-1 block text-xs leading-5 text-[#718396]">PDF, JPG ou PNG · até 5 MB<br /><b className="text-[#0d786e]">O envio é opcional e não impede o registro da solicitação.</b></span></span><input id="address-proof" type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" onChange={(event) => setFileName(event.target.files?.[0]?.name || "")} /></label></div>
            <div className="relative overflow-hidden rounded-xl border border-[#d9e3eb] bg-[#f6fafb] p-4"><div className="flex gap-3"><ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#0d786e]" /><div><h3 className="text-sm font-extrabold">Privacidade e segurança</h3><p className="mt-1 text-xs leading-5 text-[#617688]">Seus dados serão utilizados exclusivamente para avaliação do cadastro e tratados conforme a finalidade informada, com medidas de proteção e controle de acesso.</p></div></div></div>
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-5 text-[#53687b]"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="mt-0.5 size-4 accent-[#0d786e]" /><span>Li o aviso de privacidade e autorizo o uso dos meus dados para análise deste cadastro. <span className="text-[#b94a48">*</span></span></label>
            <button type="submit" disabled={!canSubmit} className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#0d5865] px-5 font-extrabold text-white shadow-lg shadow-[#0d5865]/20 transition hover:-translate-y-0.5 hover:bg-[#094652] active:translate-y-0 disabled:cursor-not-allowed disabled:bg-[#b7c5cc] disabled:shadow-none focus:outline-none focus:ring-4 focus:ring-[#0d786e]/25">Enviar cadastro <ArrowRight size={19} className="transition group-hover:translate-x-1" /></button>
            <p className="text-center text-xs text-[#8c9baa]">Nome, CPF e consentimento são obrigatórios. O documento é opcional.</p>
          </form>
        </div>
      </section>
      <footer className="relative z-10 border-t border-[#d9e3eb] bg-white/70"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-[#718396] sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>© 2026 OPTACRED · ressarcimento com responsabilidade</span><span className="inline-flex items-center gap-1.5"><LockKeyhole size={13} /> segurança e transparência em cada etapa</span></div></footer>
    </main>
  );
}
