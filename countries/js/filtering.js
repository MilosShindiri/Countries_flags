import { allCountriesData, renderCountries } from './renderCountries.js';

let searchInput = document.getElementById('input');
let filtering = document.getElementById('region_filter');

// DEBOUNCING
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// SEARCH + FILTER
export function applyFilters() {

    let query = searchInput.value.trim().toLowerCase();
    let region = filtering.value.trim().toLowerCase();

    let filtered = allCountriesData.filter(country => {
        let nameMatch = country.name.common.toLowerCase().includes(query);
        let regionMatch = country.region.toLowerCase().includes(region);
       
        return nameMatch && regionMatch;
    });

    renderCountries(filtered);
}

filtering.addEventListener('change', applyFilters);
searchInput.addEventListener('input', debounce(applyFilters, 500));
