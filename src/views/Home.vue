<template>
    <v-container>
      <v-layout>
        <v-flex>
          <v-sheet></v-sheet>
        </v-flex>
        <v-flex>
          <v-sheet class="justify-center" width="800px" height="150px">
            <v-flex v-if="searching == 1">
              <v-row>
                <v-cols>
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>  
                </v-cols>
                <v-col>
                  <h4>데이터 로딩 중 입니다. 잠시만 기다려 주세요.</h4>
                </v-col>
              </v-row>
            </v-flex>
              <v-row>
                <v-col v-if="searching != 1">
                  <v-text-field
                  id="searchField"
                  outlined
                  height="60px"
                  rounded dense
                  @keyup.enter="map" 
                  v-model="searchWord"
                  prepend-inner-icon="mdi-map-marker"
                  placeholder="  찾으실 동 이나 구 를 검색하세요">
                  </v-text-field>
                </v-col>
                <v-cols v-if="searching != 1">
                    <v-btn @click="map" outlined x-large style="margin-top:16px">검색</v-btn>
                </v-cols>
              </v-row>
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      searchWord:'',
      searching:0,
      dialog : false,
    }
  },
  components: {
    
  },
  methods: {
    map(){
      this.dialog = true;
      
      this.searching = 1;
      if (this.searchWord.trim().length == 0) {
        this.$store.dispatch("searchAll");
      } else {
        this.$store.dispatch("searchZone", this.searchWord);
      }
      this.searchZone = "";
    }
  },
  created() {
    this.$store.dispatch("setinit");
  },
  computed: {
    ...mapGetters(["getHousedealList", "getHousedealState"]),
  },
  watch:{
    getHousedealState() {
      if (this.getHousedealState == 2) {
        this.$router.push("/map");
      }
    },
  }
};
</script>

<style>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.v-input__icon--prepend-inner .v-icon{
  margin-top: 15px;
  margin-right: 7px;
  margin-left:5px;
}
</style>