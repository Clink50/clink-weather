<template>
  <div class="search">
    <input
      :value="value"
      type="text"
      :placeholder="placeholder"
      @input="onChange"
      @keyup.down="onArrowDown"
      @keyup.up="onArrowUp"
      @keyup.enter="onEnter"
    />
    <ul v-show="isOpen" class="suggestions" :style="`height: ${height}`">
      <li
        v-for="(result, index) in results"
        :key="index"
        class="suggestion"
        :class="{ 'is-active': index === arrowCounter }"
        @click="setResult(result)"
      >
        {{ result.name }}
      </li>
    </ul>
    <i class="fas fa-search"></i>
  </div>
</template>

<script>
import { UNITED_STATES } from '@/constants/index';

export default {
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: () => null,
    },
  },
  data() {
    return {
      isOpen: false,
      results: [],
      search: '',
      arrowCounter: -1,
    };
  },
  computed: {
    height() {
      if (this.results !== 0) {
        const totalChildrenHeight = 40 * this.results.length; // 40 is height of single li item
        return `${totalChildrenHeight}px`;
      } else {
        return 0;
      }
    },
  },
  watch: {
    items(val, oldValue) {
      // actually compare them
      if (val.length !== oldValue.length) {
        this.results = val;
      }
    },
    async value(search) {
      const BY_CITY_URL = '/cities';

      if (search?.length < 2) return;
      try {
        const url = `${this.$config.cityFinderBaseUrl}${BY_CITY_URL}${
          search.length < 5
            ? '?search=' + search + ', ' + UNITED_STATES + '&limit=10'
            : '?search=' + search + '&limit=5'
        }`;
        const response = await fetch(url);
        if (!response.ok) {
          console.error(response);
        } else {
          const { _embedded } = await response.json();
          const cities = _embedded['city:search-results']
            .map((city) => {
              return { name: city.matching_full_name, cityDetails: city._links['city:item'].href };
            })
            .filter(({ name }) => !name.match(/\(\w+\)/gi));
          this.results = cities;
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    onChange(event) {
      this.$emit('input', event.target.value);
      this.filterResults(event.target.value);
      this.isOpen = true;
    },
    filterResults(value) {
      this.results = this.results.filter(({ name }) =>
        value ? name.toLowerCase().includes(value.toLowerCase()) : null
      );
    },
    async setResult(result) {
      try {
        const response = await fetch(result.cityDetails);
        if (!response.ok) {
          console.error(response);
        } else {
          const { location, full_name: fullName } = await response.json();
          this.$emit('result', {
            area: fullName,
            latitude: location.latlon.latitude,
            longitude: location.latlon.longitude,
          });
          this.isOpen = false;
        }
      } catch (err) {
        console.error(err);
      }
    },
    onArrowDown() {
      if (this.isOpen) {
        if (this.arrowCounter < this.results.length - 1) {
          this.arrowCounter = this.arrowCounter + 1;
          this.$emit('result', this.results[this.arrowCounter]);
        } else {
          this.arrowCounter = 0;
          this.$emit('result', this.results[this.arrowCounter]);
        }
      }
    },
    onArrowUp() {
      if (this.isOpen) {
        if (this.arrowCounter > 0) {
          this.arrowCounter = this.arrowCounter - 1;
          this.$emit('result', this.results[this.arrowCounter]);
        } else {
          this.arrowCounter = this.results.length - 1;
          this.$emit('result', this.results[this.arrowCounter]);
        }
      }
    },
    onEnter() {
      this.$emit('result', this.results[this.arrowCounter]);
      this.isOpen = false;
      this.arrowCounter = -1;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  font-size: 1.6rem;
  position: relative;
  flex: 2;

  input {
    border-radius: 0;
    background: transparent;
    width: 100%;
    padding: 0.8rem;
    font-size: inherit;
    border: none;
    border-bottom: 2px solid #ffffff55;
    color: var(--white);
    outline: none;
    font-family: var(--main-font);

    @media screen and (min-width: 767px) {
      padding: 0.8rem 0 0.8rem;
    }

    &::placeholder {
      color: var(--white);
      opacity: 0.6;
    }
  }

  .suggestions {
    background: var(--white);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    height: 0;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    transition: height 0.5s;
    position: absolute;
    width: 100%;

    .suggestion {
      padding: 1rem;
      list-style: none;
      border-top: 1px solid #ddd;
      cursor: pointer;
      font-weight: 100;

      &:hover,
      &.is-active {
        background: #ddd;
      }

      &:last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }

  i {
    position: absolute;
    top: 2rem;
    right: 0;
    transform: translateY(-50%);
    color: var(--white);
    opacity: 0.6;
  }
}

input[type='text']::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}

input[type='text']::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}

input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  display: none;
}
</style>
