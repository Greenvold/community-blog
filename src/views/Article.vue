<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10 offset-md-1 my-5">
        <div class="card" v-if="!loading">
          <img height="420px" :src="article.imageUrl" class="card-img-top" />
          <div class="card-body">
            <h1 class="card-title text-center my-3">{{ article.title }}</h1>
            <div class="article-content" v-html="article.content"></div>
            <div class="comments my--4">
              <vue-disqus
                shortname="community-blog"
                :identifier="article.slug"
                :url="url"
              ></vue-disqus>
            </div>
          </div>
        </div>
        <div class="loader text-center" v-else>
          <i
            class="fa fa-5x s fa-spinner"
            v-if="loading"
            :disabled="loading"
          ></i>
          {{ loading ? "" : " Login" }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import config from "@/config";
export default {
  data() {
    return {
      article: {},
      loading: true,
      url: window.location.href
    };
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      axios
        .get(`${config.apiUrl}/api/article/${this.$route.params.id}`)
        .then(response => {
          this.loading = false;
          this.article = response.data.data;
        });
    }
  }
};
</script>
