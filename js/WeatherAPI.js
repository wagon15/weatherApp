class WeatherAPI {
    constructor() {
        this.APIkey = '973707a812cd342f5091c5434be7c96b';
        this.units = 'metric';
        this.currentData = null;
        this.forcastData = null;
    }

    async getCurrentByCoords( latitude, longitude) {
        const respones = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${this.units}&APPID=${this.APIkey}`);
        if (!respones.ok) {
            this.currentData = null;
            throw new Error(`Bad response: ${respones.status}, ${respones.statusText}`);
        }
        const data = await respones.json();
        this.currentData = {
            locationName: data.name,
            country: data.sys.country,
            weather: data.weather[0].main,
            iconId: data.weather[0].icon,
            temp: Math.round(data.main.temp),
            minTemp: Math.round(data.main.temp_min),
            maxTemp: Math.round(data.main.temp_max),
            atmPressure: data.main.pressure,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            windDir: data.wind.deg
        };
    }

    async getCurrentByName(cityName) {
       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.toLowerCase()}&units=${this.units}&appid=${this.APIkey}`);
        if (!response.ok) {
            this.currentData = null;
            throw new Error(`Bad response: ${response.status}, ${response.statusText}`);
        }
        const data = await response.json();
        this.currentData = {
            locationName: data.name,
            country: data.sys.country,
            weather: data.weather[0].main,
            iconId: data.weather[0].icon,
            temp: Math.round(data.main.temp),
            minTemp: Math.round(data.main.temp_min),
            maxTemp: Math.round(data.main.temp_max),
            atmPressure: data.main.pressure,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            windDir: data.wind.deg
        };
    }

    async getForcastByCoords(latitude, longitude) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${this.units}&APPID=${this.APIkey}`);
        if (!response.ok) {
            this.forcastData = null;
            throw new Error(`Bad response: ${response.status}, ${response.statusText}`);
        }
        const data = await response.json();
        this.forcastData = {
            locationName: data.city.name,
            country: data.city.country,
            dayList: []
        };
        // Response contain 8 measures per day, thus iteration by 8
        for (let i = 7; i < data.list.length; i += 8) {
            this.forcastData.dayList.push({
                iconId: data.list[i].weather[0].icon,
                weather: data.list[i].weather[0].main,
                temp: Math.round(data.list[i].main.temp),
                humidity: data.list[i].main.humidity,
                windSpeed: Math.round(data.list[i].wind.speed),
                date: new Date(data.list[i].dt_txt)
            });
        }
    }

    async getForcastByName(cityName) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${this.units}&APPID=${this.APIkey}`);
        if (!response.ok) {
            this.forcastData = null;
            throw new Error(`Bad response: ${response.status}, ${response.statusText}`);
        }
        const data = await response.json();
        this.forcastData = {
            locationName: data.city.name,
            country: data.city.country,
            dayList: []
        };
        // Response contain 8 measures per day, thus iteration by 8
        for (let i = 7; i < data.list.length; i += 8) {
            this.forcastData.dayList.push({
                iconId: data.list[i].weather[0].icon,
                weather: data.list[i].weather[0].main,
                temp: Math.round(data.list[i].main.temp),
                humidity: data.list[i].main.humidity,
                windSpeed: Math.round(data.list[i].wind.speed),
                date: new Date(data.list[i].dt_txt)
            });
        }
    }

}

export const weatherAPI = new WeatherAPI();