<template>
    <v-dialog
    v-model="createUnit"
    width="500"
    >
        <template v-slot:activator="{ on }">
            <!-- create class button -->
            <v-btn
            color="blue darken-3"
            dark
            style="text-transform: none; letter-spacing: 0px;"
            v-on="on"
            >
            <v-icon
            left
            >add</v-icon>
                Create Unit
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="headline"
            primary-title
            >
            Create A Unit
            </v-card-title>

            <v-card-text class="pt-3 pb-0">
                <v-text-field
                v-model="unitName"
                outlined
                label="Unit Title"
                placeholder="Fraction Addition and Subtraction"
                >
                </v-text-field>
            </v-card-text>

            <v-card-actions class="pt-0 pb-4">
            <div class="flex-grow-1"></div>
            <v-btn
                color="blue darken-3"
                dark
                large
                style="text-transform: none; letter-spacing: 0px;"
                v-on:click="createUnitFunction"
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
            createUnit: false,
            // unit data
            unitName: '',
        }
    },
      computed: {
        admin(){
            return this.$store.getters['auth/getAdmin'];
        },
    },
      methods: {
        createUnitFunction () {
            this.$axios.post('/admin/create/unit', {
                unit: this.unitName,
                username: this.admin.username,
                classId: this.classId,
                adminId: this.adminId
            })
            this.refreshUser(); //update classes
            // this.$router.push('/admin/manageClass');
            this.createUnit = false
        },
           refreshUser(){
            this.$store.dispatch('auth/login', {email: this.admin.email, password: 'kevin1'}).then((res)    =>  {
            })
        },
    },
    props: {
        classId: String,
        adminId: String,
    }
}
</script>