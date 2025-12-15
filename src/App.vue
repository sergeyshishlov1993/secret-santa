<!--<script setup lang="ts">-->
<!--import bgDesktop from './assets/1.png'-->
<!--import bgMobile from './assets/2.png'-->
<!--import favIcon from './assets/logo2.png'-->

<!--document.title = 'Secret Santa'-->

<!--const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement || document.createElement('link')-->
<!--link.rel = 'icon'-->
<!--link.href = favIcon-->
<!--document.head.appendChild(link)-->
<!--</script>-->

<!--<template>-->
<!--  <div-->
<!--      class="app-layout"-->
<!--      :style="{-->
<!--      '&#45;&#45;bg-desktop': `url(${bgDesktop})`,-->
<!--      '&#45;&#45;bg-mobile': `url(${bgMobile})`-->
<!--    }"-->
<!--  >-->
<!--    <div class="overlay"></div>-->
<!--    <div class="content">-->
<!--      <router-view />-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<style>-->
<!--:root {-->
<!--  &#45;&#45;red: #D42426;-->
<!--  &#45;&#45;green: #165B33;-->
<!--  &#45;&#45;gold: #F8B229;-->
<!--  &#45;&#45;white: #F8F8F8;-->
<!--}-->

<!--* {-->
<!--  box-sizing: border-box;-->
<!--  scroll-behavior: smooth;-->
<!--  overscroll-behavior: none;-->
<!--}-->

<!--body {-->
<!--  margin: 0;-->
<!--  padding: 0;-->
<!--  background-color: var(&#45;&#45;red);-->
<!--  font-family: 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;-->
<!--  font-size: 20px;-->
<!--  box-sizing: border-box;-->
<!--  scroll-behavior: smooth;-->
<!--  overscroll-behavior: none;-->
<!--  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><text y="20" font-size="20">🍭</text></svg>'), auto;-->
<!--  font-style: normal;-->
<!--}-->

<!--input, button, textarea, select {-->
<!--  font-family: 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;-->
<!--  font-weight: 600 !important;-->
<!--  font-size: 1.5rem;-->
<!--  letter-spacing: 0.5px;-->
<!--  font-style: normal !important;-->

<!--  -webkit-appearance: none;-->
<!--  -moz-appearance: none;-->
<!--  appearance: none;-->

<!--  border-radius: 16px;-->
<!--}-->

<!--h1 {-->
<!--  font-family: 'Mountains of Christmas', cursive, serif !important;-->
<!--  font-weight: 700 !important;-->
<!--  font-size: 3.5rem !important;-->
<!--  letter-spacing: 2px;-->
<!--  font-style: normal;-->
<!--}-->

<!--h2 {-->
<!--  font-family: 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;-->
<!--  font-weight: 700 !important;-->
<!--  font-size: 3rem !important;-->
<!--  font-style: normal !important;-->
<!--}-->

<!--@media (max-width: 768px) {-->
<!--  body,-->
<!--  input,-->
<!--  button,-->
<!--  textarea,-->
<!--  select,-->
<!--  h1,-->
<!--  h2 {-->
<!--    font-style: normal !important;-->
<!--  }-->
<!--}-->
<!--</style>-->

<!--<style scoped>-->
<!--.app-layout {-->
<!--  min-height: 100vh;-->
<!--  width: 100%;-->
<!--  position: relative;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  background-repeat: no-repeat;-->
<!--  background-position: center center;-->
<!--  background-size: cover;-->
<!--  background-attachment: fixed;-->
<!--  background-image: var(&#45;&#45;bg-desktop);-->
<!--}-->

<!--.overlay {-->
<!--  position: absolute;-->
<!--  top: 0;-->
<!--  left: 0;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  background: rgba(0, 0, 0, 0.4);-->
<!--  z-index: 1;-->
<!--}-->

<!--.content {-->
<!--  position: relative;-->
<!--  z-index: 10;-->
<!--  width: 100%;-->
<!--  max-width: 400px;-->
<!--}-->

<!--@media (max-width: 768px) {-->
<!--  .app-layout {-->
<!--    background-image: var(&#45;&#45;bg-mobile);-->
<!--  }-->
<!--}-->
<!--</style>-->


<script setup lang="ts">
import bgDesktop from './assets/1.png'
import bgMobile from './assets/2.png'
import favIcon from './assets/logo2.png'

document.title = 'Secret Santa'

const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement || document.createElement('link')
link.rel = 'icon'
link.href = favIcon
document.head.appendChild(link)
</script>

<template>
  <div
      class="app-layout"
      :style="{
      '--bg-desktop': `url(${bgDesktop})`,
      '--bg-mobile': `url(${bgMobile})`
    }"
  >
    <div class="overlay"></div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style>
:root {
  --red: #D42426;
  --green: #165B33;
  --gold: #F8B229;
  --white: #F8F8F8;
}

* {
  box-sizing: border-box;
}


html, body, #app {

  margin: 0;
  padding: 0;

  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

body {
  background-color: var(--red);
  font-family: 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 20px;
  box-sizing: border-box;
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><text y="20" font-size="20">🍭</text></svg>'), auto;
  font-style: normal;
}

input, button, textarea, select {
  font-family: 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-weight: 600 !important;
  font-size: 1.5rem;
  letter-spacing: 0.5px;
  font-style: normal !important;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border-radius: 16px;
}

h1 {
  font-family: 'Mountains of Christmas', cursive, serif !important;
  font-weight: 700 !important;
  font-size: 3.5rem !important;
  letter-spacing: 2px;
  font-style: normal;
}

h2 {
  font-family: 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-weight: 700 !important;
  font-size: 3rem !important;
  font-style: normal !important;
}

@media (max-width: 768px) {
  body,
  input,
  button,
  textarea,
  select,
  h1,
  h2 {
    font-style: normal !important;
  }
}
</style>

<style scoped>
.app-layout {

  min-height: 100vh;
  width: 100%;
  position: relative;


  display: flex;
  align-items: center;
  justify-content: center;


  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  background-image: var(--bg-desktop);
  padding: 10px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.content {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 400px;
}

@media (max-width: 768px) {
  .app-layout {
    background-image: var(--bg-mobile);
  }
}
</style>