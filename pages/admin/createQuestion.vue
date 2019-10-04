<template>
    <v-layout>
        <!-- dashboard navigaiton -->
        <Navigation></Navigation>

        <!-- page content -->
        <v-container>
            <v-layout>
                <v-flex xs12>
                    <!-- title -->
                    <span>
                        Create Question
                    </span>
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