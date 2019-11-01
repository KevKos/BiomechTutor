<template>
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
        <v-flex class="py-3" xs12>
            <v-btn
            v-for="question in questions"
            :key="question"
            icon 
            dark
            color="blue darken-4"
            class="mr-3"
            >
            </v-btn>
        </v-flex>
        <v-flex class="py-3" xs12>
            <span
            style="color: blue;"
            >
                1:
            </span>
            <span>
                What is the correct formula to calculate acceleration?
            </span>
        </v-flex>
        
            <v-flex xs12>
                    <v-layout row wrap>
                    <v-flex 
                    v-for="lead in leadingQuestions"
                    :key="lead.letter"
                    class="py-3 px-2" xs3>
                        <v-card
                        outlined
                        height="100%"
                        hover
                        >
                            <v-card-title>
                                {{lead.letter}}
                            </v-card-title>
                            <v-card-text>
                                {{lead.answer}}
                            </v-card-text>
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
        
    </v-layout>
</template>