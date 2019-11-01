<template>
<div>
    <!-- Question Layout -->
    <v-layout 
    row
    wrap
    class="pb-5"
    >
        <!-- question number -->
        <v-flex
        class="mb-5" 
        style="font-size: 25px; font-weight: bold;" 
        xs12>
            #{{questionNumber + 1}}.
        </v-flex>
        <!-- question -->
        <v-flex 
        style="font-size: 18px;"
            xs12>
            <span
            v-html="questionText"
            ></span>
        </v-flex>
        <v-flex
        style="padding-top: 40px;"
        >
            <v-btn 
            outlined
            color="blue"
            v-on:click="solutionStatus = !solutionStatus"
            style="text-transform: none; letter-spacing: 0px;"
            >
                Show Solution
            </v-btn>
            <div
            v-if="solutionStatus"
            class="py-5"
            >
                 <span
                class="title"
                >
                Solution:
                </span>
                <span
                v-html="solutionText"
                >
                </span>
            </div>
           
        </v-flex>
    </v-layout>
    
</div>
      
</template>

<script>
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default {
    data () {
        return { 
        }
    },
    methods: {
    },
    props:{
        questionText: String,
        questionNumber: Number,
        solutionText: String,
        solutionStatus: String
    },
    mounted() {
        window.katex = katex
    }
}
</script>