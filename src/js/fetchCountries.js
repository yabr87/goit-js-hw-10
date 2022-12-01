const URL = `https://restcountries.com/v3.1/`;

export function fetchCountries(countryName) {
  return fetch(
    `${URL}name/${countryName}?fields=name,capital,population,flags,languages`
  ).then(response => response.json());
}
