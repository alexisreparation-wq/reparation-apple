const repairPrices = {iphone:[['Écran','à partir de 30 €'],['Batterie','à partir de 30 €'],['Dos en verre','à partir de 45 €'],['Connecteur de charge','à partir de 60 €'],['Appareil photo','à partir de 25 €'],['Haut-parleur','à partir de 25 €'],['Carte mère','sur devis'],['Châssis complet','sur devis']],ipad:[['Vitre tactile','à partir de 35 €'],['Écran complet','à partir de 65 €'],['Batterie','à partir de 55 €'],['Connecteur de charge','à partir de 45 €']],macbook:[['Toutes réparations','sur devis'],['Écran','sur devis'],['Batterie','sur devis'],['Clavier / trackpad','sur devis'],['Carte mère','sur devis']]};

// Prix fournis par le propriétaire dans CasePhone_prix_reparation_iPhone.pdf (13 novembre 2026).
const iphonePricesByModel = {
  "iPhone X": {
    "Écran compatible": 45,
    "Batterie": 35,
    "Dos en verre": 50,
    "Boutons power / latéraux": 50,
    "Connecteur de charge": 50,
    "Écouteur interne": 30,
    "Caméra avant": 60,
    "Caméra arrière": 60,
    "Vibreur": 40
  },
  "iPhone XS": {
    "Écran compatible": 55,
    "Batterie": 35,
    "Dos en verre": 70,
    "Boutons power / latéraux": 50,
    "Connecteur de charge": 50,
    "Écouteur interne": 40,
    "Caméra avant": 60,
    "Caméra arrière": 60,
    "Vibreur": 50
  },
  "iPhone XS Max": {
    "Écran compatible": 60,
    "Batterie": 35,
    "Dos en verre": 80,
    "Boutons power / latéraux": 50,
    "Connecteur de charge": 60,
    "Écouteur interne": 40,
    "Caméra avant": 60,
    "Caméra arrière": 70,
    "Vibreur": 50
  },
  "iPhone XR": {
    "Écran compatible": 60,
    "Batterie": 35,
    "Dos en verre": 50,
    "Boutons power / latéraux": 50,
    "Connecteur de charge": 60,
    "Écouteur interne": 30,
    "Caméra avant": 60,
    "Caméra arrière": 60,
    "Vibreur": 40
  },
  "iPhone 11": {
    "Écran compatible": 70,
    "Batterie": 35,
    "Dos en verre": 70,
    "Boutons power / latéraux": 60,
    "Connecteur de charge": 60,
    "Écouteur interne": 40,
    "Caméra avant": 60,
    "Caméra arrière": 60,
    "Vibreur": 50
  },
  "iPhone 11 Pro": {
    "Écran compatible": 70,
    "Batterie": 35,
    "Dos en verre": 80,
    "Boutons power / latéraux": 60,
    "Connecteur de charge": 60,
    "Écouteur interne": 40,
    "Caméra avant": 60,
    "Caméra arrière": 70,
    "Vibreur": 50
  },
  "iPhone 11 Pro Max": {
    "Écran compatible": 70,
    "Batterie": 35,
    "Dos en verre": 80,
    "Boutons power / latéraux": 80,
    "Connecteur de charge": 60,
    "Écouteur interne": 40,
    "Caméra avant": 60,
    "Caméra arrière": 70,
    "Vibreur": 50
  },
  "iPhone 12 mini": {
    "Écran": 90,
    "Batterie": 35,
    "Dos en verre": 70,
    "Boutons power / latéraux": 60,
    "Connecteur de charge": 60,
    "Écouteur interne": 30,
    "Caméra avant": 60,
    "Caméra arrière": 60,
    "Vibreur": 50
  },
  "iPhone 12": {
    "Écran": 100,
    "Batterie": 35,
    "Dos en verre": 80,
    "Boutons power / latéraux": 60,
    "Connecteur de charge": 60,
    "Écouteur interne": 40,
    "Caméra avant": 60,
    "Caméra arrière": 60,
    "Vibreur": 50
  },
  "iPhone 12 Pro": {
    "Écran": 100,
    "Batterie": 35,
    "Dos en verre": 80,
    "Boutons power / latéraux": 60,
    "Connecteur de charge": 60,
    "Écouteur interne": 40,
    "Caméra avant": 60,
    "Caméra arrière": 80,
    "Vibreur": 50
  },
  "iPhone 12 Pro Max": {
    "Écran": 100,
    "Batterie": 35,
    "Dos en verre": 80,
    "Boutons power / latéraux": 60,
    "Connecteur de charge": 60,
    "Écouteur interne": 40,
    "Caméra avant": 60,
    "Caméra arrière": 80,
    "Vibreur": 50
  },
  "iPhone 13 mini": {
    "Écran": 110,
    "Batterie": 35,
    "Dos en verre": 80,
    "Boutons power / latéraux": 60,
    "Connecteur de charge": 60,
    "Grille écouteur interne": 110,
    "Écouteur interne": 30,
    "Caméra avant": 60,
    "Caméra arrière": 70,
    "Vibreur": 50
  },
  "iPhone 13": {
    "Écran": 110,
    "Batterie": 35,
    "Dos en verre": 80,
    "Boutons power / latéraux": 60,
    "Connecteur de charge": 60,
    "Grille écouteur interne": 120,
    "Écouteur interne": 40,
    "Caméra avant": 60,
    "Caméra arrière": 70,
    "Vibreur": 50
  },
  "iPhone 13 Pro": {
    "Écran": 110,
    "Batterie": 45,
    "Dos en verre": 100,
    "Boutons power / latéraux": 80,
    "Connecteur de charge": 80,
    "Grille écouteur interne": 140,
    "Écouteur interne": 40,
    "Caméra avant": 60,
    "Caméra arrière": 120,
    "Vibreur": 50
  },
  "iPhone 13 Pro Max": {
    "Écran": 120,
    "Batterie": 45,
    "Dos en verre": 100,
    "Boutons power / latéraux": 80,
    "Connecteur de charge": 80,
    "Grille écouteur interne": 160,
    "Écouteur interne": 40,
    "Caméra avant": 60,
    "Caméra arrière": 120,
    "Vibreur": 50
  },
  "iPhone 14": {
    "Écran": 110,
    "Batterie": 45,
    "Dos en verre": 80,
    "Boutons power / latéraux": 60,
    "Connecteur de charge": 60,
    "Grille écouteur interne": 120,
    "Écouteur interne": 30,
    "Caméra avant": 60,
    "Caméra arrière": 70,
    "Vibreur": 50
  },
  "iPhone 14 Plus": {
    "Écran": 120,
    "Batterie": 45,
    "Dos en verre": 80,
    "Boutons power / latéraux": 60,
    "Connecteur de charge": 60,
    "Grille écouteur interne": 150,
    "Écouteur interne": 40,
    "Caméra avant": 60,
    "Caméra arrière": 70,
    "Vibreur": 50
  },
  "iPhone 14 Pro": {
    "Écran": 130,
    "Batterie": 45,
    "Dos en verre": 100,
    "Boutons power / latéraux": 80,
    "Connecteur de charge": 80,
    "Grille écouteur interne": 160,
    "Écouteur interne": 40,
    "Caméra avant": 60,
    "Caméra arrière": 120,
    "Vibreur": 50
  },
  "iPhone 14 Pro Max": {
    "Écran": 140,
    "Batterie": 45,
    "Dos en verre": 100,
    "Boutons power / latéraux": 80,
    "Connecteur de charge": 80,
    "Grille écouteur interne": 200,
    "Écouteur interne": 40,
    "Caméra avant": 60,
    "Caméra arrière": 120,
    "Vibreur": 50
  },
  "iPhone 15": {
    "Écran Soft OLED": 110,
    "Écran Hard OLED": 90,
    "Écran Incell": 50,
    "Batterie": 70,
    "Dos en verre": 70,
    "Boutons power / latéraux": 80,
    "Connecteur de charge": 80,
    "Écouteur interne": 30,
    "Caméra avant": 80,
    "Caméra arrière": 80,
    "Vibreur": 50
  },
  "iPhone 15 Plus": {
    "Écran Soft OLED": 120,
    "Écran Hard OLED": 105,
    "Écran Incell": 60,
    "Batterie": 75,
    "Dos en verre": 75,
    "Boutons power / latéraux": 80,
    "Connecteur de charge": 80,
    "Écouteur interne": 30,
    "Caméra avant": 80,
    "Caméra arrière": 80,
    "Vibreur": 50
  },
  "iPhone 15 Pro": {
    "Écran Soft OLED": 140,
    "Écran Hard OLED": 115,
    "Écran Incell": 75,
    "Batterie": 85,
    "Dos en verre": 90,
    "Boutons power / latéraux": 100,
    "Connecteur de charge": 100,
    "Écouteur interne": 40,
    "Caméra avant": 90,
    "Caméra arrière": 150,
    "Vibreur": 50
  },
  "iPhone 15 Pro Max": {
    "Écran Soft OLED": 160,
    "Écran Hard OLED": 130,
    "Écran Incell": 85,
    "Batterie": 90,
    "Dos en verre": 95,
    "Boutons power / latéraux": 100,
    "Connecteur de charge": 100,
    "Écouteur interne": 40,
    "Caméra avant": 90,
    "Caméra arrière": 160,
    "Vibreur": 50
  },
  "iPhone 16": {
    "Écran Soft OLED": 130,
    "Écran Hard OLED": 100,
    "Écran Incell": 50,
    "Batterie": 75,
    "Dos en verre": 90,
    "Boutons power / latéraux": 90,
    "Connecteur de charge": 90,
    "Écouteur interne": 60,
    "Caméra avant": 60,
    "Caméra arrière": 90,
    "Vibreur": 50
  },
  "iPhone 16 Plus": {
    "Écran Soft OLED": 140,
    "Écran Hard OLED": 110,
    "Écran Incell": 60,
    "Batterie": 80,
    "Dos en verre": 95,
    "Boutons power / latéraux": 90,
    "Connecteur de charge": 90,
    "Écouteur interne": 60,
    "Caméra avant": 60,
    "Caméra arrière": 90,
    "Vibreur": 50
  },
  "iPhone 16 Pro": {
    "Écran Soft OLED": 165,
    "Écran Hard OLED": 125,
    "Écran Incell": 75,
    "Batterie": 85,
    "Dos en verre": 110,
    "Boutons power / latéraux": 110,
    "Connecteur de charge": 110,
    "Écouteur interne": 80,
    "Caméra avant": 60,
    "Caméra arrière": 150,
    "Vibreur": 50
  },
  "iPhone 16 Pro Max": {
    "Écran Soft OLED": 175,
    "Écran Hard OLED": 145,
    "Écran Incell": 85,
    "Batterie": 90,
    "Dos en verre": 115,
    "Boutons power / latéraux": 110,
    "Connecteur de charge": 110,
    "Écouteur interne": 80,
    "Caméra avant": 60,
    "Caméra arrière": 150,
    "Vibreur": 50
  },
  "iPhone 17": {
    "Écran Soft OLED": 140,
    "Écran Hard OLED": 105,
    "Écran Incell": 55,
    "Batterie haute capacité": 80,
    "Dos en verre": 95,
    "Boutons power / latéraux": 90,
    "Connecteur de charge": 90,
    "Écouteur interne": 60,
    "Caméra avant": 60,
    "Caméra arrière": 90,
    "Vibreur": 50
  },
  "iPhone Air": {
    "Écran Soft OLED": 165,
    "Écran Hard OLED": 115,
    "Écran Incell": 65,
    "Batterie haute capacité": 120,
    "Dos en verre": 90,
    "Boutons power / latéraux": 90,
    "Connecteur de charge": 90,
    "Écouteur interne": 60,
    "Caméra avant": 60,
    "Caméra arrière": 85,
    "Vibreur": 50
  },
  "iPhone 17 Pro": {
    "Écran Soft OLED": 165,
    "Écran Hard OLED": 130,
    "Écran Incell": 80,
    "Batterie haute capacité": 90,
    "Dos en verre": 85,
    "Boutons power / latéraux": 110,
    "Connecteur de charge": 110,
    "Écouteur interne": 80,
    "Caméra avant": 60,
    "Caméra arrière": 150,
    "Vibreur": 50
  },
  "iPhone 17 Pro Max": {
    "Écran Soft OLED": 180,
    "Écran Hard OLED": 150,
    "Écran Incell": 90,
    "Batterie haute capacité": 100,
    "Dos en verre": 85,
    "Boutons power / latéraux": 110,
    "Connecteur de charge": 110,
    "Écouteur interne": 80,
    "Caméra avant": 60,
    "Caméra arrière": 150,
    "Vibreur": 50
  }
};

function iphoneRepairGroups(model) {
 const specific=iphonePricesByModel[model];
 if(!specific)return null;
 const popular=[],other=[],additional=[];
 Object.entries(specific).forEach(([repair,amount])=>{
  const entry=[repair,amount+' €'];
  if(repair.startsWith('Écran')||repair.startsWith('Batterie')||repair==='Dos en verre')popular.push(entry);
  else if(repair==='Vibreur'||repair==='Grille écouteur interne')additional.push(entry);
  else other.push(entry);
 });
 // Conserver les prestations existantes dont le PDF ne précise pas le tarif.
 additional.push(...repairPrices.iphone.filter(([repair])=>['Haut-parleur','Carte mère','Châssis complet'].includes(repair)));
 return [popular,other,additional];
}

// Modèles vérifiés sur les fiches d’identification Apple, novembre 2026.
// iPad : support.apple.com/108043 ; MacBook : support.apple.com/108052 et /102869.
const iphoneSeries = [
  {id:'18', label:'Série 18', models:['iPhone 18 Pro Max','iPhone 18 Pro']},
  {id:'17', label:'Série 17', models:['iPhone 17 Pro Max','iPhone 17 Pro','iPhone 17','iPhone 17e']},
  {id:'air', label:'Série Air', models:['iPhone Air']},
  {id:'16', label:'Série 16', models:['iPhone 16 Pro Max','iPhone 16 Pro','iPhone 16 Plus','iPhone 16','iPhone 16e']},
  {id:'15', label:'Série 15', models:['iPhone 15 Pro Max','iPhone 15 Pro','iPhone 15 Plus','iPhone 15']},
  {id:'14', label:'Série 14', models:['iPhone 14 Pro Max','iPhone 14 Pro','iPhone 14 Plus','iPhone 14']},
  {id:'13', label:'Série 13', models:['iPhone 13 Pro Max','iPhone 13 Pro','iPhone 13','iPhone 13 mini']},
  {id:'12', label:'Série 12', models:['iPhone 12 Pro Max','iPhone 12 Pro','iPhone 12','iPhone 12 mini']},
  {id:'11', label:'Série 11', models:['iPhone 11 Pro Max','iPhone 11 Pro','iPhone 11']},
  {id:'x', label:'Série X', models:['iPhone XS Max','iPhone XS','iPhone XR','iPhone X']},
  {id:'8', label:'Série 8', models:['iPhone 8 Plus','iPhone 8']},
  {id:'7', label:'Série 7', models:['iPhone 7 Plus','iPhone 7']},
  {id:'6', label:'Série 6 / 6s', models:['iPhone 6s Plus','iPhone 6s','iPhone 6 Plus','iPhone 6']},
  {id:'5', label:'Série 5', models:['iPhone 5s','iPhone 5c','iPhone 5']},
  {id:'se', label:'Série SE', models:['iPhone SE (3e génération)','iPhone SE (2e génération)','iPhone SE (1re génération)']}
];

const ipadFamilies = [
 {label:'iPad classique',detail:'À partir de 2017',models:[
  'iPad A16 (2025)','iPad 10e génération (2022)','iPad 9e génération (2021)',
  'iPad 8e génération (2020)','iPad 7e génération (2019)',
  'iPad 6e génération (2018)','iPad 5e génération (2017)']},
 {label:'iPad Air',detail:'À partir de 2013',models:[
  'iPad Air 13 pouces M4 (2026)','iPad Air 11 pouces M4 (2026)',
  'iPad Air 13 pouces M3 (2025)','iPad Air 11 pouces M3 (2025)',
  'iPad Air 13 pouces M2 (2024)','iPad Air 11 pouces M2 (2024)',
  'iPad Air 5e génération M1 (2022)','iPad Air 4e génération (2020)',
  'iPad Air 3e génération (2019)','iPad Air 2 (2014)','iPad Air (2013)']},
 {label:'iPad mini',detail:'À partir de 2014',models:[
  'iPad mini A20 Pro (2026)','iPad mini A17 Pro (2024)','iPad mini 6e génération (2021)',
  'iPad mini 5e génération (2019)','iPad mini 4 (2015)','iPad mini 3 (2014)']},
 {label:'iPad Pro',detail:'À partir de 2018',models:[
  'iPad Pro 13 pouces M5 (2025)','iPad Pro 11 pouces M5 (2025)',
  'iPad Pro 13 pouces M4 (2024)','iPad Pro 11 pouces M4 (2024)',
  'iPad Pro 12,9 pouces 6e génération M2 (2022)','iPad Pro 11 pouces 4e génération M2 (2022)',
  'iPad Pro 12,9 pouces 5e génération M1 (2021)','iPad Pro 11 pouces 3e génération M1 (2021)',
  'iPad Pro 12,9 pouces 4e génération (2020)','iPad Pro 11 pouces 2e génération (2020)',
  'iPad Pro 12,9 pouces 3e génération (2018)','iPad Pro 11 pouces 1re génération (2018)']}
];

const macbookProModels = [
 'MacBook Pro 14 pouces M6 (2026)',
 ...['16','14'].flatMap(size => ['M5 Max','M5 Pro'].map(chip => 'MacBook Pro '+size+' pouces PROLED XDR '+chip+' (2026)')),
 ...['16','14'].flatMap(size => ['M5 Max','M5 Pro'].map(chip => 'MacBook Pro '+size+' pouces '+chip+' (2026)')),
 'MacBook Pro 14 pouces M5 (2025)',
 ...['16','14'].flatMap(size => ['M4 Max','M4 Pro'].map(chip => 'MacBook Pro '+size+' pouces '+chip+' (2024)')),
 'MacBook Pro 14 pouces M4 (2024)',
 ...['16','14'].flatMap(size => ['M3 Max','M3 Pro'].map(chip => 'MacBook Pro '+size+' pouces '+chip+' (fin 2023)')),
 'MacBook Pro 14 pouces M3 (fin 2023)',
 ...['16','14'].flatMap(size => ['M2 Max','M2 Pro'].map(chip => 'MacBook Pro '+size+' pouces '+chip+' (début 2023)')),
 'MacBook Pro 13 pouces M2 (2022)',
 ...['16','14'].flatMap(size => ['M1 Max','M1 Pro'].map(chip => 'MacBook Pro '+size+' pouces '+chip+' (2021)')),
 'MacBook Pro 13 pouces M1 (2020)'
];
const macbookFamilies = [
 {label:'MacBook Air',detail:'Puce Apple · modèles depuis 2020',models:[
  'MacBook Air 15 pouces M5 (2026)','MacBook Air 13 pouces M5 (2026)',
  'MacBook Air 15 pouces M4 (2025)','MacBook Air 13 pouces M4 (2025)',
  'MacBook Air 15 pouces M3 (2024)','MacBook Air 13 pouces M3 (2024)',
  'MacBook Air 15 pouces M2 (2023)','MacBook Air 13 pouces M2 (2022)',
  'MacBook Air 13 pouces M1 (2020)']},
 {label:'MacBook Pro',detail:'Puce Apple · modèles depuis 2020',models:macbookProModels},
 {label:'MacBook Neo',detail:'Puce Apple A18 Pro',models:['MacBook Neo 13 pouces A18 Pro (2026)']}
];
const catalogues = {
 iphone:{name:'iPhone',image:'iphone.png',families:iphoneSeries.map(s=>({...s,detail:s.models.length+' modèle'+(s.models.length>1?'s':'')}))},
 ipad:{name:'iPad',image:'ipad.png',families:ipadFamilies},
 macbook:{name:'MacBook',image:'macbook.png',families:macbookFamilies}
};

function priceCard(title, entries, featured, tag) {
 return `<article class="price-card ${featured?'featured':''}"><div class="tag">${tag}</div><h3>${title}</h3>${entries.map(([repair,price])=>`<div class="rate"><span>${repair}</span><b>${price}</b></div>`).join('')}</article>`;
}
function modelTile(label, action, index, image, detail='') {
 return `<button type="button" class="model-tile" data-${action}="${index}">
   <span class="model-thumbnail" data-device-image="${image}" aria-hidden="true">
     <img src="${image}" alt="" loading="lazy">
   </span>
   <span class="model-label">${label}${detail?'<small class="model-detail">'+detail+'</small>':''}</span>
   <span class="model-arrow" aria-hidden="true">→</span>
 </button>`;
}
function catalogueShell(title, help, back, body) {
 return `<div class="iphone-catalog"><div class="catalogue-heading">${back}<div><h2 id="catalogueTitle" tabindex="-1">${title}</h2><p>${help}</p></div></div>${body}</div>`;
}
const priceGrid=document.getElementById('priceGrid');
let activeCategory='iphone';
let currentFamilyIndex=null;
function focusCatalogue(){document.getElementById('catalogueTitle')?.focus({preventScroll:true});}
function showFamilies(category, focus=false){
 if(!catalogues[category])return;
 activeCategory=category;currentFamilyIndex=null;
 const catalogue=catalogues[category];
 const title=category==='iphone'?'Choisissez votre série d’iPhone':'Choisissez votre '+(category==='ipad'?'famille d’iPad':'gamme de MacBook');
 const help=category==='macbook'?'MacBook à puce Apple. Toutes les réparations sont sur devis.':'Sélectionnez une catégorie pour découvrir ses modèles.';
 priceGrid.innerHTML=catalogueShell(title,help,'','<div class="model-grid">'+catalogue.families.map((family,index)=>modelTile(family.label,'family',index,catalogue.image,family.detail)).join('')+'</div>');
 if(focus)focusCatalogue();
}
function groupedModelCards(models, image){
 const groups=new Map();
 models.forEach((model,index)=>{
  const chip=model.match(/\bM\d+\b/)?.[0] || model.match(/\bA\d+(?: Pro)?\b/)?.[0];
  const group=chip?'Puce '+chip:'Autres générations';
  if(!groups.has(group))groups.set(group,[]);
  groups.get(group).push({model,index});
 });
 return [...groups].map(([group,entries])=>'<section class="model-chip-group"><h3 class="model-chip-title">'+group+'</h3><div class="model-grid">'+entries.map(({model,index})=>modelTile(model,'model',index,image)).join('')+'</div></section>').join('');
}
function showModels(familyIndex){
 const catalogue=catalogues[activeCategory],family=catalogue.families[familyIndex];
 if(!family)return;currentFamilyIndex=familyIndex;
 priceGrid.innerHTML=catalogueShell(family.label,'Choisissez votre modèle pour consulter les réparations.',
 '<button type="button" class="catalogue-back" data-back="families">← '+(activeCategory==='iphone'?'Toutes les séries':'Toutes les gammes')+'</button>',
 activeCategory==='iphone'?'<div class="model-grid">'+family.models.map((model,index)=>modelTile(model,'model',index,catalogue.image)).join('')+'</div>':groupedModelCards(family.models,catalogue.image));
 focusCatalogue();
}
function showRepairs(modelIndex){
 const catalogue=catalogues[activeCategory],family=catalogue.families[currentFamilyIndex],model=family?.models[modelIndex];
 if(!model)return;
 let cards;
 if(activeCategory==='macbook'){
  cards=priceCard('Interventions',[['Toutes les réparations','sur devis']],true,model);
 }else{
  const entries=repairPrices[activeCategory],groups=(activeCategory==='iphone'&&iphoneRepairGroups(model))||[entries.slice(0,3),entries.slice(3,6),entries.slice(6)];
  cards=groups.map((group,index)=>group.length?priceCard(['Populaire','Autres interventions','Réparations complémentaires'][index],group,index===0,model):'').join('');
 }
 const query='?appareil='+encodeURIComponent(catalogue.name)+'&modele='+encodeURIComponent(model);
 priceGrid.innerHTML=catalogueShell(model,activeCategory==='macbook'?'Toute intervention fait l’objet d’un devis avant réparation.':activeCategory==='iphone'&&iphonePricesByModel[model]?'Tarifs pour ce modèle. Le devis final est validé avec vous avant toute intervention.':'Prix de départ indicatifs, à confirmer pour ce modèle avant l’intervention.',
 '<button type="button" class="catalogue-back" data-back="models">← '+family.label+'</button>',
 '<div class="price-grid">'+cards+'</div><div class="catalogue-actions"><a class="button book-model" href="rendez-vous.html'+query+'">Prendre rendez-vous pour cet appareil →</a></div>');
 focusCatalogue();
}
if(priceGrid){
 priceGrid.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(!button||!priceGrid.contains(button))return;
  if(button.dataset.family!==undefined)showModels(Number(button.dataset.family));
  else if(button.dataset.model!==undefined)showRepairs(Number(button.dataset.model));
  else if(button.dataset.back==='families')showFamilies(activeCategory,true);
  else if(button.dataset.back==='models'&&currentFamilyIndex!==null)showModels(currentFamilyIndex);
 });
 document.querySelectorAll('[data-category]').forEach(button=>{
  button.setAttribute('aria-pressed',String(button.dataset.category==='iphone'));
  button.addEventListener('click',()=>{
   document.querySelectorAll('[data-category]').forEach(other=>{
    other.classList.toggle('active',other===button);
    other.setAttribute('aria-pressed',String(other===button));
   });
   showFamilies(button.dataset.category);
  });
 });
 showFamilies('iphone');
}

const deviceSelect = document.getElementById('device');
const repairSelect = document.getElementById('repair');
const estimate = document.getElementById('estimate');
if (deviceSelect && repairSelect && estimate) {
  deviceSelect.addEventListener('change', () => {
    repairSelect.disabled = !deviceSelect.value;
    repairSelect.innerHTML = deviceSelect.value
      ? '<option value="">Choisissez une réparation</option>' + repairPrices[deviceSelect.value].map(([name], index) => `<option value="${index}">${name}</option>`).join('')
      : '<option value="">Choisissez d’abord un appareil</option>';
    estimate.classList.remove('show');
  });
  repairSelect.addEventListener('change', () => {
    if (!deviceSelect.value || repairSelect.value === '') {
      estimate.classList.remove('show');
      return;
    }
    const [repair, price] = repairPrices[deviceSelect.value][repairSelect.value];
    document.getElementById('estimatePrice').textContent = price;
    document.getElementById('estimateNote').textContent = repair + (price === 'sur devis' ? ' · contactez-nous pour une estimation' : ' · prix à confirmer selon le modèle');
    estimate.classList.add('show');
  });
}
