const buybackPhotoAngles = [
 ['ecran','Écran'],['droite','Côté droit'],['gauche','Côté gauche'],
 ['haut','Haut'],['bas','Bas'],['arriere','Arrière']
];
const buybackMaxPhotoSize=10*1024*1024;
const buybackMaxTotalSize=15*1024*1024;
const buybackRecipient = 'alexisreparation@gmail.com';
function getBuybackSelection(params){
 const family=params.get('famille'),model=params.get('modele'),state=params.get('etat');
 if(!(tradeFamilies[family]||[]).includes(model))return null;
 const price=calculateTradeIn(family,state);
 if(price===null)return null;
 return {family,model,state:Number(state),condition:tradeStates[Number(state)],price};
}
function validateBuybackPhoto(file){
 if(!file||file.size===0)return 'Ajoutez une photo pour chaque face.';
 const types=['image/jpeg','image/png','image/webp','image/heic','image/heif'];
 if((file.type&&!types.includes(file.type))||(!file.type&&!/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)))return 'Choisissez une photo JPG, PNG, WebP ou HEIC.';
 if(file.size>buybackMaxPhotoSize)return 'Cette photo dépasse 10 Mo. Choisissez une version plus légère.';
 return '';
}
function buildBuybackSubject(details, selection) {
 const fullName = `${details.prenom} ${details.nom}`.replace(/[\r\n]+/g, ' ').trim();
 return `Reprise — ${selection.model} — ${fullName}`;
}
function buildBuybackBody(details,selection,photosAttached){
 return [
 'DEMANDE DE REPRISE IPHONE','',
 'Nom : '+details.nom,'Prénom : '+details.prenom,
 'Téléphone : '+details.telephone,'E-mail : '+details.email,'',
 'Famille : iPhone '+selection.family,'Modèle : '+selection.model,
 'État général : '+selection.condition,
 'Santé de la batterie : '+details.batterie,
 'Stockage : '+details.stockage,'Déjà réparé : '+details.repare,
 ...(details.repare==='Oui'?['Réparations précédentes : '+(details.reparations||'Non précisées')]:[]),
 '','Estimation de reprise : '+selection.price+' €',
 'Montant indicatif à confirmer après vérification.',
 '',(photosAttached?'Photos jointes':'Photos à joindre')+' : écran, côté droit, côté gauche, haut, bas et arrière.',''
 ].join('\r\n');
}
function makeBuybackMailto(details, selection) {
 const subject = encodeURIComponent(buildBuybackSubject(details, selection));
 const body = encodeURIComponent(buildBuybackBody(details, selection, false));
 return `mailto:${buybackRecipient}?subject=${subject}&body=${body}`;
}
function buybackBase64(bytes){
 let binary='';
 for(let i=0;i<bytes.length;i+=32768)binary+=String.fromCharCode(...bytes.subarray(i,i+32768));
 return btoa(binary);
}
function foldBuybackBase64(value){return (value.match(/.{1,76}/g)||[]).join('\r\n');}
function encodeBuybackHeader(value){
 const parts=[];let chunk='';const encoder=new TextEncoder();
 for(const letter of value){
  if(chunk&&encoder.encode(chunk+letter).length>42){parts.push(chunk);chunk='';}
  chunk+=letter;
 }
 if(chunk)parts.push(chunk);
 return parts.map(part=>'=?UTF-8?B?'+buybackBase64(encoder.encode(part))+'?=').join('\r\n ');
}
async function makeBuybackEmail(details,selection,photos){
 const boundary='AlexisReprise_'+crypto.randomUUID().replaceAll('-','');
 const encoded=value=>buybackBase64(new TextEncoder().encode(value));
 const subject = buildBuybackSubject(details, selection);
 const replyTo=details.email.replace(/[\r\n]/g,'');
 const lines=[
 'To: '+buybackRecipient,'Reply-To: '+replyTo,
 'Subject: '+encodeBuybackHeader(subject),'X-Unsent: 1','MIME-Version: 1.0',
 'Content-Type: multipart/mixed; boundary="'+boundary+'"','',
 '--'+boundary,'Content-Type: text/plain; charset=UTF-8','Content-Transfer-Encoding: base64','',
 foldBuybackBase64(encoded(buildBuybackBody(details,selection,true)))
 ];
 for(const photo of photos){
  const bytes=new Uint8Array(await photo.file.arrayBuffer());
  const mime=photo.file.type||({'jpg':'image/jpeg','jpeg':'image/jpeg','png':'image/png','webp':'image/webp','heic':'image/heic','heif':'image/heif'}[photo.file.name.split('.').pop().toLowerCase()]);
  const ext={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/heic':'heic','image/heif':'heif'}[mime];
  const filename=photo.key+'.'+ext;
  lines.push('--'+boundary,'Content-Type: '+mime+'; name="'+filename+'"',
   'Content-Disposition: attachment; filename="'+filename+'"','Content-Transfer-Encoding: base64','',
   foldBuybackBase64(buybackBase64(bytes)));
 }
 lines.push('--'+boundary+'--','');
 return lines.join('\r\n');
}
function initBuybackForm(){
 const form=document.getElementById('tradeSubmission');
 const selection=getBuybackSelection(new URLSearchParams(window.location.search));
 if(!selection){document.getElementById('buybackSelectionError').hidden=false;return;}
 form.hidden=false;
 document.getElementById('buybackSelection').textContent=selection.model+' · '+selection.condition;
 const offer=document.getElementById('buybackOffer'),error=document.getElementById('buybackError');
 const status=document.getElementById('buybackDownloadStatus'),download=document.getElementById('downloadBuybackEmail');
 const openEmail = document.getElementById('openBuybackEmail');
 const battery=document.getElementById('buybackBattery'),unavailable=document.getElementById('batteryUnavailable');
 const repaired=document.getElementById('buybackRepaired');
 const previewUrls=new Map();
 function hideOffer(){offer.hidden=true;status.textContent='';openEmail.removeAttribute('href');}
 function displayError(message){error.textContent=message;error.hidden=!message;}
 function getPhotos(){
  return buybackPhotoAngles.map(([key,label])=>({key,label,file:document.getElementById('photo-'+key).files[0]}));
 }
 function checkPhotos(photos){
  for(const photo of photos){const message=validateBuybackPhoto(photo.file);if(message)return photo.label+' : '+message;}
  if(photos.reduce((sum,photo)=>sum+photo.file.size,0)>buybackMaxTotalSize)return 'Les six photos dépassent 15 Mo au total. Choisissez des versions plus légères.';
  return '';
 }
 function getDetails(){
  const values=new FormData(form),value=key=>String(values.get(key)||'').trim();
  return {nom:value('nom'),prenom:value('prenom'),telephone:value('telephone'),email:value('email'),
   batterie:unavailable.checked?'Impossible à consulter':value('batterie')+' %',
   stockage:value('stockage'),repare:value('deja-repare'),reparations:value('reparations-precedentes')};
 }
 unavailable.addEventListener('change',()=>{
  battery.disabled=unavailable.checked;battery.required=!unavailable.checked;
  if(unavailable.checked)battery.value='';
 });
 repaired.addEventListener('change',()=>{
  document.getElementById('previousRepairField').hidden=repaired.value!=='Oui';
 });
 for(const [key] of buybackPhotoAngles){
  const input=document.getElementById('photo-'+key),image=document.getElementById('preview-'+key),placeholder=document.getElementById('placeholder-'+key);
  input.addEventListener('change',()=>{
   const file=input.files[0],message=validateBuybackPhoto(file);
   input.setCustomValidity(message);
   if(previewUrls.has(key)){URL.revokeObjectURL(previewUrls.get(key));previewUrls.delete(key);}
   image.hidden=true;image.removeAttribute('src');placeholder.hidden=false;
   document.getElementById('photo-name-'+key).textContent=file?file.name:'Aucune photo sélectionnée';
   if(file&&!message){
    const url=URL.createObjectURL(file);previewUrls.set(key,url);
    image.onload=()=>{image.hidden=false;placeholder.hidden=true;};
    image.onerror=()=>{image.hidden=true;placeholder.hidden=false;};
    image.src=url;
   }
   displayError(message?buybackPhotoAngles.find(p=>p[0]===key)[1]+' : '+message:'');
  });
 }
 form.addEventListener('input',hideOffer);
 form.addEventListener('change',hideOffer);
 form.addEventListener('submit',event=>{
  event.preventDefault();hideOffer();displayError('');
  if(!form.reportValidity())return;
  const photos=getPhotos(),message=checkPhotos(photos);
  if(message){displayError(message);return;}
  const details=getDetails();
  if(!details.nom||!details.prenom||!details.telephone||!details.email){displayError('Complétez vos coordonnées.');return;}
  document.getElementById('buybackAmount').textContent=new Intl.NumberFormat('fr-BE',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(selection.price);
  document.getElementById('buybackOfferSummary').textContent=selection.model+' · '+selection.condition+' · '+details.stockage;
  openEmail.href = makeBuybackMailto(details, selection);
  offer.hidden=false;
  document.getElementById('offerHeading').focus();
  offer.scrollIntoView({behavior:'smooth',block:'start'});
 });
 download.addEventListener('click',async()=>{
  if(!form.reportValidity()){hideOffer();return;}
  const photos=getPhotos(),message=checkPhotos(photos);
  if(message){displayError(message);hideOffer();return;}
  download.disabled=true;status.textContent='Préparation de votre e-mail et des six photos…';
  try{
   const email=await makeBuybackEmail(getDetails(),selection,photos);
   const url=URL.createObjectURL(new Blob([email],{type:'message/rfc822'}));
   const link=document.createElement('a');link.href=url;link.download='demande-reprise-'+selection.model.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'.eml';
   document.body.appendChild(link);link.click();link.remove();
   setTimeout(()=>URL.revokeObjectURL(url),60000);
   status.textContent='Votre demande complète a été téléchargée. Ouvrez le fichier .eml dans votre application e-mail pour l’envoyer. Elle n’a pas encore été envoyée.';
  }catch{status.textContent='La préparation a échoué. Réessayez avec des photos plus légères ou contactez alexisreparation@gmail.com.';}
  finally{download.disabled=false;}
 });
 window.addEventListener('pagehide',()=>previewUrls.forEach(url=>URL.revokeObjectURL(url)));
}
if(document.getElementById('tradeSubmission'))initBuybackForm();
