<template>
  <div class="row my-5">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center my-4">Login</h3>
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
              <small
                class="text-danger"
                v-for="error in errors.email"
                :key="error"
                >{{ error }}</small
              >
            </div>
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
              :class="{
                'is-invalid': errors.email,
                'is-valid': !errors.email && this.submitted
              }"
            />
            <div class="errors" v-if="errors.password">
              <small
                class="text-danger"
                v-for="error in errors.password"
                :key="error"
                >{{ error }}</small
              >
            </div>
          </div>
          <div class="text-center">
            <button
              @click="loginUser"
              :disabled="loading"
              class="btn btn-success form-control"
            >
              <i class="fas fa-spinner" v-if="loading" :disabled="loading"></i>
              {{ loading ? "" : " Login" }}
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
      email: "",
      password: "",
      errors: {},
      submitted: false,
      loading: false
    };
  },
  methods: {
    loginUser() {
      this.submitted = true;
      this.loading = true;
      axios
        .post(`${config.apiUrl}/api/auth/login`, {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.loading = false;
          this.$root.auth = response.data.data;
          localStorage.setItem("auth", JSON.stringify(response.data.data));
          this.$router.push("/");
          this.$noty.success("You are looged in!");
        })
        .catch(({ response }) => {
          this.loading = false;
          this.$noty.error("Ooops something went wrong.");
          if (response.status === 401) {
            this.errors = {
              email: ["These credentials do not match our records."]
            };
          } else {
            this.errors = response.data;
          }
        });
    }
  }
};
</script>
