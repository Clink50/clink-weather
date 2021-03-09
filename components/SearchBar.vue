<template>
  <div class="search">
    <input
      type="search"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
    <i class="fas fa-search"></i>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: () => null,
    },
    placeholder: {
      type: String,
      required: true,
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

  i {
    position: absolute;
    top: 50%;
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
