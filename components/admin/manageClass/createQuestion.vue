<template>
    <v-dialog
    fullscreen hide-overlay transition="dialog-bottom-transition"
    >
      <!-- button -->
      <template v-slot:activator="{ on }">
         <v-btn
        v-on="on"
        small 
        outlined
        dark
        style="text-transform: none; letter-spacing: 0px;"
        color="blue darken-2"
        >
            <v-icon left> add </v-icon>
            Create a Question
            {{unitId}}
        </v-btn>
      </template>
      <!-- full screen dialog card -->
      <v-card>
        <!-- full screen toolbar   -->
      <v-toolbar dark color="primary">
          <v-btn icon dark>
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Create a {{classTitle}} Question</v-toolbar-title>
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
                        <v-flex 
                        xs12>
                        <v-card-text
                        class="headline font-weight-bold"
                        >
                            Question: 
                        </v-card-text>
                        <!-- quill editor -->
                         <section class="container">
                          <div class="quill-editor" 
                              :content="mainQuestion"
                              @change="onEditorChange($event)"
                              v-quill:myQuillEditor="editorOption">
                          </div>
                        </section>
                      </v-flex>
                    </v-layout>
                </v-flex>
                    <br>
                    <v-divider></v-divider>
                    <br>
                    <!-- ANSWER -->
                    <!-- <v-layout row wrap>
                        <v-card-text
                        xs12
                        class="headline font-weight-bold"
                        >
                            Answer: 
                        </v-card-text>
                        <v-card-text
                        xs12
                        >
                          <v-text-field
                          outlined
                          placeholder="Number e.g. -9.81"
                          >
                          </v-text-field>
                          <v-text-field
                          outlined
                          placeholder="Units e.g. m/s^2"
                          >
                          </v-text-field>

                        </v-card-text>
                    </v-layout> -->
                    <br>
                    <!-- LEADING QUESTIONS -->
                    <!-- <v-divider></v-divider>
                    <br>
                    <v-layout row wrap>
                        <v-card-text
                        class="headline font-weight-bold"
                        >
                            Leading Questions: 
                        </v-card-text> -->

                      <!-- START OF LEADING QUESTION -->
                        <!-- <v-layout class="px-4" row wrap>
                          <v-flex xs12>
                            <v-card-text>
                              Leading Question 1
                            </v-card-text>
                            <v-card-text class="pb-0">
                            <v-text-field
                            outlined 
                            placeholder="This is the first leading question"
                            ></v-text-field>
                            </v-card-text>
                          </v-flex>
                          <v-card-text class="pt-0"> -->
                            <!-- <v-layout row wrap> -->
                              <!-- individual leading question options -->
                              <!-- <v-flex class="pa-1" xs6>
                                <v-card-text class="px-0 py-1">
                                  <span class="mb-1 subtitle-2">Option A</span>
                                </v-card-text>
                                <v-card class="pa-3" outlined>
                                    <span class="title">A</span>
                                    <br>
                                    <section class="container">
                                      <div class="quill-editor" 
                                          :content="leadingQuestion"
                                          @change="onEditorChange($event)"
                                          @blur="onEditorBlur($event)"
                                          @focus="onEditorFocus($event)"
                                          @ready="onEditorReady($event)"
                                          v-quill:myQuillEditor2="editorOption">
                                      </div>
                                    </section>
                                    <v-card-text>
                                      <v-switch 
                                      color="blue darken-3"
                                      v-model="switch1" 
                                      label="Correct"></v-switch>
                                    </v-card-text>
                                </v-card>
                              </v-flex>
                              -->
                              
                            <!-- </v-layout> -->
                          <!-- </v-card-text>        
                        </v-layout> -->
                      <!-- END OF LEADING QUESTION -->
                    </v-layout>
                    <v-btn
                      v-on:click="createQuestion()"
                    >
                      submit question
                    </v-btn>
        </v-container>
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
        mainQuestion: '<p> Why is the sky blue?</p>',
        leadingQuestion: '<p>Leading question example</p>',
        leadingQuestion2: '<p>Leading question example</p>',
        leadingQuestion3: '<p>Leading question example</p>',
        leadingQuestion4: '<p>Leading question example</p>',

        // test switches
        switch1: false,

        editorOption: {
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
    methods: {
        // updating the change in the editor
        onEditorChange({ editor, html, text }) {
          this.mainQuestion = html
        },
        createQuestion () {
          this.$axios.post('/admin/create/question', {
              question: this.mainQuestion,
              class: this.classId,
              unit: this.unitId,
              admin: this.adminId,
          })
          this.refreshUser(); //update classes
          this.createClass = false
        },
          // refresh user to get question after it is made
           refreshUser(){
            this.$store.dispatch('auth/login', {email: this.admin.email, password: 'kevin1'}).then((res)    =>  {
            })
        },
    },
    props: {
      unitId: String,
      classId: String,
      classTitle: String,
      adminId: String,
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