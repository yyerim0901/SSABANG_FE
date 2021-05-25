<template>
    <div>
        <v-container>
            <v-layout>
                <v-flex>
                    <v-sheet>
                        <v-simple-table style="padding:20px;">
                            <template v-slot:default>
                            <thead>
                                <tr>
                                <th width="10%" class="text-center">
                                    번호
                                </th>
                                <th class="text-center">
                                    제목
                                </th>
                                <th width="10%" class="text-center">
                                    작성자
                                </th>
                                <th width="10%" class="text-center">
                                    조회수
                                </th>
                                <th width="15%" class="text-center">
                                    작성시간
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                v-for="item in boardList.data"
                                :key="item.bnum"
                                >
                                <td class="text-center">{{ item.bnum }}</td>
                                <td class="text-center" @click="detailview(item.bnum)">{{ item.btitle }}</td>
                                <td class="text-center">{{ item.bwriter }}</td>
                                <td class="text-center">{{ item.viewnum }}</td>
                                <td class="text-center">{{ item.bregdate | formatDate(item.bregdate) }}</td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                        <v-row>
                            <v-col></v-col>
                            <v-col class="text-right">
                                <div>
                                    <v-pagination
                                    v-model="page"
                                    @input="getNewBoard"
                                    :length="boardList.totpage"
                                    prev-icon="mdi-menu-left"
                                    next-icon="mdi-menu-right"
                                    ></v-pagination>
                                </div>
                            </v-col>
                            <v-col class="text-right">
                                <v-btn float class="mr-5" style="margin:10px;" color="light" @click="writeBoard">글쓰기</v-btn>
                            </v-col>
                        </v-row>
                    </v-sheet>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import moment from 'moment';
import {mapGetters} from "vuex";

export default {
    data () {
        return {
            bnum:'',
            page:''
        }
    },
    filters:{
        formatDate(value){
            return moment(String(value)).format('MM/DD/YY hh:mm')
        }
    },
    methods: {
        writeBoard(){
            //관리자 권한 검사해야하는데,,,,
            this.$router.push("/boardwrite")
        },
        detailview(bnum){
            console.log(bnum); 
            this.$store.dispatch("selectOne", bnum);
            this.$router.push("/boarddetail");
        },
        getNewBoard(){
            this.$store.dispatch("getBoard",this.page);
        }
    },
    computed: {
        ...mapGetters(['boardList', 'searchOn']),
    },
    created() {
        this.$store.dispatch("getBoard",1);
    },
    }
</script>

<style>

</style>