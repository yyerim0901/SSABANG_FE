<template>
    <div>
      어느 지역을 검색하시겠습니까? <br />
      <input
        type="text"
        v-model="searchZone"
        placeholder="구 혹은 동을 입력하세요"
      />
      <button @click="search">검색</button> <br />
      
      <h4 v-if="searching == 1">데이터 로딩 중 입니다. 잠시만 기다려 주세요.</h4>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "About",
  data() {
    return {
      searchZone: "",
      searching: 0,
    };
  },
  created() {
    this.$store.dispatch("setinit");
  },
  computed: {
    ...mapGetters(["getHousedealList", "getHousedealState"]),
  },
  watch: {
    getHousedealState() {
      if (this.getHousedealState == 2) {
        this.$router.push("/map");
      }
    },
  },
  methods: {
    search() {
      this.searching = 1;
      if (this.searchZone.trim().length == 0) {
        this.$store.dispatch("searchAll");
      } else {
        this.$store.dispatch("searchZone", this.searchZone);
      }
      this.searchZone = "";
    },
  },
};
</script>

<style></style>
