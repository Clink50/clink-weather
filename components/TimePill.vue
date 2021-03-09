<template>
  <div class="pill-container">
    <p>{{ time }}</p>
    <div class="pill">
      <img :src="require(`~/assets/img/${weatherImage}`)" :alt="weatherAlt" />
      <p>{{ degrees }}&deg;</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      required: true,
    },
    weatherImage: {
      type: String,
      required: true,
    },
    weatherAlt: {
      type: String,
      required: true,
    },
    degrees: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scope>
.pill-container {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;

  p {
    margin-bottom: 1rem;
    font-size: 2.2rem;
  }

  .pill {
    background: var(--gray-4);
    border-radius: 40px;
    border: 1px solid var(--white);
    padding: 0.25rem 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;

    img {
      padding: 1rem 0;
      flex: 1;
    }

    p {
      font-size: 2.6rem;
      font-weight: 500;
    }
  }
}
</style>
