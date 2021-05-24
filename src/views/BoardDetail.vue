<template>
    <div>
        <v-container>
            <v-layout>
                <v-flex>
                    <v-sheet>
                        <v-simple-table style="padding:20px;">
                            <template v-slot:default>
                                <tbody>
                                    <tr>
                                        <th>번호</th>
                                        <td>{{boardListItem.bnum}}</td>
                                    </tr>
                                    <tr>
                                        <th>제목</th>
                                        <td>{{boardListItem.btitle}}</td>
                                    </tr>
                                    <tr>
                                        <th>작성자</th>
                                        <td>{{boardListItem.bwriter}}</td>
                                    </tr>
                                    <tr>
                                        <th>내용</th>
                                        <td>{{boardListItem.bcontent}}</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                        <v-row>
                            <v-col class="text-right">
                                <v-btn style="margin:10px;" color="success" class="mr-4" @click="moveList">목록</v-btn>
                                <v-btn style="margin:10px;" color="primary" class="mr-4" @click="updateBoard">수정</v-btn>
                                <v-btn style="margin:10px;" color="error" class="mr-4" @click="deleteBoard">삭제</v-btn>
                            </v-col>
                        </v-row>
                    </v-sheet>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(["boardListItem"])
    },
    methods:{
        updateBoard(){
            //BoardUpdateForm.vue로 이동
            console.log(this.boardListItem)
            this.$store.dispatch("updateBoardForm", this.boardListItem)
            this.$router.push("/boardupdate")
        },
        moveList(){
            this.$router.push("/board")
        },
        deleteBoard(){
            this.$store.dispatch("deleteBoard",this.boardListItem.bnum)
            this.$router.push("/board")
        }
    }
}
</script>

<style>

</style>