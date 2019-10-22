<template>
    <v-layout>
        <!-- dashboard navigaiton -->
        <Navigation></Navigation>

        <!-- page content -->
        <v-container>
            <v-layout class="px-2" row wrap>
               <!-- create class -->
               <v-flex class="mb-2" xs12>

                <!-- create class dialog -->
                <CreateClass></CreateClass>
                    
                </v-flex>
                <!-- Your Classes Text -->
                <v-flex class="my-2" xs12>
                    <span class="title"> Your Classes </span>
                </v-flex>

                <v-flex v-for="classes in admin.classes" :key="classes.title">
                    <span>{{classes.title}}</span>
                </v-flex>
                <!-- Class card -->
                <v-flex
                xs12
                >
                    <v-card
                    width="100%"
                    outlined
                    >
                    <v-card-title
                    class="title"
                    >
                        Biomechanics 2A03
                    </v-card-title>
                    <!-- create unit container -->
                    <v-card-text>
                        <CreateUnit></CreateUnit>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-layout class="px-4 py-1" row wrap>
                            <v-flex xs12>
                                <v-layout class="px-2" row align-center>           
                                    <span
                                    class="title black--text mr-1"
                                    >
                                        Trigonometry
                                    </span>
                                      <v-btn
                                    icon 
                                    >
                                        <v-icon small> more_vert
                                        </v-icon>
                                    </v-btn>
                                </v-layout>
                                
                            </v-flex>
                            <v-flex class="my-1" xs12>
                                Click on a number below to update or remove that question.
                            </v-flex>
                            <v-flex class="my-1">
                                Questions: 
                                <v-btn
                                icon
                                color="blue darken-4"
                                small
                                >
                                    1
                                </v-btn>
                            </v-flex>
                            <v-flex class="my-1" xs12>
                                <!-- create question dialog -->
                                <CreateQuestion></CreateQuestion>
                            </v-flex>
                        </v-layout>
                        
                    </v-card-text>

                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

    </v-layout>
        
</template>

<script>
import Navigation from '@/components/admin/navigation'
import CreateClass from '@/components/admin/manageClass/createClass.vue'
import CreateUnit from '@/components/admin/manageClass/createUnit.vue'
import CreateQuestion from '@/components/admin/manageClass/createQuestion.vue'



export default {
    data () {
        return {
        }
    },
    components: {
        Navigation: Navigation,
        CreateClass: CreateClass,
        CreateUnit: CreateUnit,
        CreateQuestion: CreateQuestion,
    },
    computed: {
        admin(){
            return this.$store.getters['auth/getAdmin'];
        },
        adminClasses() {
            return this.$store.getters['classes/adminClasses']
        }
    },
    methods: {
        // fetchAdmin() {
        //    return this.$store.getters['auth/getAdminUsername'];
        // }
    },
    mounted() {
  }
}
</script>