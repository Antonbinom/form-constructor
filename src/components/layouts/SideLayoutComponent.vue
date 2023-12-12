<template lang="pug">
.side-layout
  router-link.logo(to="/")
    img.logo-img(src="@/assets/img/logo.png")
  slot
</template>

<style lang="scss">
.side-layout {
  padding: 80px 95px 62px 164px;
  background-color: #fff;
  border-radius: 0 var(--radius) var(--radius) 0;
}
.logo {
  display: inline-block;
  margin-bottom: 30px;
}
</style>
