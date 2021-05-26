<template>
    <div>
        <v-container>
            <v-layout>
                <v-flex>
                    <v-sheet width="80%">
                        <v-form
                            ref="form"
                            style="margin-left:200px;padding:50px;"
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
                                    <v-text-field type="text" v-model="userInfo.userzonecode" label="우편번호"></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-btn @click="findPostalcode">우편번호 찾기</v-btn>
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

<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
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
                userzonecode:'',
                useraddress:'',
            },
            rules:{
                email: v => !!(v || '').match(/@/) || '알맞은 이메일을 입력해주세요.',
                length: len => v => (v || '').length >= len || `아이디는 ${len}자 이상이어야 합니다.`,
                password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
                '비밀번호는 한 개 이상의 특수문자, 대문자, 숫자를 포함해야합니다.',
            }            
        }
    },
    mounted() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
      document.head.appendChild(recaptchaScript)
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
        findPostalcode(){
            new daum.Postcode({
                oncomplete:((data)=>{
                    this.userInfo.userzonecode = data.zonecode;
                    this.userInfo.useraddress = data.address;
                })
            }).open();
        }
    },
}
</script>

<style>

</style>