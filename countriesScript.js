
const themeBtn = document.getElementsByClassName("theme-btn"),
    dropDownBtn = document.getElementById("dropDownBtn"),
    countriesContainer = document.getElementById("countriesContainer"),
    countryModal = document.getElementById("countryModal");
      

for (var i = 0; i < themeBtn.length; i++) {
    themeBtn[i].addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
    });
}

dropDownBtn.addEventListener("click", () => {
        dropDownBtn.classList.toggle("open");
});

getData();
async function getData() {
    const response = await fetch("https://restcountries.eu/rest/v2/all"),
        countryData = await response.json();
        createCountries(countryData);
}

function createCountries(countryData) {
    countriesContainer.innerHTML = "";

    countryData.forEach(element => {
        const country = document.createElement("article");
        country.classList.add("country");
        country.innerHTML = `
        <div class="flag-img">
                <img src="${element.flag}" alt="${element.name} flag">
            </div>
            <div class="country-info">
                <h2 class="coutry-name">${element.name}</h2>
                <p><strong>Population:</strong>${element.population}</p>
                <p><strong>Region:</strong>${element.region}</p>
                <p><strong>Captial:</strong>${element.capital}</p>
        </div>
        `;
        country.addEventListener("click", () => {
            modal
        })
        countriesContainer.appendChild(country)
    });
}

function countryDetails(country) {

}