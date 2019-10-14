<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-12">
        <b-card no-body class=" mb-2" v-for="task in tasks" :key="task.id">
          <b-card-header class="text-center">
              <div class="row">

                <div class="col-1">
                  <b-form-checkbox v-model="task.status" v-on:change="onTaskCheckChange(task)"></b-form-checkbox>
                </div>

                <div class="col-11 task-display">

                  <div class="row">

                    <div class="col-3">
                      {{ getFormattedDate(task.dueTime) }} ( {{ getRoughTime(task.dueTime) }} )
                    </div>

                    <div class="col-9">
                      <div><strong>{{ task.title }}</strong></div>
                      
                      <div v-if="task.workName">{{task.workName}}</div>
                    </div>
                     
                    
                  </div>

                </div>

              </div>

           
          </b-card-header>
          
          <b-card-text class="mt-2 ml-3">
            {{ task.description }}
          </b-card-text>

          <b-card-text class="small text-muted text-right m-1 mr-2">更新: {{ getRoughTime(task.updateTime) }}</b-card-text>
              
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
import axios from 'axios';
import moment from 'moment';

moment.locale('ja');

export default Vue.extend({
  middleware : 'auth',
  
  async asyncData(context) {
    let data = undefined;

      data = (await axios('./api/tasks')).data;
          console.log(data)

    return {
      tasks : data

    };

  },

  methods : {
    onTaskCheckChange(task) {
      task.status = !task.status;
      axios.post(`./api/tasks/update/${ task.taskId }`, {
        "status" : task.status
      })

    },

    getFormattedDate(date) {
      return moment(date).format("MM/DD hh:mm");

    },

    getRoughTime(date) {
      return moment(date).fromNow();
    }


  },

})
</script>

