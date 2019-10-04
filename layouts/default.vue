<template>
  <v-app>
    <!-- navigation drawer component -->
    <MobileNav></MobileNav>

    <!-- header -->
    <Header></Header>

    <!-- nuxt content -->
    <v-content class="white">
      <v-container class="white">
        <nuxt class="white" />
      </v-container>
    </v-content>

    <!-- footer -->
    <v-footer
      app
    >
      <v-spacer></v-spacer>
      <span>McMaster Kinesiology Biomechanics</span>
    </v-footer>
  </v-app>
</template>

<script>
import MobileNav from '@/components/navigation/mobileNav'
import Header from '@/components/navigation/header'


export default {
  data () {
    return {

    }
  },
  components: {
    MobileNav,
    Header,
  }
}
</script>
