// Root Module
// export const plugins = [filter];

// Your state value should always be a function to avoid unwanted shared state on the server side.
export const state = () => ({});

export const mutations = {};

export const actions = {
  nuxtClientInit: (context, { error, $config }) => {
    try {
      if (!navigator.geolocation) {
        console.log('Geolocation is not available.');
        return;
      }

      context.commit('weather/setLanguage', navigator.language);

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          context.dispatch('weather/getCityByLatLong', { coords, $config });
          context.dispatch('weather/getCurrentWeather', { coords, $config });
        },
        (err) => {
          throw new Error("Couldn't get current position of user.", err);
        }
      );
    } catch (e) {
      console.log('Error on [nuxtClientInit] action.', e);
      if (e.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(e.response.data);
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log('Error', e.message);
      }
      error('Error on [nuxtClientInit] action.');
    }
  },
  nuxtServerInit: ({ commit }, { error }) => {
    try {
      // const data = await $axios.$get('/posts.json');
      // const postsArray = [];
      // for (const key in data) {
      //   postsArray.push({ ...data[key], id: key });
      // }
      // commit('posts/setPosts', postsArray);
    } catch (e) {
      console.log('Error on [nuxtServerInit] action.', e);
      if (e.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(e.response.data);
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log('Error', e.message);
      }
      error('Error on [nuxtServerInit] action.');
    }
  },
};

export const getters = {};
