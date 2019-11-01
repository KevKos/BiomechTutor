<template>
    <v-content>
        <v-layout v-if="questions.length > 0">
            <v-flex
            class="pa-5"
            xs2>
                <v-layout
                    >
                    <!-- navigation drawer -->
                    
                    <v-card
                    >
                    <v-card-title
                    class="title"
                    style="text-transform:capitalize"
                    >
                        {{unit.title}}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-btn
                        v-for="(question, index) in questions"
                        :key="question._id"
                        icon
                        dark
                        class="mx-1"
                        color="blue darken-4"
                        v-on:click="currentQuestionChange(index)"
                        >
                        {{index + 1}}
                        </v-btn>   
                    </v-card-text>
                    
                                          
                    </v-card>
                </v-layout>
            </v-flex>
            <!-- Question Column -->
            <v-flex class="pa-5" xs7>
                <Question
                :questionNumber="this.currentQuestion"
                :questionText="this.currentQuestionObject.text"
                :solutionText="this.currentQuestionObject.solution"
                :solutionStatus="this.solutionStatus"
                ></Question>
            </v-flex>
            <!-- Answer Column -->
            <v-flex class="pa-5" xs3>
                <Answer
                :answerNumber="this.currentQuestionObject.answer"
                :answerUnits="this.currentQuestionObject.units"
                ></Answer>
            </v-flex>
        </v-layout>
        <!-- <v-layout v-if="questions.length == 0">
            <v-spacer></v-spacer>
            <div
            style="width: 250px; text-align: center; padding-top: 5%"
            class="title"
            >
                Unfortunately, there are no questions created for this unit, check back soon!
            </div>
            <v-spacer></v-spacer>
        </v-layout> -->
 
    </v-content>
</template>

<script>
import Question from '@/components/units/question'
import Answer from '@/components/units/answer'


export default {
    data () {
        return {
            unit: [],
            questions: [],
            solutionStatus: false,

            // Changing Questions
            currentQuestion: 0,
            currentQuestionObject: {},
        }
    },
    components: {
        Question,
        Answer
    },
    methods: {
        getClassInformation () {
                this.$axios.get('/admin/units/getUnitInformation', {
                    params:{ id: this.$route.params.id}
                })
                .then((res) => {
                    // returns the class data
                    console.log(res.data)
                    this.unit = res.data.unit;
                    this.questions = res.data.questions;
                    this.currentQuestionObject = res.data.questions[0]
                })
        },
        currentQuestionChange (index) {
            this.currentQuestion = index;
            this.solutionStatus = false;
        },
    },
    watch: {
        currentQuestion() {
            this.currentQuestionObject = this.questions[this.currentQuestion]
        }
    },
    mounted() {
        this.getClassInformation()
    },
}
</script>

<style>

</style>