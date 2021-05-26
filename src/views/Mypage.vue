<template>
    <div>
        <v-container>
            <v-card width="70%" style=" margin-left:150px;">
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
                                <td>******</td>
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
                        <v-btn style="margin:10px;" color="primary" class="mr-4" @click.stop="dialog1 = true">회원정보수정</v-btn>
                        <v-btn style="margin:10px;" color="error" class="mr-4" @click.stop="dialog = true">탈퇴하기</v-btn>
                    </v-col>
                </v-row>
                <v-dialog
                    v-model="dialog1"
                    max-width="600">

                    <v-card>
                        <v-card-title>
                        <span class="headline">비밀번호를 다시 입력해주세요.</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container>
                            <v-row>
                            <v-col cols="12">
                                <v-alert
                                v-if="errorPw"
                                dense
                                outlined
                                type="error"
                                >
                                비밀번호가 일치하지 않습니다.
                                </v-alert>
                                <v-text-field
                                v-model="checkPw"
                                label="Password*"
                                type="password"
                                required
                                ></v-text-field>
                            </v-col>
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog1 = false"
                        >
                            닫기
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="checkPassword"
                        >
                            확인
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>


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
            dialog1:false,
            checkPw:'',
            errorPw:false,
        }
    },
    computed:{
        ...mapGetters(["userInfo"])
    },
    methods: {
        deleteMember(){
            this.$store.dispatch("deleteMember")
        },
        updateMember(){
            this.$router.push("/updatemember")
        },
        checkPassword(){
            if(this.checkPw === this.userInfo.userpw){
                this.dialog1 = true;
                this.$router.push("/updatemember")
            }else{
                this.errorPw = true;
            }
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