const maxPhotoCount = 6;
const maxPhotoBytes = 10_000_000;
const photoTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

function photoError(files) {
  if (files.length > maxPhotoCount) return 'Vous pouvez joindre jusqu’à 6 photos.';
  if (files.some((file) => file.size === 0)) return 'Une des photos est vide. Sélectionnez-la de nouveau.';
  if (files.some((file) => file.type ? !photoTypes.includes(file.type) : !/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name))) {
    return 'Choisissez des photos JPG, PNG, WebP ou HEIC.';
  }
  if (files.reduce((bytes, file) => bytes + file.size, 0) > maxPhotoBytes) {
    return 'Les photos doivent peser au total 10 Mo ou moins.';
  }
  return '';
}

document.querySelectorAll('[data-repair-form]').forEach((form) => {
  const params = new URLSearchParams(window.location.search);
  const requestedDevice = params.get('appareil');
  const requestedModel = params.get('modele');
  if (['iPhone', 'iPad', 'MacBook'].includes(requestedDevice) && requestedModel) {
    form.elements.appareil.value = requestedDevice;
    form.elements.modele.value = requestedModel.slice(0, 150);
  }

  const photos = form.elements.photos;
  const validatePhotos = () => {
    photos.setCustomValidity(photoError(Array.from(photos.files)));
    return photos.reportValidity();
  };
  photos.addEventListener('change', validatePhotos);
  form.addEventListener('submit', (event) => {
    if (!validatePhotos()) event.preventDefault();
  });

  form.addEventListener('formdata', ({ formData }) => {
    const firstName = formData.get('prenom').trim();
    const lastName = formData.get('nom').trim();
    formData.set('_subject', ('Réparation — ' + firstName + ' ' + lastName).replace(/[\r\n]+/g, ' ').trim());
    // FormSubmit expects a separate field name for each attachment.
    const attachments = formData.getAll('photos').filter((file) => file.size > 0);
    formData.delete('photos');
    attachments.forEach((file, index) => formData.append('photo-' + (index + 1), file));
  });

  form.querySelector('button[type="submit"]').disabled = false;
});
