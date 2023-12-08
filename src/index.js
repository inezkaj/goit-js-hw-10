import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_LHRQcmoVBhX3YZHvL7nrtF4rN9Y05A8EDvVpjKcJJBzOof6luUKwGvnJthT7liq3';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '780px',
  position: 'right-top',
});

/** @type {HTMLSelectElement | null} */
const breeds = document.querySelector('.breed-select');

const effect = document.querySelector('div.cat-info');

fetchBreeds().then(data => {
  document.querySelector(`p.loader`).classList.add('hidden');
  const html = data.map(
    breed => `<option value = "${breed.id}"> ${breed.name} </option>`
  );
  // html.push(`<option value = "breeds123"> error </option>`);
  breeds.innerHTML = html;
  document.querySelector('select').classList.remove('hidden');
});

breeds.addEventListener('change', ev => {
  document.querySelector(`p.loader`).classList.remove('hidden');
  effect.classList.add('hidden');
  const breedId = ev.target.value;

  fetchCatByBreed(breedId)
    .then(cats => {
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
        effect.classList.remove('hidden');
      }
    })
    .catch(error => {
      document.querySelector(`p.loader`).classList.add('hidden');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
});
