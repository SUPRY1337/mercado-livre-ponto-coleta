import React, { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeInfo,
  BookOpen,
  Check,
  CircleHelp,
  Landmark,
  LockKeyhole,
  MonitorSmartphone,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const demoSteps = [
  { number: "01", title: "Conheça a proposta", description: "Uma visão geral do conceito e da navegação deste protótipo acadêmico." },
  { number: "02", title: "Explore a interface", description: "Veja como componentes, hierarquia visual e acessibilidade foram organizados." },
  { number: "03", title: "Encerre a simulação", description: "A demonstração termina sem solicitar ou guardar qualquer informação." },
];

export default function Home() {
  const [demoStarted, setDemoStarted] = useState(false);

  function startDemo() {
    setDemoStarted(true);
  }

  function resetDemo() {
    setDemoStarted(false);
  }

  return (
    <main className="min-h-screen bg-[#f5f8ff] text-[#09275f]">
      <div role="note" aria-label="Aviso de projeto acadêmico" className="bg-[#ffcc00] px-4 py-3 text-center text-xs font-black uppercase tracking-[.08em] text-[#082b70] sm:text-sm">
        Projeto acadêmico · demonstração não oficial · sem vínculo com o Banco do Brasil
      </div>

      <header className="border-b border-[#dce5f5] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Início do protótipo acadêmico BB">
            <span aria-hidden="true" className="grid size-12 place-items-center rounded-2xl bg-[#ffcc00] text-xl font-black tracking-[-.12em] text-[#0038a8] shadow-sm">BB</span>
            <span>
              <strong className="block text-sm font-black tracking-[.02em] text-[#0038a8]">BANCO DO BRASIL</strong>
              <span className="text-xs font-semibold text-[#66799b]">protótipo acadêmico</span>
            </span>
          </a>
          <nav aria-label="Navegação principal" className="hidden items-center gap-7 text-sm font-bold text-[#3e5278] md:flex">
            <a className="transition hover:text-[#0038a8]" href="#sobre">Sobre o projeto</a>
            <a className="transition hover:text-[#0038a8]" href="#demonstracao">Demonstração</a>
          </nav>
          <a href="#aviso" className="inline-flex items-center gap-2 rounded-full border border-[#d8e2f1] px-3 py-2 text-xs font-bold text-[#36517f] transition hover:bg-[#f3f6fc]">
            <CircleHelp size={16} /> <span className="hidden sm:inline">Sobre esta página</span>
          </a>
        </div>
      </header>

      <section id="inicio" className="relative isolate overflow-hidden bg-[#073da8] text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_26%,rgba(255,204,0,.24),transparent_26%),linear-gradient(120deg,#062f86_0%,#0751c8_58%,#0b67d0_100%)]" />
        <div aria-hidden="true" className="absolute -right-20 -top-28 -z-10 size-[26rem] rounded-full border-[1px] border-white/10 sm:size-[38rem]" />
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[.13em] text-[#ffdf55] backdrop-blur">
              <BookOpen size={15} /> Trabalho de faculdade
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.04] tracking-[-.04em] sm:text-6xl lg:text-7xl">
              Uma experiência digital em <span className="text-[#ffdf55]">estudo.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-blue-50/85 sm:text-lg sm:leading-8">
              Protótipo visual inspirado em serviços bancários digitais, criado para fins educacionais. Explore a interface demonstrativa — não há operações bancárias nesta página.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={startDemo} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#ffcc00] px-6 py-3 font-black text-[#082b70] shadow-[0_12px_30px_rgba(0,0,0,.18)] transition hover:-translate-y-0.5 hover:bg-[#ffdc37] focus:outline-none focus:ring-4 focus:ring-white/30">
                Explorar demonstração <ArrowRight size={18} />
              </button>
              <a href="#sobre" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3 font-bold text-white transition hover:bg-white/10">
                Sobre o projeto <ArrowUpRight size={17} />
              </a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs font-semibold text-blue-100/75"><ShieldCheck size={15} /> Nenhum dado pessoal é solicitado, transmitido ou armazenado.</p>
          </div>

          <div aria-label="Prévia estática do protótipo" className="mx-auto w-full max-w-lg rotate-0 rounded-[2rem] border border-white/20 bg-white p-3 shadow-[0_32px_90px_rgba(0,18,70,.36)] sm:rotate-1">
            <div className="rounded-[1.5rem] bg-[#f4f7fc] p-5 text-[#09275f] sm:p-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-[#ffcc00] font-black tracking-[-.12em] text-[#0038a8]">BB</span>
                  <div><p className="text-xs font-black uppercase tracking-[.08em] text-[#0038a8]">Visão demonstrativa</p><p className="mt-0.5 text-[11px] font-semibold text-[#7585a2]">Interface de estudo</p></div>
                </div>
                <span className="rounded-full bg-[#e8effb] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.08em] text-[#194ba5]">Fictício</span>
              </div>
              <div className="mt-7 rounded-2xl bg-gradient-to-br from-[#063ca8] to-[#1267d4] p-5 text-white sm:p-6">
                <div className="flex items-center justify-between text-white/75"><span className="text-xs font-bold">Área de demonstração</span><MonitorSmartphone size={18} /></div>
                <div className="mt-7 flex items-center gap-2"><span className="size-2 rounded-full bg-[#ffcc00]" /><span className="text-sm font-extrabold">Nenhuma conta conectada</span></div>
                <p className="mt-2 text-xs leading-5 text-blue-100/75">Esta prévia usa apenas elementos ilustrativos, sem informações reais.</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#e0e7f2] bg-white p-4"><span className="grid size-9 place-items-center rounded-xl bg-[#fff3bf] text-[#174ba4]"><Landmark size={18} /></span><p className="mt-3 text-xs font-extrabold">Conceito visual</p><p className="mt-1 text-[11px] text-[#7a89a3]">Estudo de interface</p></div>
                <div className="rounded-2xl border border-[#e0e7f2] bg-white p-4"><span className="grid size-9 place-items-center rounded-xl bg-[#e8effb] text-[#174ba4]"><LockKeyhole size={18} /></span><p className="mt-3 text-xs font-extrabold">Sem operações</p><p className="mt-1 text-[11px] text-[#7a89a3]">Apenas demonstração</p></div>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#fff7d6] px-4 py-3 text-[11px] font-bold leading-5 text-[#684f00]"><BadgeInfo size={16} className="shrink-0" /> Não insira dados reais neste projeto acadêmico.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[.16em] text-[#2459b1]">Sobre o projeto</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-.03em] text-[#09275f] sm:text-4xl">Um exercício de design, não um serviço bancário.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-[#dce5f5] bg-white p-6 shadow-[0_8px_30px_rgba(9,39,95,.04)]">
              <span className="grid size-11 place-items-center rounded-xl bg-[#fff3bf] text-[#174ba4]"><Sparkles size={21} /></span>
              <h3 className="mt-5 text-base font-black">Objetivo acadêmico</h3>
              <p className="mt-2 text-sm leading-6 text-[#617394]">Apresentar uma proposta visual e testar a organização de uma experiência digital em um contexto de sala de aula.</p>
            </article>
            <article className="rounded-2xl border border-[#dce5f5] bg-white p-6 shadow-[0_8px_30px_rgba(9,39,95,.04)]">
              <span className="grid size-11 place-items-center rounded-xl bg-[#e8effb] text-[#174ba4]"><ShieldCheck size={21} /></span>
              <h3 className="mt-5 text-base font-black">Sem coleta de dados</h3>
              <p className="mt-2 text-sm leading-6 text-[#617394]">A página não contém cadastro, login, upload, transações ou integração com sistemas do Banco do Brasil.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="demonstracao" className="scroll-mt-8 border-y border-[#dce5f5] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[.16em] text-[#2459b1]">Percurso do protótipo</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-.03em] text-[#09275f] sm:text-4xl">Explore a demonstração</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#617394]">Uma sequência informativa e estática. Os botões só controlam esta apresentação no navegador.</p>
            </div>
            {demoStarted ? (
              <button type="button" onClick={resetDemo} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#cfdcf0] px-4 py-3 text-sm font-extrabold text-[#174ba4] transition hover:bg-[#f3f6fc]"><RotateCcw size={17} /> Reiniciar</button>
            ) : (
              <button type="button" onClick={startDemo} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0038a8] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#082f82]">Iniciar percurso <ArrowRight size={17} /></button>
            )}
          </div>
          {demoStarted && <p role="status" className="mt-6 flex items-center gap-2 rounded-xl border border-[#dce8bb] bg-[#f4f9e8] px-4 py-3 text-sm font-bold text-[#365512]"><Check size={17} /> Demonstração iniciada. Nenhuma informação foi solicitada ou enviada.</p>}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {demoSteps.map((step) => (
              <article key={step.number} className="rounded-2xl border border-[#dce5f5] bg-[#f9fbff] p-6">
                <span className="text-xs font-black tracking-[.12em] text-[#bd9400]">ETAPA {step.number}</span>
                <h3 className="mt-4 text-lg font-black text-[#09275f]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#617394]">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="aviso" className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border-2 border-[#e6c13a] bg-[#fff8dc] p-5 sm:flex-row sm:items-start sm:p-6">
          <BadgeInfo className="shrink-0 text-[#785d00]" size={22} />
          <div>
            <h2 className="text-sm font-black uppercase tracking-[.08em] text-[#5d4800]">Aviso importante</h2>
            <p className="mt-2 text-sm leading-6 text-[#5d542e]">Este é um projeto acadêmico independente, não oficial e sem afiliação, patrocínio ou aprovação do Banco do Brasil. Não é um canal bancário. Não digite informações pessoais, senhas ou dados financeiros.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#dce5f5] bg-[#09275f] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#ffcc00] font-black tracking-[-.12em] text-[#0038a8]">BB</span><span className="text-sm font-bold">Protótipo acadêmico independente</span></div>
          <p className="text-xs leading-5 text-blue-100/75">Demonstração não oficial · sem coleta de dados · sem vínculo com o Banco do Brasil</p>
        </div>
      </footer>
    </main>
  );
}
