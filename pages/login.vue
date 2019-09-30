<template>
  <div class="container mt-2"> 
    <h2 class="mb-3 mt-4">ログイン</h2>
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
          type="password"
          id="input-1"
          v-model="form.password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">ログイン</b-button>
    </b-form>
  </div>
</template>

<script>
    import axios from '@nuxtjs/axios'
    export default {
      data() {
        return {
          form : {
            username : undefined,
            password : undefined
          }
        }

      },
      methods: {
          async onSubmit(evt) {
            evt.preventDefault()
            try {
              console.log({
                "username" : this.form.username,
                "password" : this.form.password

              })
              await this.$axios.post("./api/signin", {
                "username" : this.form.username,
                "password" : this.form.password

              });
              
              await this.$store.dispatch('login', { username : this.form.username })
              this.$router.push('/')
            
            } catch (error) {
              console.log(error)
              
            }

          }
      }
    }
</script>