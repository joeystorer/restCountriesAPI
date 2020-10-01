
const themeBtn = document.getElementsByClassName("theme-btn"),
    dropDownBtn = document.getElementById("dropDownBtn"),
    countriesContainer = document.getElementById("countriesContainer"),
    searchBar = document.getElementById("searchBar"),
    regions = dropDownBtn.querySelectorAll('li'),
    countryModal = document.getElementById("countryModal"),
    backBtn = document.getElementById("back");
      

for (var i = 0; i < themeBtn.length; i++) {
    themeBtn[i].addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
    });
};

dropDownBtn.addEventListener("click", () => {
        dropDownBtn.classList.toggle("open");
});

getData();
async function getData() {
    const response = await fetch("https://restcountries.eu/rest/v2/all"),
        countryData = await response.json();
        createCountries(countryData);
};

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
                <h2 class="country-name">${element.name}</h2>
                <p><strong>Population:</strong>${element.population}</p>
                <p class="country-region"><strong>Region:</strong>${element.region}</p>
                <p><strong>Captial:</strong>${element.capital}</p>
        </div>
        `;
        country.addEventListener("click", () => {
            countryModal.style.display = 'flex';
			countryDetails(element);
        })
        countriesContainer.appendChild(country)
    });
};


searchBar.addEventListener('input', e => {
    console.log("input fire");
    const inputValue = e.target.value,
        countryName = document.querySelectorAll('.country-name');
        countryName.forEach(name => {
		if (name.innerText.toLowerCase().includes(inputValue.toLowerCase())) {
			name.parentElement.parentElement.style.display = 'block';
		} else {
			name.parentElement.parentElement.style.display = 'none';
		}
	});
});

regions.forEach(area => {
	area.addEventListener('click', e => {
        console.log("clicked");
        for (i = 0;i < regions.length;i++) {
            regions[i].classList.remove("selected");
        }
        e.target.classList.add("selected");
		const areaValue = area.innerText;
              countryRegion = document.querySelectorAll('.country-region');

		countryRegion.forEach(region => {
			if (region.innerText.includes(areaValue) || areaValue === 'All') {
				region.parentElement.parentElement.style.display = 'block';
			} else {
				region.parentElement.parentElement.style.display = 'none';
			}
		});
	});
});

function countryDetails(countryData) {
	const modalContent = countryModal.querySelector('.modal-content'),
	      flag = countryModal.querySelector('img');
          flag.src = countryData.flag;
            modalContent.innerHTML = `
                <h2>${countryData.name}</h2>
                <p>
                    <strong>Native Name:</strong>
                    ${countryData.nativeName}
                </p>
                <p>
                    <strong>Population:</strong>
                    ${countryData.population}
                </p>
                <p>
                    <strong>Region:</strong>
                    ${countryData.region}
                </p>
                <p>
                    <strong>Sub Region:</strong>
                    ${countryData.subregion}
                </p>
                <p>
                    <strong>Capital:</strong>
                    ${countryData.capital}
                </p>

                <p>
                    <strong>Top Level Domain:</strong>
                    ${countryData.topLevelDomain[0]}
                </p>
                
                <p>
                    <strong>Currencies:</strong>
                    ${countryData.currencies.map(currency => currency.code)}
                </p>
                <p>
                    <strong>Languages:</strong>
                    ${countryData.languages.map(language => language.name)}
                </p>
                <div class="border-countries">
                <p><strong>Border Countries</strong>
                    ${countryData.borders.map(border => border)}
                </p>
                </div>
            `;
};

backBtn.addEventListener("click", () => {
    countryModal.style.display = "none";
});