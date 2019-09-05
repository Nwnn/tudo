<template>
    <div>
        <div>
        <b-navbar toggleable="sm" type="light" variant="light">
            <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

            <b-navbar-brand><n-link to="/">tudo</n-link></b-navbar-brand>
            

            <b-collapse id="nav-text-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-text>{{ currentTime }}</b-nav-text>
            </b-navbar-nav>
            
            <b-navbar-nav class="ml-2">
                <b-nav-text><n-link to="task"><b>タスク追加</b></n-link></b-nav-text>
            </b-navbar-nav>

            <b-navbar-nav class="ml-2">
                <b-nav-text><n-link to="register"><b>ユーザ登録</b></n-link></b-nav-text>
            </b-navbar-nav>

            <b-navbar-nav class="ml-2">
                <b-nav-text><n-link to="login"><b>ログイン</b></n-link></b-nav-text>
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

export default Vue.extend({
  data() {
    return {
      currentTime : moment().format("MM/DD hh:mm:ss")

    };

  },

  mounted() {
      setInterval(() => {
          this.currentTime = moment().format("MM/DD hh:mm:ss")

      }, 1000)
      
  }

})
</script>
