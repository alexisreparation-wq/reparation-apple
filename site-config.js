const contactEmail = 'alexisreparation@gmail.com';

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.href = `mailto:${contactEmail}`;
  if (link.textContent.includes('@')) link.textContent = `✉️ ${contactEmail}`;
});

document.querySelectorAll('.brand').forEach((brand) => {
  brand.lastChild.nodeValue = ' Alexis Réparation';
});

document.title = document.title.replace('Atelier Pomme', 'Alexis Réparation');
