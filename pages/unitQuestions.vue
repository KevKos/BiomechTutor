<template>
    <v-content>
        <v-layout>
            <v-flex
            class="pa-5"
            xs2>
                <v-layout
                    >
                    <!-- navigation drawer -->
                    
                    <v-card
                    >
                    <v-card-title>
                        Linear Kinematics
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex 
                            v-for="question in questions"
                            :key="question"
                            align-center
                            xs4>
                                <v-layout column align-center>
                                    <v-btn
                                    icon
                                    dark
                                    color="blue darken-4"
                                    >
                                    {{question}}
                                    </v-btn>   
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    
                                          
                    </v-card>
                </v-layout>
            </v-flex>
            <v-flex 
            class="pa-5"
            xs7>
                <!-- Question Layout -->
                <v-layout 
                row
                wrap
                class="pb-5"
                >
                    <!-- question number -->
                    <v-flex 
                    style="font-size: 25px; font-weight: bold;" 
                    xs12>
                        #1.
                    </v-flex>
                    <!-- question -->
                    <v-flex 
                    style="font-size: 18px;"
                     xs12>
                        An airplane accelerates down a runway at 3.20 m/s2 for 32.8 s until is finally lifts off the ground. Determine the distance traveled before takeoff.
                    </v-flex>
                </v-layout>
                <!-- Leading Questions -->
                <v-layout row wrap>
                    <v-flex 
                    class="title"
                    xs12>
                        Leading Questions
                    </v-flex>
                    <v-flex xs12>
                        The purpose of leading questions are to help you if you get stuck or cannot seem to get the right answer. Try the question first, if you're having troubles, try a leading question to get started on the right track!
                    </v-flex>
                    <!-- Leadng Question Numbers -->
                    <v-flex class="py-3" xs12>
                        <v-btn
                        v-for="question in questions"
                        :key="question"
                        icon 
                        dark
                        color="blue darken-4"
                        class="mr-3"
                        >
                            {{question}}
                        </v-btn>
                    </v-flex>
                    <v-flex class="py-3" xs12>
                        <!-- leading question number -->
                        <span
                        style="color: blue;"
                        >
                            1:
                        </span>
                        <!-- leading question -->
                        <span>
                            What is the correct formula to calculate acceleration?
                        </span>
                    </v-flex>
                   
                        <!-- Leading Question Boxes (up to 4) -->
                        <v-flex xs12>
                             <v-layout row wrap>
                                <v-flex 
                                v-for="lead in leadingQuestions"
                                :key="lead.letter"
                                class="py-3 px-2" xs3>
                                    <!-- leading question card -->
                                    <v-card
                                    outlined
                                    height="100%"
                                    hover
                                    >
                                        <!-- option letter -->
                                        <v-card-title>
                                            {{lead.letter}}
                                        </v-card-title>
                                        <!-- picture/hint option -->
                                        <v-card-text>
                                            {{lead.answer}}
                                        </v-card-text>
                                        <!-- select -->
                                        <v-card-actions>
                                            <v-btn
                                            text
                                            style="letter-spacing: 0px; text-transform: none;"
                                            >
                                                This One
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>                        
                                </v-flex>
                            </v-layout>
                         
                    </v-flex>
                    <!-- Correct Leading Question Selection -->
                    <v-flex>

                    </v-flex>
                    <!-- Wrong Leading Question  Selection -->
                  
                </v-layout>
            </v-flex>
            <!-- answer box -->
            <v-flex 
            class="pa-5"
            xs3>
                <v-card
                flat
                >
                    <v-card-title>
                        Answer
                    </v-card-title>
                    <v-card-text
                    class="pb-0"
                    >
                        <v-text-field
                        outlined
                        placeholder="24"
                        >
                        </v-text-field>
                        <v-select
                        outlined
                        placeholder="Units"
                        >
                        </v-select>
                    </v-card-text>
                    <v-card-actions
                    class="pt-0"
                    >
                        <v-btn
                        text
                        outlined
                        color="blue darken-4"
                        style="letter-spacing: 0px; text-transform: none;"
                        >
                            Submit Answer
                        </v-btn>
                        <v-btn
                        text
                        outlined
                        color="green darken-4"
                        style="letter-spacing: 0px; text-transform: none;"
                        >
                            Hint
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-content>
</template>

<script>
export default {
    data () {
        return {
            questions: [1, 2, 3, 4, 5, 6, 7],
            leadingQuestions: [
                {letter: "A", answer: 'a = m/s^2', correct: true},
                {letter: "B", answer: 'a = m/s^2', correct: false},
                {letter: "C", answer: 'a = m/s^2', correct: false},
                {letter: "D", answer: 'a = m/s^2', correct: false},
            ]
        }
    },
    computed: {
     admin(){
        return this.$store.getters['auth/getAdmin'];
      },
    },
    
}
</script>

<style>

</style>