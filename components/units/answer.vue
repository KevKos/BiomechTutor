<template>
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
            v-model="answer"
            outlined
            placeholder="24"
            >
            </v-text-field>
            <v-select
            outlined
            :menu-props="{offsetY: true }"
            dense
            :items="unitList"
            v-model="units"
            placeholder="Units"
            >
            </v-select>
        </v-card-text>
        <v-card-actions
        class="pt-0"
        >
            <v-btn
            outlined
            color="blue darken-4"
            style="letter-spacing: 0px; text-transform: none;"
            class="mx-2"
            @click="submitAnswer()"
            >
                Submit Answer
            </v-btn>
            <!-- <v-btn
            outlined
            color="green darken-4"
            class="mx-1"
            style="letter-spacing: 0px;"
            >
                Hint
            </v-btn> -->
        </v-card-actions>
        <v-card-text
        v-if="answerStatus"
        >
            <div
            v-if="answerCorrect"
            class="green--text"
            >
                {{answerText}}
            </div>
            <div
            v-else
            class="red--text"
            >
                {{answerText}}
            </div>
        </v-card-text>
        <!-- <AnswerDialog
        :status="answerStatus"
        :correct="answerCorrect"
        :result="answerResult"
        :text="answerText"
        @closeResult="closeResult()"
        ></AnswerDialog> -->
    </v-card>
</template>

<script>
// import AnswerMixin from '@/mixins/answer'

export default {
    data () {
        return {
            answer: '',
            units: '',

            // answer result
            answerStatus: false,
            answerCorrect: false,
            answerText: '',
            
            // for seleciton
            unitList: ['meters', 'kilograms', 'seconds', 'm/s', 'm/s^2', 'rad', 'rad/s', 'rad/s^2', 'N', 'N*m', 'N*s','J'],


        }
    },
    // mixins: [ AnswerMixin ],
    methods: {
        submitAnswer() {
                // if both answer and units are correct
                if (this.answer == this.answerNumber && this.units == this.answerUnits) {
                   this.answerStatus = true;
                   this.answerCorrect = true;
                   this.answerText = 'Correct, great work!'
                } else if (this.answer == this.answerNumber && this.units != this.answerUnits) {
                   this.answerStatus = true;
                   this.answerCorrect = false;
                   this.answerText = 'Incorrect. Numerical answer is correct, check your units.'
                } else if (this.answer != this.answerNumber && this.units == this.answerUnits) {
                   this.answerStatus = true;
                   this.answerCorrect = false;
                   this.answerText = 'Incorrect. Units are correct, check your numerical answer.'
                } else if (this.answer != this.answerNumber && this.units != this.answerUnits) {
                   this.answerStatus = true;
                   this.answerCorrect = false;
                   this.answerText = 'Incorrect. Check your numerical answer and your units.'
                }
        }
    },
    props: {
        answerNumber: String,
        answerUnits: String,
    }
    
}
</script>

