<template>
  <div class="container mt-2">
    <b-form @submit="onSubmit">
      <b-form-group
        id="name"
        label="タスク名:"
        label-for="input-1"
        description="--"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          required
          placeholder="Enter Taskname"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="タスクの説明:" label-for="input-2">
        <b-form-textarea
          id="input-2"
          v-model="form.description"
          placeholder="Enter description"
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                form: {
                    userId : 1,
                    name : '',
                    icon : '',
                    description : '',
                    dueTime : moment()

                }
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                alert(JSON.stringify(this.form))
            }
        }
    }
</script>