const topbar=document.querySelector('.topbar');
const toast=document.getElementById('toast');
window.addEventListener('scroll',()=>topbar?.classList.toggle('scrolled',window.scrollY>18),{passive:true});
document.getElementById('shareBtn')?.addEventListener('click',async()=>{try{if(navigator.share){await navigator.share({title:'Makhlouf Pharmacy',text:'صيدلية د. أحمد عمر مخلوف',url:location.href})}else{await navigator.clipboard.writeText(location.href);showToast('تم نسخ رابط الصفحة')}}catch(e){}});
function showToast(t){if(!toast)return;toast.textContent=t;toast.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove('show'),2200)}
document.getElementById('year').textContent=new Date().getFullYear();
if('loading' in HTMLImageElement.prototype){document.querySelectorAll('img[loading="lazy"]').forEach(i=>i.loading='lazy')}
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));

const themeBtn=document.getElementById('themeBtn');
function setTheme(dark){document.documentElement.classList.toggle('dark',dark);if(themeBtn){themeBtn.textContent=dark?'☀':'☾';themeBtn.setAttribute('aria-label',dark?'الوضع النهاري':'الوضع الليلي')}}
const savedTheme=localStorage.getItem('makhlouf-theme');
setTheme(savedTheme==='dark');
themeBtn?.addEventListener('click',()=>{const dark=!document.documentElement.classList.contains('dark');setTheme(dark);localStorage.setItem('makhlouf-theme',dark?'dark':'light')});
