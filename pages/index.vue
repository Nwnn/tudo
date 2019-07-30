<template>
  <div class="container">
    <div class="row mt-2">
      <div class="col-md-12">
        <b-card no-body class="text-center mb-2" v-for="task in tasks" :key="task.id">
          <b-card-header v-if="!task.isComplete">
              <div class="row">

                <b-form-checkbox v-on:change="onTaskCheckChange(task)"></b-form-checkbox>

                <div class="col-10 task-display">

                  <div class="row">
                    <div class="col-5">
                      12/31 10:20
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

export default Vue.extend({
    async asyncData(context) {
    let { data } = await context.$axios('http://localhost/api/tasks');

    return {
      tasks : data

    };

  },

  methods : {
    onTaskCheckChange(task) {
      console.log(task);
      task.isComplete = true;

    }
  }
})
</script>

