<template>
    <div class="cart-page">
      <el-container>
        <!-- 顶部导航 -->
          <el-header height="60px" style="background-color: transparent;" >

  <!--      <el-link type="primary" href="https://element.eleme.io" target="_blank">主要链接</el-link>-->
          <el-row  style="line-height: 100px" >
            <el-col :span="2">
              <el-image style="height: 60px;" :src="logo" :fit="fit" />
            </el-col>
            <el-col :span="3">
              <el-span  :style="selectStyle">{{status}}</el-span>
            </el-col>
            
            <!--空白占位-->
            <el-col :span="1" style="border: 1px solid transparent;">
            </el-col>
            <el-col :span="8">
              <el-input v-model="input" placeholder="请输入商品名称"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" icon="el-icon-search" @click="toSelectGoods" style="background-color: #ff5000;">搜索</el-button>
            </el-col>
            <el-col :span="4" style="border: 1px solid transparent;">
            </el-col>
            
            <el-col :span="3" style="height: 100px"><!-- :style="selectStyle" -->
              <el-select v-model="status" placeholder="我的商品" popper-class="custom-select" @change="fetchCartItems" >
                <el-option label="全部"  value="全部" style="color:black"></el-option>
                <el-option label="购物车" value="购物车" style="color:cornflowerblue"></el-option>                
                <el-option label="未发货" value="未发货" style="color:red"></el-option>
                <el-option label="已发货" value="已发货" style="color:orange"></el-option>
                <el-option label="已签收" value="已签收" style="color:#67c23a"></el-option>
              </el-select>
            </el-col>
            
          </el-row>
        </el-header>
          
        <!-- main -->
        <el-main style="margin-left:50px; margin-right: 50px">
          <!-- 购物车情况 -->
          <div v-if="status == '购物车'">
            <div v-for="merchant in cartItems" :key="merchant.shop_id" style="margin-bottom: 10px;">
              <!-- 商家名称 -->
              <div style="font-size: large; font-weight: bold; margin: 0px;">
                {{ merchant.shop_name }}
              </div>
              <!-- 商品信息表格 -->
              <el-table 
                ref="table_{{ merchant.shop_id }}" 
                :data="merchant.items" 
                style="width: 100%" 
                border
                @select="handleItemSelectionChange"
                @select-all="handleMerchantSelectionChange(merchant.shop_id)"
                show-header="false">
                
                <!-- 表格列：选择 -->
                <el-table-column 
                  type="selection" 
                  width="55" 
                  align="center">
                </el-table-column>

                <!-- 表格列：商品信息 -->
                <el-table-column 
                  label="商品信息" 
                  prop="goods_name" 
                  width="250">
                  <template #default="scope">
                    <div style="display: flex; align-items: center;">
                      <el-image 
                        style="margin-right: 10px; width: 150px;" 
                        :src="scope.row.goods_img" 
                        fit="scale-down" />
                      <span>{{ scope.row.goods_name }}</span>
                    </div>
                  </template>
                </el-table-column>

                <!-- 表格列：单价 -->
                <el-table-column 
                  label="单价" 
                  prop="goods_price" 
                  align="center" 
                  width="150">
                  <template #default="scope">¥{{ scope.row.goods_price }}</template>
                </el-table-column>

                <!-- 表格列：数量 -->
                <el-table-column 
                  label="数量" 
                  align="center" 
                  width="200">
                  <template #default="scope">
                    <el-input-number 
                      v-model="scope.row.goods_num" 
                      @change="updateTotalPrice" 
                      :min="1" 
                      :max="9999" 
                      style="width: fit-content;">
                    </el-input-number>
                  </template>
                </el-table-column>

                <!-- 表格列：金额 -->
                <el-table-column 
                  label="金额" 
                  align="center">
                  <template #default="scope">¥{{ scope.row.goods_price * scope.row.goods_num }}</template>
                </el-table-column>

                <!-- 表格列：操作 -->
                <el-table-column 
                  label="操作" 
                  align="center">
                  <template #default="scope">
                    <el-button 
                      type="text" 
                      @click="removeItem(scope.row.order_id, scope.row.goods_id, merchant.shop_id)" 
                      style="color: #FF5000">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>


         <!--  查询订单 -->
          <div v-else>
            <div v-for="merchant in cartItems" :key="merchant.shop_id" style="margin-bottom: 10px;">
              <!-- 商家名称 -->
              <div style="font-size: large; font-weight: bold; margin: 0px;">
                {{ merchant.shop_name }}
              </div>
              <!-- 商品信息表格 -->
              <el-table 
                ref="table_{{ merchant.shop_id }}" 
                :data="merchant.items" 
                style="width: 100%" 
                border
                @select="handleItemSelectionChange"
                @select-all="handleMerchantSelectionChange(merchant.shop_id)"
                show-header="false">
                
                <!-- 表格列：选择 -->
<!--                 <el-table-column 
                  type="selection" 
                  width="55" 
                  align="center">
                </el-table-column> -->

                <!-- 表格列：商品信息 -->
                <el-table-column 
                  label="商品信息" 
                  prop="goods_name" 
                  width="250">
                  <template #default="scope">
                    <div style="display: flex; align-items: center;">
                      <el-image 
                        style="margin-right: 10px; width: 150px;" 
                        :src="scope.row.goods_img" 
                        fit="scale-down" />
                      <span>{{ scope.row.goods_name }}</span>
                    </div>
                  </template>
                </el-table-column>

                <!-- 表格列：单价 -->
                <el-table-column 
                  label="单价" 
                  prop="goods_price" 
                  align="center" 
                  width="150">
                  <template #default="scope">¥{{ scope.row.goods_price }}</template>
                </el-table-column>

                <!-- 表格列：数量 -->
                <el-table-column 
                  label="数量" 
                  align="center" 
                  width="200">
                  <template #default="scope">
                    {{ scope.row.goods_num }}
                  </template>
                </el-table-column>

                <!-- 表格列：金额 -->
                <el-table-column 
                  label="金额" 
                  align="center">
                  <template #default="scope">¥{{ scope.row.goods_price * scope.row.goods_num }}</template>
                </el-table-column>

                <el-table-column 
                  label="状态" 
                  align="center">

                </el-table-column>
                <!-- 表格列：操作 -->
                <el-table-column 
                  label="操作" 
                  align="center">
                  <template #default="scope">
                    <el-button 
                      type="text" 
                      @click="removeItem(scope.row.order_id, scope.row.goods_id, merchant.shop_id)" 
                      style="color: #FF5000">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          
        </el-main>
  
        <!-- 底部操作区 -->
        <div v-if="status == '购物车'">
          <el-footer class="cart-footer"  style="margin-left:70px; margin-right: 5%;display: flex; align-items: center;">
            <el-checkbox v-model="selectAll" @change="toggleSelectAll">全选</el-checkbox>
            <span>已选商品 {{ selectedItemsCount }} 件</span>
            <span>合计（不含运费）：¥{{ totalAmount }}</span>
            <el-button type="primary" style="background-color: #FF5000" @click="checkout">结算</el-button>
          </el-footer>
        </div>
        
      </el-container>
    </div>
  </template>
  
  <script>
  import logo from '@/assets/logo2.png';
  import axios from 'axios';
  import { Message } from 'element-ui';
  export default {
  data() {
    return {
      token: "1",
      user_id: 1,
      logo: logo,
      selectAll: false,
      selectedItemsCount: 0,
      totalAmount :0,
      selectedItems: [],
      status: "购物车",
      statusMap: {
        "全部": 9,
        "购物车": 0,
        "未发货": 1,
        "已发货": 2,
        "已签收": 3
      },
      statusColorMap: {
        "全部": "black",
        "购物车": "cornflowerblue",
        "未发货": "red",
        "已发货": "orange",
        "已签收": "#67c23a"
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
    };
  },
/*   watch: {
    status(newStatus) {
      this.fetchCartItems(newStatus);
    }
  }, */
  computed: {
    selectStyle() {
      return {
        color: this.statusColorMap[this.status] || 'black',
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
    fetchCartItems() {
      axios.post('http://localhost:8080/api/order/cartItems', null, {
        params: {
          userId: 1,
          status: this.statusMap[this.status]
        },
        headers: {
          'Authorization': this.token
        }
      }).then(response => {
        if (response.data.code === 1) {
          // 为每个 items 添加 selected 属性，默认值为 false.为shop_id赋值
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


    updateTotalPrice() {
      // Update total price logic...
    },
    handleMerchantSelectionChange(merchantId) {
      let merchantIndex = this.cartItems.findIndex((m) => m.shop_id === merchantId);
      if (merchantIndex !== -1) {
        let merchant = this.cartItems[merchantIndex];
        const selectAll = merchant.items.every((item) => item.selected);
        merchant.items.forEach((item) => {
          item.selected = !selectAll;
        });
      }
      this.updateSelectedItems();
      this.updateSelectAllState();
    },
    handleItemSelectionChange(selection, row) {
      let merchantIndex = this.cartItems.findIndex((m) => m.items.some((item) => item.goods_id === row.goods_id));
      if (merchantIndex !== -1) {
        let merchant = this.cartItems[merchantIndex];
        let itemIndex = merchant.items.findIndex((item) => item.goods_id === row.goods_id);
        if (itemIndex !== -1) {
          merchant.items[itemIndex].selected = !merchant.items[itemIndex].selected;
        }
      }
      this.updateSelectedItems();
      this.updateSelectAllState();
      
},
    updateSelectedItems() {
      this.selectedItems = this.cartItems.flatMap((m) =>
        m.items.filter((item) => item.selected)
      );
      this.selectedItemsCount = this.selectedItems.length;
      this.totalAmount = this.selectedItems.reduce((total, item) => {
        return total + (item.goods_price * item.goods_num);
      }, 0);
    },
    updateSelectAllState() {
      // Update the 'selectAll' state based on individual item selections
      this.selectAll = this.cartItems.every((merchant) =>
        merchant.items.every((item) => item.selected)
      );
    },
    toggleSelectAll() {
      // this.selectAll = !this.selectAll;   //与v-model双向绑定冲突,会导致两次单击才触发
      const selectAll = this.selectAll;
      this.cartItems.forEach((merchant) =>
        merchant.items.forEach((item) => {
          item.selected = selectAll;
        })
      );
      this.$nextTick(() => {
        this.updateSelectedItems();
        const tables = this.$el.querySelectorAll('.el-table');
        tables.forEach((table) => {
          const tableInstance = table.__vue__;
          if (tableInstance) {
            if (selectAll) {
              tableInstance.store.states.data.forEach((row) => {
                tableInstance.toggleRowSelection(row, true);
              });
            } else {
              tableInstance.clearSelection();
            }
          }
        });
      });
    },


    delete(orderId) {
      const requestData = {
        user_id: this.user_id,
        order_id: orderId
      };
      axios.post('http://localhost:8080/api/order/delete', requestData, {
          headers: {
            'Authorization': this.token
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

    removeFromTable(goodsId, merchantId){     //结算也可以使用，便于代码复用
      let merchantIndex = this.cartItems.findIndex((m) => m.shop_id === merchantId);
      if (merchantIndex !== -1) {
        let merchant = this.cartItems[merchantIndex];
        merchant.items = merchant.items.filter((item) => item.goods_id !== goodsId);
        if (merchant.items.length === 0) {
          this.cartItems.splice(merchantIndex, 1);
        }
      }
      this.updateSelectedItems();
      this.updateSelectAllState();
    },

    removeItem(order_id,goodsId, merchantId) {
      this.removeFromTable(goodsId, merchantId);
      this.delete(order_id);
    },
    checkout() {
        // 获取选中的商品
        const selectedItems = this.cartItems.flatMap(merchant => 
          merchant.items.filter(item => item.selected).map(item => ({
            ...item,
            shop_id: merchant.shop_id // 将商家的shop_id添加到每个item中,才能按商家分组
          }))
        );

            // 计算每个商家中至少有一个商品被选中的商家数量
        const merchantSelectedNum = this.cartItems.reduce((count, merchant) => {
          const hasSelectedItems = merchant.items.some(item => item.selected);
          return hasSelectedItems ? count + 1 : count;
        }, 0);

        // 假设每个商家的运费为10
        const shippingFeePerMerchant = 20;
        const totalShippingFee = merchantSelectedNum * shippingFeePerMerchant;

        // 准备请求数据
        const requestData = selectedItems.map(item => ({
          order_id: item.order_id,
          user_id: this.user_id,
          total: item.goods_price * item.goods_num + totalShippingFee/merchantSelectedNum,
          status: 1
        }));

        console.log(requestData);

      // 发送请求更新状态
      axios.post('http://localhost:8080/api/order/updateStatus', requestData, {
        headers: {
          'Authorization': this.token
        }
      })
      .then(response => {
        // 使用element 消息窗 输出返回的消息
          Message({
            message: response.data.message,
            type: 'success',
            showClose: false,
            duration: 3000 // 提示窗显示时间，单位为毫秒
          });
        if(response.data.code==1){
          selectedItems.forEach(item => {
              this.removeFromTable(item.goods_id, item.shop_id);
  //            alert("goods_id: "+item.goods_id+" shop_id: "+item.shop_id);
          });
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
        console.error('Error updating order status:', error);
      });
    }

  },
};
</script>
  
  <style>
  .el-image, .el-span {
    vertical-align: middle;
}
.custom-select .el-select-dropdown__item.selected {
    color: #FF5000;
}



  .cart-footer {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-top: 1px solid #e8e8e8;
  }
  </style>
  