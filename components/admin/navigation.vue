<template>
    <v-navigation-drawer
      app
      >
          <v-list-item>
                <v-list-item-content>
                <v-list-item-title
                class="title"
                >Kin Biomech</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list>

                <v-list-item
                v-for="nav in navigation"
                :key="nav.title"
                link
                :to="nav.nav"
                >
                <v-list-item-icon>
                    <v-icon>{{ nav.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ nav.title }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
      </v-navigation-drawer>

</template>

<script>
export default {
    data () {
        return {
            navigation: [
                {title: 'Dashboard', icon: 'dashboard', nav: '/admin/dashboard'},
                {title: 'Manage Classes', icon: 'library_books', nav: '/admin/manageClass'},
                {title: 'Settings', icon: 'settings', nav: '/admin/settings'},
                {title: 'Support', icon: 'contact_support', nav: '/admin/support'}
            ]
        }
    },    
}
</script>