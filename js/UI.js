class WeatherHtml {
    constructor() {
        this.weatherSection = document.getElementById('weather-section');
        this.weatherContainer = document.getElementById('weather-container');
        this.metricUnitsField = document.getElementById('metric');
        this.imperialUnitsField = document.getElementById('imperial');
        this.units = null;
    }

    toggleSpinner() {
        // Remove all elements
        this.weatherSection.innerHTML = this.weatherSection.innerHTML === `<div class="lds-dual-ring"></div>` ? '' : `<div class="lds-dual-ring"></div>` ;
        
    }

    errorNotify(content) {
        this.weatherSection.innerHTML = 
            `<div class="error">
                <img src="#" alt="Error flag"/>
                <p>${content}</p>
            </div>`;

        setTimeout( () => {
            this.weatherSection.innerHTML = '';
        }, 5000);
    }

    showCurrentWeather(data, units = 'metric'){

        this.weatherSection.innerHTML = 
            `<h2 id="location">${data.locationName}, ${data.country}</h2>
            <div id="weahther-container">
                <img id="current-icon" src="./media/${this.assignWeatherIcon(data.iconId)}" alt="${data.weather}">
                <p>${data.weather}</p>
                <p>Current temperature: <span>${
                    units === 'metric' ? (data.temp + '&deg;C')  : (this.tempToFarenheit(data.temp)+'&deg;F')}
                </span></p>
                <p>Min. temperature: <span>${
                    units === 'metric' ? (data.minTemp + '&deg;C')  : (this.tempToFarenheit(data.temp)+'&deg;F')}
                    </span></p>
                <p>Max. temperature: <span>${
                    units === 'metric' ? (data.maxTemp + '&deg;C')  : (this.tempToFarenheit(data.maxTemp)+'&deg;F')}
                    </span></p>
                <p>Atmospheric pressure: <span>${data.atmPressure}hPa</span></p>
                <p>Humidity: <span>${data.humidity}%</span></p>
                <p>Wind: <span>${
                    units === 'metric' ? (this.windSpeedToKmpH(data.windSpeed) + 'km/h') : (this.windSpeedToMipH(data.windSpeed) + 'mi/h') }, ${this.windDirToNEWS(data.windDir)}</span></p>
            </div>
            <div>
                <button>Current</button>
                <button>Forcast</button>
            </div>`
    }

    updateWeatherView(data, units = 'metric') {
        if(units === 'metric') {
            this.metricUnitsField.classList.add('is-active');
            this.imperialUnitsField.classList.remove('is-active');
        } else {
            this.imperialUnitsField.classList.add('is-active');
            this.metricUnitsField.classList.remove('is-active');
        }

        this.units = units;

        if( data !== null) {
            weatherHtml.showCurrentWeather(data, units)
        }
    }

    showForcastView(data){

        let output = '';

        data.dayList.forEach( elem => {
            output += `
            <div> 
                <img id="current-icon" src="./media/${this.assignWeatherIcon(elem.iconId)}" alt="${elem.weather}">
                <p>${elem.weather}</p>
                <p>Current temperature: <span>${
                    this.units === 'metric' ? (elem.temp + '&deg;C')  : (this.tempToFarenheit(elem.temp)+'&deg;F')}
                </span></p>
                <p>Humidity: <span>${elem.humidity}%</span></p>
                <p>Wind: <span>${
                    this.units === 'metric' ? (this.windSpeedToKmpH(elem.windSpeed) + 'km/h') : (this.windSpeedToMipH(elem.windSpeed) + 'mi/h') }, ${this.windDirToNEWS(data.windDir)}</span></p>
                <p>${elem.date.toLocaleDateString('en-US', { weekday: 'long'})}</p>
                <p>${elem.date.toLocaleDateString('en-US')}</p>
            </div>`;
        });

        this.weatherContainer.innerHTML = output;
    }

    windSpeedToKmpH(speed) {
        return Math.round(speed / 1000 * 3600);
    }

    windSpeedToMipH(speed) {
        return Math.round(speed * 2.237);
    }

    windDirToNEWS(direction) {
        let directionNEWS;
        
        if (337.5 <= direction || direction < 22.5)
            directionNEWS = 'N';
        else if (direction < 67.5)
            directionNEWS = 'NE';
        else if (direction < 112.5)
            directionNEWS = 'E';
        else if (direction < 157.5)
            directionNEWS = 'SE';
        else if (direction < 202.5)
            directionNEWS = 'S';
        else if (direction < 247.5)
            directionNEWS = 'SW';
        else if (direction < 292.5)
            directionNEWS = 'W';
        else if (direction < 337.5)
            directionNEWS = 'NW';

        return directionNEWS;
    }

    assignWeatherIcon(APIWeaterIconId) {
        let myIconId;
        switch (APIWeaterIconId){
            case '01d':
                myIconId = 'day.svg';
                break;
            case '01n':
                myIconId = 'night.svg';
                break;
            case '02d':
                myIconId = 'cloudy-day-3.svg'
                break;
            case '02n':
                myIconId = 'cloudy-night-3.svg';
                break;
            case '03d':
            case '03n':
            case '04d':
            case '04n':
                myIconId = 'cloudy.svg';
                break;
            case '09d':
            case '09n':
                myIconId = 'rainy-5.svg';
                break;
            case '10d':
            case '10n':
                myIconId = 'rainy-6.svg';
                break;
            case '11d':
            case '11n':
                myIconId = 'thunder.svg';
            case '13d':
            case '13n':
            case '50d':
            case '50n':
                myIconId = 'snowy-6.svg';
            default:
                myIconId = 'cloudy.svg';
        }

        return myIconId;
    }

    tempToFarenheit(temp){
        return Math.round((temp * 9/5) + 32);
    }
}

export const weatherHtml = new WeatherHtml();