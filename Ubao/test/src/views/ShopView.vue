<template>
  <el-container style="height: 100%; background-color: aliceblue; line-height: 1; border: 2px solid #eee">
    <el-container>
      <el-aside width="200px" style="height:600px; background-color: rgb(238, 241, 246); position: fixed; ">
        <el-menu :default-openeds="['1', '3']" style="background-color: rgb(238, 241, 246)" active-background-color="#409eff" active-text-color="#409eff">
          <el-menu-item index="1" @click="currentView = 'main'">
            首页
          </el-menu-item>
          <el-menu-item index="2" @click="currentView = 'goods'">
            商品管理
          </el-menu-item>
          <el-menu-item index="3" @click="currentView = 'order'">
            订单管理
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="margin-left:200px">
        <div v-if="currentView === 'main'">
          <h2>首页内容</h2>
          <!-- 首页的具体内容 -->
        </div>
        <div v-if="currentView === 'goods'">
          <goods-management></goods-management> <!-- 使用商品管理组件 -->
        </div>
        <div v-if="currentView === 'order'">
          <h2>订单管理内容</h2>
          <!-- 订单管理内容 -->
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="商品名称">
              <el-input v-model="formInline.goods_name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select v-model="formInline.status" placeholder="全部">
                <el-option label="全部" value="全部" style="color:gray"></el-option>
                <el-option label="未发货" value="未发货" style="color:red"></el-option>
                <el-option label="已发货" value="已发货" style="color:orange"></el-option>
                <el-option label="已签收" value="已签收" style="color:green"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="fetchCartItems">查询</el-button>
            </el-form-item>
          </el-form>
          
          <!-- 表格部分 -->
          <div v-for="merchant in cartItems" :key="merchant.shop_id" style="margin-bottom: 10px;">
            <div style="font-size: large; font-weight: bold; margin: 0px;">
              {{ merchant.shop_name }}
            </div>
            <el-table 
              :data="merchant.items" 
              style="width: 100%" 
              border
              show-header="false">
              <el-table-column 
                align="center" 
                label="订单编号" 
                prop="order_id" 
                width="100">
              </el-table-column>
              <!-- 商品信息列 -->
              <el-table-column 
                label="商品信息" 
                align="center" 
                prop="goods_name" 
                width="250">
                <template #default="scope">
                  <div  style="display: flex; align-items: center;cursor: pointer;">
                    <el-image 
                      style="margin-right: 10px; width: 150px;" 
                      :src="scope.row.goods_img" 
                      fit="scale-down" />
                    <label @click="toGoodsDetail(scope.row.goods_id)">{{ scope.row.goods_name }}</label>
                  </div>
                </template>
              </el-table-column>

              <!-- 单价列 -->
              <el-table-column 
                label="单价" 
                prop="goods_price" 
                align="center" 
                width="150">
                <template #default="scope">¥{{ scope.row.goods_price }}</template>
              </el-table-column>

              <!-- 数量列 -->
              <el-table-column 
                label="数量" 
                align="center" 
                width="150">
                <template #default="scope">
                  {{ scope.row.goods_num }}
                </template>
              </el-table-column>

              <!-- 金额列 -->
              <el-table-column 
                label="金额" 
                align="center">
                <template #default="scope">¥{{ scope.row.goods_price * scope.row.goods_num }}</template>
              </el-table-column>

              <el-table-column label="状态" align="center">
                <template #default="scope">
                  <span :style="{ color: getStatusColorByValue(scope.row.order_status) }">
                    {{ getStatusNameByValue(scope.row.order_status) }}
                  </span>
                </template>

              </el-table-column>

              <!-- 操作列（保留原来的设置操作） -->
              <el-table-column 
                label="操作" 
                align="center">
                <template #default="scope">
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link" style="cursor: pointer;">
                      <i class="el-icon-setting" style="margin-right: 15px;"></i>
                      设置
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>修改</el-dropdown-item>
                      <el-dropdown-item @click.native="removeItem(scope.row.order_id, merchant.shop_id)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios';
import GoodsManagement from './GoodsManagement.vue'; // 引入商品管理组件
import { Message } from 'element-ui';

export default {
  components: {
    GoodsManagement // 注册商品管理组件
  },
  data() {
    return {
      statusMap: {
      "全部": 9,
      "购物车": 0,
      "未发货": 1,
      "已发货": 2,
      "已签收": 3
    },
    statusColorMap: {
      "全部": "black",
      "未发货": "red",
      "已发货": "orange",
      "已签收": "#67c23a"
    },
      formInline: {
        goods_name: '',
        status: '未发货'
      },
      cartItems: [
        {
          goods_id: 1,
          shop_id: 1,
          shop_name: "",
          items: [
            {
              order_id: 0,
              shop_id: 0,
              goods_id: 0,
              goods_img: "",
              goods_name: "",
              goods_num: 1,
              goods_price: 0.0,
              order_status: 0,
              selected: false,
            },
          ],
        },
      ],
      currentView: 'main' // 默认显示首页内容
    };
  },
  computed: {
    selectStyle() {
      return {
        color: this.statusColorMap[this.formInline.status] || 'black',
        fontSize: 'xx-Large'
      };
    },
    
  },
  methods: {
    getStatusColorByValue(value) {
    const statusName = this.getStatusNameByValue(value);
    return this.statusColorMap[statusName] || 'black'; // 如果没有找到匹配的颜色，默认返回黑色
  },
    getStatusNameByValue(value) {
    for (const [key, val] of Object.entries(this.statusMap)) {
      if (val === value) {
        return key;
      }
    }
    return null; // 如果没有找到匹配的值，返回 null
  },
    toGoodsDetail(goodsId) {
      this.$router.push({
        path: '/goodsDetail',
        query: {
          id: goodsId
        }
      });
    },
    fetchCartItems() {
      axios.post('http://localhost:8080/api/order/cartItems', null, {
        params: {
          userId: 666,/* localStorage.getItem('userID'), */
          status: this.statusMap[this.formInline.status],
          goodsName: this.formInline.goods_name
        },
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }).then(response => {
        if (response.data.code === 1) {
          this.cartItems = response.data.data.map(cart => {
            return {
              ...cart,
              items: cart.items.map(item => ({
                ...item,
                selected: false,
                shop_id: cart.shop_id
              }))
            };
          });
          console.log(this.cartItems);
        } else {
          console.error(response.data.message);
        }
      }).catch(error => {
        console.error('Error fetching cart items:', error);
      });
    },
    removeFromTable(orderId, merchantId){     
    let merchantIndex = this.cartItems.findIndex((m) => m.shop_id === merchantId);
    if (merchantIndex !== -1) {
      let merchant = this.cartItems[merchantIndex];
      merchant.items = merchant.items.filter((item) => item.order_id !== orderId);
      if (merchant.items.length === 0) {
        this.cartItems.splice(merchantIndex, 1);
      }
    }
  },

  removeItem(orderId, merchantId) {
    console.log(orderId);
    this.removeFromTable(orderId, merchantId);
    this.delete(orderId);
  },
    
  delete(orderId) {
    const requestData = {
      user_id: 666/* localStorage.getItem('userID') */,
      order_id: orderId
    };
    axios.post('http://localhost:8080/api/order/delete', requestData, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      .then(response => {
        if(response.data.code==1){
            Message({
            message: response.data.message,
            type: 'success',
            showClose: false,
            duration: 3000 // 提示窗显示时间，单位为毫秒
        });
        console.log('Items deleted successfully:', response.data);
        }
        else{
          Message({
            message: response.data.message,
            type: 'error',
            showClose: false,
            duration: 3000 // 提示窗显示时间，单位为毫秒
        });
        }
      })
      .catch(error => {
        Message({
          message: error.message,
          type: 'error',
          showClose: false,
          duration: 3000 // 提示窗显示时间，单位为毫秒
        });
        console.error('Error deleting items:', error);
      });
  },
},
  mounted() {
    this.fetchCartItems();
  }
};
</script>
