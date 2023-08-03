<template>
  <v-container>
    <v-card>
      <v-app-bar color="teal lighten-3" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title >{{ details.title }}</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>
      <v-col cols="12" height="100%">
        <div style="height: 100%" name="input-7-4" label="Description" value="">
          {{ details.description }}
        </div>
      </v-col>
    </v-card>
    <v-col cols="12" md="12">
      <v-textarea
        solo
        name="input-7-4"
        label="Comment Here"
        v-model="comment"
      ></v-textarea>
    </v-col>
    <v-btn primary @click="postComment()">Post Comment </v-btn>
    <v-spacer></v-spacer>
    <v-container
      filled
      v-for="comments in details.comments"
      :key="comments.author"
      class="grey lighten-5 mb-6"
    >
      <strong>{{ comments.author }}</strong>
      <br />
      {{ comments.comment }}
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
import Api from "../services/Api"
export default {
  data: () => ({
    details: {
      title: "",
      description: "",
      comments: "",
    },
    comment:""
  }),
  created() {
    const i = this.$route.params.id;
    axios.get(`${Api().baseURL}/posts/` + i).then((res) => {
      this.details = res.data.PostData;
      console.log(this.details);
    });
  },
  methods: {
    postComment() {
      console.log(this.comment);
      const Comments={
        comment: this.comment
      }
      console.log(Comments)
      const i = this.$route.params.id;
      axios
        .post(`${Api().baseURL}/posts/${i}/comment`, Comments)
        .then((res) => {
          console.log(res.data);
          console.log(res);
        });
    },
  },
};
</script>