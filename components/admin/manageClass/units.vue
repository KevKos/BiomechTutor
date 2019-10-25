<template>
    <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition">
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
            Manage Units
        </v-btn>
      </template>
      <!-- full screen dialog card -->
      <v-card>
        <!-- full screen toolbar  -->
        <v-toolbar dark color="primary">
          <v-btn icon dark>
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title style="text-transform: capitalize">{{classTitle}}</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <!-- create question content page -->
        <v-container>
            <v-layout
            row wrap
            class="pa-4">
                <v-flex
                xs12
                v-if="units"
                >
                  <v-card-title>
                    Units
                  </v-card-title>
                </v-flex>
                <v-flex
                xs12
                v-for="units in units"
                :key="units._id"
                >

                  <v-card outlined>
                    <v-card-text
                    class="title"
                    >
                      {{units.title}}
                    </v-card-text>
                    <v-card-text>
                      <CreateQuestion
                      :unitId="units._id" 
                      ></CreateQuestion>
                    </v-card-text>
                  </v-card>
                </v-flex>
            </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

</template>

<script>
import CreateQuestion from '@/components/admin/manageClass/createQuestion.vue'


export default {
  data () {
    return {
      units: [],
    }
  },
  components: {
    CreateQuestion
  },
  props: {
    classId: String,
    classTitle: String,
  },
  mounted(){
      this.$axios.get('admin/getUnits', {
            params: {
                classId: this.classId
            }
        }
        ).then((res)     =>   {
            console.log(res.data);
            this.units = res.data.units;
        })
    },
}
   
</script>
