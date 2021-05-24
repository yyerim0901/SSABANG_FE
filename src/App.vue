<template>
  <div id="app">
      <v-app>
        <v-container>
          <v-layout column>
            <v-flex>
              <div>
                <v-card color="grey ligthen-4" flat>
                  <v-toolbar flat>
                    <v-btn
                    to="/board"
                    class="ma-1"
                    color="darkgrey"
                    plain
                  >
                    공지사항
                  </v-btn>
                  <v-menu flat offset-y>
                    <template flat v-slot:activator="{ on, attrs }">
                      <v-btn flat class="ma-1" color="darkgrey" v-bind="attrs" v-on="on" plain>
                        etc
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item to="/word">
                        <v-list-item-title>용어집</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                    
                    <v-spacer></v-spacer>

                    <v-btn
                    to="/"
                    class="ma-1"
                    color="darkgrey"
                    plain
                  >
                    HOME
                  </v-btn>

                    <v-btn
                    to="/login"
                    v-if="!getisLogin"
                    class="ma-1"
                    color="darkgrey"
                    plain
                  >
                    로그인
                  </v-btn>

                  <v-btn
                    to="/registermember"
                    v-if="!getisLogin"
                    class="ma-1"
                    color="darkgrey"
                    plain
                  >
                    회원가입
                  </v-btn>

                  <v-btn
                    to="/mypage"
                    v-if="getisLogin"
                    class="ma-1"
                    color="darkgrey"
                    plain
                  >
                    마이페이지
                  </v-btn> 

                  <v-btn
                    @click="logout"
                    v-if="getisLogin"
                    class="ma-1"
                    color="darkgrey"
                    plain
                  >
                    로그아웃
                  </v-btn>

                    </v-toolbar>
                  </v-card>
              </div>
            </v-flex>
            <v-sheet id="hidden" height="50px">

            </v-sheet>
              <v-flex>
                <div class="justify-center">
                  <router-view></router-view>
                </div>
              </v-flex>
          </v-layout>
        </v-container>
      </v-app>
      
  </div>
</template>

<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
import {mapGetters} from "vuex";

export default {
  name: "App",
  data() {
    return {
    }
  },
  methods: {
    logout(){
      this.$store.dispatch("logout")
    }
  },
  computed: {
    ...mapGetters(['getisLogin'])
  },
  created() {
    console.log(this.getisLogin)
  },
};
</script>

<style>
#app {
  background: url('https://ohlaladani.com.br/wp-content/uploads/wallpaper-OHLALADANI_DESKTOP_WALLPAPERS_AVENTURA-2.jpg')
    no-repeat center center fixed !important;
  background-size: cover;
}
#hidden {
  background-color:rgba(250, 250, 250, 0);
}
</style>
