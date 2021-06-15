"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

const renderCountry = function (data, className = "") {
    const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
        ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
};

const getCountryData = (country) => {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then((countryResponse) => {
            return countryResponse.json();
        })
        .then((countryData) => {
            renderCountry(countryData[0]);
            const neighbour = countryData[0].borders[0];
            if (!neighbour) return;
            return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
        })
        .then((neighbourResponse) => {
            return neighbourResponse.json();
        })
        .then((neighbourData) => {
            renderCountry(neighbourData, "neighbour");
        });
};

//Get the details of a country
getCountryData("ukraine");
