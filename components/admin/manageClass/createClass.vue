<template>
    <v-dialog
    v-model="createClass"
    width="500"
    >
        <template v-slot:activator="{ on }">
            <!-- create class button -->
            <v-btn
            large
            color="green darken-3"
            dark
            style="text-transform: none; letter-spacing: 0px;"
            v-on="on"
            >
            <v-icon
            left
            >add</v-icon>
                Create Class
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="headline"
            primary-title
            >
            Create A Class
            </v-card-title>

            <v-card-text class="pt-3 pb-0">
                <v-text-field
                v-model="className"
                outlined
                label="Class Name"
                placeholder="Math 101"
                >
                </v-text-field>
            </v-card-text>

            <v-card-actions class="pt-0 pb-4">
            <div class="flex-grow-1"></div>
            <v-btn
                color="green darken-2"
                dark
                large
                style="text-transform: none; letter-spacing: 0px;"
                v-on:click="createClassFunction"
            >
                Create
            </v-btn>
            <div class="flex-grow-1"></div>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>
export default {
    data () {
        return {
            createClass: false,
            // class data
            className: '',
        }
    },
    computed: {
        admin(){
            return this.$store.getters['auth/getAdmin'];
        },
    },
    methods: {
        createClassFunction () {
            this.$axios.post('/admin/create/class', {
                class: this.className,
                admin: this.admin._id,
            })
            this.refreshUser(); //update classes
            // this.$router.push('/admin/manageClass');
            this.createClass = false
        },
           refreshUser(){
               console.log(this.admin.username)
            this.$store.dispatch('auth/login', {username: this.admin.username, password: this.admin.password}).then((res)    =>  {
            })
        },
    }
}
</script>