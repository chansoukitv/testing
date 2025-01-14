<!-- register page -->
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
          <v-card-title>Register</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
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
              <v-btn type="submit">Register</v-btn>
            </v-form>
            <!-- login btn -->
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
    async register() {
      try {
        await fetch('https://reqres.in/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        })
          .then((response) => {
            if (response.ok) {
              this.$router.push('/login')
            }
          })
          .catch((error) => {
            console.error(error)
            this.message = 'Registration failed'
          })
          .finally(() => {
            this.message = 'Registration failed'
          })
      } catch (error) {
        console.error(error)
        this.message = 'Registration failed'
      }
    },
  },
}
</script>