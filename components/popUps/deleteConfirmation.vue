<template>
    <v-dialog
      v-model="deleteModalStatus"
      width="400"
      persistent
    >
      <v-card>
        <!-- Title -->
        <v-card-title
          primary-title
        >
            {{title}}
        </v-card-title>

        <v-card-text>
           
        </v-card-text>

        <!-- Alert Text -->
        <v-card-text
        style="body-1"
        >
            {{text}}
        </v-card-text>

        <v-card-text>
          <v-btn
            style="text-transform: capitalize; letter-spacing: 0px;"
            color="red darken-3"
            class="mr-2"
            outlined 
            @click="deleteId()"
          >
            Delete
          </v-btn>
            <v-btn
            style="text-transform: capitalize; letter-spacing: 0px;"
            color="grey darken-3"
            outlined 
            @click="closeDeleteConfirmation()"
          >
            Cancel
          </v-btn>

        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props :{ 
        title: String,
        text: String,
        id: String, //id of class, unit or question
        type: String,
        deleteModalStatus: Boolean,
    },
    computed: {
        admin(){
            return this.$store.getters['auth/getAdmin'];
        },
    },
    methods : {
        closeDeleteConfirmation: function()  {
            this.$emit('closeDeleteConfirmation');
        },
        deleteId() {
            // if the type is class = delete class, units and questions
                if (this.type == 'class') {
                        this.$axios.post('/remove/class', {
                            id: this.id
                        }).then((res) => {
                            this.closeDeleteConfirmation();
                            this.refreshUser();
                        })

                // if the type is unit = delete units and question
                } else if (this.type == 'unit') {
                        this.$axios.post('/remove/unit', {
                            id: this.id
                        }).then((res) => {
                            this.closeDeleteConfirmation();
                            this.refreshUser();
                        })

                // if the type is question = delete question
                } else if (this.type == 'question') {
                        this.$axios.post('/remove/question', {
                            id: this.id
                        }).then((res) => {
                            this.refreshUser();
                            this.$router.push('/admin/manageClass')
                        })
                       
                }
        },
        // refresh user
        refreshUser(){
            this.$store.dispatch('auth/login', {username: this.admin.username, password: this.admin.password}).then((res)    =>  {
            })
        },
    }
}
</script>