const tradeStates = ['Comme neuf', 'Bon état', 'Correct', 'Cassé'];

function calculateTradeIn(model, state) {
 if(model === '' || model == null || state === '' || state == null) return null;
 const generation=Number(model),condition=Number(state);
 if(!Number.isInteger(generation)||generation<11||generation>18||!Number.isInteger(condition)||condition<0||condition>3)return null;
 return 1100-(18-generation)*100-condition*100;
}

const tradeModel=document.getElementById('tradeModel');
const tradeForm=document.getElementById('tradeForm');
if(tradeModel&&tradeForm){
 const result=document.getElementById('tradeResult');
 const prompt=document.getElementById('tradePrompt');
 const contact=document.getElementById('tradeContact');
 const amount=document.getElementById('tradeAmount');
 const summary=document.getElementById('tradeSummary');
 const money=new Intl.NumberFormat('fr-BE',{style:'currency',currency:'EUR',maximumFractionDigits:0});
 function updateTradeIn(){
  const state=tradeForm.querySelector('input[name="etat"]:checked')?.value;
  const value=calculateTradeIn(tradeModel.value,state);
  result.hidden=value===null;
  contact.hidden=value===null;
  prompt.hidden=value!==null;
  if(value===null){contact.removeAttribute('href');return;}
  const model='iPhone '+tradeModel.value;
  const condition=tradeStates[Number(state)];
  const formatted=money.format(value);
  amount.textContent=formatted;
  summary.textContent=model+' · '+condition;
  const subject='Demande de reprise — '+model;
  const body='Bonjour,\r\n\r\nJe souhaite proposer mon '+model+' à la reprise.\r\nÉtat général : '+condition+'.\r\nEstimation affichée : '+formatted+'.\r\n\r\nNom et prénom : \r\nTéléphone : \r\n\r\nMerci.';
  contact.href='mailto:alexisreparation@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
 }
 tradeForm.addEventListener('change',updateTradeIn);
 tradeForm.addEventListener('submit',event=>event.preventDefault());
 updateTradeIn();
}
