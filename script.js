const body=document.body;
const topbar=document.querySelector('.topbar');
const themeBtn=document.getElementById('themeBtn');
const shareBtn=document.getElementById('shareBtn');
const toast=document.getElementById('toast');

function showToast(message){
  toast.textContent=message; toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),2200);
}
window.addEventListener('scroll',()=>topbar.classList.toggle('scrolled',window.scrollY>20),{passive:true});

const savedTheme=localStorage.getItem('makhlouf-theme');
if(savedTheme==='dark') body.classList.add('dark');
themeBtn?.addEventListener('click',()=>{
  body.classList.toggle('dark');
  localStorage.setItem('makhlouf-theme',body.classList.contains('dark')?'dark':'light');
});

shareBtn?.addEventListener('click',async()=>{
  const data={title:'Makhlouf Pharmacy',text:'Makhlouf Pharmacy — Health, Beauty & Care',url:location.href};
  try{
    if(navigator.share){await navigator.share(data);}
    else{await navigator.clipboard.writeText(location.href);showToast('Link copied');}
  }catch(e){}
});

document.querySelectorAll('.payment-option[data-copy]').forEach(btn=>{
  btn.addEventListener('click',async()=>{
    const value=btn.dataset.copy;
    if(!value){showToast(`${btn.dataset.label}: details will be added soon`);return;}
    try{await navigator.clipboard.writeText(value);showToast('Payment details copied');}
    catch(e){showToast(value);}
  });
});

document.getElementById('year').textContent=new Date().getFullYear();

// Optional PWA install prompt
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault(); deferredPrompt=e;
  const install=document.createElement('button');
  install.className='install-fab';
  install.textContent='Add to Home Screen';
  install.onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;} install.remove();};
  document.body.appendChild(install);
});

if ("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
