<template>
    <v-layout>
        <!-- dashboard navigaiton -->
        <Navigation></Navigation>

        <!-- page content -->
        <v-container>
            <v-layout class="px-2" row wrap>
               
               <!-- create class -->
               <v-flex class="mb-2" xs12>
                    <!-- CREATE CLASS -->
                    <div class="mb-5">
                
                        <v-card-text>
                            <!-- create class dialog -->
                            <!-- need to change this component to use props, not to get the adminId twice -->
                            <CreateClass
                            :adminId="admin._id"
                            ></CreateClass>
                        </v-card-text>
                    </div>
                    <!-- CLASS GROUP -->
                    <div v-for="classes in classes" :key="classes._id">
                        <v-card
                        outlined
                        class="my-5"
                        >
                            <v-card-title
                            style="text-transform: capitalize"
                            class="title text--black"
                            >
                                {{classes.title}}
                            </v-card-title>
                            <!-- create unit button -->
                            <v-card-text>
                                <CreateUnit
                                    :classId="classes._id"
                                    :adminId="admin._id"
                                ></CreateUnit>
                            </v-card-text>
                                <!-- list of units -->
                                <div
                                v-for="(units, index) in filterUnits(classes._id)"
                                :key="units._id"
                                >
                                    <div
                                    v-if="units.classAssignment == classes._id"
                                    >
                                        <v-layout class="px-5 pb-2" row wrap>
                                            <v-flex class="px-3" xs12>
                                                <v-card
                                                flat
                                                class="px-2 py-1"
                                                >  
                                                    <v-layout row wrap>
                                                        <v-flex xs12>
                                                            <span 
                                                            style="text-transform: capitalize"
                                                            class="title">{{index+1}}. {{units.title}}
                                                            </span>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            <CreateQuestion
                                                            :unitId="units._id"
                                                            :classId="classes._id"
                                                            :classTitle="classes.title"
                                                            :adminId="admin._id"
                                                            ></CreateQuestion>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            <div
                                                            v-for="(question, index) in filterQuestions(units._id)"
                                                            :key="question._id"
                                                            >
                                                               
                                                                    
                                                                    
                                                                    <v-btn
                                                                    icon 
                                                                    outlined
                                                                    >
                                                                        {{index + 1}}
                                                                    </v-btn>

                                                                    <!-- loading question -->
                                                                    <!-- <span
                                                                    v-html="question.text"
                                                                    >
                                                                    </span> -->
                                                            </div>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-card>
                                            </v-flex>
                                        </v-layout>
                                       
                                    </div>
                                </div>
                           
                        </v-card>
                    </div>
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
            units: [],
            questions: [],
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
        getClasses () {
            this.$axios.get('admin/getClasses', {params: {
                adminId: this.admin._id
            }}).then((res) =>  {
                // console.log(res.data)
                // console.log(res.data.units)
                this.classes = res.data.classes;
                this.units = res.data.units;
                this.questions = res.data.questions;
            })
        },
        containsClassId(classId) {
            console.log()
            var classUnits = this.units.filter(unit => unit.classAssignment = classId)
            console.log(classUnits + 'hello')
        },
        filterUnits(classId) {
            return this.units.filter(unit => unit.classAssignment == classId)
        },
        filterQuestions(unitId) {
            return this.questions.filter(question => question.unitAssignment == unitId)
        }
    },
    mounted() {
        this.getClasses()
    },
    watch: {
        admin(){
             this.getClasses()
        }
    }
}
</script>