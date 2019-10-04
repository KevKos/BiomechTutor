<template>
    <v-container fluid>
        <v-layout >
            <v-spacer></v-spacer>
                <v-card
                style="width: 300px; margin-top: 200px;"
                flat
                >
                <v-card-title
                class="title pb-4"
                >
                    Administrator Login
                </v-card-title>
                <v-card-text
                >
                    <v-text-field
                    outlined
                    color="blue darken-4"
                    placeholder="Username"
                    >
                    </v-text-field>
                    <v-text-field
                    outlined
                    color="blue darken-4"
                    placeholder="Password"
                    >
                    </v-text-field>
                    <v-btn
                    text 
                    block 
                    outlined
                    color="blue darken-4"
                    height="55px"
                    >
                        Login
                    </v-btn>
                </v-card-text>
            </v-card>
        <v-spacer></v-spacer>
    </v-layout>
  </v-container>
</template>
<script>
export default {
    
}
</script>