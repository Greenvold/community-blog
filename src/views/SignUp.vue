<template>
  <div class="row my-5">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center my-4">Signup</h3>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Name"
              v-model="name"
              :class="{
                'is-invalid': errors.name,
                'is-valid': !errors.name && this.submitted
              }"
            />
            <div class="errors" v-if="errors.name">
              <small class="text-danger" v-for="error in errors.name" :key="error">{{ error }}</small>
            </div>
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Email"
              v-model="email"
              :class="{
                'is-invalid': errors.email,
                'is-valid': !errors.email && this.submitted
              }"
            />
            <div class="errors" v-if="errors.email">
              <small class="text-danger" v-for="error in errors.email" :key="error">{{ error }}</small>
            </div>
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
              :class="{
                'is-invalid': errors.password,
                'is-valid': !errors.password && this.submitted
              }"
            />
            <div class="errors" v-if="errors.password">
              <small class="text-danger" v-for="error in errors.password" :key="error">{{ error }}</small>
            </div>
          </div>
          <div class="text-center">
            <button @click="registerUser" class="btn btn-success form-control">
              <i class="fas fa-spinner" v-if="loading" :disabled="loading"></i>
              {{ loading ? "" : " Signup" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import config from "@/config";

export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("auth")) {
      return next({ path: "/" });
    }
    next();
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errors: {},
      submitted: false,
      loading: false
    };
  },
  methods: {
    registerUser() {
      this.loading = true;
      axios
        .post(`${config.apiUrl}/auth/register`, {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.loading = false;
          this.submitted = true;
          const { data } = response.data;

          localStorage.setItem("auth", JSON.stringify(data));

          this.$root.auth = data;
          this.$router.push("/");
        })
        .catch(({ response }) => {
          this.loading = false;
          this.submitted = true;
          this.errors = response.data;
        });
    }
  }
};
</script>
