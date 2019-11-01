<template>
    <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      style="width: 1000px;"
      class="text-xs-left "
    >
      <v-card-text
      class="display-2"
      style="text-transform: capitalize;"
      >
        {{classes.title}}
      </v-card-text>

      <v-card
      v-for="unit in units"
      :key="unit.title"
      class="my-5"
      outlined
      hover
      :to="`/questions/${unit._id}`"
      >
        <v-card-title
        style="text-transform: capitalize;"
        >
          {{unit.title}}
        </v-card-title>
        <v-card-actions>
          <v-btn
          text
          color="blue darken-3"
          style="letter-spacing: 0px; text-transform: none;"
          :to="`/questions/${unit._id}`"
          >
          <v-icon
          left> 
          star</v-icon>
            Questions
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
export default {
    data () {
        return {
            classes: [],
            units: [],
        }
    },
    methods: {
        getClassInformation () {
                this.$axios.get('/admin/classes/getClassInformation', {
                    params:{ id: this.$route.params.id}
                })
                .then((res) => {
                    // returns the class data
                    console.log(res.data)
                    this.classes = res.data.classes;
                    this.units = res.data.units;
                })
        },
    },
    mounted() {
        this.getClassInformation()
    },
}
</script>
