import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
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
  const [touchedCpf, setTouchedCpf] = useState(false);

  const cpfIsValid = useMemo(() => isValidCpf(cpf), [cpf]);
  const nameIsValid = name.trim().split(/\s+/).filter(Boolean).length >= 2;
  const canSubmit = canSubmitPreCadastro({ name, cpf, fileName, consent });
  const homeUrl = import.meta.env.BASE_URL;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (getPostSubmitState(canSubmit) !== "confirmation") return;
    setSubmitted(true);
    setFileName("");
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f5f8fb] text-[#102a43]">
        <header className="border-b border-[#d9e3eb] bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
            <a href={homeUrl} className="flex items-center gap-3" aria-label="Voltar para início">
              <span className="grid size-11 place-items-center rounded-xl bg-[#0d5865] text-[#d5ad36] shadow-[0_8px_20px_rgba(13,88,101,.18)]"><Landmark size={23} strokeWidth={2.2} /></span>
              <span><strong className="block text-[14px] font-black leading-none tracking-[.04em] text-[#0d5865]">OPTACRED</strong><span className="text-xs font-semibold text-[#718396]">empréstimo responsável</span></span>
            </a>
          </div>
        </header>
        <section className="mx-auto flex min-h-[calc(100vh-78px)] max-w-3xl items-center px-5 py-16 text-center lg:px-8">
          <div className="w-full rounded-[2rem] border border-[#d9e3eb] bg-white p-8 shadow-[0_24px_70px_rgba(16,42,67,.12)] sm:p-14">
            <div className="mx-auto mb-7 grid size-20 place-items-center rounded-full bg-[#e2f3ef] text-[#0d786e]"><CheckCircle2 size={42} /></div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[.18em] text-[#0d786e]">Cadastro recebido</p>
            <h1 className="mx-auto max-w-xl text-3xl font-black tracking-tight text-[#102a43] sm:text-5xl">Seu cadastro foi enviado.</h1>
            <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-[#5d7083] sm:text-lg">Enviaremos uma mensagem ao seu e-mail com as informações necessárias para confirmação e os próximos passos.</p>
            <div className="mx-auto mt-8 flex max-w-md items-start gap-3 rounded-2xl bg-[#f2f7f8] p-4 text-left text-sm leading-6 text-[#53687b]"><ShieldCheck className="mt-0.5 shrink-0 text-[#0d786e]" size={20} /><span>O retorno será apresentado de forma clara, conforme a análise das informações fornecidas.</span></div>
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
          <a href={homeUrl} className="flex items-center gap-3" aria-label="OPTACRED Empréstimo — início">
            <span className="grid size-11 place-items-center rounded-xl bg-[#0d5865] text-[#d5ad36] shadow-[0_8px_20px_rgba(13,88,101,.18)]"><Landmark size={23} strokeWidth={2.2} /></span>
            <span><strong className="block text-[14px] font-black leading-none tracking-[.04em] text-[#0d5865]">OPTACRED</strong><span className="text-xs font-semibold text-[#718396]">empréstimo responsável</span></span>
          </a>
          <span className="hidden items-center gap-2 rounded-full border border-[#d9e3eb] bg-white px-3 py-2 text-xs font-bold text-[#53687b] sm:flex"><LockKeyhole size={14} className="text-[#0d786e]" /> dados protegidos</span>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-12 lg:grid-cols-[1fr_500px] lg:items-center lg:px-8 lg:pb-24 lg:pt-20">
        <div className="absolute -right-16 top-16 hidden h-72 w-[520px] opacity-30 lg:block" aria-hidden="true"><svg viewBox="0 0 520 290" fill="none"><path d="M14 224C110 76 190 74 268 132C346 190 385 232 456 155C476 133 493 106 510 76" stroke="#0d786e" strokeWidth="2" strokeDasharray="8 10" /><circle cx="14" cy="224" r="8" fill="#d5ad36" stroke="#0d5865" strokeWidth="3" /><circle cx="268" cy="132" r="8" fill="#d5ad36" stroke="#0d5865" strokeWidth="3" /><circle cx="510" cy="76" r="8" fill="#d5ad36" stroke="#0d5865" strokeWidth="3" /></svg></div>
        <div className="relative max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#0d5865] px-3.5 py-2 text-xs font-bold uppercase tracking-[.14em] text-white shadow-lg shadow-[#0d5865]/15"><BadgeCheck size={14} className="text-[#d5ad36]" /> crédito com clareza</div>
          <h1 className="text-4xl font-black leading-[1.03] tracking-[-.04em] text-[#102a43] sm:text-6xl">Escolhas financeiras começam com <span className="text-[#0d786e]">informação.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#53687b] sm:text-lg">Faça seu cadastro na OPTACRED para iniciar uma análise responsável. Nossa equipe orientará você com transparência sobre as próximas etapas, sem promessas antecipadas.</p>
          <div className="relative mt-9 grid gap-4 sm:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-[#d9e3eb] bg-white/85 p-4 shadow-sm"><Icon size={21} className="mb-5 text-[#0d786e]" /><strong className="block text-sm">{title}</strong><span className="mt-1 block text-xs leading-5 text-[#718396]">{text}</span></div>)}
          </div>
        </div>

        <div id="pre-cadastro" className="rounded-[2rem] border border-[#d9e3eb] bg-white p-6 shadow-[0_24px_70px_rgba(16,42,67,.14)] sm:p-8">
          <div className="mb-7 flex items-start justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-[#0d786e]">Pré-cadastro</p><h2 className="mt-2 text-2xl font-black tracking-tight">Fale com a OPTACRED</h2></div><div className="rounded-2xl bg-[#f7edcf] p-3 text-[#0d5865]"><FileCheck2 size={24} /></div></div>
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div><label htmlFor="name" className="mb-2 block text-sm font-bold text-[#29445e]">Nome completo <span className="text-[#b94a48">*</span></label><input id="name" value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" placeholder="Como aparece no seu documento" className="h-12 w-full rounded-xl border border-[#c7d4dd] bg-[#fbfdfe] px-4 text-sm outline-none transition placeholder:text-[#8c9baa] focus:border-[#0d786e] focus:ring-4 focus:ring-[#0d786e]/10" />{name.length > 0 && !nameIsValid && <p className="mt-2 text-xs font-semibold text-[#a74342]" role="alert">Digite seu nome e sobrenome.</p>}</div>
            <div><label htmlFor="cpf" className="mb-2 block text-sm font-bold text-[#29445e]">CPF <span className="text-[#b94a48">*</span></label><div className="relative"><input id="cpf" value={cpf} onBlur={() => setTouchedCpf(true)} onChange={(event) => { setCpf(formatCpf(event.target.value)); setTouchedCpf(true); }} required inputMode="numeric" autoComplete="off" placeholder="000.000.000-00" aria-describedby="cpf-help cpf-status" className={`h-12 w-full rounded-xl border bg-[#fbfdfe] px-4 pr-11 text-sm outline-none transition placeholder:text-[#8c9baa] focus:ring-4 focus:ring-[#0d786e]/10 ${touchedCpf && cpf.length > 0 ? (cpfIsValid ? "border-[#299276] focus:border-[#299276]" : "border-[#b94a48] focus:border-[#b94a48]") : "border-[#c7d4dd] focus:border-[#0d786e]"}`} />{touchedCpf && cpf.length > 0 && <span className={`absolute right-4 top-1/2 -translate-y-1/2 ${cpfIsValid ? "text-[#299276]" : "text-[#b94a48]"}`} aria-hidden="true">{cpfIsValid ? <Check size={20} /> : <span className="text-xs font-black">!</span>}</span>}</div><p id="cpf-help" className="mt-2 text-xs text-[#718396]">Usaremos o CPF exclusivamente para análise do cadastro.</p>{touchedCpf && cpf.length > 0 && !cpfIsValid && <p id="cpf-status" className="mt-1 text-xs font-semibold text-[#a74342]" role="alert">Confira os números informados.</p>}{touchedCpf && cpfIsValid && <p id="cpf-status" className="mt-1 text-xs font-semibold text-[#299276]">CPF válido.</p>}</div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.14em] text-[#8293a1]"><span className="size-2 rounded-full bg-[#d5ad36] ring-2 ring-[#0d5865]" /><span className="h-px w-8 bg-[#9bb1bc]" /><span className="size-2 rounded-full bg-[#d5ad36] ring-2 ring-[#0d5865]" /><span>etapa segura</span></div><div><label htmlFor="address-proof" className="mb-2 block text-sm font-bold text-[#29445e]">Comprovante de endereço <span className="text-[#b94a48">*</span></label><label htmlFor="address-proof" className="flex min-h-24 cursor-pointer items-center gap-4 rounded-xl border border-dashed border-[#9bb1bc] bg-[#f6fafb] px-4 py-4 transition hover:border-[#0d786e] hover:bg-[#eff8f7] focus-within:ring-4 focus-within:ring-[#0d786e]/10"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e2f3ef] text-[#0d786e]"><FileUp size={22} /></span><span className="min-w-0"><strong className="block truncate text-sm">{fileName || "Selecione um arquivo"}</strong><span className="mt-1 block text-xs leading-5 text-[#718396]">PDF, JPG ou PNG · até 5 MB<br /><b className="text-[#0d786e]">Envie um arquivo legível para concluir seu cadastro.</b></span></span><input id="address-proof" type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" onChange={(event) => setFileName(event.target.files?.[0]?.name || "")} /></label></div>
            <div className="relative overflow-hidden rounded-xl border border-[#d9e3eb] bg-[#f6fafb] p-4"><div className="flex gap-3"><ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#0d786e]" /><div><h3 className="text-sm font-extrabold">Privacidade e segurança</h3><p className="mt-1 text-xs leading-5 text-[#617688]">Seus dados serão utilizados exclusivamente para avaliação do cadastro e tratados conforme a finalidade informada, com medidas de proteção e controle de acesso.</p></div></div></div>
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-5 text-[#53687b]"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="mt-0.5 size-4 accent-[#0d786e]" /><span>Li o aviso de privacidade e autorizo o uso dos meus dados para análise deste cadastro. <span className="text-[#b94a48">*</span></span></label>
            <button type="submit" disabled={!canSubmit} className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#0d5865] px-5 font-extrabold text-white shadow-lg shadow-[#0d5865]/20 transition hover:-translate-y-0.5 hover:bg-[#094652] active:translate-y-0 disabled:cursor-not-allowed disabled:bg-[#b7c5cc] disabled:shadow-none focus:outline-none focus:ring-4 focus:ring-[#0d786e]/25">Enviar cadastro <ArrowRight size={19} className="transition group-hover:translate-x-1" /></button>
            <p className="text-center text-xs text-[#8c9baa]">Campos com * são obrigatórios.</p>
          </form>
        </div>
      </section>
      <footer className="relative z-10 border-t border-[#d9e3eb] bg-white/70"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-[#718396] sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>© 2026 OPTACRED · soluções de crédito com responsabilidade</span><span className="inline-flex items-center gap-1.5"><LockKeyhole size={13} /> segurança e transparência em cada etapa</span></div></footer>
    </main>
  );
}
