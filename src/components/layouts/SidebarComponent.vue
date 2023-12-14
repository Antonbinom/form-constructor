<template lang="pug">
.sidebar
  router-link.logo(to="/")
    img.logo-img(src="@/assets/img/logo.png")
  slot
</template>

<style lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 0 var(--radius) var(--radius) 0;
}
.logo {
  display: inline-block;
  margin-bottom: 30px;
}
</style>
