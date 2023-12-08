import axios from 'axios';
import { fetchBreeds } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_LHRQcmoVBhX3YZHvL7nrtF4rN9Y05A8EDvVpjKcJJBzOof6luUKwGvnJthT7liq3';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '780px',
  position: 'right-top',
});

function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(({ data }) => data);
}

/** @type {HTMLSelectElement | null} */
const breeds = document.querySelector('.breed-select');

const effect = document.querySelector('div.cat-info');

fetchBreeds().then(data => {
  const html = data.map(
    breed => `<option value = "${breed.id}"> ${breed.name} </option>`
  );
  // html.push(`<option value = "breeds123"> error </option>`);
  breeds.innerHTML = html;
});

breeds.addEventListener('change', ev => {
  document.querySelector(`p.loader`).classList.remove('hidden');
  const breedId = ev.target.value;
  fetchCatByBreed(breedId).then(cats => {
    document.querySelector(`p.loader`).classList.add('hidden');
    if (cats.length == 0) {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );

      effect.innerHTML = ``;
    } else {
      const array = cats.map(
        cat =>
          ` <h2 >${cat.breeds[0].name}</h2><img width="50%vw" height="400px" src="${cat.url}" /> <div><p>${cat.breeds[0].description}</p>
        <p>TEMPERAMENT: ${cat.breeds[0].temperament}</p></div>`
      );

      effect.innerHTML = array.join('');
    }
  });
});
