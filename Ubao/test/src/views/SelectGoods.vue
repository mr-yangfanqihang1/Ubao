<template>
  <div>
    <el-container style="margin-left:5%; margin-right:5%;">
      <el-header height="100px">
        <el-row>
          <el-col :span="4">
            <el-image style="height: 100px;" :src="logo2" :fit="fit" />
          </el-col>
          <el-col :span="8">
            <el-input v-model="input" placeholder="请输入商品"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="toSelectGoods" style="background-color: #ff5000">搜索</el-button>
          </el-col>
          <el-col :span="3">
            <el-link type="primary" target="_blank" style="color: #FF5000" @click="toLogin">登录/注册</el-link>
          </el-col>
          <el-col :span="3">
            <el-link type="primary" target="_blank" @click="toCart" style="color: #FF5000">购物车</el-link>
          </el-col>
        </el-row>
      </el-header>

      <el-main>
        <!-- 商品列表 -->
        <el-row :gutter="20" type="flex">
          <el-col :span="6" v-for="(item) in goodsList" :key="item.id" style="margin-bottom: 20px;">
            <el-card :body-style="{ padding: '10px' }">
              <img :src="item.goodsImg" class="image" style="width: 100%; cursor: pointer;" @click="toGoodsDetail(item.id)" />
              <div style="padding: 14px;">
                <h3>{{ item.goodsTitle }}</h3>
                <p>价格: {{ item.goodsPrice }} 元</p>
                <el-button type="primary" size="mini" @click="toGoodsDetail(item.id)">查看详情</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';
import logo from '@/assets/logo.png';
import logo2 from '@/assets/logo2.png';

export default {
  name: 'MainPage',
  data() {
    return {
      input: '',
      logo,
      logo2,
      goodsList: []
    };
  },
  methods: {
    loadGoodsList() {
      // 使用 Axios 从后端获取商品数据
      axios.get('http://localhost:8080/api/goodslist')
        .then(response => {
          this.goodsList = response.data;
        })
        .catch(error => {
          console.error('Error fetching goods list:', error);
        });
    },
    toSelectGoods() {
      this.$router.push({
        path: '/selectGoods',
        query: {
          input: this.input
        }
      });
    },
    toGoodsDetail(id) {
      this.$router.push({
        path: '/goodsDetail',
        query: {
          id: id
        }
      });
    },
    toLogin() {
      this.$router.push('/login');
    },
    toCart() {
      this.$router.push('/cart');
    }
  },
  mounted() {
    this.loadGoodsList(); // 在组件挂载时加载商品列表
  }
};
</script>

<style scoped>
.image {
  width: 100%;
  height: auto;
}
</style>
