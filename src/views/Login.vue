<template>
    <div>
        <v-container>
        <v-layout>
            <v-flex width="20%">
            </v-flex>
            <v-flex>
                    <v-sheet>                      
                        <v-alert width="900px" class="mb-3 justify-center" :value="isLoginError" dense outlined type="error">
                            아이디와 비밀번호를 확인해주세요.
                        </v-alert>
                        <v-card class="justify-center" flat width="900px">
                            <v-toolbar flat height="60">
                                <v-toolbar-title>Login</v-toolbar-title>
                            </v-toolbar>
                            <v-col>
                                <v-text-field v-model="userid" type="text" label="아이디를 입력하세요" outlined></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field
                                :append-icon="showpw ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min]"
                                :type="show3 ? 'text' : 'password'"
                                name="input-10-2"
                                label="패스워드를 입력하세요."
                                class="input-group--focused"
                                @click:append="showpw = !showpw"
                                v-model="userpw" outlined></v-text-field>
                            </v-col>
                            <v-row>
                                <v-col class="text-right" style="margin:10px;">
                                    <v-btn @click="login({userid, userpw})" block depressed large color="primary">로그인</v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-sheet>
            </v-flex>
        </v-layout>
    </v-container>

    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";


export default {
    data() {
        return {
            userid : '',
            userpw :'',
            showpw:false,
            rules: {
                required: value => !!value || 'Required.',
            },
        }
    },
    computed:{
        ...mapState(["isLogin", "isLoginError"]),
    },
    methods: {
        ...mapActions(['login'])
        // login(){
        //     this.$store.dispatch("login", this.userid, this.userpw)
        //     alert("로그인 완료!")
        //     this.$router.push("/mypage")
        // }
    },
    
}
</script>

<style>

</style>