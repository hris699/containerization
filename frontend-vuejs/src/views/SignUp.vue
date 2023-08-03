<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container fluid pa-0>
          <v-layout row wrap>
            <v-flex xs12 sm4 id="sign-in-text-wrapper">
              <v-layout column align-center justify-center fill-height pa-3>
                <v-btn id="sign-in" @click="$router.push('/login')"
                  >Sign in</v-btn
                >
              </v-layout>
            </v-flex>
            <v-flex xs12 sm8 id="sign-up-form-wrapper" class="active">
              <v-layout column align-center justify-center pa-3 mt-5>
                <v-flex xs12 mb-3 mt-5>
                  <div class="login-wrapper text-xs-center">
                    <div class="display-1 font-weight-black">
                      Create Account
                    </div>
                  </div>
                </v-flex>

                <v-flex xs12 mb-2>
                  <span class="grey--text text--lighten-1"
                    >or use your email for registration</span
                  >
                </v-flex>
                <v-flex xs12 class="form-wrapper">
                  <v-text-field
                    id="username"
                    v-model="username"
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="username"
                    prepend-inner-icon="mdi-account-outline"
                    mb-0
                  ></v-text-field>
                  <v-text-field
                    id="e-mail"
                    v-model="email"
                    name="email"
                    label="Email"
                    type="text"
                    placeholder="Email"
                    background-color="#f4f8f7"
                    color="grey darken-2"
                    prepend-inner-icon="mdi-email-outline"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="password"
                    prepend-inner-icon="mdi-lock-outline"
                  ></v-text-field>
                </v-flex>
                <v-btn
                  rounded
                  large
                  dark
                  ripple
                  color="teal"
                  id="sign-up"
                  @click="signup"
                  >Sign up</v-btn
                >
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
import Api from "../services/Api"
export default {
  name: "sign-up",
  data: () => ({
    username: "",
    email: "",
    password: "",
  }),
  methods: {
    async signup() {
      let newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      console.log(Api().baseURL)
      await axios.post(`${Api().baseURL}/signup`, newUser);
      console.log(newUser);
    },
  },
};
</script>
<style scoped>
.container {
  min-height: 530px;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(253deg, #40b09b 0, #3fb493 100%);
  color: white;
}

.form-wrapper {
  min-width: 50%;
}

.layout.wrap {
  height: 100vh;
}

.active {
  background: #fff;
  color: #40ae9f;
}

#sign-in {
  width: 60%;
}

#sign-up {
  min-width: 25%;
}

.form-wrapper .v-input__control > .v-input__slot {
  background: rgba(244, 248, 247, 1);
}

.form-wrapper .v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0px;
  height: 0px;
}
</style>
