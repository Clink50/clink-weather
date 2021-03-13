<template>
  <div class="btn-container">
    <button @click="changeDegree">
      <span :class="{ active: weather.unit === 'F' }">F</span>
      <span class="slash"></span>
      <span :class="{ active: weather.unit === 'C' }">C</span>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('weather', ['weather']),
  },
  methods: {
    ...mapActions('weather', ['toggleDegrees']),

    changeDegree() {
      this.degree = !this.degree;
      this.toggleDegrees();
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-container {
  position: absolute;
  top: 1rem;
  right: 2rem;

  @media screen and (min-width: 767px) {
    position: initial;
    margin-left: 5rem;
  }

  @media screen and (min-width: 1024px) {
    position: initial;
    margin-left: 0;
    flex: 1;
    text-align: right;
  }

  button {
    background: var(--white);
    padding: 0.75rem 7vmin;
    font-size: 1.8rem;
    font-family: var(--main-font);
    border-radius: 3rem;
    outline: none;
    border: none;
    position: relative;
    cursor: pointer;

    @media screen and (min-width: 767px) {
      padding: 0.8rem 5.5rem;
    }

    span {
      font-weight: 500;
      color: var(--gray-5);
      margin: 1rem;

      &.slash {
        margin: 0;
        border-top: 1px solid var(--dark-gray);
        width: 25px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(120deg);
      }

      &.active {
        color: var(--light-blue);
      }
    }
  }
}
</style>
