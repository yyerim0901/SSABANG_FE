<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex  class="wrapper">
          <v-sheet class="justify-center"  width="800px" height="150px" rounded="xl">
            <v-text-field v-model="searchWord" style="padding:50px;">
              <template v-slot:label>
                찾으실 <strong>동</strong> 이나 <strong>구</strong>를 검색하세요 <v-icon style="vertical-align: middle">
                  mdi-file-find
                </v-icon>
              </template>
            </v-text-field>
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      searchWord:'',
    }
  },
  components: {
    
  },
};
</script>

<style>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>