<template>
    <v-dialog
      v-model="status"
      width="400"
      persistent
    >
      <v-card>
        <!-- Title -->
        <v-card-title
          primary-title
        >
            <v-icon
            v-if="correct"
            color="green"
            >
            check
            </v-icon>
            <v-icon
            v-else
            color="red"
            >
            close
            </v-icon>
            <span
            v-if="correct"
            class="green--text"
            >
                {{result}}
            </span>
            <span
            class="red--text mx-3"
            >
                {{result}}
            </span>
          
        </v-card-title>

        <v-card-text>
           
        </v-card-text>

        <!-- Alert Text -->
        <v-card-text
        style="body-1"
        >
            {{text}}
        </v-card-text>

        <v-card-actions>
          <v-btn
            style="text-transform: capitalize; letter-spacing: 0px;"
            color="grey darken-1"
            text 
            block
            @click="closeResult"
          >
            Close
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props :{ 
        status: Boolean,
        correct: Boolean,
        result: String,
        text: String,
    },
    methods : {
        closeResult: function()  {
            this.$emit('closeResult');//, false)
        }
    }
}
</script>