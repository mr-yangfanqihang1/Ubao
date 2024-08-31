<template>
  <div id="app">
    <!-- Header -->
    <el-header>
      <el-input
        placeholder="搜索商品..."
        suffix-icon="el-icon-search"
        v-model="searchQuery"
        @keyup.enter="search"
      ></el-input>
    </el-header>

    <!-- Main Content -->
    <el-container>
      <!-- Sidebar -->
      <el-aside width="200px">
        <el-menu>
          <el-menu-item v-for="category in categories" :key="category.id">{{ category.name }}</el-menu-item>
        </el-menu>
      </el-aside>

      <!-- Content -->
      <el-main>
        <el-row>
          <!-- Recommendations -->
          <el-col :span="8">
            <el-card v-for="product in recommendations" :key="product.id" class="product-card">
              <img :src="product.image" class="product-image"/>
              <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p>{{ product.price }}</p>
              </div>
            </el-card>
          </el-col>
          
          <!-- Infinite Scrolling Products -->
          <el-col :span="16">
            <el-row>
              <el-col :span="8" v-for="product in products" :key="product.id">
                <el-card class="product-card">
                  <img :src="product.image" class="product-image"/>
                  <div class="product-info">
                    <h3>{{ product.name }}</h3>
                    <p>{{ product.price }}</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-button
              v-if="loading"
              type="primary"
              :loading="loading"
              @click="loadMore"
            >
              加载更多
            </el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      categories: [],
      recommendations: [],
      products: [],
      page: 1,
      loading: false,
    };
  },
  created() {
    this.fetchCategories();
    this.fetchRecommendations();
    this.fetchProducts();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('/api/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    },
    async fetchRecommendations() {
      try {
        const response = await axios.get('/api/recommendations');
        this.recommendations = response.data;
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      }
    },
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await axios.get(`/api/products?page=${this.page}`);
        this.products = [...this.products, ...response.data];
        this.page += 1;
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        this.loading = false;
      }
    },
    search() {
      // Handle search logic here
    },
    loadMore() {
      this.fetchProducts();
    }
  }
};
</script>

<style>
#app {
  font-family: 'Arial', sans-serif;
  text-align: center;
}

.product-card {
  margin-bottom: 20px;
}

.product-image {
  width: 100%;
}

.product-info {
  text-align: left;
}
</style>
