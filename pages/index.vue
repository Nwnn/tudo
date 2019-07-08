<template>
  <div class="container">
    <div class="row mt-2">
      <div class="col-md-12">
        <b-card no-body class="text-center mb-2" v-for="task in tasks" :key="task.id">
          <b-card-header>
              <div class="row">

                <b-form-checkbox value="orange"></b-form-checkbox>

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
import { Component, Vue } from 'nuxt-property-decorator';
import axios from 'axios';

@Component
export default class Home extends Vue {
  async asyncData() {
    let { data } = await axios.get('http://localhost/api');

    return {
      tasks : data

    };

  }

}

</script>

