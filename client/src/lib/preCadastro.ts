export function onlyDigits(value: string) {
  return value.replace(/\D/g, "").slice(0, 14);
}

export function isValidDocument(value: string) {
  return onlyDigits(value).length === 11 || onlyDigits(value).length === 14;
}

export function canSubmitPreCadastro({ name, cpf, email, phone, city, consent }: { name: string; cpf: string; email: string; phone: string; city: string; consent: boolean }) {
  const hasName = name.trim().split(/\s+/).filter(Boolean).length >= 2;
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const hasPhone = onlyDigits(phone).length >= 10;
  const hasCity = city.trim().length >= 3;
  return hasName && isValidDocument(cpf) && hasEmail && hasPhone && hasCity && consent;
}

export function getPostSubmitState(canSubmit: boolean) {
  return canSubmit ? "confirmation" : "form";
}
