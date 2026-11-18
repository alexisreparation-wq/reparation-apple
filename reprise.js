const tradeFamilies = {
  "11": [
    "iPhone 11",
    "iPhone 11 Pro",
    "iPhone 11 Pro Max"
  ],
  "12": [
    "iPhone 12",
    "iPhone 12 mini",
    "iPhone 12 Pro",
    "iPhone 12 Pro Max"
  ],
  "13": [
    "iPhone 13",
    "iPhone 13 mini",
    "iPhone 13 Pro",
    "iPhone 13 Pro Max"
  ],
  "14": [
    "iPhone 14",
    "iPhone 14 Plus",
    "iPhone 14 Pro",
    "iPhone 14 Pro Max"
  ],
  "15": [
    "iPhone 15",
    "iPhone 15 Plus",
    "iPhone 15 Pro",
    "iPhone 15 Pro Max"
  ],
  "16": [
    "iPhone 16",
    "iPhone 16 Plus",
    "iPhone 16 Pro",
    "iPhone 16 Pro Max",
    "iPhone 16e"
  ],
  "17": [
    "iPhone 17",
    "iPhone 17 Pro",
    "iPhone 17 Pro Max",
    "iPhone Air",
    "iPhone 17e"
  ],
  "18": [
    "iPhone 18 Pro",
    "iPhone 18 Pro Max"
  ]
};

const tradeStates = ['Comme neuf', 'Bon état', 'Correct', 'Cassé'];

function calculateTradeIn(model, state) {
 if(model === '' || model == null || state === '' || state == null) return null;
 const generation=Number(model),condition=Number(state);
 if(!Number.isInteger(generation)||generation<11||generation>18||!Number.isInteger(condition)||condition<0||condition>3)return null;
 return 1100-(18-generation)*100-condition*100;
}

const tradeFamily=document.getElementById('tradeFamily');
const tradeModel=document.getElementById('tradeModel');
const tradeForm=document.getElementById('tradeForm');
if(tradeFamily&&tradeModel&&tradeForm){
 const result=document.getElementById('tradeResult');
 const prompt=document.getElementById('tradePrompt');
 const contact=document.getElementById('tradeContact');
 const amount=document.getElementById('tradeAmount');
 const summary=document.getElementById('tradeSummary');
 const money=new Intl.NumberFormat('fr-BE',{style:'currency',currency:'EUR',maximumFractionDigits:0});
 function updateTradeIn(){
  const state=tradeForm.querySelector('input[name="etat"]:checked')?.value;
  const validModel=(tradeFamilies[tradeFamily.value]||[]).includes(tradeModel.value);
  const value=validModel?calculateTradeIn(tradeFamily.value,state):null;
  result.hidden=value===null;
  contact.hidden=value===null;
  prompt.hidden=value!==null;
  if(value===null){contact.removeAttribute('href');return;}
  const model=tradeModel.value;
  const condition=tradeStates[Number(state)];
  const formatted=money.format(value);
  amount.textContent=formatted;
  summary.textContent=model+' · '+condition;
  const selection=new URLSearchParams({famille:tradeFamily.value,modele:model,etat:String(state)});
  contact.href='reprise-demande.html?'+selection.toString();
 }
 function updateModelOptions(){
  const models=tradeFamilies[tradeFamily.value]||[];
  tradeModel.disabled=models.length===0;
  tradeModel.innerHTML='<option value="">'+(models.length?'Choisissez votre modèle':'Choisissez d’abord une famille')+'</option>'+models.map(model=>'<option value="'+model+'">'+model+'</option>').join('');
  tradeModel.value='';
 }
 tradeForm.addEventListener('change',event=>{
  if(event.target===tradeFamily)updateModelOptions();
  updateTradeIn();
 });
 tradeForm.addEventListener('submit',event=>event.preventDefault());
 updateModelOptions();
 updateTradeIn();
}
