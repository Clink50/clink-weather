<template>
  <main class="container">
    <div class="header">
      <SearchBar placeholder="E.g. Warsaw" />
      <DegreeButton />
    </div>
    <div class="weather-content">
      <div class="weather-content__current">
        <div class="weather-content__current--top">
          <div class="date">
            <h3>Today</h3>
            <p>Wed, 17 Feb</p>
          </div>
          <div class="weather">
            <img src="~/assets/img/snowflake.svg" alt="snowflake" />
          </div>
        </div>
        <div class="weather-content__current--middle">
          <h1 class="degrees">{{ degrees }}&deg;</h1>
        </div>
        <div class="weather-content__current--bottom">
          <h2 class="location">
            <img src="~/assets/img/location.svg" alt="location pinpoint" />
            Cracow, Poland
          </h2>
        </div>
      </div>
      <div class="weather-content__times">
        <div class="pills">
          <TimePill
            v-for="({ time, weatherImage, weatherAlt, degrees }, index) in times"
            :key="index"
            :time="time"
            :weather-image="weatherImage"
            :weather-alt="weatherAlt"
            :degrees="degrees"
          />
        </div>
      </div>
    </div>
    <hr />
    <div class="weather-details">
      <h2>Weather Details</h2>
      <div class="cards">
        <DetailCard
          v-for="({ title, data, icon, iconAlt }, index) in cards"
          :key="index"
          :title="title"
          :data="data"
          :icon="icon"
          :icon-alt="iconAlt"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      times: [
        {
          time: 'Now',
          weatherImage: 'sun.svg',
          weatherAlt: 'Sunny',
          degrees: 2,
        },
        {
          time: '12pm',
          weatherImage: 'cloudy.svg',
          weatherAlt: 'cloudy',
          degrees: -1,
        },
        {
          time: '1pm',
          weatherImage: 'cloudy.svg',
          weatherAlt: 'cloudy',
          degrees: -1,
        },
        {
          time: '2pm',
          weatherImage: 'cloudy.svg',
          weatherAlt: 'cloudy',
          degrees: -2,
        },
        {
          time: '3pm',
          weatherImage: 'cloudy.svg',
          weatherAlt: 'cloudy',
          degrees: -3,
        },
        {
          time: '4pm',
          weatherImage: 'cloudy.svg',
          weatherAlt: 'cloudy',
          degrees: -3,
        },
        {
          time: '5pm',
          weatherImage: 'cloudy.svg',
          weatherAlt: 'cloudy',
          degrees: -1,
        },
        {
          time: '6pm',
          weatherImage: 'cloudy.svg',
          weatherAlt: 'cloudy',
          degrees: 0,
        },
      ],
      cards: [
        {
          title: 'Sunrise',
          data: '06:47am',
          icon: 'sunrise.svg',
        },
        {
          title: 'Sunset',
          data: '05:04pm',
          icon: 'sunset.svg',
        },
        {
          title: 'Precipitation',
          data: '60%',
          icon: 'raindrop.svg',
        },
        {
          title: 'Humidity',
          data: '15%',
          icon: 'humidity.svg',
        },
        {
          title: 'Wind',
          data: '17 km/h',
          icon: 'sunrise.svg',
        },
        {
          title: 'Pressure',
          data: '1021 hPa',
          icon: 'pressure.svg',
        },
        {
          title: 'Feels like',
          data: '26.6°',
          icon: 'sunrise.svg',
        },
        {
          title: 'Visibility',
          data: '50 km',
          icon: 'visibility.svg',
        },
      ],
    };
  },
  computed: {
    ...mapState('weather', ['degrees']),
  },
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: calc(100vh - 10rem);
  padding: 0 2rem;

  @media screen and (min-width: 767px) {
    width: 65rem;
  }

  @media screen and (min-width: 1024px) {
    width: 90rem;
  }

  @media screen and (min-width: 1440px) {
    width: 136.6rem;
  }

  .header {
    margin: 6.4rem 0 2.4rem;

    @media screen and (min-width: 767px) {
      display: flex;
    }
  }

  .weather-content {
    margin-top: 2rem;
    color: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (min-width: 1024px) {
      margin-top: 10rem;
      flex-direction: row;
    }

    &__current {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-bottom: 5rem;

      @media screen and (min-width: 1024px) {
        margin-bottom: 0;
      }

      &--top {
        display: flex;
        justify-content: center;
        align-items: center;

        .date {
          margin-right: 2.5rem;

          h3 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            font-weight: 400;
          }

          p {
            font-size: 2rem;
          }
        }
      }

      &--middle {
        .degrees {
          font-size: 8rem;
          font-weight: 500;
          margin: 1rem 0;
        }
      }

      &--bottom {
        .location {
          font-size: 3rem;
          font-weight: 400;
        }
      }
    }

    &__times {
      flex: 2;

      .pills {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem 3rem;

        @media screen and (min-width: 425px) {
          gap: 1rem 2rem;
          grid-template-columns: repeat(4, 1fr);
        }

        @media screen and (min-width: 767px) {
          gap: 1rem 6rem;
        }

        @media screen and (min-width: 1024px) {
          display: flex;
          justify-content: center;
          flex-flow: row wrap;
        }

        @media screen and (min-width: 1440px) {
          display: flex;
          justify-content: space-around;
          flex-flow: initial;
          gap: initial;
        }

        .pill-container:first-child .pill {
          background: var(--opaque-white);
        }
      }
    }
  }

  hr {
    width: 100vw;
    left: 50%;
    right: 50%;
    margin: 5rem -50vw;
    position: relative;
    border: 1px solid var(--white);
    opacity: 0.4;

    @media screen and (min-width: 1024px) {
      margin: 10rem -50vw;
    }
  }

  .weather-details {
    text-align: left;
    margin-bottom: 5rem;

    @media screen and (min-width: 1024px) {
      margin-bottom: 10rem;
    }

    h2 {
      font-weight: 400;
      margin-bottom: 4rem;
      color: var(--white);
      opacity: 0.85;
    }

    .cards {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.4rem;

      @media screen and (min-width: 767px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media screen and (min-width: 1440px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
}
</style>
