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
      <span
      class="display-1"
      >
        Practice Questions
      </span>

      <v-card
      v-for="unit in units"
      :key="unit.title"
      class="my-5"
      >
        <v-card-title>
          {{unit.title}}
        </v-card-title>

        <v-card-text>
          {{unit.description}}
        </v-card-text>
        <v-card-actions>
          <v-btn
          text
          large
          class="blue darken-3"
          dark
          style="letter-spacing: 0px; text-transform: none;"
          to="/sample-unit-page"
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
      units: [
        {title: 'Trigonometry', description: 'triangles and stuff', to:'/sample-unit-page'},
        {title: 'Force Resolution', description: 'find the forces', to:'/sample-unit-page'},
        {title: 'Moment of Torque', description: 'force and spin', to:'/sample-unit-page'},
        {title: 'Static Equilibrium', description: 'things arent moving', to:'/sample-unit-page'}

      ]
    }
  },
}
</script>
