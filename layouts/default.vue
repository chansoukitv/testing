<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title @click="$router.push('/')">{{ title }}</v-toolbar-title>
      <v-spacer />

      <v-btn @click="$router.push('/login')" class="mr-4" v-if="!auth">
        login
      </v-btn>
      <v-btn @click.stop="$router.push('/register')" class="mr-3" v-if="!auth">
        register
      </v-btn>

      <v-btn
        @click.stop="$router.push('/profile')"
        v-if="auth"
        class="mr-4"
        color="primary"
      >
        profile
      </v-btn>
      <v-btn
        @click.stop="$store.dispatch('users/logout')"
        v-if="auth"
        class="mr-3"
        color="error"
      >
        logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      auth: false,
    }
  },

  mounted() {
    this.auth = this.$store.getters['users/token']
  },
}
</script>
