<template>
    <div class="cart-page">
      <el-container>
        <!-- 顶部导航 -->
        <el-header style="background-color: transparent; display: flex; align-items: center; font-weight: 800; font-size: x-large; line-height: 60px;">
          <el-image :src=logo style="height:100%;margin-right: 10px;" />
          <span style="font-size: x-large; line-height: 70px;">购物车</span>

        </el-header>
        <!-- 内容主体 -->
        <el-main style="margin-left:50px; margin-right: 50px">
          <!-- 商家和商品列表 -->
          <div v-for="merchant in cartItems" :key="merchant.shop_id" style="margin-bottom: 10px;">
            <!-- 商家名称 -->
            <div style="font-size: large; font-weight: bold; margin: 0px;">
              <el-img></el-img>{{ merchant.shop_name }}
            </div>
  
            <!-- 商品信息表格 -->
            <el-table :data="merchant.items" style="width: 100%" border
            @select="handleItemSelectionChange"
            @select-all="handleMerchantSelectionChange(merchant.shop_id)"
            show-header="false">
              <!-- 表格列：选择 -->
              <el-table-column type="selection" width="55" align="center" ></el-table-column>
  
              <!-- 表格列：商品信息 -->
              <el-table-column label="商品信息" prop="goods_name">
                <template #default="scope">
                  <el-image style="width: 60px; height: 60px; margin-right: 10px" :src="scope.row.goods_img" fit="cover" />
                  <span>{{ scope.row.goods_name }}</span>
                </template>
              </el-table-column>
  
              <!-- 表格列：单价 -->
              <el-table-column label="单价" prop="goods_price" align="center">
                <template #default="scope">¥{{ scope.row.goods_price }}</template>
              </el-table-column>
  
              <!-- 表格列：数量 -->
              <el-table-column label="数量" align="center">
                <template #default="scope">
                  <el-input-number v-model="scope.row.goods_num" @change="updateTotalPrice" :min="1"></el-input-number>
                </template>
              </el-table-column>
  
              <!-- 表格列：金额 -->
              <el-table-column label="金额" align="center">
                <template #default="scope">¥{{ scope.row.goods_price * scope.row.goods_num }}</template>
              </el-table-column>
  
              <!-- 表格列：操作 -->
              <el-table-column label="操作" align="center">
                <template #default="scope">
                  <el-button type="text" @click="removeItem(scope.row.goods_id, merchant.shop_id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            
          </div>
        </el-main>
  
        <!-- 底部操作区 -->
        <el-footer class="cart-footer"  style="margin-left:70px; margin-right: 5%;display: flex; align-items: center;">
          <el-checkbox v-model="selectAll" @change="toggleSelectAll">全选</el-checkbox>
          <span>已选商品 {{ selectedItemsCount }} 件</span>
          <span>合计（不含运费）：¥{{ totalAmount }}</span>
          <el-button type="primary" @click="checkout">结算</el-button>
        </el-footer>
      </el-container>
    </div>
  </template>
  
  <script>
  import logo from '@/assets/logo2.png';
  import axios from 'axios';
  export default {
    data() {
      return {
        token:"1",
        logo: logo,
        selectAll: false,
        selectedItems: [],
        cartItems: [
          {
            goods_id: 1,
            shop_id: 1,
            shop_name: "小米旗舰店",
            items: [
              {
                goods_id: 456,
                goods_img: "https://th.bing.com/th/id/R.d49459a4d41c2dd9be0d37efb6806349?rik=SIjmAu0JPBDh7w&riu=http%3a%2f%2fp1.itc.cn%2fq_70%2fimages03%2f20201229%2f2998843396b647a5874d30c3d80d678f.png&ehk=105kNnyoDRvI0uLndYoWtHadMrtn%2fzA07dE%2bKNwOzTE%3d&risl=&pid=ImgRaw&r=0",
                goods_name: "米家电动冲牙器标准版",
                goods_num: 1,
                goods_price: 199.0,
                selected: false,
              },
            ],
          },
        ],
      };
    },
    mounted(){
      this.fetchCartItems();
    },

    computed: {
    selectedItemsCount() {
      return this.cartItems.reduce((count, merchant) => {
        return count + merchant.items
          .filter((item) => item.selected)
          .reduce((sum, item) => sum + item.goods_num, 0);
      }, 0);
    },
    totalAmount() {
      return this.cartItems.reduce(
        (sum, merchant) =>
          sum +
          merchant.items
            .filter((item) => item.selected)
            .reduce((s, item) => s + item.goods_price * item.goods_num, 0),
        0
      );
    },
  },
  methods: {
    fetchCartItems() {
      axios.post('http://localhost:8080/api/order/cartItems',  null, {
        params: {
          userId: 1
        },
        headers: {
          'authorization': this.token
        }
      }).then(response => {
        if (response.data.code === 1) {
          // 为每个 items 添加 selected 属性，默认值为 false
          this.cartItems = response.data.data.map(cart => {
            return {
              ...cart,
              items: cart.items.map(item => ({
                ...item,
                selected: false
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
    },
    updateSelectAllState() {
      // Update the 'selectAll' state based on individual item selections
      this.selectAll = this.cartItems.every((merchant) =>
        merchant.items.every((item) => item.selected)
      );
    },
    toggleSelectAll() {
      this.selectAll = !this.selectAll;
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
    removeItem(goodsId, merchantId) {
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
    checkout() {
      alert("结算成功！");
    },
  },
};
</script>
  
  <style>
  .cart-page {
    padding: 20px;
  }
  .cart-footer {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-top: 1px solid #e8e8e8;
  }
  </style>
  