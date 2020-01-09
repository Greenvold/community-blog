<template>
  <div>
    <div class="d-flex justify-content-between mt-4">
      <button
        @click="getPreviousArticles"
        :disabled="articles.prev_page_url === null"
        class="btn btn-warning"
      >
        Prev page
      </button>
      <button
        @click="getNextArticles"
        :disabled="articles.next_page_url === null"
        class="btn btn-warning"
      >
        Next page
      </button>
    </div>
    <div class="row" v-if="articles.data && !loading">
      <div
        class="col-md-8 offset-md-2"
        v-for="article in articles.data"
        :key="article.id"
      >
        <card :article="article"></card>
      </div>
    </div>
    <div class="loader text-center" v-else>
      <i class="fas fa-5x fa-spinner" v-if="loading" :disabled="loading"></i>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import config from "@/config";
import card from "@/components/Article.vue";
export default {
  data() {
    return {
      articles: {},
      loading: true
    };
  },
  components: {
    card
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles(url = `${config.apiUrl}/api/articles`) {
      this.loading = true;
      axios.get(url).then(response => {
        this.articles = response.data.data;
        this.loading = false;
      });
    },
    getNextArticles() {
      this.getArticles(this.articles.next_page_url);
    },
    getPreviousArticles() {
      this.getArticles(this.articles.prev_page_url);
    }
  }
};
</script>
<style>
.btn-warning {
  color: white;
}
</style>
