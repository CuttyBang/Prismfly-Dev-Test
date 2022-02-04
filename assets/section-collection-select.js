
// fetch('/collections/bases?section_id=main-collection-product-grid')
// fetch('/collections/bases?section_id=main-list-collections')
// //.fetch('/collections/bases?section_id=featured_collection')
// //shopify-section-template--14329027166298__1643933680b86823bb
// .then(response => response.text())
// .then(data => gridContainer.innerHTML = `<div>`+ data + "</div>");

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

  if (url == '/collections/all') {
    queryString = `${url}?section_id=main-list-collections`;
    selectorBanner.innerHTML = '';
  } else {
    getBanner(url);
    queryString = `${url}?section_id=main-collection-product-grid`;
  }

  fetch(queryString).then(response => response.text())
  .then(data => gridContainer.innerHTML = `<div>`+ data + `</div>`);

  window.history.pushState('','', url)
};

// gridContainer.innerHTML = '';
// selectorBanner.innerHTML = '';

// for (var i = 0; i < elements.length; i++) {
//     elements[i].addEventListener('click', myFunction, false);
// }

// Array.from(selectorItems).forEach(function(item) {
//    item.addEventListener('click', getUrlAttr);
//  });

getUrlAttr('/collections/all');

selectorItems.forEach(el => el.addEventListener('click', event => {

  document.getElementById('menu-toggle').checked = false;

  selectorItems.forEach(item => {
      item.classList.remove('selected-collection')
  });

  event.target.classList.add('selected-collection');

  if (event.target.innerText == 'ALL') {
    indicatorPill.innerText = `See All ${'Collections'}`;
  } else {
   indicatorPill.innerText = `See All ${event.target.innerText}`;
 }

 let urlAttr = event.target.getAttribute('data-collection-url');

 getUrlAttr(urlAttr);
}));
