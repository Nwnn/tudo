<template>
  <div>
  <b-button>Button</b-button>
  <b-button variant="danger">{{a}}</b-button>
  <b-button variant="success">Button</b-button>
  <b-button variant="outline-primary">Button</b-button>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class Home extends Vue {
  created() {
    console.log("created");
    
  }

  async asyncData() {
    console.log("asyncData");
    return {a : "a"}
  }

  fetch() {
    console.log("fetch");
  }
}

</script>

