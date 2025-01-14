<!-- login page -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-card>
          <v-alert
            v-if="message"
            type="error"
            dismissible
            border="left"
            colored-border
            elevation="2"
            icon="mdi-alert"
          >
            {{ message }}
          </v-alert>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                required
                type="password"
              ></v-text-field>
              <v-btn type="submit">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
    }
  },
  methods: {
    async login() {
      try {
        await fetch('https://reqres.in/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        })
          .then((res) => res.json())
          .then(async (res) => {
            if (res.error) {
              this.message = 'Invalid email or password'
              throw new Error(res.error)
            }
            // commit
            await this.$store.dispatch('users/setToken', res.token)
            this.$router.push('/admins')
          })
      } catch (error) {
        this.message = 'Invalid email or password'
        console.error(error)
      }
    },
  },
}
</script>