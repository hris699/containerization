<template>
  <v-app>
  <router-link to="/"></router-link>
    <v-main>
    <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
