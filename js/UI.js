class WeatherHtml {
    constructor() {
        this.locationContainer = document.getElementById('location');
        this.weatherContainer = document.getElementById('weatherContainer');
        this.weatherBtnContainer = document.getElementById('weatherBtnContainer');
        this.btnCurrent = document.getElementById('btnCurrent');
        this.btnForcast = document.getElementById('btnForcast');
        this.metricUnitsField = document.getElementById('metric');
        this.imperialUnitsField = document.getElementById('imperial');
        this.aboutContainer = document.getElementById('aboutContainer');
        this.units = 'metric';
    }

    toggleSpinner() {
        // Remove all elements
        this.weatherContainer.innerHTML = this.weatherContainer.innerHTML === `<div class="lds-dual-ring"></div>` ? '' : `<div class="lds-dual-ring"></div>` ;
    }

    errorNotify(content) {
        this.locationContainer.innerHTML = '';
        this.weatherBtnContainer.classList.remove('weatherSection__btnContainer--isVisible');
        this.weatherContainer.innerHTML = 
            `<div class="weatherSection__error">
                <img src="./media/warning-icon.png" alt="Error flag"/>
                <p>${content}</p>
            </div>`;

        setTimeout( () => {
            this.weatherContainer.innerHTML = '';
        }, 5000);
    }

    showCurrentWeather(data){

        this.locationContainer.innerText = `${data.locationName}, ${data.country}`;

        this.weatherContainer.innerHTML = `
            <img class="weatherSection__icon" id="currentIcon" src="./media/${this.assignWeatherIcon(data.iconId)}" alt="${data.weather}">
            <p class="weatherSection__mainInfo weatherSection__highlighted" >${data.weather}</p>
            <p class="weatherSection__info" >Current temperature: <span class="weatherSection__highlighted">${
                this.units === 'metric' ? (data.temp + '&deg;C')  : (this.tempToFarenheit(data.temp)+'&deg;F')}
            </span></p>
            <p class="weatherSection__info" >Min. temperature: <span class="weatherSection__highlighted">${
                this.units === 'metric' ? (data.minTemp + '&deg;C')  : (this.tempToFarenheit(data.temp)+'&deg;F')}
                </span></p>
            <p class="weatherSection__info" >Max. temperature: <span class="weatherSection__highlighted">${
                this.units === 'metric' ? (data.maxTemp + '&deg;C')  : (this.tempToFarenheit(data.maxTemp)+'&deg;F')}
                </span></p>
            <p class="weatherSection__info" >Atmospheric pressure: <span class="weatherSection__highlighted">${data.atmPressure}hPa</span></p>
            <p class="weatherSection__info" >Humidity: <span class="weatherSection__highlighted">${data.humidity}%</span></p>
            <p class="weatherSection__info" >Wind: <span class="weatherSection__highlighted">${
                this.units === 'metric' ? (this.windSpeedToKmpH(data.windSpeed) + 'km/h') : (this.windSpeedToMipH(data.windSpeed) + 'mi/h') }, ${this.windDirToNEWS(data.windDir)}</span></p>`;

        this.weatherBtnContainer.classList.add('weatherSection__btnContainer--isVisible');
        this.btnCurrent.classList.add('weatherSection__btn--isActive');
        this.btnForcast.classList.remove('weatherSection__btn--isActive');

    }

    updateWeatherView(data, units = 'metric') {
        if(units === 'metric') {
            this.metricUnitsField.classList.add('headerSection__units--isActive');
            this.imperialUnitsField.classList.remove('headerSection__units--isActive');
        } else {
            this.imperialUnitsField.classList.add('headerSection__units--isActive');
            this.metricUnitsField.classList.remove('headerSection__units--isActive');
        }

        this.units = units;

        if( data !== null) {
            weatherHtml.showCurrentWeather(data)
        }
    }

    showForcastWeather(data){

        let output = '<div class="weatherSection__forcast">';

        data.dayList.forEach( elem => {
            output += `
            <div class="weatherSection__forcastTile"> 
                <img class="weatherSection__icon" id="currentIcon" src="./media/${this.assignWeatherIcon(elem.iconId)}" alt="${elem.weather}">
                <p class="weatherSection__mainInfo weatherSection__header">${elem.date.toLocaleDateString('en-US', { weekday: 'long'})}</p>
                <p class="weatherSection__info">${elem.date.toLocaleDateString('en-US')}</p>
                <p class="weatherSection__info">Temperature: <span class="weatherSection__highlighted">${
                    this.units === 'metric' ? (elem.temp + '&deg;C')  : (this.tempToFarenheit(elem.temp)+'&deg;F')}
                </span></p>
                <p class="weatherSection__info">Humidity: <span class="weatherSection__highlighted">${elem.humidity}%</span></p>
                <p class="weatherSection__info">Wind: <span class="weatherSection__highlighted">${
                    this.units === 'metric' ? (this.windSpeedToKmpH(elem.windSpeed) + 'km/h') : (this.windSpeedToMipH(elem.windSpeed) + 'mi/h') }</span></p>
                
            </div>`;
        });
        output += '</div>';

        this.weatherContainer.innerHTML = output;
        this.btnForcast.classList.add('weatherSection__btn--isActive');
        this.btnCurrent.classList.remove('weatherSection__btn--isActive');
    }

    toggleAbout(event) {
        if(event.target.matches('#aboutBtn') || event.target.matches('#closeAboutBtn')){
            event.stopPropagation();
            this.aboutContainer.classList.toggle('aboutContainer--isVisible');
        } else if( this.aboutContainer.classList.contains('aboutContainer--isVisible') 
        && !event.target.closest('#aboutSection'))
            this.aboutContainer.classList.remove('aboutContainer--isVisible');
        
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
                break;

            case '13d':
            case '13n':
            case '50d':
            case '50n':
                myIconId = 'snowy-6.svg';
                break;
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