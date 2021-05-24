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
                        <v-row>
                            <v-text-field
                            v-model="userInfo.userid"
                            :rules="[rules.length(5)]"
                            type="text"
                            label="아이디"
                            required
                            ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field
                            v-model="userInfo.userpw"
                            :rules="[rules.password]"
                            type="password"
                            label="비밀번호"
                            required
                            ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field
                            v-model="userInfo.username"
                            type="text"
                            label="이름"
                            required
                            ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field
                            v-model="userInfo.useremail"
                            :rules="[rules.email]"
                            type="text"
                            label="이메일"
                            required
                            ></v-text-field>
                        </v-row>
                            <v-row>
                                <v-col style="margin:0px; padding:0px">
                                    <v-text-field type="text" id="sample4_postcode" label="우편번호"></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-btn @click="sample5_execDaumPostcode()">우편번호 찾기</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-text-field
                                id="sample5_address"
                                v-model="userInfo.useraddress"
                                type="text"
                                label="상세주소"
                                required
                                ></v-text-field>
                            </v-row>
                            <v-container>
                                <v-row>
                                    <v-col class="text-right">
                                        <v-btn
                                        color="success"
                                        class="mr-4"
                                        @click="register"
                                        >
                                        회원가입
                                        </v-btn>

                                        <v-btn
                                        color="primary"
                                        class="mr-4"
                                        @click="login"
                                        >
                                        로그인
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

<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f8f336aae55d2597f88fd05c5bf7e2cd&libraries=services"></script>
<script>
// import { mapActions } from 'vuex';

export default {
    data() {
        return {
            valid: true,
            userInfo:{
                userid: '',
                userpw:'',
                username:'',
                useremail:'',
                useraddress:'',
            },
            rules:{
                email: v => !!(v || '').match(/@/) || '알맞은 이메일을 입력해주세요.',
                length: len => v => (v || '').length >= len || `아이디는 ${len}자 이상이어야 합니다.`,
                password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
                '비밀번호는 한 개 이상의 특수문자, 대문자, 숫자가 포함해야합니다.',
            }            
        }
    },
    methods: {
        login(){
            console.log(this.userInfo)
            // this.$router.push("/login");
        },
        register(){
            console.log(this.userInfo)
            this.$store.dispatch("registerMember", this.userInfo)
            alert("회원가입완료!")
            this.$router.push("/")
        },
        sample5_execDaumPostcode(){
            new daum.Postcode({
                oncomplete: function(data) {
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
                    // 예제를 참고하여 다양한 활용법을 확인해 보세요.
                }
            }).open();
        }
    },
}
</script>

<style>

</style>