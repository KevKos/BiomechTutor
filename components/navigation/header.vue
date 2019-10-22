<template>
    <v-app-bar
      fixed
      app
      color="blue darken-4"
    >
       <v-btn
       text
       large
       color="white"
       style="letter-spacing: 0px; text-transform: none;"
       to="/"
       >
          Practice Problems
      </v-btn>
      <v-spacer></v-spacer>
      <div v-if="!accessToken">
        <v-btn
        text
        large
        color="white"
        style="letter-spacing: 0px; text-transform: none;"
        to="/adminLogin"
        >
            Administrator Login
        </v-btn>
        <v-btn
        text
        large
        color="white"
        style="letter-spacing: 0px; text-transform: none;"
        to="/adminCreate"
        >
            Create Admin Account
        </v-btn>`
      </div>
      <div v-else>
        <v-btn
        icon
        dark
        to="/admin/dashboard"
        >
        <v-icon>person</v-icon>
        </v-btn>
        <v-btn
        icon
        dark
        v-on:click="logout"
        >
        <v-icon>logout</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
</template>

<script>
export default {
    computed: {
        admin(){
            return this.$store.getters['auth/getAdmin'];
        },
        accessToken(){
            return this.$store.getters['auth/getToken'];
        },
    },
    methods: {
        logout: function(event) {
            localStorage.clear();
            this.accessToken = null;
            this.$axios.$get('/auth/logout')
            this.$router.push('/adminLogin')
    },
    }
}
</script>

<style>

</style>