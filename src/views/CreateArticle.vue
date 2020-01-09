<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-body">
            <picture-input
              @change="onChange"
              accept="image/jpeg, image/png"
              size="10"
              buttonClass="btn btn-danger"
              class="my-2"
            ></picture-input>
            <select name id class="form-control my-3" v-model="category">
              <option selected>Select a category</option>
              <option
                :value="category.id"
                v-for="category in categories"
                :key="category.id"
              >{{category.name}}</option>
            </select>
            <input type="text" class="form-control mb-3" placeholder="Title" v-model="title" />
            <wysiwyg v-model="content"></wysiwyg>

            <div class="text-center mt-2">
              <button :disabled="loading" @click="createArticle" class="btn btn-success">
                <i class="fas fa-spinner" v-if="loading" :disabled="loading"></i>
                {{ loading ? "" : " Create new Article" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import PictureInput from "vue-picture-input";
import config from "@/config";
export default {
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("auth")) {
      return next({ path: "/" });
    }
    next();
  },
  data() {
    return { categories: [], category: "", loading: false };
  },
  components: {
    PictureInput
  },
  methods: {
    onChange(image) {
      this.image = image;
    },
    createArticle() {
      if (!this.title || !this.image || !this.category || !this.content) {
        this.$noty.error("Please fill in all fields");
        return;
      }
      this.loading = true;
      const form = new FormData();
      form.append("file", this.image);
      form.append("upload_preset", process.env.VUE_APP_CLOUDINARY_PRESET);
      form.append("api_key", process.env.VUE_APP_CLOUDINARY_API_KEY);

      axios.post(process.env.VUE_APP_CLOUDINARY_URL, form).then(response => {
        axios
          .post(
            `${config.apiUrl}/api/articles`,
            {
              title: this.title,
              content: this.content,
              category_id: this.category,
              imageUrl: response.data.secure_url
            },
            {
              headers: {
                Authorization: `Bearer ${this.$root.auth.token}`
              }
            }
          )
          .then(() => {
            this.loading = false;
            this.$noty.success("Article created successfully.");
            this.$router.push("/");
          })
          .catch(() => {
            this.loading = false;
            this.$noty.error("Something went wrong.");
          });
      });
    },
    getCategories() {
      const categories = localStorage.getItem("categories");
      if (categories) {
        this.categories = JSON.parse(categories);
        return;
      }
      axios.get(`${config.apiUrl}/api/categories`).then(res => {
        this.categories = res.data.categories;
        localStorage.setItem("categories", JSON.stringify(this.categories));
      });
    }
  },
  mounted() {
    this.getCategories();
  }
};
</script>
