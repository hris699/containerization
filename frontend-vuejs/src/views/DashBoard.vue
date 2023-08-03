<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Blogs</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="logOut()"> Log Out </v-btn>

      <v-btn @click="$router.push('/')"> Sign Up </v-btn>

      <v-menu left bottom> </v-menu>
    </v-app-bar>
    <v-data-table :headers="headers" :items="posts" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.title"
                        label="Title"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6" >
                      <v-textarea
                        v-model="editedItem.description"
                        label="Description"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
        <v-text-field label="Author" v-model="editedItem.author"></v-text-field>
      </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      
      <template v-slot:[`item.redirect`]="{ item }">
        <v-icon @click="openBlog(item)"> mdi-chevron-down </v-icon>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import Api from "../services/Api"
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    id: -1,
    data: {},
    headers: [
      {
        text: "Title",
        align: "start",
        sortable: false,
        value: "title",
      },
      { text: "Author", value: "username", sortable: false },
      { text: "Explore", value: "redirect", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    posts: [],
    editedIndex: -1,

    editedItem: {
      title: "",
      description: "",
      author: "",
    },
    defaultItem: {
      title: "",
      description: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    axios.get(`${Api().baseURL}/posts`).then((res) => {
      this.posts = res.data.PostData;
    });
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.posts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.posts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async openBlog(item) {
      this.editedIndex = this.posts.indexOf(item);
      await axios.get(`${Api().baseURL}/posts/`).then((res) => {
        this.data = res.data.PostData;
        this.id = this.data[this.editedIndex]._id;
      });
      this.$router.push(`/posts/${this.id}`);
      // console.log(this.$route.params)
    },

    deleteItemConfirm() {
      this.id = this.posts[this.editedIndex]._id;
      this.posts.splice(this.editedIndex, 1);
      this.closeDelete();
      axios.delete(`${Api().baseURL}/posts/` + this.id).then((res) => {
        console.log(res);
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        console.log(this.editedIndex)
        Object.assign(this.posts[this.editedIndex], this.editedItem);
        this.id = this.posts[this.editedIndex]._id;
        axios
          .put(`${Api().baseURL}/posts/` + this.id, this.editedItem)
          .then((res) => {
            console.log(res);
          });
      } else {
        this.posts.push(this.editedItem);
        axios
          .post(`${Api().baseURL}/posts`, this.editedItem)
          .then((res) => {
            console.log(res);
          });
      }
      this.close();
    },
    logOut(){
      localStorage.clear()
      this.$router.push('/login')
    }
  },
};
</script>