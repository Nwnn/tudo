<template>
    <div>
        <div>
            
        <b-navbar toggleable="sm" type="light" variant="light">
            <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

            <b-navbar-brand><n-link to="/">tudo</n-link></b-navbar-brand>
            

            <b-collapse id="nav-text-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-text>{{ currentTime }}</b-nav-text>

                    <b-button class="ml-4" variant="outline-primary" to="task" v-if="$store.state.user"><b>タスク追加</b></b-button>

                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <b-nav-text><n-link to="login" v-if="!$store.state.user"><b>ログイン</b></n-link></b-nav-text>
                    <b-nav-text class="ml-2" v-if="!$store.state.user"><n-link to="register"><b>ユーザ登録</b></n-link></b-nav-text>

                    <b-nav-item-dropdown right v-if="$store.state.user">
                        <template v-slot:button-content>
                            {{$store.state.user.name}}
                        </template>
                        <b-dropdown-item href="#">ユーザ情報</b-dropdown-item>
                        <b-dropdown-item v-on:click="logout">ログアウト</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>

            
        </b-navbar>
        </div>

        <nuxt/>

    </div>
    
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment';
import { setInterval } from 'timers';
import axios from 'axios';

export default Vue.extend({

    fetch() {
        
    },

    data() {
        return {
        currentTime : moment().format("MM/DD hh:mm:ss")

        };

    },

    mounted() {
        setInterval(() => {
            this.currentTime = moment().format("MM/DD hh:mm:ss")

        }, 1000)
        
    },

    methods: {
        logout() {
            axios.post("http://localhost:80/api/signout")
            location.reload(true);
        }
    }

})
</script>
