<template>
  <div class="container" style="width: 1000px">
    <form>
      <div class="row">
        <div class="col-md-12">
          <h5><u>Edit Customer</u></h5>
          <div class="row">
            <div class="col-md-6">
              <label for="">First Name</label>
              <input
                v-model="form.first_name"
                id="first_name"
                name="first_name"
                type="text"
                class="form-control"
                placeholder=""
                v-bind:class="{ 'is-invalid': error.first_name }"
              />
              <div v-if="error.first_name" class="invalid-feedback">
                {{ error.first_name[0] }}
              </div>
            </div>
            <div class="col-md-6">
              <label for="">Last Name</label>
              <input
                v-model="form.last_name"
                type="text"
                class="form-control"
                placeholder=""
                v-bind:class="{ 'is-invalid': error.last_name }"
              />
              <div v-if="error.last_name" class="invalid-feedback">
                {{ error.last_name[0] }}
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-md-6">
              <label for="">Age </label>
              <input
                v-model="form.age"
                type="number"
                class="form-control"
                placeholder=""
                v-bind:class="{ 'is-invalid': error.age }"
              />
              <div v-if="error.age" class="invalid-feedback">
                {{ error.age[0] }}
              </div>
            </div>
            <div class="col-md-6">
              <label for="">Date of birth </label>
              <input
                v-model="form.dob"
                type="date"
                class="form-control"
                placeholder=""
                v-bind:class="{ 'is-invalid': error.dob }"
              />
              <div v-if="error.dob" class="invalid-feedback">
                {{ error.dob[0] }}
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-md-6">
              <label for="">Email </label>
              <input
                v-model="form.email"
                type="email"
                class="form-control"
                placeholder=""
                v-bind:class="{ 'is-invalid': error.email }"
              />
              <div v-if="error.email" class="invalid-feedback">
                {{ error.email[0] }}
              </div>
            </div>
          </div>
          <button
            @click.prevent="handleUpdate"
            style="float: right"
            type="submit"
            class="btn btn-primary"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
export default {
  data: function () {
    return {
      form: {
        first_name: "",
        last_name: "",
        age: "",
        dob: "",
        email: "",
      },
      error: {},
    };
  },
  methods: {
    handleEdit() {
      axios
        .get(
          process.env.OAUTH_SERVER + "/api/customers/" + this.$route.query.id,
          {},
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "accessToken"
              )}`,
            },
          }
        )
        .then((response) => {
          this.form = response.data.data;
        })
        .catch((error) => {
          this.errored = true;
        })
        
    },
    handleUpdate(event) {
      axios
        .put(
          process.env.OAUTH_SERVER + "/api/customers/"+ this.$route.query.id,
          {
            first_name: this.form.first_name,
            last_name: this.form.last_name,
            age: this.form.age,
            dob: this.form.dob,
            email: this.form.email,
          },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "accessToken"
              )}`,
            },
          }
        )
        .then((response) => {
             this.$router.push('/customers');
        })
        .catch((error) => {
          this.error = error.response.data.errors;
        })
        
    },
  },
  mounted() {
    this.handleEdit()
  },
};
</script>
