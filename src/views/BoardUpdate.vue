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
                            v-model="boardListItem.btitle"
                            type="text"
                            required
                            >{{boardListItem.btitle}}</v-text-field>

                            <v-text-field
                            v-model="boardListItem.bwriter"
                            type="text"
                            readonly
                            >{{boardListItem.bwriter}}</v-text-field>

                            <v-textarea
                            v-model="boardListItem.bcontent"
                            type="text"
                            required
                            >{{boardListItem.bcontent}}</v-textarea>

                            <v-container>
                                <v-row>
                                    <v-col class="text-right">
                                        <v-btn
                                        color="success"
                                        class="mr-4"
                                        @click="update"
                                        >
                                        글 수정하기
                                        </v-btn>

                                        <v-btn
                                        color="primary"
                                        class="mr-4"
                                        @click="moveList"
                                        >
                                        뒤로가기
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                            </v-form>
                    </v-sheet>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            newBoard:{
                bnum:'',
                btitle:'',
                bwriter:'',
                bcontent:'',
            }
        }
    },
    methods:{
        moveList(){
            this.$router.push("/board")
        },
        update(){
            this.$store.dispatch("updateBoard",this.boardListItem)
            this.$store.dispatch("getBoard",1)
            this.$router.push("/board")
        }
    },
    computed: {
        ...mapGetters(["boardListItem"])
    },
    created() {
    },
    watch: {
        newBoard(){
            this.newBoard = this.boardListItem;
        }
    },
}
</script>

<style>

</style>