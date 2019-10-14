<template>
  <div class="container mt-2">
    <b-form @submit="onSubmit">
      <b-form-group
        id="name"
        label="タスク名:"
        label-for="input-1"
        description=""
      >
        <b-form-input
          id="input-1"
          v-model="form.title"
          required
          placeholder="Enter Tasktitle"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="タスクの説明:" label-for="input-2">
        <b-form-textarea
          id="input-2"
          v-model="form.description"
          placeholder="Enter description"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="input-group-2" label="締め切り予定日時:" label-for="input-2">
        <VueCtkDateTimePicker v-model="form.dueTime" format="YYYY-MM-DD HH:mm:ss"/>
      </b-form-group>



      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
    import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
    import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
    import moment from 'moment'

    moment.locale('ja');

    export default {
      
        components: {
          VueCtkDateTimePicker
        },
        data() {
            return {
                form: {
                    member : [ this.$store.state.user.name ],
                    title : '',
                    icon : '',
                    description : '',
                    dueTime : moment().format("YYYY-MM-DD HH:mm:ss")

                }
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                this.$axios.$post( './api/tasks/create', this.form )
                
                alert(JSON.stringify(this.form))
                
            }
        }
    }
</script>