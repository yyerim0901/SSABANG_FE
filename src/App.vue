<template>
  <div id="app">
      <v-app>
        <v-container>
        <v-toolbar flat>
                  <v-btn
                    to="/"
                    class="ma-1"
                    color="darkgrey"
                    plain
                  >
                    <h3><v-icon>mdi-home</v-icon></h3>
                  </v-btn>
                  <v-menu text offset-y>
                    <template text v-slot:activator="{ on, attrs }">
                      <v-btn text class="ma-1" color="darkgrey" v-bind="attrs" v-on="on" plain>
                        <h3><v-icon>mdi-star</v-icon></h3>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item to="/word">
                        <v-list-item-title>용어집</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <v-btn
                  to="/board"
                  class="ma-1"
                  color="darkgrey"
                  plain
                  >
                    <h3>공지사항</h3>
                  </v-btn>
                    
                    <v-spacer></v-spacer>

                    <v-btn
                    to="/login"
                    v-if="!getisLogin"
                    class="ma-1"
                    color="darkgrey"
                    plain
                  >
                    <h3>로그인</h3>
                  </v-btn>

                  <v-btn
                    to="/registermember"
                    v-if="!getisLogin"
                    class="ma-1"
                    color="darkgrey"
                    plain
                  >
                    <h3>회원가입</h3>
                  </v-btn>

                  <v-btn
                    to="/mypage"
                    v-if="getisLogin"
                    class="ma-1"
                    color="darkgrey"
                    plain
                  >
                    <h3>마이페이지</h3>
                  </v-btn> 

                  <v-btn
                    @click="logout"
                    v-if="getisLogin"
                    class="ma-1"
                    color="darkgrey"
                    plain
                  >
                    <h3>로그아웃</h3>
                  </v-btn>
                </v-toolbar>
                <v-sheet style="background">
                  <v-flex id="img" @click="goHome" class="text-center">
                    <img height="280px;" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmsXDk%2Fbtq5HEjPhqy%2F2UKAKZ4E1ctie9Fwl3Dsuk%2Fimg.png" alt=""/>
                  </v-flex>
                  <router-view></router-view>
                </v-sheet>
        </v-container>
      </v-app>
  </div>
</template>

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
    },
    goHome(){
      this.$router.push("/")
    }
  },
  computed: {
    ...mapGetters(['getisLogin'])
  },
  created() {
    
  },
};
</script>

<style>
#img{
  cursor : pointer;
}
#hidden {
  background-color:rgba(250, 250, 250, 0);
}
</style>
