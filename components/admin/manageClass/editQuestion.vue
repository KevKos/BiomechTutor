<template>
    <v-dialog
    v-model="editQuestion"
    fullscreen hide-overlay transition="dialog-bottom-transition"
    >
      <!-- button -->
      <template v-slot:activator="{ on }">
         <v-btn
        v-on="on"
        icon 
        small
        color="blue darken-4"
        outlined
        class="ma-1"
        @click="editQuestion = true"
        >
            {{questionNumber}}
        </v-btn>
      </template>
      <!-- full screen dialog card -->
      <v-card>
        <!-- full screen toolbar   -->
      <v-toolbar dark color="primary">
          <v-btn icon dark @click="editQuestion = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Question {{this.questionNumber}}</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <!-- create question content page -->
        <v-container>
            <v-layout class="pa-4">
                <v-flex xs3></v-flex>
                <!-- MAIN QUESTION -->
                <v-flex xs6>
                    <!-- question -->
                     <v-layout row wrap>
                       <!-- Editing Buttons -->
                       <v-flex>
                         <v-card-text>
                           <v-btn
                           outlined
                           class="mr-1"
                           color="green darken-2"
                           dark
                           style="text-transform: none; letter-spacing: 0px;"
                           v-on:click="editingStatus = !editingStatus"
                           >
                            <v-icon left>
                              edit
                            </v-icon>
                             Edit Question
                           </v-btn>
                           <v-btn
                           outlined
                           class="mx-1"
                           color="red darken-2"
                           dark
                           style="text-transform: none; letter-spacing: 0px;"
                           @click="deleteQuestion()"
                           >
                            <v-icon left>
                              delete
                            </v-icon>
                             Delete Question
                           </v-btn>
                         </v-card-text>
                       </v-flex>
                        <!-- Question -->
                        <v-flex
                        v-if="!editingStatus" 
                        xs12>
                            <v-card-text
                            class="headline font-weight-bold"
                            >
                                Question: 
                            </v-card-text>
                            <v-card-text
                            v-html="this.questionText"
                            >

                            </v-card-text>
                      </v-flex>

                      <!-- Edit Question -->
                      <v-flex 
                      v-if="editingStatus"
                      xs12>
                          <v-card-text
                          class="headline font-weight-bold"
                          >
                              Question: 
                          </v-card-text>
                          <v-card
                          outlined
                          >
                            <section class="container">
                              <div class="quill-editor" 
                                  :content="mainQuestion"
                                  @change="onEditorChangeEdit($event)"
                                  v-quill:myQuillEditorEdit="editorOptionEdit">
                              </div>
                            </section>
                          </v-card>
                      </v-flex>

                      <!-- Answer -->
                       <v-flex
                        v-if="!editingStatus" 
                        xs12>
                            <v-card-text
                            class="headline font-weight-bold"
                            >
                                Answer: 
                            </v-card-text>
                            <v-card-text
                            v-html="this.answerNumber + ' ' + this.answerUnits"
                            >
                            </v-card-text>
                      </v-flex>

                      
                      <!-- Edit Answer -->
                       <v-flex
                       v-if="editingStatus" 
                        xs12>
                            <v-card-text
                            class="headline font-weight-bold"
                            >
                                Answer: 
                            </v-card-text>
                            <v-card-text class="pa-0 ma-0">
                              <v-text-field
                              outlined
                              placeholder="Answer"
                              v-model.lazy="answerEdit"
                              >
                              </v-text-field>
                              <v-select
                              v-model="answerUnitsEdit"
                              outlined
                              :items="unitList"
                              :menu-props="{offsetY: true }"
                              ></v-select>
                            </v-card-text>
                      </v-flex>

                       <!-- Solution -->
                       <v-flex
                       v-if="!editingStatus" 
                        xs12>
                            <v-card-text
                            class="headline font-weight-bold"
                            >
                                Solution: 
                            </v-card-text>
                            <v-card-text
                            v-html="this.solution"
                            >
                            </v-card-text>
                      </v-flex>

                      <!-- Edit Solution -->
                      <v-flex 
                      v-if="editingStatus"
                      xs12>
                          <v-card-text
                          class="headline font-weight-bold"
                          >
                              Solution: 
                          </v-card-text>
                          <v-card
                          outlined
                          >
                            <section class="container">
                              <div class="quill-editor" 
                                  :content="solutionContent"
                                  @change="onEditorChangeEditSolution($event)"
                                  v-quill:myQuillEditorEdit2="editorOptionEdit">
                              </div>
                            </section>
                          </v-card>
                      </v-flex>

                      <v-flex
                      v-if="editingStatus"
                      class="pt-5"
                      >
                        <v-btn
                        color="green darken-2"
                        dark
                        style="text-transform: none; letter-spacing: 0px;"
                        flat
                        v-on:click="submitEditQuestion()"
                        >
                          <v-icon left>edit</v-icon>
                          Submit Edits
                        </v-btn>
                      </v-flex>

                    </v-layout>
                </v-flex>
            </v-layout>
           <DeleteConfirmation
            :title="deleteTitle" 
            :text="deleteText" 
            :id="deleteId" 
            :type="deleteType"
            :deleteModalStatus="deleteStatus"
            @closeDeleteConfirmation="closeDeleteConfirmation()"
            ></DeleteConfirmation>
        </v-container>
      </v-card>
    </v-dialog>

</template>

<script>
import katex from 'katex';
import 'katex/dist/katex.min.css';

// mixins
import Delete from '@/mixins/delete.js'

export default {
    data () {
      return {
        // editing status 
        editingStatus: false,

        // for editing units
        unitList: ['m/s', 'm/s^2', 'seconds', 'meters'],

        // content of editing
       mainQuestion: this.questionText,
       solutionContent: this.solution,
       answerEdit: this.answerNumber,
       answerUnitsEdit: this.answerUnits,

        // dialog model
        editQuestion: false,

        editorOptionEdit: {
          // some quill options
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike', 'script' , 'align', 'code', 'link','script', 'formula', 'image'],
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
    mixins: [Delete],
    methods: {
        submitEditQuestion () {
          // console.log(this.mainQuestion)
          console.log(this.solutionContent)
          // console.log(this.answerNumber)
          // console.log(this.answerUnits)
          this.$axios.post('/admin/edit/question', {
              question: this.mainQuestion,
              solution: this.solutionContent,
              answerNumber: this.answerEdit,
              answerUnits: this.answerUnitsEdit,
              questionId: this.questionId,
          })
          this.editQuestion = false
          this.editingStatus = false
          this.refreshUser(); //update question
          
        },
          // refresh user to get question after it is made
           refreshUser(){
            this.$store.dispatch('auth/login', {username: this.admin.username, password: this.admin.password}).then((res)    =>  {
            })
        },
        deleteQuestion () {
            // open are you sure modal
            this.deleteTitle = 'Delete Question';
            this.deleteText = 'Are you sure you want to delete this question? You cannot recover questions once they are removed.';
            this.deleteType = 'question';
            this.deleteId = this.questionId;
            this.deleteStatus = true;
        },
        // updating the question fields when editing so they submit with changes
               // updating the change in the editor
        onEditorChangeEdit({ editor, html, text }) {
          this.mainQuestion = html
        },
        onEditorChangeEditSolution({ editor, html, text }) {
          this.solutionContent = html
        },
    },
    props: {
    //   unitId: String,
    //   classId: String,
    //   classTitle: String,
    //   adminId: String,
        questionNumber: Number,
        questionText: String,
        answerNumber: String,
        answerUnits: String,
        solution: String,
        questionId: String
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    margin: 0 auto;
    overflow: visible;
  }
    .quill-editor {
    text-align:right;
    min-height: 200px;
    max-height: 600px;
  }
</style>