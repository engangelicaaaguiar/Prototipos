/* -------- util -------- */
const $ = (q,scope=document)=>scope.querySelector(q);
const $$ = (q,scope=document)=>Array.from(scope.querySelectorAll(q));
const track=(event,props={})=>{ try{ console.log('[analytics]', event, props);}catch(e){} };

/* -------- máscaras -------- */
export function maskCPF(v){
  return v.replace(/\D/g,'')
          .replace(/(\d{3})(\d)/,'$1.$2')
          .replace(/(\d{3})(\d)/,'$1.$2')
          .replace(/(\d{3})(\d{1,2})$/,'$1-$2');
}
export function maskDate(v){
  return v.replace(/\D/g,'').replace(/(\d{2})(\d)/,'$1/$2').replace(/(\d{2})(\d)/,'$1/$2').slice(0,10);
}
export function maskPhone(v){
  return v.replace(/\D/g,'')
          .replace(/^(\d{2})(\d)/,'($1) $2')
          .replace(/(\d{5})(\d)/,'$1-$2')
          .slice(0, 15);
}

/* -------- cpf simples (checksum opcional) -------- */
export function cpfIsValid(masked){
  const c = masked.replace(/\D/g,'');
  if(c.length!==11) return false;
  // opcional: validação checksum simplificada
  return true;
}

/* -------- LGPD Modal -------- */
export function bindLgpdModal(){
  const open = $('#open-lgpd'); const bg = $('#lgpd-bg'); const close = $('#lgpd-close');
  if(!open || !bg) return;
  open.addEventListener('click', e=>{ e.preventDefault(); bg.classList.add('show'); track('onboarding_privacy_modal_open'); });
  close.addEventListener('click', ()=> bg.classList.remove('show'));
  bg.addEventListener('click', (e)=>{ if(e.target===bg) bg.classList.remove('show'); });
}

/* -------- OTP helpers -------- */
export function bindOTP(){
  const inputs = $$('.otp input');
  if(inputs.length===0) return;
  inputs.forEach((i,idx)=>{
    i.addEventListener('input',()=>{
      i.value=i.value.replace(/\D/g,'').slice(0,1);
      if(i.value && inputs[idx+1]) inputs[idx+1].focus();
      const code = inputs.map(x=>x.value).join('');
      $('#btn-otp')?.toggleAttribute('disabled', code.length!==4);
    });
    i.addEventListener('keydown',(e)=>{
      if(e.key==='Backspace' && !i.value && inputs[idx-1]) inputs[idx-1].focus();
    });
  });

  // timer
  const resend = $('#resend');
  if(resend){
    let s=59; resend.textContent=`Reenviar código em 0:${String(s).padStart(2,'0')}`;
    const t = setInterval(()=>{
      s--; resend.textContent=`Reenviar código em 0:${String(s).padStart(2,'0')}`;
      if(s<=0){ clearInterval(t); resend.innerHTML='<a id="resendNow" href="#">Reenviar agora</a>'; }
    },1000);
  }
}

/* -------- senha -------- */
export function bindPassword(){
  const pwd = $('#pwd'), conf = $('#pwd2'), meter = $('#meter-fill');
  if(!pwd) return;
  function strength(v){
    let score=0;
    if(v.length>=8) score++;
    if(/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
    if(/\d/.test(v)) score++;
    if(/[^\w\s]/.test(v)) score++;
    return score; // 0..4
  }
  function render(){
    const v = pwd.value;
    const s = strength(v);
    meter.style.width = `${(s/4)*100}%`;
    $('#req-8').className = v.length>=8?'ok':'no';
    $('#req-case').className = (/[A-Z]/.test(v)&&/[a-z]/.test(v))?'ok':'no';
    $('#req-num').className = /\d/.test(v)?'ok':'no';
    $('#req-spec').className = /[^\w\s]/.test(v)?'ok':'no';

    const equal = v===conf.value && v.length>0;
    $('#pwd-mismatch')?.classList.toggle('show', !equal && conf.value.length>0);
    $('#btn-finish')?.toggleAttribute('disabled', !(s>=2 && equal));
  }
  pwd.addEventListener('input', render);
  $('#toggle-eye')?.addEventListener('click', ()=>{ pwd.type = pwd.type==='password'?'text':'password'; });
  conf?.addEventListener('input', render);
}
