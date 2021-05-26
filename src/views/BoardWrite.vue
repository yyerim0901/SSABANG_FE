<template>
    <div>
        <v-container>
            <v-layout>
                <v-flex>
                    <v-sheet>
                        <v-form
                            ref="form"
                            style="padding:50px;"
                        >
                            <v-text-field
                            v-model="board.btitle"
                            type="text"
                            label="제목"
                            required
                            ></v-text-field>

                            <v-text-field
                            v-model="board.bwriter"
                            type="text"
                            label="작성자"
                            required
                            ></v-text-field>

                            <v-textarea
                            v-model="board.bcontent"
                            type="text"
                            label="내용을 입력하세요."
                            required
                            ></v-textarea>

                            <v-container>
                                <v-btn
                                color="success"
                                class="mr-4"
                                @click="register"
                                >
                                글 등록하기
                                </v-btn>

                                <v-btn
                                color="primary"
                                class="mr-4"
                                @click="moveList"
                                >
                                뒤로가기
                                </v-btn>
                            </v-container>
                            </v-form>
                    </v-sheet>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            board:{
                btitle:'',
                bwriter:'',
                bcontent:'',
                userid:'',
            }
        }
    },
    methods:{
        moveList(){
            this.$router.push("/board")
        },
        register(){
            this.$store.dispatch("registerBoard",this.board)
            this.$store.dispatch("getBoard",1)
            this.$router.push("/board")
        }
    }
}
</script>

<style>

</style>