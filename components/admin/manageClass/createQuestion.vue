<template>
    <v-dialog
    v-model="createQuestionDialog"
    fullscreen hide-overlay transition="dialog-bottom-transition"
    >
      <!-- button -->
      <template v-slot:activator="{ on }">
         <v-btn
        small 
        outlined
        dark
        style="text-transform: none; letter-spacing: 0px;"
        color="blue darken-2"
        @click="createQuestionDialog = true"
        >
            <v-icon left> add </v-icon>
            Create a Question
        </v-btn>
      </template>
      <!-- full screen dialog card -->
      <v-card
      >
        <!-- full screen toolbar   -->
      <v-toolbar dark color="primary">
          <v-btn
          @click="createQuestionDialog = false"
           icon dark >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title style="text-transform: capitalize;">Create a {{unitTitle}} Question</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <!-- create question content page -->
        <v-content class="pa-0 ma-0">
            <v-layout class="pa-4">
                <v-flex xs4></v-flex>
                <!-- MAIN COLUMN-->
                <v-flex xs4>
                     <v-layout row wrap>
                       <!-- Main Question -->
                        <v-flex
                        class="my-5" 
                        xs12>
                        <v-card-text
                        class="headline font-weight-bold px-0"
                        >
                            Question: 
                        </v-card-text>
                        <v-card
                        style="border-radius: 5px; border: 1px solid #bfbfbf"
                        >
                        <!-- quill editor -->
                         <section class="container">
                          <div class="quill-editor" 
                              :content="mainQuestion"
                              @change="onEditorChange($event)"
                              v-quill:myQuillEditor="editorOption">
                          </div>
                        </section>
                        </v-card>
                      </v-flex>

                        <!-- Answer -->
                      <v-flex
                        class="" 
                        xs12>
                        <v-card-text
                        class="headline font-weight-bold px-0"
                        >
                            Answer: 
                        </v-card-text>
                        <v-card
                        flat
                        >
                          <v-text-field
                          placeholder="e.g. 42"
                          outlined
                          v-model="answerNumber"
                          >
                          </v-text-field>
                          <v-select
                          v-model="answerUnits"
                          placeholder="Units"
                          outlined
                          :menu-props="{offsetY: true }"
                          :items="unitList"
                          >
                          </v-select>
                        
                        </v-card>
                      </v-flex>

                      <!-- Solution -->
                      <v-flex
                        class="mb-5" 
                        xs12>
                        <v-card-text
                        class="headline font-weight-bold px-0"
                        >
                            Solution: 
                        </v-card-text>
                        <v-card
                        flat 
                        style="border-radius: 5px; border: 1px solid #bfbfbf"
                        >
                          <section class="container">
                          <div class="quill-editor" 
                              :content="solution"
                              @change="onEditorChangeSolution($event)"
                              v-quill:myQuillEditor2="editorOption">
                          </div>
                        </section>
                        </v-card>
                      </v-flex>

                      <!-- Steps -->
                      <!-- <v-flex
                        class="mb-5" 
                        xs12>
                        <v-card-text
                        class="headline font-weight-bold px-0"
                        >
                            Steps: 
                        </v-card-text>
                       
                        <v-card-text
                        v-for="(steps, index) in steps"
                        :key="index"
                        >
                        {{steps.title}}
                          <v-card
                            flat 
                            style="border-radius: 5px; border: 1px solid #bfbfbf"
                            >
                              <section class="container">
                                <div class="quill-editor" 
                                    :content="steps.content"
                                    v-quill:{{index}}="editorOption">
                                </div>
                            </section>
                          </v-card>
                        </v-card-text>

                         <v-card-text>
                          <v-btn
                          @click="addStep()"
                          >
                            Add a step
                          </v-btn>
                        </v-card-text>



                       
                      </v-flex> -->

                      <!-- Submit Question -->
                      <v-flex class="py-5">
                        <v-btn
                          v-on:click="createQuestion()"
                          style="text-transform: none; letter-spacing: 0px;"
                          dark
                          color="blue darken-2"
                        >
                          Submit Question
                        </v-btn>
                      </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-content>
      </v-card>
    </v-dialog>

</template>

<script>
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default {
    data () {
      return {
        // content of quill boxes
        mainQuestion: '<p>What is the meaning of life?</p>',
        solution: '<p> Input the solution to the question here. You can input formulas via the "fx" button in the toolbar. <p>',

        // for questions
        unitList: ['meters', 'kilograms', 'seconds', 'm/s', 'm/s^2', 'rad', 'rad/s', 'rad/s^2', 'N', 'N*m', 'N*s','J'],


        // steps
        steps : [],

        // test switches
        createQuestionDialog: false,

        // dialog model
        // createQuestion: false,
        answerNumber: '',
        answerUnits: '',

        editorOption: {
          // some quill options
          modules: {
            imageResize: true,
            toolbar: [
              ['bold', 'italic', 'underline', 'strike', { 'script': 'sub'}, { 'script': 'super' }, 'align', 'code', 'link','formula', 'image', ],
            ]
          },
        }
      }
    },
    mounted() {
      window.katex = katex;
    },
      computed: {
        admin(){
            return this.$store.getters['auth/getAdmin'];
        },
    },
    methods: {
        // updating the change in the editor
        onEditorChange({ editor, html, text }) {
          this.mainQuestion = html
        },
        onEditorChangeSolution({ editor, html, text }) {
          this.solution = html
        },
        createQuestion () {
          this.$axios.post('/admin/create/question', {
              question: this.mainQuestion,
              solution: this.solution,
              answerNumber: this.answerNumber,
              answerUnits: this.answerUnits,
              class: this.classId,
              unit: this.unitId,
              admin: this.adminId,
          })
          this.refreshUser(); //update classes
          this.createQuestionDialog = false
        },
        // refresh user to get question after it is made
          refreshUser(){
          this.$store.dispatch('auth/login', {username: this.admin.username, password: this.admin.password}).then((res)    =>  {
          })
        },
        addStep () {
          var index = this.steps.length;
          this.steps.push(
            {
              title: 'Hello'+index,
              content: '<p> New Step </p>'
            }
          )
        }
    },
    props: {
      unitId: String,
      classId: String,
      unitTitle: String,
      adminId: String,
    }
  }
</script>

<style >
  .container {
    width: 100%;
    margin: 0 auto;
    overflow: visible;
  }
    .quill-editor {
    text-align:right;
    min-height: 50px;
  }
  .ql-toolbar.ql-snow {
    border: 0px solid #ccc;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    padding: 8px;
}
  .ql-container.ql-snow {
    border: none;
  }
</style>