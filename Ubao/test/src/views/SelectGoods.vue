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

    <!-- 商品列表 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(product, index) in filteredGoodsList" :key="index">
        <el-card :body-style="{ padding: '10px' }">
          <img :src="product.goodsImg" alt="" style="width: 100%; height: 200px; object-fit: cover;" @click="toGoodsDetail(index)" />
          <div style="padding: 14px;" @click="toGoodsDetail(index)">
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
      searchQuery: '',
      selectedTag: '',
      sortKey: '',
      goodsList: [],
      tags: ['女装', '男装', '美妆', '电子产品'], // 示例标签，可根据需求调整
    };
  },
  computed: {
    filteredGoodsList() {
      // 过滤商品列表
      let filteredList = this.goodsList;

      // 根据搜索关键词过滤
      if (this.searchQuery) {
        filteredList = filteredList.filter((item) =>
          item.goodsTitle.includes(this.searchQuery)
        );
      }

      // 根据标签过滤
      if (this.selectedTag) {
        filteredList = filteredList.filter((item) =>
          item.tags.includes(this.selectedTag)
        );
      }

      // 根据排序字段排序
      if (this.sortKey) {
        filteredList.sort((a, b) => {
          if (this.sortKey === 'price') {
            return a.goodsPrice - b.goodsPrice;
          } else if (this.sortKey === 'sales') {
            return b.goodsSales - a.goodsSales;
          }
        });
      }

      return filteredList;
    },
  },
  methods: {
    searchGoods() {
      // 执行搜索逻辑
      console.log('搜索商品：', this.searchQuery);
    },
    sortGoods(key) {
      this.sortKey = key;
    },
    toGoodsDetail(index) {
      let id = index;
      this.$router.push({
        path: '/goodsDetail',
        query: { id },
      });
    },
  },
  mounted() {
    // 获取商品列表数据
    this.$axios
      .get('http://localhost:8080/api/goodslist1')
      .then((res) => {
        console.log(res.data);
        this.goodsList = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.active {
  color: #ff5000;
}
</style>

