<template>
  <div class="card-container">
    <div class="left">
      <h3>{{ title }}</h3>
      <h1>{{ data }}</h1>
    </div>
    <img :src="require(`~/assets/img/${icon}`)" :alt="title" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 3rem;
  background: var(--white);
  box-shadow: 0px 3px 6px var(--gray-2);
  border-radius: 4px;
  opacity: 0.85;

  .left {
    display: flex;
    flex-direction: column;
    margin-right: 4.5rem;

    h3 {
      text-transform: capitalize;
      margin-bottom: 0.8rem;
      color: var(--text);
      opacity: 0.6;
      font-size: 1.9rem;
      font-weight: 500;
      text-align: left;
      text-transform: uppercase;
    }

    h1 {
      color: var(--text);
      opacity: 0.85;
      font-size: 3.4rem;
      font-weight: 500;
    }
  }
}
</style>
