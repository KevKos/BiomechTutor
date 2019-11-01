<template>
    <v-app-bar
      fixed
      app
      color="blue darken-4"
    >
     
    <!-- Practice Problems Dropdown -->
        <v-menu offset-y>
            <template v-slot:activator="{ on }">
                 <v-btn
                v-on="on"
                text
                large
                color="white"
                style="letter-spacing: 0px; text-transform: none;"
                >
                    Practice Problems
                </v-btn>
            </template>
            <v-list>
                <v-list-item
                v-for="(classes, index) in classes"
                :key="index"
                :to="`/classes/${classes.title}/${classes._id}`"
                >
                <v-list-item-title
                style="text-transform: capitalize"
                >{{ classes.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

      <v-spacer></v-spacer>
      <div v-if="!accessToken">


        <v-menu offset-y>
        <template v-slot:activator="{ on }">
            <v-btn
            color="white"
            dark
            large
            v-on="on"
            icon
            >
            <v-icon>
                school
            </v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item
            to="/adminLogin"
            >
            <v-list-item-title>Admin Login</v-list-item-title>
            </v-list-item>
            <v-list-item
            to="/adminCreate"
            >
            <v-list-item-title>Admin Create Account</v-list-item-title>
            </v-list-item>
        </v-list>
        </v-menu>

        <!-- <v-btn
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
        </v-btn>` -->
      </div>
      <div v-else>
        <v-btn
        icon
        dark
        to="/admin/manageClass"
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
    data () {
        return {
            classes: [],
        }
    },
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
        getClassNames () {
            this.$axios.get('admin/getClassesHeader').then((res) =>  {
                this.classes = res.data;
            })
        }
    },
    mounted () {
        this.getClassNames();
    }
}
</script>

<style>

</style>