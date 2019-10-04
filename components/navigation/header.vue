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
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    
}
</script>

<style>

</style>