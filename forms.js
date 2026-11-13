const contactEmail = 'alexisreparation@gmail.com';

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.href = `mailto:${contactEmail}`;
  if (link.textContent.includes('@')) link.textContent = `✉️ ${contactEmail}`;
});

document.querySelectorAll('.brand').forEach((brand) => {
  brand.lastChild.nodeValue = ' Alexis Réparation';
});

document.querySelectorAll('footer div').forEach((footer) => {
  footer.textContent = '© 2026 Alexis Réparation · Réparation Apple';
});

document.title = document.title.replace('Atelier Pomme', 'Alexis Réparation');

document.querySelectorAll('[data-repair-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get('Nom et prénom') || 'client';
    const details = [...data.entries()]
      .map(([label, value]) => `${label} : ${value}`)
      .join('\n');
    const subject = `Réparation — ${name}`;
    const body = `Nouvelle demande de réparation\n\n${details}\n\nMerci.`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
