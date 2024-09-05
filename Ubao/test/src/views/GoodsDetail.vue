<template>
  <div class="goods-page">
    <el-container>
      <el-header style="height: auto;">
        <!-- 原位置展示一张固定图片 -->
        <el-image style="width: 10%;" :src="logo" fit="cover" />
      </el-header>
      <el-main>
        <el-row type="flex" justify="center">
          <el-col :span="15">
            <el-row :gutter="10">
              <el-col :span="12">
                <!-- 将 goodsImg 添加到轮播图的第一张 -->
                <el-carousel indicator-position="outside">
  <el-carousel-item>
    <el-image style="height: 300px;" :src="goods.goodsImg" fit="cover" />
  </el-carousel-item>
  
  <!-- 固定第二张图片 -->
  <el-carousel-item>
    <el-image style="height: 300px;" :src="logo" fit="cover" />
  </el-carousel-item>

  <!-- 其余图片仍然使用动态加载 -->
  <el-carousel-item v-for="(image, index) in goods.images" :key="index">
    <el-image style="height: 300px;" :src="image" fit="cover" />
  </el-carousel-item>
</el-carousel>

              </el-col>
              <el-col :span="12">
                <h1>{{ goods.goodsTitle }}</h1>
                <p>价格: {{ goods.goodsPrice }}</p>
                <p>库存: {{ goods.goodsReserve }}</p>
                <p>店铺: {{ goods.shopId }}</p>

                <!-- 运行内存选择按钮 -->
                <div class="option-group">
                  <label>选择存储容量:</label>
                  <el-button
                    v-for="size in storageOptions"
                    :key="size"
                    :type="selectedStorage === size ? 'warning' : 'info'"
                    @click="selectStorage(size)">
                    {{ size }} GB
                  </el-button>
                </div>

                <!-- 加入购物车和立即购买按钮 -->
                <el-button type="primary" @click="addToCart">加入购物车</el-button>
                <el-button type="success" @click="buyNow">直接购买</el-button>
              </el-col>
            </el-row>

            <!-- 手机配置信息展示 -->
            <el-row :gutter="20">
              <el-col :span="24">
                <el-card>
                  <div slot="header" class="clearfix">
                    <span>手机参数</span>
                  </div>
                  <div class="spec-detail">品牌: {{ phoneSpec.brand }}</div>
                  <el-divider></el-divider>
                  <div class="spec-detail">型号: {{ phoneSpec.model }}</div>
                  <el-divider></el-divider>
                  <div class="spec-detail">分辨率: {{ phoneSpec.resolution }}</div>
                  <el-divider></el-divider>
                  <div class="spec-detail">网络类型: {{ phoneSpec.networkType }}</div>
                  <el-divider></el-divider>
                  <div class="spec-detail">存储内存: {{ phoneSpec.cpuInfo }}</div>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import logo from '@/assets/logo1.png';


export default {
  data() {
    return {
      logo: logo,
      id: this.$route.query.id, // 假设路由中有 id 参数
      goods: {
        id: 0,
        goodsTitle: '',
        goodsPrice: 0.0,
        goodsReserve: 0,
        goodsImg: '',
        goodsParams: '', // goods_params 列
        shopId: '',
        images: []
      },
      phoneSpec: {
        brand: '',
        model: '',
        resolution: '',
        networkType: '',
        cpuInfo: ''
      },
      storageOptions: [64, 128, 256, 512], // 可选择的存储容量
      selectedStorage: 128 // 默认选择的存储容量
    };
  },
  mounted() {
    // 发起 axios 请求获取商品数据
    this.$axios.get('http://localhost:8080/api/goodlistt', {
      params: { id: this.id },
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }).then(res => {
      this.goods = res.data.data;  // 获取数据并赋值给 goods 对象

      // 解析 goods_params 并提取关键信息
      this.parseGoodsParams(this.goods.goodsParams);
    }).catch(err => {
      console.error('获取商品数据失败：', err);
    });
  },
  methods: {
    addToCart() {
      // 准备需要传输的数据
      const orderData = {
        user_id: localStorage.getItem('userID'),
        goods_id: this.id,
        num: 1,
        total: this.goods.goodsPrice,
        status: 0
      };
      // 向后端发送 POST 请求
      this.$axios.post('http://localhost:8080/api/order/createOrder', orderData, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
          .then(() => {
            this.$message({
              type: 'success',
              message: '已加入购物车!'
            });
            this.$router.push({
              path: '/cart',
              query: {
                status:"购物车"
              }
            });
          })
          .catch(err => {
            console.error('加入购物车失败：', err);
            this.$message({
              type: 'error',
              message: '加入购物车失败!'
            });
          });
    },
    buyNow() {
      const orderData = {
        user_id: localStorage.getItem('userID'),
        goods_id: this.id,
        num: 1,
        total: this.goods.goodsPrice,
        status: 1
      };
      // 向后端发送 POST 请求
      this.$axios.post('http://localhost:8080/api/order/createOrder', orderData, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
          .then(() => {
            this.$message({
              type: 'success',
              message: '已购买!'
            });
            this.$router.push({
              path: '/cart',
              query: {
                status: "未发货"
              }
            });
          })
          .catch(err => {
            console.error('购买失败：', err);
            this.$message({
              type: 'error',
              message: '购买失败!'
            });
          });
    },
    // 选择存储容量
    selectStorage(size) {
      this.selectedStorage = size;
    },
    // 解析 goods_params 中的配置数据
    parseGoodsParams(params) {
      if (!params) {
        console.error('未找到 goods_params 数据');
        return;
      }

      // 用 DOMParser 解析 HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(params, 'text/html');

      // 提取手机参数
      const phoneSpec = {
        brand: '',
        model: '',
        resolution: '',
        networkType: '',
        cpuInfo: ''
      };

      // 提取品牌和型号
      const brandElement = doc.querySelector('li:nth-of-type(1) p[title]');
      if (brandElement) phoneSpec.brand = brandElement.textContent.split(': ')[1];

      const modelElement = doc.querySelector('li:nth-of-type(1) p:nth-of-type(2)');
      if (modelElement) phoneSpec.model = modelElement.textContent.split(': ')[1];

      // 提取分辨率
      const resolutionElement = doc.querySelector('li:nth-of-type(2) p');
      if (resolutionElement) phoneSpec.resolution = resolutionElement.textContent.split(': ')[1];

      // 提取网络类型
      const networkTypeElement = doc.querySelector('li:nth-of-type(3) p:first-of-type');
      if (networkTypeElement) phoneSpec.networkType = networkTypeElement.textContent.split(': ')[1];

      // 提取CPU核心数
      const cpuInfoElement = doc.querySelector('li:nth-of-type(4) p');
      if (cpuInfoElement) phoneSpec.cpuInfo = cpuInfoElement.textContent.split(': ')[1];

      // 将提取到的手机参数赋值到 phoneSpec 对象中
      this.phoneSpec = phoneSpec;
    }
  }
};
</script>

<style scoped>
.product-page {
  font-family: 'Arial', sans-serif;
}

.el-header {
  background-color: transparent;
}

.el-main {
  background-color: transparent;
}

.spec-detail {
  margin-bottom: 10px; /* 调整每项的底部边距，增强视觉分隔效果 */
}

.option-group {
  margin-bottom: 20px;
}
</style>
