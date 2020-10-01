
const themeBtn = document.getElementsByClassName("theme-btn"),
    dropDownBtn = document.getElementById("dropDownBtn"),
    countriesContainer = document.getElementById("countriesContainer"),
    searchBar = document.getElementById("searchBar"),
    regions = dropDownBtn.querySelectorAll('li'),
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
                <h2 class="country-name">${element.name}</h2>
                <p><strong>Population:</strong>${element.population}</p>
                <p class="country-region"><strong>Region:</strong>${element.region}</p>
                <p><strong>Captial:</strong>${element.capital}</p>
        </div>
        `;
        country.addEventListener("click", () => {
            countryModal.style.display = 'flex';
			countryDetails(country);
        })
        countriesContainer.appendChild(country)
    });
}


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

function countryDetails(country) {
	const modalContent = countryModal.querySelector('.modal-content'),
	      flag = countryModal.querySelector('img');

          flag.src = country.flag;
debugger;
	modalContent.innerHTML = `
        <h2>${country.name}</h2>
        <p>
            <strong>Native Name:</strong>
            ${country.nativeName}
        </p>
        <p>
            <strong>Population:</strong>
            ${country.population}
        </p>
        <p>
            <strong>Region:</strong>
            ${country.region}
        </p>
        <p>
            <strong>Sub Region:</strong>
            ${country.subregion}
        </p>
        <p>
            <strong>Capital:</strong>
            ${country.capital}
        </p>
        
        <p>
            <strong>Currencies:</strong>
            ${country.currencies.map(currency => currency.code)}
        </p>
        <p>
            <strong>Languages:</strong>
            ${country.languages.map(language => language.name)}
        </p>
    `;
}