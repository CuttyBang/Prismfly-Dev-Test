
const selectorItems = document.querySelectorAll('.selector-nav-item');
const indicatorPill = document.getElementById('indicator-pill-text');
const gridContainer = document.getElementById('selector-grid-container');
const selectorBanner = document.getElementById('selector-banner');

const getBanner = (url) => {
  let bannerQuery = `${url}?section_id=selector-banner`;

  fetch(bannerQuery).then(response => response.text())
  .then(data => selectorBanner.innerHTML = `<div>`+ data + `</div>`);
};

const getGrid = (url) => {
  let queryString = `${url}?section_id=main-collection-product-grid`;

  fetch(queryString).then(response => response.text())
  .then(data => gridContainer.innerHTML = `<div>`+ data + `</div>`);
}

const updateUrl = (url) => {
  window.history.pushState('','', url);
};

const updateDisplay = (url, text) => {
  getGrid(url);
  updateUrl(url);
  if (selectorBanner) { getBanner(url) };
  if (indicatorPill) {
    if (url == '/collections/all')) {
      indicatorPill.innerText = `See All`;
    } else {
      indicatorPill.innerText = `See All ${text}`;
    }
  };
};

selectorItems.forEach(el => el.addEventListener('click', event => {
  let selectedText = event.target.innerText;
  let urlAttr = event.target.getAttribute('data-collectionurl');
  selectorItems.forEach(item => item.classList.remove('selected-collection'));
  document.getElementById('menu-toggle').checked = false;
  event.target.classList.add('selected-collection');
  updateDisplay(urlAttr, selectedText);
 //  if (selectorBanner) { getBanner(urlAttr) }
 //  getGrid(urlAttr);
 //  updateUrl(urlAttr);
 //
 //  if (indicatorPill) {
 //    if (selectedText.inludes('ALL')) {
 //      indicatorPill.innerText = `See ${selectedText}`;
 //    } else {
 //     indicatorPill.innerText = `See All ${selectedText}`;
 //   }
 // }

}));

document.onload = function() {
  updateDisplay('/collections/all', 'ALL');
  // getGrid('/collections/all');
  // if (selectorBanner) { getBanner(urlAttr) }
  // if (indicatorPill) {
  //   indicatorPill.innerText = `See ${'All'}`;
  // }
}; 
