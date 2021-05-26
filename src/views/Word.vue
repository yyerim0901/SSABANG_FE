<template>
    <v-app>
        <v-container>
            <v-layout>
                <v-flex>
                    <v-sheet class="text-center">
                        <h1 style="padding:20px;">주택 용어 사전</h1>
                        <v-row style="margin:20px;">
                            <v-col>

                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="search"
                                    solo
                                    label="검색어를 입력하세요."
                                    clearable
                                ></v-text-field>                             
                            </v-col>
                            <v-cols>
                                <v-btn
                                class="ma-4"
                                outlined
                                large
                                color="black"
                                @click="searchWord"
                                >
                                검색
                                </v-btn>
                            </v-cols>
                                <v-col>

                                </v-col>
                        </v-row>
                        <v-simple-table>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                <th width="15%" class="text-center">
                                    용어
                                </th>
                                <th width="30%" class="text-left">
                                    의미
                                </th>
                                <th class="text-left">
                                    예시
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                v-for="item in getWordList.data"
                                :key="item.word"
                                >
                                <td>{{ item.word }}</td>
                                <td class="text-left">{{ item.descript }}</td>
                                <td class="text-left">{{ item.ex }}</td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                        <v-row style="margin-top:8px;">
                            <v-col></v-col>
                            <v-col class="text-right">
                                <div>
                                    <v-pagination
                                    v-model="page"
                                    @input="getNewWord"
                                    :length="5"
                                    prev-icon="mdi-menu-left"
                                    next-icon="mdi-menu-right"
                                    ></v-pagination>
                                </div>
                            </v-col>
                            <v-col></v-col>
                        </v-row>
                    </v-sheet>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
    
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name:"Word",
    data() {
        return {
            search:'',
            page:'',
            startpage:'',
            endpage:'',
        }
    },
    computed: {
        ...mapGetters(['getWordList'])
    },
    created(){
        this.$store.dispatch("getWordList");
    },
    methods:{
        searchWord(){
            this.$store.dispatch("getWordList", this.search);
        },
        getNewWord(){
            if(!this.search){
                this.$store.dispatch("getAllWordList", this.page);
            }
            else{
                this.$store.dispatch("getWordList",this.search, this.page);
            }
        }
    }
}
</script>

<style>

</style>