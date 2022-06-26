
<template>
  <div class="container">
    <div class="row">
     
      <div class="col-md-12">
        <a class="btn btn-primary " style="float:right" href="/customers/create" >Create Customer</a>
    
        <table class="table mt-5">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Updated At</th>
              <div>Actions</div>
            </tr>
          </thead>
          <tbody v-if="customers">
            <tr v-for="(customer, index) in customers" v-bind:key="index">
              <th>{{ customer.first_name }}</th>
              <td>{{ customer.last_name }}</td>
              <td>{{ customer.age }}</td>
              <td>{{ customer.dob }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.created_at }}</td>
              <td>{{ customer.updated_at }}</td>
              <th>
                <a :href="'/customers/edit?id=' + customer.id" class="btn btn-primary" >Edit</a>
                <button @click="handleDelete(customer.id)" style="margin-left: 3px;" type="button" class="btn btn-danger">Delete</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";


export default {
  data: function () {
    return {
      customers: {},
    };
  },
  methods: {
    handleDelete(id){
       axios
        .delete(
          process.env.OAUTH_SERVER + "/api/customers/"+id,
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
            this.fetchCustomers()
        })
        .catch((error) => {
          this.errored = true;
        })
        
    },
    fetchCustomers() {
      axios
        .get(
          process.env.OAUTH_SERVER + "/api/customers",
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
          this.customers = response.data.data;
        })
        .catch((error) => {
          this.errored = true;
        })
        
    },
  },
  mounted() {
    this.fetchCustomers();
  },
};
</script>
