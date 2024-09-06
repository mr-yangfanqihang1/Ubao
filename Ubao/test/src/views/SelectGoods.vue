<template>
  <div>
    <!-- 搜索栏 -->
    <el-row :gutter="20" style="margin: 20px 0;">
      <el-col :span="12">
        <el-input v-model="searchQuery" placeholder="请输入商品名称" />
      </el-col>
      <el-col :span="6">
        <el-select v-model="selectedTag" placeholder="请选择标签">
          <el-option
            v-for="tag in tags"
            :key="tag"
            :label="tag"
            :value="tag"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="searchGoods">搜索</el-button>
      </el-col>
    </el-row>

    <!-- 排序选项 -->
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="12">
        <el-button
          type="text"
          @click="sortGoods('price')"
          :class="{ active: sortKey === 'price' }"
        >价格排序</el-button>
        <el-button
          type="text"
          @click="sortGoods('sales')"
          :class="{ active: sortKey === 'sales' }"
        >销量排序</el-button>
      </el-col>
    </el-row>
<!-- 分页控件 -->
<el-pagination
  background
  layout="prev, pager, next"
  :total="totalItems"
  :page-size="pageSize"
  :current-page.sync="currentPage"
  @current-change="handlePageChange"
  style="margin-top: 20px;"
></el-pagination>


    <!-- 商品列表 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(product, index) in goodsList" :key="index">
        <el-card :body-style="{ padding: '10px' }">
          <img :src="product.goodsImg" alt="" style="width: 100%; height: 200px; object-fit: cover;" @click="toGoodsDetail(product.id)" />
          <div style="padding: 14px;" @click="toGoodsDetail(product.id)">
            <span>{{ product.goodsTitle }}</span>
            <div class="bottom clearfix" style="margin-top: 10px;">
              <span>价格：{{ product.goodsPrice }}元</span>
              <span style="margin-left: 10px;">销量：{{ product.goodsSales }}</span>
              <el-button type="text" class="button">立即购买</el-button>
            </div>
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
    maininput: this.$route.query.input,
    searchQuery: this.$route.query.input,
    selectedTag: '',
    sortKey: '',
    goodsList: [],
    tags: ['苹果', '小米', 'oppo', '华为'],
    currentPage: 1, // 当前页码
    pageSize: 100 // 每页显示的条数
  };
}
,
  methods: {
    searchGoods() {
  this.$axios
    .get('http://localhost:8080/api/goodslist1', {
      params: {
        searchQuery: this.searchQuery,
        tag: this.selectedTag,
        sort: this.sortKey,
        page: this.currentPage, // 当前页码
        pageSize: this.pageSize // 每页条数
      }
    })
    .then((res) => {
      console.log(res.data);
      this.goodsList = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

,
    sortGoods(key) {
      this.sortKey = key;
      this.searchGoods(); // 根据排序字段重新搜索
    },
    toGoodsDetail(id) {
      this.$router.push({
        path: '/goodsDetail',
        query: { id }
      });
    },
    handlePageChange(page) {
    this.currentPage = page;
    this.searchGoods(); // 当页码变化时重新获取商品数据
  }
  },
  mounted() {
    // 初始加载商品列表数据
    this.searchGoods();
  },
};
</script>

<style scoped>
.active {
  color: #ff5000;
}
</style>



