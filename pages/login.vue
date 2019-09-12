<template>
  <div class="container mt-2"> 
    <p>認証つくってよ</p> 

    <b-form @submit="onSubmit">
      <b-form-group
        id="name"
        label="UserId:"
        label-for="input-1"
        description=""
      >
        <b-form-input
          id="input-1"
          v-model="form.userId"
          required
          placeholder="Enter Username"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">change user</b-button>
    </b-form>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          form : {
            userId : 1
          }
        }

      },
      methods: {
          async onSubmit(evt) {
            evt.preventDefault()
            await this.$store.dispatch('login', { userId : Number(this.form.userId) })
            this.$router.push('/')

          }
      }
    }
</script>