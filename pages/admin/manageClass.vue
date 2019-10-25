<template>
    <v-layout>
        <!-- dashboard navigaiton -->
        <Navigation></Navigation>

        <!-- page content -->
        <v-container>
            <span>{{admin._id}}</span>
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

                <!-- Class card -->
                <v-flex
                xs12
                >
                    <v-card
                    class="my-5"
                    v-for="classes in adminClasses" :key="classes.id"
                    width="100%"
                    outlined
                    >
                    <v-card-title
                    class="title"
                    style="text-transform: capitalize"
                    >
                        {{classes.title}}
                    </v-card-title>
                    <!-- create unit container -->
                    <v-card-text>
                        <Units
                        :classTitle="classes.title"
                        :classId="classes._id"
                        ></Units>
                        <!-- <v-btn
                        v-on:click="showUnits(classes._id)"
                        >
                            show units
                        </v-btn>
                        <v-card-text
                        v-if="unitDisplay"
                        >
                            <div
                            v-for="units in units"
                            :key="units._id"
                            >  
                                {{units.title}}
                            </div>
                        </v-card-text> -->
                    </v-card-text>
                    <v-card-text>
                        <CreateUnit
                            :classId="classes._id"
                        ></CreateUnit>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <!-- <v-layout class="px-4 py-1" row wrap>
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
                                <CreateQuestion></CreateQuestion>
                            </v-flex>
                        </v-layout> -->
                        
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
import Units from '@/components/admin/manageClass/units.vue'



export default {
    data () {
        return {
            classes: [],
            // // units
            // unitDisplay: false,
            // units: []
        }
    },
    components: {
        Navigation: Navigation,
        CreateClass: CreateClass,
        CreateUnit: CreateUnit,
        CreateQuestion: CreateQuestion,
        Units: Units,
    },
    computed: {
        admin(){
            return this.$store.getters['auth/getAdmin'];
        },
        adminClasses() {
            return this.$store.getters['auth/getAdminClasses']
        },
    },
    methods: {
        setClasses() {
            this.$store.dispatch('auth/setClasses', {adminObject: this.admin});
        }

        // getClasses(){
        //       this.$axios.get('admin/getClasses', {
        //             params: {
        //                 adminId: this.admin._id
        //             }
        //         }
        //     ).then((res) =>   {
        //         this.$store.commit('SET_CLASSES', res.data)
        //         // console.log(res.data);
        //         // this.classes = res.data.newClasses;
        //     })
        // },
    },
    // watch: {
    //     admin(){
    //         this.getClasses()
    //     },
    // },
    created() {
        this.$axios.get('admin/getClasses', {params: {
            adminId: this.admin._id
        }}).then((res)    =>  {
            // console.log(res.data)
            this.classes = res.data;
        })
    },
}
</script>