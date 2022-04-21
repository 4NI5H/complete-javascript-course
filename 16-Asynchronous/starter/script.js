'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// Coding Challenge 1

// const whereAmI = (lat, lng) => {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       if (!res.ok)
//         throw new Error('Could not find location! Problem with Geocoding!!');

//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) {
//         throw new Error('Failed to fetch country details');
//       }
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(error => console.log(`Something Went Wrong!${error.msg}`));
// };

// whereAmI(52.508, 13.381);

// Coding Challenge 2

const wait = function (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, time * 1000);
  });
};

const imageContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement('img');
    image.src = imgPath;

    image.addEventListener('load', function () {
      imageContainer.append(image);
      resolve(image);
    });

    image.addEventListener('error', function () {
      reject(image);
    });
  });
};
let currImg;
// createImage('img/img-1.jpg')
//   .then(res => {
//     currentImg = res;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(res => {
//     currentImg = res;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(error => console.error(error));

// Coding Challenge 3

// async function loadNPause() {
//   try {
//     let image = createImage('img/img-1.jpg');
//     await wait(2);
//     image.style.display = 'none';

//     image = createImage('img/img-2.jpg');
//     await wait(2);
//     image.style.display = 'none';
//   } catch (error) {
//     console.error('Error :', error);
//   }
// }

const imgArr = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];

async function loadAll(imgArr) {
  try {
    const imgs = imgArr.map(async img => {
      return await createImage(img);
    });
    console.log('images array', imgs);

    const imgEl = await Promise.all(imgs);
    console.log('img el', imgEl);
    imgEl.forEach(img => {
      img.classList.add('parallel');
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

loadAll(imgArr);
