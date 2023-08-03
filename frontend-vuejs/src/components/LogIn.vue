<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form ref="form" @submit.prevent="login()">
                  <v-text-field
                    id="login_email"
                    v-model="email"
                    name="email"
                    label="Email"
                    type="text"
                    placeholder="Email"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="login_password"
                    v-model="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="password"
                    required
                  ></v-text-field>
                  <v-btn
                    type="submit"
                    class="mt-4"
                    color="primary"
                    value="log in"
                    >Login</v-btn
                  >
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import setAuthHeader from '../utils/setAuth'
import Api from "../services/Api"
export default {
  name: "log_in",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    
   async login() {
      let user = {
         email: this.email,
         password: this.password,
      }
      
          await axios.post(`${Api().baseURL}/login`,user, {headers :{
           'Access-Control-Allow-Origin': "*",  
         }},{
          withCredentials:true,
          mode: 'cors'
         })
         .then(res =>{
             localStorage.setItem('access_token', res.data.token)
             setAuthHeader(res.data.token)
            //  axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
             this.$router.push('/dashboard')
         })
        
        

        
    }
  },
};
</script>