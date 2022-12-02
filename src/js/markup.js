import { items } from '../index';
export const markupCountryInfo = ({ capital, population, languages }) => {
  return `
      <ul>
        <li><b>Capital:</b> ${capital}</li>
        <li><b>Population:</b> ${population}</li>
        <li><b>Languages:</b> ${Object.values(languages).join(', ')}</li>
      </ul>`;
};

export const markupCountryList = ({ name, flags }) => {
  return `<li class="country-list-item"><img src="${flags.svg}"
     alt="${name.official}" height="20" width="35"><span>${name.official}</span></li>`;
};

export const markupOneCountryList = ({ name, flags }) => {
  return `<li class="country-list-item"><img src="${flags.svg}"
     alt="${name.official}" height="20" width="35"><span class="country-list-title">${name.official}</span></li>`;
};
