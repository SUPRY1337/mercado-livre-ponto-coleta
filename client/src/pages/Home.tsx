import React from "react";
import { ArrowRight, ArrowUpRight, Building2, CreditCard, Landmark, Menu, PiggyBank, ShieldCheck, Smartphone } from "lucide-react";

const solutions = [
  { icon: Smartphone, title: "Conta e dia a dia", description: "Uma experiência digital pensada para acompanhar sua rotina.", color: "bg-[#eaf1ff] text-[#1746a2]" },
  { icon: CreditCard, title: "Cartões", description: "Praticidade para organizar compras e pagamentos.", color: "bg-[#fff5ce] text-[#806200]" },
  { icon: PiggyBank, title: "Investimentos", description: "Informação e planejamento para seus objetivos.", color: "bg-[#e8f5ed] text-[#207242]" },
  { icon: Building2, title: "Para empresas", description: "Soluções para apoiar a gestão e o crescimento.", color: "bg-[#f0ecff] text-[#5c43a5]" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#172b4d]">
      <header className="border-b border-[#e6ebf2] bg-white">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
          <a href="#inicio" className="flex shrink-0 items-center gap-3" aria-label="Banco do Brasil — início">
            <span aria-hidden="true" className="grid size-11 place-items-center rounded-xl bg-[#ffcc00] text-[19px] font-black tracking-[-.13em] text-[#0038a8]">BB</span>
            <span className="hidden text-sm font-extrabold tracking-[.015em] text-[#0038a8] sm:block">BANCO DO BRASIL</span>
          </a>
          <nav aria-label="Navegação principal" className="hidden items-center gap-8 text-sm font-semibold text-[#334765] md:flex">
            <a className="transition hover:text-[#0038a8]" href="#solucoes">Soluções</a>
            <a className="transition hover:text-[#0038a8]" href="#empresas">Para sua empresa</a>
            <a className="transition hover:text-[#0038a8]" href="#cadastro">OptaApp</a>
          </nav>
          <a href="#cadastro" className="inline-flex items-center gap-2 rounded-lg bg-[#0038a8] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#082f82] focus:outline-none focus:ring-4 focus:ring-[#0038a8]/20">Conheça as soluções <ArrowRight size={16} /></a>
          <button type="button" aria-label="Menu" className="grid size-10 place-items-center rounded-lg border border-[#dce4f0] text-[#1746a2] md:hidden"><Menu size={20} /></button>
        </div>
      </header>

      <section id="inicio" className="relative isolate overflow-hidden bg-[#f5f8ff]">
        <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 hidden w-[48%] bg-[radial-gradient(ellipse_at_70%_40%,rgba(255,204,0,.23),transparent_42%),linear-gradient(135deg,transparent_15%,rgba(0,56,168,.045)_15%,rgba(0,56,168,.045)_16%,transparent_16%)] lg:block" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#1746a2]">Banco do Brasil</p>
            <h1 className="mt-5 max-w-2xl text-[2.65rem] font-black leading-[1.06] tracking-[-.045em] text-[#09275f] sm:text-6xl">Mais perto do que importa para você.</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#526581] sm:text-lg sm:leading-8">Uma experiência digital feita para simplificar escolhas, apoiar seus planos e acompanhar cada novo passo.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#cadastro" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0038a8] px-6 py-3 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(0,56,168,.16)] transition hover:-translate-y-0.5 hover:bg-[#082f82]">Conheça as soluções <ArrowRight size={17} /></a>
              <a href="#solucoes" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#cad6e8] bg-white px-6 py-3 text-sm font-bold text-[#1746a2] transition hover:bg-[#f8faff]">Saiba mais <ArrowUpRight size={16} /></a>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-[#60718d]"><ShieldCheck size={16} className="text-[#2c7b4c]" /> Segurança e confiança em cada etapa.</div>
          </div>
          <div aria-label="Destaque Banco do Brasil" className="relative mx-auto w-full max-w-[490px]">
            <div aria-hidden="true" className="absolute -right-4 -top-4 size-24 rounded-full bg-[#ffcc00] sm:-right-6 sm:-top-6 sm:size-32" />
            <div aria-hidden="true" className="absolute -bottom-5 -left-4 size-24 rounded-full bg-[#dce9ff] sm:-bottom-7 sm:-left-7 sm:size-32" />
            <div className="relative rounded-[1.75rem] border border-[#e3e9f2] bg-white p-5 shadow-[0_25px_75px_rgba(9,39,95,.12)] sm:p-7">
              <div className="flex items-center justify-between border-b border-[#edf0f5] pb-5"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-[#ffcc00] text-[19px] font-black tracking-[-.13em] text-[#0038a8]">BB</span><div><p className="text-sm font-extrabold text-[#09275f]">Sua vida, seus planos</p><p className="mt-0.5 text-xs text-[#75849b]">Uma experiência mais simples</p></div></div><span className="rounded-full bg-[#edf5ef] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.07em] text-[#267344]">Sempre com você</span></div>
              <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#073da8] via-[#0751bd] to-[#2674d8] p-6 text-white sm:p-7"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold text-blue-100">Um passo de cada vez</p><p className="mt-2 text-2xl font-black tracking-tight">Seus planos<br />em movimento.</p></div><Landmark className="text-[#ffdc45]" size={27} /></div><div aria-hidden="true" className="mt-7 flex h-2 gap-1.5"><span className="w-1/3 rounded-full bg-[#ffcc00]" /><span className="w-1/4 rounded-full bg-white/55" /><span className="w-1/5 rounded-full bg-white/30" /></div></div>
              <div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-xl border border-[#e8edf4] p-4"><span className="grid size-9 place-items-center rounded-lg bg-[#eaf1ff] text-[#1746a2]"><Smartphone size={18} /></span><p className="mt-3 text-xs font-extrabold text-[#1c3155]">Do seu jeito</p><p className="mt-1 text-[11px] leading-4 text-[#7a89a1]">Praticidade para o dia a dia</p></div><div className="rounded-xl border border-[#e8edf4] p-4"><span className="grid size-9 place-items-center rounded-lg bg-[#fff5ce] text-[#806200]"><ShieldCheck size={18} /></span><p className="mt-3 text-xs font-extrabold text-[#1c3155]">Com confiança</p><p className="mt-1 text-[11px] leading-4 text-[#7a89a1]">Cuidado em cada detalhe</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="solucoes" className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
        <div className="max-w-2xl"><p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#1746a2]">Soluções</p><h2 className="mt-3 text-3xl font-black tracking-[-.035em] text-[#09275f] sm:text-4xl">Tudo para seguir em frente.</h2><p className="mt-4 text-sm leading-6 text-[#61728d] sm:text-base">Possibilidades para apoiar seus objetivos pessoais e profissionais.</p></div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{solutions.map(({ icon: Icon, title, description, color }) => <article key={title} className="group rounded-2xl border border-[#e1e8f1] bg-white p-5 transition hover:-translate-y-1 hover:border-[#c6d5ec] hover:shadow-[0_18px_40px_rgba(9,39,95,.08)] sm:p-6"><span className={`grid size-11 place-items-center rounded-xl ${color}`}><Icon size={21} /></span><h3 className="mt-5 text-base font-extrabold text-[#142d55]">{title}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-[#677893]">{description}</p><a href="#cadastro" aria-label={`Saiba mais sobre ${title}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#1746a2]">Saiba mais <ArrowRight size={15} /></a></article>)}</div>
      </section>

      <section id="empresas" className="bg-[#092f7f] text-white"><div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-14 lg:px-8"><div className="max-w-2xl"><p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#ffdc45]">Para sua empresa</p><h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">Seu negócio merece ir mais longe.</h2><p className="mt-3 text-sm leading-6 text-blue-100/80">Conheça possibilidades para apoiar a gestão e os próximos passos da sua empresa.</p></div><a href="#cadastro" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#ffcc00] px-5 py-3 text-sm font-extrabold text-[#09275f] transition hover:bg-[#ffdc37]">Conheça a OptaApp <ArrowRight size={16} /></a></div></section>

      <section id="cadastro" className="scroll-mt-8 border-y border-[#e0e7f0] bg-[#f7f9fc] px-5 py-16 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8"><p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#1746a2]">OptaApp</p><h2 className="mt-2 text-3xl font-black tracking-tight text-[#09275f] sm:text-4xl">Dados cadastrais</h2><p className="mt-3 text-sm leading-6 text-[#61728d]">Informe seus dados para continuar.</p></div>
          <div className="space-y-5 rounded-3xl border border-[#e0e7f0] bg-white p-5 shadow-[0_18px_55px_rgba(9,39,95,.07)] sm:p-8">
            <div><label htmlFor="full-name" className="mb-2 block text-sm font-bold text-[#263c5f]">Nome completo</label><input id="full-name" name="fullName" type="text" autoComplete="off" placeholder="Digite seu nome completo" className="h-12 w-full rounded-lg border border-[#cdd7e5] bg-white px-4 text-sm text-[#172b4d] outline-none transition placeholder:text-[#93a0b3] focus:border-[#1746a2] focus:ring-4 focus:ring-[#1746a2]/10" /></div>
            <div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="cpf" className="mb-2 block text-sm font-bold text-[#263c5f]">CPF</label><input id="cpf" name="cpf" type="text" inputMode="numeric" autoComplete="off" placeholder="000.000.000-00" maxLength={14} className="h-12 w-full rounded-lg border border-[#cdd7e5] bg-white px-4 text-sm text-[#172b4d] outline-none transition placeholder:text-[#93a0b3] focus:border-[#1746a2] focus:ring-4 focus:ring-[#1746a2]/10" /></div><div><label htmlFor="birth-date" className="mb-2 block text-sm font-bold text-[#263c5f]">Data de nascimento</label><input id="birth-date" name="birthDate" type="date" autoComplete="off" className="h-12 w-full rounded-lg border border-[#cdd7e5] bg-white px-4 text-sm text-[#172b4d] outline-none transition focus:border-[#1746a2] focus:ring-4 focus:ring-[#1746a2]/10" /></div></div>
            <div><label htmlFor="rg-photo" className="mb-2 block text-sm font-bold text-[#263c5f]">Foto do RG</label><input id="rg-photo" name="rgPhoto" type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" className="block w-full rounded-lg border border-[#cdd7e5] bg-white text-sm text-[#526581] file:mr-4 file:border-0 file:bg-[#eaf1ff] file:px-4 file:py-3 file:text-sm file:font-bold file:text-[#1746a2] hover:file:bg-[#dce9ff]" /><p className="mt-2 text-xs text-[#77869c]">JPG, PNG ou WEBP</p></div>
          </div>
        </div>
      </section>

      <section id="sobre" className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div className="flex flex-col gap-4 border-l-4 border-[#ffcc00] pl-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-extrabold text-[#09275f]">Banco do Brasil</h2><p className="mt-1 text-sm text-[#61728d]">Uma experiência pensada para estar ao seu lado.</p></div><a href="#inicio" className="inline-flex items-center gap-2 text-sm font-bold text-[#1746a2]">Voltar ao início <ArrowUpRight size={15} /></a></div></section>
      <footer className="border-t border-[#e0e7f0] bg-[#f7f9fc]"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs leading-5 text-[#6d7b91] sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>© 2026 BB</span><span>Página independente; não representa um canal oficial do Banco do Brasil.</span></div></footer>
    </main>
  );
}
