<template>
    <div>
        
        <v-container>
            <v-layout>
                <v-flex>
                    <v-sheet width="80%">
                        <v-form
                            style="margin-left:340px;"
                            ref="form"
                        >
                            <v-text-field
                            v-model="newUserInfo.userid" 
                            type="text"
                            :counter="10"
                            label="ID"
                            readonly
                            >{{userInfo.userid}}</v-text-field>

                            <v-text-field
                            v-model="newUserInfo.userpw"
                            type="password"
                            :counter="10"
                            label="Password"
                            required
                            >{{userInfo.userpw}}</v-text-field>

                            <v-text-field
                            v-model="newUserInfo.username"
                            type="text"
                            :counter="10"
                            label="Name"
                            required
                            >{{userInfo.username}}</v-text-field>

                            <v-text-field
                            v-model="newUserInfo.useremail"
                            type="text"
                            label="E-mail"
                            required
                            >{{userInfo.useremail}}</v-text-field>

                            <v-text-field
                            v-model="newUserInfo.useraddress"
                            type="text"
                            label="Address"
                            required
                            >{{userInfo.useraddress}}</v-text-field>

                            <v-container>
                                <v-row>
                                    <v-col class="text-right">
                                        <v-btn
                                        color="success"
                                        class="mr-4"
                                        @click="update"
                                        >
                                        수정완료
                                        </v-btn>

                                        <v-btn
                                        color="primary"
                                        class="mr-4"
                                        @click="home"
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
import {mapGetters} from "vuex";

export default {
    data() {
        return {
            newUserInfo:{
                userid:'',
                userpw:'',
                username:'',
                useremail:'',
                useraddress:'',
            },
            valid: true,            
        }
    },
    methods: {
        home(){
            this.$router.push("/mypage")
        },
        update(){
            console.log(this.newUserInfo)
            this.$store.dispatch("updateMember",this.newUserInfo)
        }
    },
    created() {
        console.log(this.$cookies.get("login_cookie"))
        this.$store.dispatch("Mypage")
    },
    computed: {
        ...mapGetters(["userInfo"])
    },
    watch:{
        userInfo(){
            this.newUserInfo = this.userInfo;
        }
    }
}
</script>

<style>

</style>