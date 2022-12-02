import { countryList, countryInfo } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function infoMessage() {
  clear();
  Notify.info('Too many matches found. Please enter a more specific name', {
    showOnlyTheLastOne: true,
  });
}

export function failMessage() {
  clear();
  Notify.failure('Oops, there is no country with that name', {
    showOnlyTheLastOne: true,
  });
}

export function clear() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
