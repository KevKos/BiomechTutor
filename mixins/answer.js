import AnswerDialog from '@/components/answer/AnswerDialog.vue'

export default {
    components:{
        AnswerDialog
    },
    data () {
        return {
            answerCorrect: false,
            answerStatus: false,
            answerResult: '',
            answerText: '',
        }
    },
    methods: {
        closeResult() {
            this.answerStatus = false;
      }  
    }
}