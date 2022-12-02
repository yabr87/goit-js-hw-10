import '../node_modules/modern-normalize/modern-normalize.css';
import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;
let items = [];

searchBox.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(event) {
  console.log(event.target.value);
  event.preventDefault();
  if (event.target.value === '') {
    clear();
    return;
  }

  fetch(
    `https://restcountries.com/v3.1/name/${event.target.value}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      items = data;
      if (items.length >= 10) {
        infoMessage();
        return;
      }

      render();
    })
    .catch(failMessage);
}

function clear() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}

function infoMessage() {
  clear();
  Notify.info('Too many matches found. Please enter a more specific name', {
    showOnlyTheLastOne: true,
  });
}

function failMessage() {
  clear();
  Notify.failure('Oops, there is no country with that name', {
    showOnlyTheLastOne: true,
  });
}

const murkupCountryInfo = ({ capital, population, languages }) => {
  return `
      <ul>
        <li><b>Capital:</b> ${capital}</li>
        <li><b>Population:</b> ${population}</li>
        <li><b>Languages:</b> ${Object.values(languages).join(', ')}</li>
      </ul>`;
};

const murkupCountryList = ({ name, flags }) => {
  return `<li class="country-list-item"><img src="${flags.svg}"
     alt="${name.official}" height="20" width="35"><span>${name.official}</span></li>`;
};

const markupOneCountryList = ({ name, flags }) => {
  return `<li class="country-list-item"><img src="${flags.svg}"
     alt="${name.official}" height="20" width="35"><span class="country-list-title">${name.official}</span></li>`;
};

function render() {
  const country = items.map(murkupCountryList);
  const info = items.map(murkupCountryInfo);
  const oneCountry = items.map(markupOneCountryList);

  if (items.length === 1) {
    clear();
    countryList.insertAdjacentHTML('beforeend', oneCountry.join(''));
    countryInfo.insertAdjacentHTML('beforeend', info.join(''));
  } else {
    clear();
    countryList.insertAdjacentHTML('beforeend', country.join(''));
  }
}
