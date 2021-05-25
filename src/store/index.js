import Vue from "vue";
import Vuex from "vuex";
import http from "@/util/http-commons.js";
import router from "@/router/index.js";
// import axios from 'axios';
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
    words: [],
    word:{},
    searchOn: false,
    dialog:false,
    housedealstate: 0, // 0 : 초기상태 , 1 : 데이터 로딩 중, 2 : 데이터 로딩 완료
    housedeals: [],
    parkList: [],
    news: [],
    hospitalList:[],
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
    getWordList(state, payload) {
      state.searchOn = false;
      state.words = payload;
    },
    getWord(state, payload) {
      state.searchOn = true;
      state.word = payload;
    },
    SET_INIT(state) {
      state.housedeals = [];
    },
    SET_HOUSEDEAL_ALL_LIST(state, payload) {
      state.housedeals = payload;
    },
    SET_HOUSEDAEL_GU_LIST(state, payload) {
      state.housedeals = payload;
    },
    SET_HOUSEDEAL_STATE(state, payload) {
      state.housedealstate = payload;
    },
    SET_PARKLIST(state, payload) {
      state.parkList = payload;
    },
    SET_NEWS(state, payload) {
      state.news = payload;
    },
    SET_HOSPITALLIST(state, payload) {
      state.hospitalList = payload;
    }
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
    getBoard({ commit }, pagenum) {
      http.get("/board/list/"+pagenum).then((resp) => {
        commit("getBoard", resp.data);
      });
    },
    selectOne({ commit }, bnum) {
      http.get(`/board/detail/${bnum}`).then((resp) => {
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
    getWordList({ commit }, word, page) {
      if ((word) && page) {
        console.log("word and page");
        http.get("/word/"+word+"/"+page).then((resp) => {
          commit("getWordList", resp.data);
        });
      } else if (word) {
        console.log("just word");
        http.get("/word/"+word).then((resp) => {
          console.log(resp.data)
          commit("getWordList", resp.data);
        });
      } else {
        http.get("/word").then((resp) => {
          commit("getWordList", resp.data);
        });
      }
    },
    getAllWordList({commit}, page){
      if(!page){
        http.get("/word/%20/1").then((resp)=>{
          commit("getWordList", resp.data);
        })
      }else{
        http.get("/word/%20/"+page).then((resp)=>{
          commit("getWordList", resp.data);
        })
      }
    },
    setinit({ commit }) {
      commit("SET_HOUSEDEAL_STATE", 0);
      commit("SET_INIT");
    },
    searchAll({ commit }) {
      http
        .get("house/")
        .then((resp) => {
          commit("SET_HOUSEDEAL_STATE", 1);
          commit("SET_HOUSEDEAL_ALL_LIST", resp.data);
        })
        .then(() => {
          commit("SET_HOUSEDEAL_STATE", 2);
        });
    },
    searchZone({ commit }, zone) {
      http
        .get("house/zone/" + zone)
        .then((resp) => {
          commit("SET_HOUSEDEAL_STATE", 1);
          commit("SET_HOUSEDAEL_GU_LIST", resp.data);
        })
        .then(() => {
          commit("SET_HOUSEDEAL_STATE", 2);
        });
    },
    getParkList({ commit }) {
      return http
        .get("/park/list")
        .then((resp) => {
          commit("SET_PARKLIST", resp.data)
        });
    },
    getNews({ commit }) {
      return http.get("news/").then((resp) => {
        commit("SET_NEWS", resp.data.items);
      })
    },
    getHospitalList({ commit }) {
      return http
        .get("/hospital/list")
        .then((resp) => {
          commit("SET_HOSPITALLIST", resp.data)
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
    },
    getWordList(state) {
      return state.words;
    },
    getHousedealList(state) {
      return state.housedeals;
    },
    getHousedealState(state) {
      return state.housedealstate;
    },
    parkList(state) {
      return state.parkList;
    },
    getNews(state) {
      return state.news;
    },
    hospitalList(state) {
      return state.hospitalList;
    }
  }
});
