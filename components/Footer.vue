<template>
  <footer>
    <p>
      Design from
      <a href="https://bigsondev.com/projects/weather-app-project/" target="_blank">BigsonDev</a>.
      Coded by Travis Clinkscales.
    </p>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: center;
  padding: 4.1rem 0; // Makes the footer an even height of 100px
  font-family: var(--main-font);
  letter-spacing: 1px;
  color: var(--white);

  p {
    text-align: center;
    line-height: 2;

    @media screen and (min-width: 767px) {
      text-align: initial;
      line-height: initial;
    }
    a {
      color: var(--opaque-white);
      text-decoration: none;
      transition: color 0.2s ease-out;
    }
  }
}
</style>
