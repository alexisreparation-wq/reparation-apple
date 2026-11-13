function prepareRepairEmail(formData, requestType) {
  const value = (key) => String(formData.get(key) || '').trim();
  const fullName = [value('prenom'), value('nom')].filter(Boolean).join(' ');
  const subject = 'Réparation — ' + fullName;
  const body = [
    'Nouvelle demande de réparation',
    '',
    'Type de demande : ' + requestType,
    'Nom : ' + value('nom'),
    'Prénom : ' + value('prenom'),
    'Téléphone : ' + value('telephone'),
    'E-mail : ' + value('email'),
    'Appareil : ' + value('appareil'),
    'Modèle : ' + value('modele'),
    'Réparation souhaitée : ' + value('reparation'),
    ...(value('date') ? ['Date souhaitée : ' + value('date')] : []),
    ...(value('heure') ? ['Heure souhaitée : ' + value('heure')] : []),
    '',
    'Précisions :',
    value('message') || 'Aucune précision supplémentaire.',
    '',
    'Merci.'
  ].join('\r\n');
  return 'mailto:alexisreparation@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}

document.querySelectorAll('[data-repair-form]').forEach((form) => {
  const params = new URLSearchParams(window.location.search);
  const requestedDevice = params.get('appareil');
  const requestedModel = params.get('modele');
  if (['iPhone', 'iPad', 'MacBook'].includes(requestedDevice) && requestedModel) {
    form.querySelector('[name="appareil"]').value = requestedDevice;
    form.querySelector('[name="modele"]').value = requestedModel.slice(0, 150);
  }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const emailLink = prepareRepairEmail(new FormData(form), form.dataset.request);
    window.location.href = emailLink;
    form.querySelector('.form-status').textContent = 'Votre e-mail est préparé. Vérifiez-le dans votre application e-mail puis cliquez sur Envoyer. Si aucune application ne s’ouvre, contactez-nous directement à alexisreparation@gmail.com.';
  });
});
