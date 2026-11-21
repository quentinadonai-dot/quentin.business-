"use strict";
const navigation=document.querySelector('#navigation'), opener=document.querySelector('#menu-open');
const resetMenu=()=>{opener.setAttribute('aria-expanded','false');document.body.style.overflow=''};
opener.addEventListener('click',()=>{navigation.showModal();opener.setAttribute('aria-expanded','true');document.body.style.overflow='hidden'});
document.querySelector('#menu-close').addEventListener('click',()=>navigation.close());navigation.addEventListener('close',resetMenu);
navigation.addEventListener('click',e=>{if(e.target===navigation){const r=navigation.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)navigation.close()}});
document.querySelectorAll('.year').forEach(e=>e.textContent=new Date().getFullYear());
document.querySelectorAll('.photo img').forEach(img=>{const fallback=()=>{img.closest('figure').classList.add('failed');img.alt='Illustration temporairement indisponible';};img.addEventListener('error',fallback);if(img.complete&&img.naturalWidth===0)fallback()});
const form=document.querySelector('#contact-form');
if(form){const option=new URLSearchParams(location.search).get('offre');if(option&&[...form.elements.offre.options].some(o=>o.value===option))form.elements.offre.value=option;
let text='';form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);text='Bonjour Adonaï Agency,\n\n'+[['Demande','type'],['Nom','nom'],['Entreprise','entreprise'],['Téléphone','telephone'],['E-mail','email'],['Offre ou service','offre'],['Message','message'],['Délai souhaité','delai']].map(([label,key])=>label+' : '+(String(data.get(key)||'').trim()||'Non précisé')).join('\n');const url='https://wa.me/22953538609?text='+encodeURIComponent(text);document.querySelector('#prepared').value=text;const retry=document.querySelector('#retry');retry.href=url;retry.target='_blank';retry.rel='noopener noreferrer';document.querySelector('#result').hidden=false;window.open(url,'_blank','noopener,noreferrer')});
document.querySelector('#copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(text);document.querySelector('#copy-status').textContent='Message copié.'}catch{document.querySelector('#prepared').select();document.querySelector('#copy-status').textContent='Le texte est sélectionné : utilisez la commande Copier de votre appareil.'}})}
