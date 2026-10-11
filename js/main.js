(()=>{'use strict';
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header=document.getElementById('siteHeader'),progress=document.getElementById('scrollProgress');
let scheduled=false;
function onScroll(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{const y=window.scrollY;header.classList.toggle('is-scrolled',y>40);const range=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(range>0?100*y/range:0)+'%';scheduled=false;});}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
if(!reduce && 'IntersectionObserver' in window){document.documentElement.classList.add('motion-enabled');let io=new IntersectionObserver((entries,observer)=>{for(const ent of entries){if(ent.isIntersecting){ent.target.classList.add('in-view');observer.unobserve(ent.target);}}},{threshold:.08,rootMargin:'0px 0px 35px 0px'});document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=((i%4)*55)+'ms';io.observe(el);});}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in-view'));}
const menu=document.getElementById('menuToggle'),nav=document.getElementById('mobileNavigation');
const closeMenu=()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');nav.classList.remove('open');nav.inert=true;document.body.classList.remove('menu-open');};
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open);nav.inert=!open;document.body.classList.toggle('menu-open',open);});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
window.addEventListener('resize',()=>{if(window.innerWidth>1000)closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeLightbox();}});
const lightbox=document.getElementById('lightbox'),lightboxImg=document.getElementById('lightboxImg'),lightboxClose=document.getElementById('closeLightbox');let lastFocus=null;
const closeLightbox=()=>{if(lightbox.hidden)return;lightbox.hidden=true;lightboxImg.removeAttribute('src');document.body.classList.remove('menu-open');lastFocus?.focus();};
document.querySelectorAll('[data-photo]').forEach(btn=>btn.addEventListener('click',()=>{lastFocus=btn;lightboxImg.src=btn.dataset.photo;lightbox.hidden=false;document.body.classList.add('menu-open');lightboxClose.focus();}));
lightboxClose.addEventListener('click',closeLightbox);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
const form=document.getElementById('contactForm');form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const msg=`Hello Spanish Eye Clinic, I would like to enquire.\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nMessage: ${data.get('message')||'Appointment enquiry'}`;window.open('https://wa.me/971556003660?text='+encodeURIComponent(msg),'_blank','noopener,noreferrer');});
})();
