import Vue from "vue";
import Vuex from "vuex";
import http from "@/util/http-commons.js";
import router from "@/router/index.js";
// import VueCookies from "vue-cookies";

Vue.use(Vuex);
// VueCookies.use(VueCookies);

export default new Vuex.Store({
  state: {
    userInfo: {},
    allUsers: [],
    isLogin: false,
    isLoginError: false,
    boards: [],
    board: {},
  },
  mutations: {
    //로그인이 성공했을 때
    loginSuccess(state, payload) {
      state.isLogin = true;
      state.isLoginError = false;
      state.userInfo = payload;
    },
    //로그인이 실패했을 때
    loginError(state) {
      state.isLogin = false;
      state.isLoginError = true;
    },
    logout(state) {
      state.isLogin = false;
      state.isLoginError = false;
      state.userInfo = null;
    },
    setuserInfo(state, payload) {
      state.userInfo = payload;
    },
    getBoard(state, payload) {
      state.boards = payload;
    },
    selectOne(state, payload) {
      state.board = payload;
    },
    addBoard(state, boardItem) {
      state.boards.push(boardItem);
    },


  },
  actions: {
    //로그인 시도
    login({ dispatch }, loginObj) {
      console.log(loginObj)
      http
        .post("/member/login", loginObj)
        //loginObj = {userid, password}
        .then(res => {
          console.log(res.data)
          console.log("userid : " + res.data.userid)
          
          // console.log(res)
          Vue.prototype.$cookies.set("login_cookie", res.data.userid);
          // console.log(Vue.prototype.$cookies.get("login_cookie"))
          dispatch("getMemberInfo")
          router.push("/mypage")
          // console.log(res)

        })
    },
    logout({ commit }) {
      Vue.prototype.$cookies.remove("login_cookie")
      // Vue.prototype.$cookies.config("0");
      commit("logout")
      router.push("/")
    },
    getMemberInfo({ commit }) {
      let cookie = Vue.prototype.$cookies.get("login_cookie")
      console.log("여기는 스토어에 겟멤버인포")
      http
        .get("/member", {
          params: {
            userid: cookie
          }
        })
        .then(res => {
          console.log(res)
          let userInfo = {
            userid: res.userid,
            userpw: res.userpw,
            username: res.username,
            useremail: res.useremail,
            useraddress : res.useraddress
          }
          commit("loginSuccess", userInfo)
        }).catch(() => {
          alert('getMemberInfo에서 문제생김')
        })
    },
    registerMember(context, MemberObj) {
      console.log(MemberObj)
      http
        .post("/member", MemberObj)
        .then(res => {
          console.log(res);
        })
    },
    deleteMember({ dispatch }) {
      let cookie = Vue.prototype.$cookies.get("login_cookie")
      http
        .delete("/member", {
          params: {
            userid: cookie,
        }
        }).then(() => {
          dispatch("logout")
      })
    },
    Mypage({ commit }) {
      let cookie = Vue.prototype.$cookies.get("login_cookie")
      console.log("여기는 스토어에 마이페이지")
      http
        .get("/member", {
          params: {
            userid: cookie
          }
        })
        .then(res => {
          console.log(res)
          let userInfo = {
            userid: res.data.userid,
            userpw: res.data.userpw,
            username: res.data.username,
            useremail: res.data.useremail,
            useraddress : res.data.useraddress
          }
          commit("setuserInfo", userInfo)
        }).catch(() => {
          alert('mypage에서 문제생김')
        })
    },
    updateMember(context, MemberObj) {
      console.log(MemberObj)
      console.log("store에 updateMember MemberObj: "+MemberObj)
      http
        .put("/member", MemberObj)
        .then(res => {
          console.log(res)
          router.push("/mypage")
        })
    },
    getBoard({ commit }) {
      http.get("/board").then((resp) => {
        console.log(resp.data)
        commit("getBoard", resp.data);
      });
    },
    selectOne({ commit }, bnum) {
      http.get(`/board/${bnum}`).then((resp) => {
        console.log("action bnum :" + bnum);
        commit("selectOne", resp.data);
      });
    },
    deleteBoard({ commit }, bnum) {
      http.delete(`/board/${bnum}`).then(() => {
        http.get("/board").then((resp) => {
          commit("getBoard", resp.data);
        });
        // commit("GET_BOARD", this.state.boards);
      });
    },
    registerBoard({ commit }, boardItem) {
      console.log(boardItem)
      http
        .post("/board", boardItem)
        .then(() => {
          commit("addBoard", boardItem);
        })
        .catch(() => {
          alert("등록 중 에러가 발생했습니다.");
        });
    },
    updateBoardForm({ commit }, boardItem) {
      commit("selectOne", boardItem);
    },
    updateBoard({ commit }, boardItem) {
      console.log(boardItem);
      http.put("/board", boardItem).then(() => {
        commit("selectOne", boardItem);
      });
    },
  },
  getters: {
    userInfo(state) {
      return state.userInfo;
    },
    boardList(state) {
      return state.boards;
    },
    boardListItem(state) {
      return state.board;
    },
    getisLogin(state) {
      return state.isLogin;
    }
  }
});
