
const selectorItems = document.querySelectorAll('.selector-nav-item');
const indicatorPill = document.getElementById('indicator-pill-text');
const gridContainer = document.getElementById('selector-grid-container');
const selectorBanner = document.getElementById('selector-banner');



const getBanner = (url) => {
  let bannerQuery = `${url}?section_id=main-collection-banner`;

  fetch(bannerQuery).then(response => response.text())
  .then(data => selectorBanner.innerHTML = `<div>`+ data + `</div>`);
};


const getUrlAttr = (url) => {
  let queryString;

  queryString = `${url}?section_id=main-collection-product-grid`;

  fetch(queryString).then(response => response.text())
  .then(data => gridContainer.innerHTML = `<div>`+ data + `</div>`);

  if(selectorBanner) {
    getBanner(url);
  }

  window.history.pushState('','', url);
};


selectorItems.forEach(el => el.addEventListener('click', event => {

  document.getElementById('menu-toggle').checked = false;

  selectorItems.forEach(item => {
      item.classList.remove('selected-collection')
  });

  event.target.classList.add('selected-collection');

  if (indicatorPill) {
    if (event.target.innerText == 'ALL') {
      indicatorPill.innerText = `See All ${'Items'}`;
    } else {
     indicatorPill.innerText = `See All ${event.target.innerText}`;
   }
 }

 let urlAttr = event.target.getAttribute('data-collection-url');

 getUrlAttr(urlAttr);
}));

getUrlAttr('/collections/all');
if (indicatorPill) {
  indicatorPill.innerText = `See All ${'Items'}`;
}
