import DeleteConfirmation from '@/components/popUps/deleteConfirmation.vue'

export default {
    components:{
        DeleteConfirmation
    },
    data () {
        return {
            deleteTitle: '',
            deleteText: '',
            deleteType: '',
            deleteId: '',
            deleteStatus: false,
        }
    },
    methods: {
        closeDeleteConfirmation() {
            this.deleteStatus = false;
      }  
    }
}