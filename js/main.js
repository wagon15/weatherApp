'use strict';

import {weatherAPI} from './Weather.js';
import {weatherHtml} from './UI.js';

const   form = document.getElementById('weatherForm'),
        inputField = document.getElementById('city'),
        metricUnitsField = document.getElementById('metric'),
        imperialUnitsField = document.getElementById('imperial'),
        btnCurrent = document.getElementById('btnCurrent'),
        btnForcast = document.getElementById('btnForcast'),
        btnAbout = document.getElementById('aboutBtn'),
        closeAboutBtn = document.getElementById('closeAboutBtn');

// Case when target submitted by the input field
form.onsubmit = (event) => {
    event.preventDefault();

    // Check if input is not empty
    if (inputField.value) {
        // Loading spinner
        weatherHtml.toggleSpinner();
            weatherAPI.getCurrentByName(inputField.value)
                .then( () => {
                    weatherHtml.toggleSpinner();
                    weatherHtml.showCurrentWeather(weatherAPI.currentData)

                    weatherAPI.getForcastByName(inputField.value)
                        .catch( error => {
                            weatherHtml.errorNotify('The city data was not found. Please try again or correct the city name.');
                        });
                        
                })
                .catch( error => {
                    weatherHtml.errorNotify('The city data was not found. Please try again or correct the city name.');
                });

    } else {
        weatherHtml.errorNotify('Check input field and name of desired city.')
    }
};

// Switch units
metricUnitsField.onclick = (event) => {
    weatherHtml.updateWeatherView(weatherAPI.currentData, 'metric');
};

imperialUnitsField.onclick = (event) => {
    weatherHtml.updateWeatherView(weatherAPI.currentData, 'imperial');
};

// Switch current / forcast view
btnForcast.onclick = (event) => {
    weatherHtml.showForcastWeather(weatherAPI.forcastData);

};
btnCurrent.onclick = (event) => {
    weatherHtml.showCurrentWeather(weatherAPI.currentData);
}

// Display about popup
btnAbout.onclick = (event) => {
    weatherHtml.toggleAbout(event);
};
closeAboutBtn.onclick = (event) => {
    weatherHtml.toggleAbout(event);
}
    // Toggle when click outside of about section
    const aboutContainer = document.createElement('section');
window.onclick = (event) => {
    weatherHtml.toggleAbout(event);
}