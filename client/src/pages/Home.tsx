import React, { useMemo, useState } from "react";
import { canSubmitPreCadastro, formatCpf, getPostSubmitState, isValidCpf } from "@/lib/preCadastro";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileCheck2,
  FileUp,
  LockKeyhole,
  MapPin,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

const benefits = [
  { icon: Package, title: "Receba e entregue", text: "Ajude sua vizinhança a receber encomendas com mais praticidade." },
  { icon: MapPin, title: "Faça parte da rota", text: "Seu estabelecimento pode se tornar uma referência no bairro." },
  { icon: Truck, title: "Operação simples", text: "Um fluxo organizado para facilitar cada etapa da coleta." },
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (getPostSubmitState(canSubmit) !== "confirmation") return;
    // Esta versão é demonstrativa: nenhum dado pessoal ou documento é enviado ou persistido.
    setSubmitted(true);
    setFileName("");
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#fffdf7] text-[#132b58]">
        <header className="border-b border-[#dbe7f7] bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
            <a href="/" className="flex items-center gap-3" aria-label="Voltar para início">
              <span className="grid size-11 place-items-center rounded-2xl bg-[#ffe100] text-[#123d91] shadow-[0_8px_20px_rgba(255,225,0,.25)]"><Package size={24} strokeWidth={2.5} /></span>
              <span><strong className="block max-w-[190px] text-[11px] font-black leading-[1.05] tracking-[.03em]">MERCADO LIVRE PONTO DE COLETA</strong><span className="text-xs text-[#60708e]">pré-cadastro de parceiros</span></span>
            </a>
          </div>
        </header>
        <section className="mx-auto flex min-h-[calc(100vh-78px)] max-w-3xl items-center px-5 py-16 text-center lg:px-8">
          <div className="w-full rounded-[2rem] border border-[#dbe7f7] bg-white p-8 shadow-[0_24px_70px_rgba(20,63,130,.12)] sm:p-14">
            <div className="mx-auto mb-7 grid size-20 place-items-center rounded-full bg-[#e4f8ed] text-[#16824c]"><CheckCircle2 size={42} /></div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[.18em] text-[#1769d1]">Cadastro recebido</p>
            <h1 className="mx-auto max-w-xl text-3xl font-black tracking-tight text-[#132b58] sm:text-5xl">Seu próximo passo começa aqui.</h1>
            <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-[#60708e] sm:text-lg">Seu cadastro foi enviado com sucesso. Iremos enviar uma mensagem ao seu Gmail com as informações necessárias para confirmação e os próximos passos.</p>
            <div className="mx-auto mt-8 flex max-w-md items-start gap-3 rounded-2xl bg-[#f4f8fd] p-4 text-left text-sm leading-6 text-[#526582]"><ShieldCheck className="mt-0.5 shrink-0 text-[#1769d1]" size={20} /><span>As informações serão utilizadas apenas para a confirmação e para orientar os próximos passos do cadastro.</span></div>
            <a href="/" className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#123d91] px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#0d3176] focus:outline-none focus:ring-4 focus:ring-[#1769d1]/25">Voltar ao início <ArrowRight size={18} /></a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffdf7] text-[#132b58]">
      <div className="absolute inset-x-0 top-0 -z-0 h-[510px] bg-[radial-gradient(circle_at_80%_10%,rgba(23,105,209,.15),transparent_35%),linear-gradient(135deg,#fff4a9_0%,#fffdf7_57%)]" />
      <header className="relative z-10 border-b border-[#dbe7f7]/80 bg-white/75 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="MERCADO LIVRE PONTO DE COLETA — início">
            <span className="grid size-11 place-items-center rounded-2xl bg-[#ffe100] text-[#123d91] shadow-[0_8px_20px_rgba(255,225,0,.25)]"><Package size={24} strokeWidth={2.5} /></span>
            <span><strong className="block max-w-[190px] text-[11px] font-black leading-[1.05] tracking-[.03em]">MERCADO LIVRE PONTO DE COLETA</strong><span className="text-xs text-[#60708e]">pré-cadastro de parceiros</span></span>
          </a>
          <span className="hidden items-center gap-2 rounded-full border border-[#dbe7f7] bg-white px-3 py-2 text-xs font-bold text-[#526582] sm:flex"><LockKeyhole size={14} className="text-[#1769d1]" /> dados protegidos</span>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-12 lg:grid-cols-[1fr_500px] lg:items-center lg:px-8 lg:pb-24 lg:pt-20">
        <svg aria-hidden="true" className="pointer-events-none absolute -left-20 top-16 hidden h-72 w-[620px] opacity-30 lg:block" viewBox="0 0 620 290" fill="none"><path d="M8 232C105 83 183 72 264 135C340 194 385 234 460 161C505 117 537 84 612 41" stroke="#1769d1" strokeWidth="2" strokeDasharray="8 10" /><circle cx="8" cy="232" r="8" fill="#ffe100" stroke="#123d91" strokeWidth="3" /><circle cx="264" cy="135" r="8" fill="#ffe100" stroke="#123d91" strokeWidth="3" /><circle cx="612" cy="41" r="8" fill="#ffe100" stroke="#123d91" strokeWidth="3" /></svg>
          <div className="relative max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#123d91] px-3.5 py-2 text-xs font-bold uppercase tracking-[.14em] text-white shadow-lg shadow-[#123d91]/15"><Sparkles size={14} className="text-[#ffe100]" /> conecte sua região</div>
          <h1 className="text-4xl font-black leading-[1.03] tracking-[-.04em] text-[#132b58] sm:text-6xl">Seu espaço pode aproximar <span className="text-[#1769d1]">pessoas e entregas.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#526582] sm:text-lg">Faça seu pré-cadastro para avaliar a possibilidade de transformar seu estabelecimento em um ponto de coleta parceiro, com uma experiência mais prática para todo o bairro.</p>
          <div className="relative mt-9 grid gap-4 sm:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-[#dbe7f7] bg-white/75 p-4 shadow-sm"><Icon size={21} className="mb-5 text-[#1769d1]" /><strong className="block text-sm">{title}</strong><span className="mt-1 block text-xs leading-5 text-[#60708e]">{text}</span></div>)}
          </div>
        </div>

        <div id="pre-cadastro" className="rounded-[2rem] border border-[#dbe7f7] bg-white p-6 shadow-[0_24px_70px_rgba(20,63,130,.14)] sm:p-8">
          <div className="mb-7 flex items-start justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-[#1769d1]">Etapa 1 de 1</p><h2 className="mt-2 text-2xl font-black tracking-tight">Conte com a gente</h2></div><div className="rounded-2xl bg-[#fff4a9] p-3 text-[#123d91]"><FileCheck2 size={24} /></div></div>
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div><label htmlFor="name" className="mb-2 block text-sm font-bold text-[#263c61]">Nome completo <span className="text-[#d24b45]">*</span></label><input id="name" value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" placeholder="Como aparece no seu documento" className="h-12 w-full rounded-xl border border-[#c9d7ea] bg-[#fbfdff] px-4 text-sm outline-none transition placeholder:text-[#8b9ab2] focus:border-[#1769d1] focus:ring-4 focus:ring-[#1769d1]/10" />{name.length > 0 && !nameIsValid && <p className="mt-2 text-xs font-semibold text-[#b54843]" role="alert">Digite seu nome e sobrenome.</p>}</div>
            <div><label htmlFor="cpf" className="mb-2 block text-sm font-bold text-[#263c61]">CPF <span className="text-[#d24b45]">*</span></label><div className="relative"><input id="cpf" value={cpf} onBlur={() => setTouchedCpf(true)} onChange={(event) => { setCpf(formatCpf(event.target.value)); setTouchedCpf(true); }} required inputMode="numeric" autoComplete="off" placeholder="000.000.000-00" aria-describedby="cpf-help cpf-status" className={`h-12 w-full rounded-xl border bg-[#fbfdff] px-4 pr-11 text-sm outline-none transition placeholder:text-[#8b9ab2] focus:ring-4 focus:ring-[#1769d1]/10 ${touchedCpf && cpf.length > 0 ? (cpfIsValid ? "border-[#2aa866] focus:border-[#2aa866]" : "border-[#d24b45] focus:border-[#d24b45]") : "border-[#c9d7ea] focus:border-[#1769d1]"}`} />{touchedCpf && cpf.length > 0 && <span className={`absolute right-4 top-1/2 -translate-y-1/2 ${cpfIsValid ? "text-[#2aa866]" : "text-[#d24b45]"}`} aria-hidden="true">{cpfIsValid ? <Check size={20} /> : <span className="text-xs font-black">!</span>}</span>}</div><p id="cpf-help" className="mt-2 text-xs text-[#71819b]">Usaremos o CPF exclusivamente para análise do cadastro.</p>{touchedCpf && cpf.length > 0 && !cpfIsValid && <p id="cpf-status" className="mt-1 text-xs font-semibold text-[#b54843]" role="alert">Confira os números informados.</p>}{touchedCpf && cpfIsValid && <p id="cpf-status" className="mt-1 text-xs font-semibold text-[#16824c]">CPF válido.</p>}</div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.14em] text-[#7a8eaa]"><span className="size-2 rounded-full bg-[#ffe100] ring-2 ring-[#123d91]" /><span className="h-px w-8 bg-[#9db5d5]" /><span className="size-2 rounded-full bg-[#ffe100] ring-2 ring-[#123d91]" /><span>ponto seguro</span></div><div><label htmlFor="address-proof" className="mb-2 block text-sm font-bold text-[#263c61]">Comprovante de endereço <span className="text-[#d24b45]">*</span></label><label htmlFor="address-proof" className="flex min-h-24 cursor-pointer items-center gap-4 rounded-xl border border-dashed border-[#9db5d5] bg-[#f7faff] px-4 py-4 transition hover:border-[#1769d1] hover:bg-[#f0f6ff] focus-within:ring-4 focus-within:ring-[#1769d1]/10"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e6f0ff] text-[#1769d1]"><FileUp size={22} /></span><span className="min-w-0"><strong className="block truncate text-sm">{fileName || "Selecione um arquivo"}</strong><span className="mt-1 block text-xs leading-5 text-[#71819b]">PDF, JPG ou PNG · até 5 MB<br /><b className="text-[#1769d1]">Envie um arquivo legível para concluir seu cadastro.</b></span></span><input id="address-proof" type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" onChange={(event) => setFileName(event.target.files?.[0]?.name || "")} /></label></div>
            <div className="relative overflow-hidden rounded-xl border border-[#dbe7f7] bg-[#f8fbff] p-4"><div aria-hidden="true" className="absolute right-4 top-3 flex items-center gap-1 opacity-60"><span className="size-1.5 rounded-full bg-[#ffe100]" /><span className="h-px w-8 border-t border-dashed border-[#1769d1]" /><span className="size-1.5 rounded-full bg-[#1769d1]" /></div><div className="flex gap-3"><ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#1769d1]" /><div><h3 className="text-sm font-extrabold">Aviso de privacidade</h3><p className="mt-1 text-xs leading-5 text-[#60708e]">Seus dados serão utilizados exclusivamente para avaliação do cadastro e tratados conforme a finalidade informada, com medidas de proteção e controle de acesso.</p></div></div></div>
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-5 text-[#526582]"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="mt-0.5 size-4 accent-[#1769d1]" /><span>Li o aviso de privacidade e autorizo o uso dos meus dados para análise deste cadastro. <span className="text-[#d24b45]">*</span></span></label>
            <button type="submit" disabled={!canSubmit} className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#123d91] px-5 font-extrabold text-white shadow-lg shadow-[#123d91]/20 transition hover:-translate-y-0.5 hover:bg-[#0d3176] active:translate-y-0 disabled:cursor-not-allowed disabled:bg-[#b5c3d6] disabled:shadow-none focus:outline-none focus:ring-4 focus:ring-[#1769d1]/25">Enviar pré-cadastro <ArrowRight size={19} className="transition group-hover:translate-x-1" /></button>
            <p className="text-center text-xs text-[#8b9ab2]">Campos com * são obrigatórios.</p>
          </form>
        </div>
      </section>
      <footer className="relative z-10 border-t border-[#dbe7f7] bg-white/60"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-[#71819b] sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>© 2026 MERCADO LIVRE PONTO DE COLETA · cadastro de parceiros</span><span className="inline-flex items-center gap-1.5"><LockKeyhole size={13} /> privacidade em cada etapa do cadastro</span></div></footer>
    </main>
  );
}
