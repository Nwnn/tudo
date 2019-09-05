<template>
  <div class="container mt-2">
    <p>つくってよ</p> 

    <b-form @submit="onSubmit">
      <b-form-group
        id="name"
        label="ユーザ名:"
        label-for="input-1"
        description=""
      >
        <b-form-input
          id="input-1"
          v-model="form.username"
          required
          placeholder="Enter Username"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">登録</b-button>
    </b-form>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          form : {
            userName : ""
          }
        }

      },
      methods: {
          async onSubmit(evt) {
              evt.preventDefault()
              const result = await this.$axios.$post( './api/signup', this.form )
              
              console.log(result)
              
          }
      }
    }
</script>