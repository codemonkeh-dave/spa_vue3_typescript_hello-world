<template>
  <div class="page-layout">
    <NavBar />
    <div class="page-layout__content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/footer";
import NavBar from "./components/nav-bar";

export default {
  components: { Footer, NavBar },
};
</script>
