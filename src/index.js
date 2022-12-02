import '../node_modules/modern-normalize/modern-normalize.css';
import './css/styles.css';
import debounce from 'lodash.debounce';
import { searchBox, countryList, countryInfo } from './js/refs';
import { clear, infoMessage, failMessage } from './js/service';
import { fetchCountries } from './js/fetchCountries';
import {
  markupCountryList,
  markupCountryInfo,
  markupOneCountryList,
} from './js/markup';

export let items = [];
const DEBOUNCE_DELAY = 300;

searchBox.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(event) {
  event.preventDefault();
  let value = event.target.value.trim();
  if (value === '') {
    clear();
    return;
  }

  fetchCountries(value)
    .then(data => {
      items = data;
      if (items.length >= 10) {
        infoMessage();
        return;
      }
      render(items);
    })
    .catch(failMessage);
}

function render(items) {
  const country = items.map(markupCountryList);
  const info = items.map(markupCountryInfo);
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
