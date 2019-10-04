<template>
    <v-dialog v-model="createQuestion" fullscreen hide-overlay transition="dialog-bottom-transition">
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
        </v-btn>
      </template>
      <!-- full screen dialog card -->
      <v-card>
        <!-- full screen toolbar  -->
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="createQuestion = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Create A Question</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <!-- create question content page -->
        <v-container>
            <v-layout class="pa-4">
                <v-flex xs3></v-flex>
                <!-- main question layout -->
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
                      <no-ssr>
                        <quill-editor
                            v-model='editorContent'
                            ref='textEditor'
                            :options='editorOption'
                        ></quill-editor>
                        </no-ssr>
                        </v-flex>
                    </v-layout>
                    <br>
                    <v-divider></v-divider>
                    <br>
                    <!-- answer -->
                    <v-layout row wrap>
                        <v-flex
                        class="headline font-weight-bold"
                        >
                            Answer: 
                        </v-flex>
                    </v-layout>
                    <br>
                    <!-- leading questions -->
                    <v-divider></v-divider>
                    <br>
                    <v-layout row wrap>
                        <v-flex
                        class="headline font-weight-bold"
                        >
                            Leading Questions: 
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs3></v-flex>
            </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

</template>

<script>
export default {
    data () {
        return {
            createQuestion: false,
                editorContent: '',
                editorOption: {
                    placeholder: 'What’s on your mind?',
                    theme: 'bubble',
                    modules: {
                    formula: true,
                    imageResize: true,
                     toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['image', 'code-block'],
                        ['formula',]
                        ]
                    },
                    formats: [
                        'formula',
                    ]
                }
            }
    },
}
</script>

<style lang="scss" scoped>
  .container {
    width: 60%;
    margin: 0 auto;
    padding: 50px 0;
    .quill-editor {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
    }
  }
</style>