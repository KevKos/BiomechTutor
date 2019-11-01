<template>
  <v-content>
    <v-layout>
      <v-flex>

      </v-flex>
      <v-flex>
        <v-card
        flat
        >
          <v-card-title
          class="display-1"
          >
            McMaster Kinesology Biomechanics
          </v-card-title>
          <v-card-text
          class="subtitle-1"
          >
            Click "Practice Questions" in the top left and choose a class to get started.
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex>

      </v-flex>
    </v-layout>
  </v-content>
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
    computed: {
     admin(){
        return this.$store.getters['auth/getAdmin'];
      },
    },
}
</script>
