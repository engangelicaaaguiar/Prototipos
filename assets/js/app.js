// ✅ Máscara CPF
export function maskCPF(v) {
  v = v.replace(/\D/g, "");
  v = v.slice(0, 11);
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return v;
}

// ✅ Validação CPF real
export function cpfIsValid(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false; // repetidos

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let d1 = (soma * 10) % 11;
  if (d1 >= 10) d1 = 0;
  if (d1 != cpf[9]) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  let d2 = (soma * 10) % 11;
  if (d2 >= 10) d2 = 0;
  return d2 == cpf[10];
}

// ✅ Máscara Data DD/MM/AAAA
export function maskDate(v) {
  v = v.replace(/\D/g,"").slice(0,8);
  if (v.length >= 5) return v.replace(/(\d{2})(\d{2})(\d)/, "$1/$2/$3");
  if (v.length >= 3) return v.replace(/(\d{2})(\d)/, "$1/$2");
  return v;
}

// ✅ Validação Data (mín. Ano 1900)
export function dateIsValid(v) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(v)) return false;
  const [d,m,y] = v.split("/").map(Number);
  if (y < 1900 || m < 1 || m > 12 || d < 1 || d > 31) return false;
  return true;
}

// ✅ Máscara Telefone
export function maskPhone(v) {
  v = v.replace(/\D/g, "").slice(0,11);
  return v
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})$/, "$1-$2");
}

// ✅ Validação Telefone
export function phoneIsValid(v) {
  return /^\(\d{2}\) \d{5}-\d{4}$/.test(v);
}

// ✅ Modal LGPD da tela 1
export function bindLgpdModal() {
  const open = document.getElementById("open-lgpd");
  const open2 = document.getElementById("open-lgpd2");
  const bg = document.getElementById("lgpd-bg");
  const close = document.getElementById("lgpd-close");

  if (!bg) return;

  const show = () => bg.classList.add("show");
  const hide = () => bg.classList.remove("show");

  open?.addEventListener("click", show);
  open2?.addEventListener("click", show);
  close?.addEventListener("click", hide);
}

