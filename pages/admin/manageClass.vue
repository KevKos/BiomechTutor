<template>
    <v-layout>
        <!-- dashboard navigaiton -->
        <Navigation></Navigation>

        <!-- page content -->
        <v-content class="mx-0 py-0 px-5">
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
                            class="display-1 text--black"
                            >
                                {{classes.title}}
                                <v-spacer></v-spacer>

                                 <!-- class options menu -->
                                 <v-menu offset-y>
                                    <template v-slot:activator="{ on }">
                                       <v-btn 
                                        text  
                                        style="text-transform: none; letter-spacing: 0px;"
                                        v-on="on"
                                        >
                                            Class Options
                                            <v-icon
                                            right
                                            >
                                                more_vert
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list
                                    dense
                                    >
                                        <v-list-item
                                        @click="deleteClass(classes._id)"
                                        >
                                        <v-icon left small>delete</v-icon>
                                        <v-list-item-title>Delete Class</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>

                                
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
                                v-for="(units) in filterUnits(classes._id)"
                                :key="units._id"
                                >

                                        <v-layout class="px-5 pb-2" row wrap>
                                            <v-flex class="px-3" xs12>
                                                <v-card
                                                flat
                                                class="px-2 py-1"
                                                >  
                                                    <v-layout align-center row wrap>
                                                        <v-flex xs12>
                                                            <v-layout class="py-1" align-center>
                                                                <span 
                                                                style="text-transform: capitalize"
                                                                class="title">{{units.title}}
                                                                </span>
                                                                <!-- units options menu -->
                                                                <v-menu offset-y>
                                                                    <template v-slot:activator="{ on }">
                                                                    <v-btn 
                                                                        text  
                                                                        style="text-transform: none; letter-spacing: 0px;"
                                                                        v-on="on"
                                                                        class="mx-1"
                                                                        icon 
                                                                        small
                                                                        >
                                                                            <v-icon
                                                                            small
                                                                            >
                                                                                more_vert
                                                                            </v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                    <v-list
                                                                    dense
                                                                    >
                                                                        <v-list-item
                                                                        @click="deleteUnit(units._id)"
                                                                        >
                                                                        <v-icon left small>delete</v-icon>
                                                                            <v-list-item-title>Delete Unit</v-list-item-title>
                                                                        </v-list-item>
                                                                    </v-list>
                                                                </v-menu>
                                                            </v-layout>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            <CreateQuestion
                                                            :unitId="units._id"
                                                            :classId="classes._id"
                                                            :unitTitle="units.title"
                                                            :adminId="admin._id"
                                                            :modalTrigger="createQuestionDialog"
                                                            @openModal="openCreateQuestion()"
                                                            @closeModal="closeCreateQuestion()"
                                                            ></CreateQuestion>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            <v-layout
                                                            class="pa-3"
                                                            align-center row wrap>
                                                            <span class="mr-1 subtitle-2">
                                                                Questions: 
                                                            </span>
                                                                <div
                                                                v-for="(question, index) in filterQuestions(units._id)"
                                                                :key="question._id"
                                                                >
                                                                      
                                                                        <EditQuestion
                                                                        :questionNumber="index+1"
                                                                        :questionText="question.text"
                                                                        :answerNumber="question.answer"
                                                                        :answerUnits="question.units"
                                                                        :solution="question.solution"
                                                                        :questionId="question._id"
                                                                        :modalTrigger="editQuestionDialog"
                                                                        @closeModal="closeEditQuestion()"
                                                                        @openModal="openEditQuestion()"
                                                                        ></EditQuestion>

                                                                        <!-- loading question -->
                                                                        <!-- <span
                                                                        v-html="question.text"
                                                                        >
                                                                        </span> -->
                                                                </div>
                                                            </v-layout>
                                                         
                                                        </v-flex>
                                                    </v-layout>
                                                </v-card>
                                            </v-flex>
                                        </v-layout>
                                </div>
                        </v-card>
                    </div>
                </v-flex>               
            </v-layout>
        </v-content>
        <DeleteConfirmation
        :title="deleteTitle" 
        :text="deleteText" 
        :id="deleteId" 
        :type="deleteType"
        :deleteModalStatus="deleteStatus"
        @closeDeleteConfirmation="closeDeleteConfirmation()"
        ></DeleteConfirmation>

    </v-layout>
        
</template>

<script>
// components
import Navigation from '@/components/admin/navigation'
import CreateClass from '@/components/admin/manageClass/createClass.vue'
import CreateUnit from '@/components/admin/manageClass/createUnit.vue'
import CreateQuestion from '@/components/admin/manageClass/createQuestion.vue'
import EditQuestion from '@/components/admin/manageClass/editQuestion.vue'
import Units from '@/components/admin/manageClass/units.vue'

// mixins
import Delete from '@/mixins/delete.js'



export default {
    data () {
        return {
            classes: [],
            units: [],
            questions: [],

            // model components
            createQuestionDialog: false,
            editQuestionDialog: false,
            

        }
    },
    components: {
       Navigation,
       CreateClass,
       CreateUnit,
       CreateQuestion,
       EditQuestion,
       Units
    },
    mixins: [Delete],
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
        },
        openCreateQuestion () {
            this.createQuestionDialog = true;
        },
        closeCreateQuestion () {
            this.createQuestionDialog = false;
        },
        openEditQuestion () {
        this.editQuestionDialog = true;
        },
        closeEditQuestion () {
        this.editQuestionDialog = false;
        },
        deleteClass(classId) {
            // open are you sure modal
            this.deleteTitle = 'Delete Class';
            this.deleteText = 'Are you sure you want to delete this class? Deleting this class will also remove all associated units and classes. The aformentioned class, units and questions will not be able to be recovered once deleted.';
            this.deleteType = 'class';
            this.deleteId = classId;
            this.deleteStatus = true;
        },
        deleteUnit(unitId) {
            // open are you sure modal
            this.deleteTitle = 'Delete Unit';
            this.deleteText = 'Are you sure you want to delete this unit? Deleting this unit will also remove all associated questions. The aformentioned unit and questions will not be able to be recovered once deleted.';
            this.deleteType = 'unit';
            this.deleteId = unitId;
            this.deleteStatus = true;
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