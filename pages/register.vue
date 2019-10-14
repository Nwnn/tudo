<template>
  <div class="container mt-2">
    <h2 class="mb-3 mt-4">ユーザ登録</h2>
    <b-form @submit="onSubmit">
      <b-form-group
        id="name"
        label="Username:"
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

      <b-form-group
        id="name"
        label="Password:"
        label-for="input-1"
        description=""
      >
        <b-form-input
          id="input-1"
          v-model="form.password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">登録</b-button>
    </b-form>
  </div>
</template>

<script>
    import axios from 'axios'

    export default {
      data() {
        return {
          form : {
            username : "",
            password : ""
          }
        }

      },
      methods: {
          async onSubmit(evt) {
              evt.preventDefault()
              const result = await axios.post( './api/signup', this.form );

              await axios.post("./api/signin", {
                "username" : this.form.username,
                "password" : this.form.password

              });

              await this.$store.dispatch('login', { username : this.form.username })
              this.$router.push('/')

              console.log(result)
              
          }
      }
    }
</script>