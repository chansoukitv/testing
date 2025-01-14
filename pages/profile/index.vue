 

<template>
  <div>
    <v-card>
      <v-card-title>Profile</v-card-title>
      <v-card-text>
        <v-row>
          <!-- avstar -->
          <v-col cols="12">
            <v-avatar size="100">
              <v-img :src="data.avatar"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="data.first_name"
              label="First Name"
              required
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="data.last_name"
              label="Last Name"
              required
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="data.email"
              label="Email"
              required
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

    <script>
export default {
  data() {
    return {
      data: {},
    }
  },

  async fetch() {
    await fetch('https://reqres.in/api/users/2')
      .then((res) => res.json())
      .then((res) => {
        this.data = res.data
      })
  },
}
</script>

