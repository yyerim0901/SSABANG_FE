<template>
    <div>
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
                                    <th width="20%" class="text-center">
                                        용어
                                    </th>
                                    <th class="text-center">
                                        의미
                                    </th>
                                    <th class="text-center">
                                        예시
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                    v-for="item in words"
                                    :key="item.word"
                                    >
                                    <td>{{ item.word }}</td>
                                    <td>{{ item.descript }}</td>
                                    <td>{{ item.ex }}</td>
                                    </tr>
                                </tbody>
                                </template>
                            </v-simple-table>
                        </v-sheet>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-app>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            search:'',
        }
    },
    computed: {
        ...mapGetters(['getWordList'])
    },
    created(){
        this.$store.dispatch("getWordList");
    },
    method:{
        searchWord(){
            //검색해서.....저 표에 나오는 결과값을 바꿔야하는데...
            //다른 컴포넌트를 띄우거나....
            //그걸 어떻게 하지..?
            //리스트 띄울 때 페이지네이션도 해야됨 
        }
    }
}
</script>

<style>

</style>