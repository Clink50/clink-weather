// const BY_LOCATION_URL = '/weather';
const BY_LAT_LONG_URL = '/onecall';
const BY_LOCATION_URL = '/locations/';

const iconMap = (iconId) => {
  switch (true) {
    case iconId >= 200 && iconId < 600:
      return 'raindrop.svg';
    case iconId >= 600 && iconId < 700:
      return 'snowflake.svg';
    case iconId === 800:
      return 'sun.svg';
    case iconId >= 700 && iconId < 800:
    case iconId > 800 && iconId < 900:
      return 'cloudy.svg';
  }
};

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
    icon: {
      image: '',
      alt: '',
    },
    location: {
      area: '',
      latitude: 0,
      longitude: 0,
    },
    hourly: [],
  },
});

export const mutations = {
  convertTemp: (state, tempData) => {
    state.weather = {
      ...state.weather,
      ...tempData,
    };
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
    const tempData =
      state.weather.unit === 'C'
        ? {
            unit: 'F',
            temp: Math.round((state.weather.temp * 9) / 5 + 32),
            feelsLike: ((state.weather.feelsLike * 9) / 5 + 32).toFixed(1),
            hourly: state.weather.hourly.map((hour) => {
              return {
                ...hour,
                temp: Math.round((hour.temp * 9) / 5 + 32),
              };
            }),
          }
        : {
            unit: 'C',
            temp: Math.round(((state.weather.temp - 32) * 5) / 9),
            feelsLike: (((state.weather.feelsLike - 32) * 5) / 9).toFixed(1),
            hourly: state.weather.hourly.map((hour) => {
              return {
                ...hour,
                temp: Math.round(((hour.temp - 32) * 5) / 9),
              };
            }),
          };

    commit('convertTemp', tempData);
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
        sunrise: new Date(weatherDetails.current.sunrise * 1000)
          .toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
          .toLowerCase()
          .replace(/\s+/g, ''),
        sunset: new Date(weatherDetails.current.sunset * 1000)
          .toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
          .toLowerCase()
          .replace(/\s+/g, ''),
        precipitation: weatherDetails.daily[0].pop,
        humidity: weatherDetails.current.humidity,
        wind: Math.round(weatherDetails.current.wind_speed),
        pressure: weatherDetails.current.pressure,
        feelsLike: weatherDetails.current.feels_like.toFixed(1),
        visibility: Math.round(weatherDetails.current.visibility * 0.00062137119224),
        icon: {
          image: iconMap(weatherDetails.current.weather[0].id),
          alt: weatherDetails.current.weather[0].description,
        },
        hourly: weatherDetails.hourly
          .map((hour) => {
            return {
              time: new Date(hour.dt * 1000)
                .toLocaleTimeString([], { hour: '2-digit', timeZone: weatherDetails.timezone })
                .toLowerCase()
                .replace(/^0(?:0:0?)?/, ''),
              icon: {
                image: iconMap(hour.weather[0].id),
                alt: hour.weather[0].description,
              },
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
