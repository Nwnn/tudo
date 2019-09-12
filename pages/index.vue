<template>
  <div class="container">

    <b-alert v-show="!$store.state.user" show>ログインしていません</b-alert>
    {{ $store.state.user }}

    <div class="row mt-2">
      <div class="col-md-12">
        <b-card no-body class="text-center mb-2" v-for="task in tasks" :key="task.id">
          <b-card-header>
              <div class="row">
                <b-form-checkbox v-model="task.status" v-on:change="onTaskCheckChange(task)"></b-form-checkbox>

                <div class="col-10 task-display">

                  <div class="row">
                    <div class="col-5">
                      {{ getFormattedDate(task.dueTime) }} ( {{ getRoughTime(task.dueTime) }} )
                    </div>
                    <div class="col-7 ">
                      <div>{{task.name}}</div>
                      <div v-if="task.workName">{{task.workName}}</div>
                      
                    </div>

                    
                  </div>

                </div>

              </div>
           
          </b-card-header>
          
          <!-- <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text> -->
        </b-card>

      </div>

    </div>

  </div>
</template>

<style>
div.task-display {
  background-color: white;
  border-radius: 5px;

}
</style>


<script lang="ts">
import Vue from 'vue';
import axios from '@nuxtjs/axios';
import moment from 'moment';

moment.locale('ja');

export default Vue.extend({
  async asyncData(context) {
    let data = undefined;

    // is Signed
    if(context.store.state.user){
      data = (await context.$axios('./api/tasks', {
        params : {
            "userId" : context.store.state.user.id
        }
      })).data;

    }


    return {
      tasks : data

    };

  },

  methods : {
    onTaskCheckChange(task) {
      console.log(task);
      task.isComplete = true;
      this.$axios.$put('./api/check', {
        "taskId" : task.taskId
      })

      console.log(this)

    },

    getFormattedDate(date) {
      return moment(date).add("hours", -9).format("MM/DD hh:mm");

    },

    getRoughTime(date) {
      return moment(date).add("hours", -9).fromNow();
    }


  },

})
</script>

