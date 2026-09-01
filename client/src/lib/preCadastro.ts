export function onlyDigits(value: string) {
  return value.replace(/\D/g, "").slice(0, 11);
}

export function formatCpf(value: string) {
  const digits = onlyDigits(value);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function isValidCpf(value: string) {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i += 1) sum += Number(cpf[i]) * (10 - i);
  let digit = (sum * 10) % 11;
  if (digit === 10) digit = 0;
  if (digit !== Number(cpf[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i += 1) sum += Number(cpf[i]) * (11 - i);
  digit = (sum * 10) % 11;
  if (digit === 10) digit = 0;
  return digit === Number(cpf[10]);
}

export function canSubmitPreCadastro({ name, cpf, fileName, consent }: { name: string; cpf: string; fileName: string; consent: boolean }) {
  const hasFullName = name.trim().split(/\s+/).filter(Boolean).length >= 2;
  return hasFullName && isValidCpf(cpf) && Boolean(fileName) && consent;
}

export function getPostSubmitState(canSubmit: boolean) {
  return canSubmit ? "confirmation" : "form";
}
