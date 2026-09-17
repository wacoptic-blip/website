const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const footerMount = document.querySelector('[data-footer]');
const scriptUrl = new URL(document.currentScript.src);

if (footerMount) {
  fetch(new URL('footer.html', scriptUrl))
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Unable to load footer: ${response.status}`);
      }
      return response.text();
    })
    .then((footerHtml) => {
      footerMount.innerHTML = footerHtml;
      footerMount.querySelector('[data-home-link]').href = new URL('index.html', scriptUrl).href;
    })
    .catch((error) => {
      console.error(error);
    });
}

const tabs = document.querySelectorAll('.service-tab');
const panels = document.querySelectorAll('.service-details');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    panels.forEach((panel) => {
      panel.hidden = true;
      panel.classList.remove('active');
    });

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    panel.hidden = false;
    panel.classList.add('active');
  });
});
