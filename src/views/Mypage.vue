<template>
    <div>
        <v-container>
            <v-card>
                <v-simple-table style="padding:20px;">
                    <template
                        align= "start"
                        sortable="false" v-slot:default>
                        <tbody>
                            <tr>
                                <th>아이디</th>
                                <td>{{userInfo.userid}}</td>
                            </tr>
                            <tr>
                                <th>비밀번호</th>
                                <td>{{userInfo.userpw}}</td>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <td>{{userInfo.username}}</td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td>{{userInfo.useremail}}</td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td>{{userInfo.useraddress}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <v-row>
                    <v-col class="text-right">
                        <v-btn style="margin:10px;" color="success" class="mr-4" @click="updateMember">회원정보수정</v-btn>
                        <v-btn style="margin:10px;" color="primary" class="mr-4" @click="logout">로그아웃</v-btn>
                        <v-btn style="margin:10px;" color="error" class="mr-4" @click.stop="dialog = true">탈퇴하기</v-btn>
                    </v-col>
                </v-row>
            </v-card>
                    <v-dialog
                    v-model="dialog"
                    max-width="350"
                    >
                    <v-card>
                        <v-card-title class="headline">
                        정말 탈퇴하시겠습니까?
                        </v-card-title>

                        <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                            color="green darken-1"
                            text
                            @click="dialog = false"
                        >
                            아니오
                        </v-btn>

                        <v-btn
                            color="green darken-1"
                            text
                            @click="deleteMember"
                        >
                            예
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
        </v-container>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    data() {
        return {
            dialog: false,
        }
    },
    computed:{
        ...mapGetters(["userInfo"])
    },
    methods: {
        logout(){
            this.$store.dispatch("logout")
        },
        deleteMember(){
            this.$store.dispatch("deleteMember")
        },
        updateMember(){
            this.$router.push("/updatemember")
        }
    },
    created() {
        console.log(this.$cookies.get("login_cookie"))
        this.$store.dispatch("Mypage")
    },
}
</script>

<style>

</style>