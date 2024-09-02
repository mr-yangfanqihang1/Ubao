<template>
  <div>
    <!-- 分类选择 -->
    <el-select v-model="selectedCategory" placeholder="选择分类" @change="filterProducts">
      <el-option v-for="category in categories" :key="category" :label="category" :value="category"></el-option>
    </el-select>

    <!-- 排序选择 -->
    <el-select v-model="sortOrder" placeholder="排序" @change="sortProducts">
      <el-option label="按价格升序" value="asc"></el-option>
      <el-option label="按价格降序" value="desc"></el-option>
    </el-select>

    <!-- 商品列表 -->
    <el-row :gutter="20" class="product-list">
      <el-col :span="6" v-for="product in filteredProducts" :key="product.id">
        <el-card :body-style="{ padding: '0px' }">
          <!-- 商品图片 -->
          <img :src="product.image" class="product-image" alt="商品图片" />

          <!-- 商品信息 -->
          <div style="padding: 14px;">
            <h3>{{ product.name }}</h3>
            <p>分类: {{ product.category }}</p>
            <p class="price">价格: ￥{{ product.price }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品数据，包括名称、分类、价格和在线图片链接
      products: [
        { id: 1, name: '商品1', category: '分类1', price: 100, image: 'https://via.placeholder.com/150' },
        { id: 2, name: '商品2', category: '分类2', price: 200, image: 'https://via.placeholder.com/150' },
        { id: 3, name: '商品3', category: '分类1', price: 150, image: 'https://via.placeholder.com/150' },
        { id: 4, name: '商品4', category: '分类2', price: 300, image: 'https://via.placeholder.com/150' }
      ],
      categories: ['分类1', '分类2'], // 商品分类
      selectedCategory: '', // 选择的分类
      sortOrder: '', // 排序顺序
      filteredProducts: [] // 过滤后的商品列表
    };
  },
  created() {
    this.filteredProducts = this.products; // 初始化时显示所有商品
  },
  methods: {
    // 过滤商品列表
    filterProducts() {
      this.filteredProducts = this.selectedCategory
        ? this.products.filter(product => product.category === this.selectedCategory)
        : this.products;
    },
    // 排序商品列表
    sortProducts() {
      this.filteredProducts.sort((a, b) => {
        return this.sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }
  }
};
</script>

<style scoped>
.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
  display: block;
}
.product-list {
  margin-top: 20px;
}
.price {
  color: #f56c6c;
  font-weight: bold;
}
</style>
