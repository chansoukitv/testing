<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      item-key="name"
      :page="page"
      :items-per-page="itemsPerPage"
      :items-per-page-options="itemsPerPageOptions"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:item.avatar="{ item }">
        <v-avatar size="36">
          <v-img :src="item.avatar"></v-img>
        </v-avatar>
      </template>
    </v-data-table>

    <!-- editItem dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <!-- avatar -->
                <v-avatar size="100">
                  <v-img :src="editedItem.avatar"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.first_name"
                  label="First Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.last_name"
                  label="Last Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.email"
                  label="Email"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="saveItem">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      itemsPerPageOptions: [5, 10, 15, 20],
      sortBy: ['name'],

      search: '',
      headers: [
        {
          text: 'ID',
          align: 'start',
          filterable: false,
          value: 'id',
        },

        {
          text: 'Avatar',
          value: 'avatar',
          align: 'center',
          sortable: false,
        },
        {
          text: 'First Name',
          value: 'first_name',
          align: 'center',
        },
        {
          text: 'Last Name',
          value: 'last_name',
          align: 'center',
        },
        {
          text: 'Email',
          value: 'email',
          align: 'center',
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
          align: 'center',
        },
      ],
      desserts: [],
      dialog: false,
      editedItem: {},
    }
  },

  watch: {
    search(val) {
      this.fetchDesserts()
    },
  },

  async mounted() {
    await this.fetchDesserts()
  },

  methods: {
    async fetchDesserts() {
      // search
      let url = 'https://reqres.in/api/users'
      if (this.search) {
        url += `?search=${this.search}`
      }

      const response = await fetch(url)
      const { data } = await response.json()
      this.desserts = data
    },

    editItem(item) {
      this.editedItem = { ...item }
      this.dialog = true
    },

    async saveItem() {
      try {
        await fetch(`https://reqres.in/api/users/${this.editedItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.editedItem),
        }).then(() => {
          this.dialog = false
          this.fetchDesserts()
        })
      } catch (error) {
        console.error(error)
      }
    },

    async deleteItem(item) {
      try {
        await fetch(`https://reqres.in/api/users/${item.id}`, {
          method: 'DELETE',
        }).then(() => {
          this.fetchDesserts()
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>