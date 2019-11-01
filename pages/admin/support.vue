<template>
    <v-layout>
        <!-- dashboard navigaiton -->
        <Navigation></Navigation>

        <!-- page content -->
        <v-container>
            <v-layout>
                <v-flex xs12>
                    <v-card-title 
                    class="display-1"
                    >
                        Support
                    </v-card-title>
                    <v-card-text>
                        If you have any issues or bugs with the Mac Kin Biomechanics question platform, please email Kevin Kos at kosk@mcmaster.ca.
                    </v-card-text>
                </v-flex>
            </v-layout>
        </v-container>

    </v-layout>
        
</template>

<script>
import Navigation from '@/components/admin/navigation'

export default {
    components: {
        Navigation: Navigation,
    }
    
}
</script>