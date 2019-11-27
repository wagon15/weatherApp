'use strict';

import {weatherAPI} from './Weather.js';
import {weatherHtml} from './UI.js';

const   form = document.getElementById('weatherForm'),
        inputField = document.getElementById('city'),
        metricUnitsField = document.getElementById('metric'),
        imperialUnitsField = document.getElementById('imperial');

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
                    weatherHtml.updateWeatherView(weatherAPI.currentData)

                    weatherAPI.getForcastByName(inputField.value)
                        .catch( error => {
                            weatherHtml.errorNotify('The city data was not found. Please try again or correct the city name.');
                        });
                        
                })
                .catch( error => {
                    weatherHtml.errorNotify('The city data was not found. Please try again or correct the city name.');
                });

    } else {
        weatherHtml.errorNotify('Check input field. Write name of desired city.')
    }
};

// Switch units
metricUnitsField.onclick = (event) => {
    weatherHtml.updateWeatherView(weatherAPI.currentData, 'metric');
};

imperialUnitsField.onclick = (event) => {
    weatherHtml.updateWeatherView(weatherAPI.currentData, 'imperial');
};
