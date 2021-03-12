// const BY_LOCATION_URL = '/weather';
const BY_LAT_LONG_URL = '/onecall';
const BY_LOCATION_URL = '/locations/';

export const state = () => ({
  weather: {
    temp: 0,
    unit: 'F',
    sunrise: '',
    sunset: '',
    precipitation: 0,
    humidity: 0,
    wind: '',
    pressure: 0,
    feelsLike: 0,
    visibility: 0,
    location: {
      area: '',
      latitude: 0,
      longitude: 0,
    },
    hourly: [],
  },
});

export const mutations = {
  convertTemp: (state, { temp, unit }) => {
    state.weather.temp = Math.round(temp);
    state.weather.unit = unit;
  },
  updateLocation: (state, location) => {
    state.weather.location = {
      ...location,
      area: location.area
        .split(',')
        .filter((_, index, arr) => index !== arr.length - 1)
        .join(','),
    };
  },
  updateWeather: (state, weatherData) => {
    state.weather = {
      ...state.weather,
      ...weatherData,
    };
  },
};

export const actions = {
  toggleDegrees: ({ commit, state }) => {
    if (state.weather.unit === 'C') {
      commit('convertTemp', {
        temp: (state.weather.temp * 9) / 5 + 32,
        unit: 'F',
      });
    } else {
      commit('convertTemp', {
        temp: ((state.weather.temp - 32) * 5) / 9,
        unit: 'C',
      });
    }
  },
  getCityByLatLong: async ({ commit }, data) => {
    try {
      const nearestCityUrl =
        data.$config.cityFinderBaseUrl +
        BY_LOCATION_URL +
        `${data.coords.latitude},${data.coords.longitude}`;
      const nearestCityResponse = await fetch(nearestCityUrl);
      const { _embedded } = await nearestCityResponse.json();
      const cityResponse = await fetch(
        _embedded['location:nearest-cities'][0]._links['location:nearest-city'].href
      );
      const { full_name: area } = await cityResponse.json();
      commit('updateLocation', {
        area,
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      });
    } catch (err) {
      throw new Error(
        `Unable to retrieve the city at (${data.coords.latitude}, ${data.coords.longitude})`
      );
    }
  },
  getCurrentWeather: async ({ commit, state }, data) => {
    try {
      const unit = state.weather.unit === 'F' ? 'imperial' : 'metric';
      const weatherResponse = await fetch(
        `${data.$config.openWeatherBaseUrl}${BY_LAT_LONG_URL}?lat=${data.coords.latitude}&lon=${data.coords.longitude}&units=${unit}&exclude=minutely&appid=${data.$config.openWeatherApiKey}`
      );
      const weatherDetails = await weatherResponse.json();

      const weatherData = {
        temp: Math.round(weatherDetails.current.temp),
        sunrise: weatherDetails.current.sunrise,
        sunset: weatherDetails.current.sunset,
        precipitation: weatherDetails.daily[0].pop,
        humidity: weatherDetails.current.humidity,
        wind: Math.round(weatherDetails.current.wind_speed),
        pressure: weatherDetails.current.pressure,
        feelsLike: weatherDetails.current.feels_like.toFixed(1),
        visibility: Math.round(weatherDetails.current.visibility * 0.00062137119224),
        hourly: weatherDetails.hourly
          .map((hour) => {
            return {
              time: hour.dt,
              weatherImage: hour.weather[0].main,
              weatherAlt: hour.weather[0].description,
              temp: Math.round(hour.temp),
            };
          })
          .splice(1, 9),
      };

      commit('updateWeather', weatherData);
    } catch (err) {
      throw new Error('Could not retieve weather data.');
    }
  },
};

export const getters = {};
