<template>
    <div class="cart-page">
      <el-container>
        <!-- 顶部导航 -->
        <el-header style="background-color: transparent; display: flex; align-items: center; font-weight: 800; font-size: x-large; line-height: 60px;">
          <img src="/image/logo.png" height="70px" style="margin-right: 10px;" />
          <span style="font-size: x-large; line-height: 70px;">购物车</span>
        </el-header>
  
        <!-- 内容主体 -->
        <el-main>
          <!-- 商家和商品列表 -->
          <div v-for="merchant in cartItems" :key="merchant.id" style="margin-bottom: 10px;">
            <!-- 商家名称 -->
            <div style="font-size: large; font-weight: bold; margin: 0px;">
              {{ merchant.name }}
            </div>
  
            <!-- 商品信息表格 -->
            <el-table :data="merchant.goods" style="width: 100%" border
              @selection-change="handleSelectionChange(merchant)">
              <!-- 表格列：选择 -->
              <el-table-column type="selection" width="55" align="center"></el-table-column>
  
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
                  <el-button type="text" @click="removeItem(scope.row.goods_id, merchant.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
  
        <!-- 底部操作区 -->
        <el-footer class="cart-footer"  style="display: flex; align-items: center;margin-left: 20px">
          <el-checkbox v-model="selectAll" @change="toggleSelectAll">全选</el-checkbox>
          <span>已选商品 {{ selectedItemsCount }} 件</span>
          <span>合计（不含运费）：¥{{ totalAmount }}</span>
          <el-button type="primary" @click="checkout">结算</el-button>
        </el-footer>
      </el-container>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectAll: false,
        cartItems: [
          {
            id: 1,
            name: "商家名称1",
            goods: [
              {
                goods_id: 456,
                shop_name: "小米官方旗舰店",
                goods_img: "https://th.bing.com/th/id/R.d49459a4d41c2dd9be0d37efb6806349?rik=SIjmAu0JPBDh7w&riu=http%3a%2f%2fp1.itc.cn%2fq_70%2fimages03%2f20201229%2f2998843396b647a5874d30c3d80d678f.png&ehk=105kNnyoDRvI0uLndYoWtHadMrtn%2fzA07dE%2bKNwOzTE%3d&risl=&pid=ImgRaw&r=0",
                goods_name: "米家电动冲牙器标准版",
                goods_desc: "一款优秀的冲牙器",
                goods_num: 1,
                goods_price: 199.0,
                selected: false,
              },
              {
                goods_id: 789,
                shop_name: "蓝月亮官方旗舰店",
                goods_img: "https://th.bing.com/th/id/R.d49459a4d41c2dd9be0d37efb6806349?rik=SIjmAu0JPBDh7w&riu=http%3a%2f%2fp1.itc.cn%2fq_70%2fimages03%2f20201229%2f2998843396b647a5874d30c3d80d678f.png&ehk=105kNnyoDRvI0uLndYoWtHadMrtn%2fzA07dE%2bKNwOzTE%3d&risl=&pid=ImgRaw&r=0",
                goods_name: "蓝月亮洗衣液",
                goods_desc: "清新洁净",
                goods_num: 1,
                goods_price: 139.0,
                selected: false,
              },
            ],
          },
          {
            id: 2,
            name: "商家名称2",
            goods: [
              {
                goods_id: 987,
                shop_name: "另一家商店",
                goods_img: "https://th.bing.com/th/id/R.d49459a4d41c2dd9be0d37efb6806349?rik=SIjmAu0JPBDh7w&riu=http%3a%2f%2fp1.itc.cn%2fq_70%2fimages03%2f20201229%2f2998843396b647a5874d30c3d80d678f.png&ehk=105kNnyoDRvI0uLndYoWtHadMrtn%2fzA07dE%2bKNwOzTE%3d&risl=&pid=ImgRaw&r=0",
                goods_name: "商品3",
                goods_desc: "描述3",
                goods_num: 2,
                goods_price: 299.0,
                selected: false,
              },
            ],
          },
        ],
        selectedItems: [],
      };
    },
    computed: {
        selectedItemsCount() {
            console.log("selectedItemsCount computed");
            return this.cartItems.reduce((count, merchant) => {
                return count + merchant.goods
                    .filter((item) => item.selected)
                    .reduce((sum, item) => sum + item.goods_num, 0);
                }, 0);
        },
      totalAmount() {
        return this.cartItems.reduce(
          (sum, merchant) =>
            sum +
            merchant.goods
              .filter((item) => item.selected)
              .reduce((s, item) => s + item.goods_price * item.goods_num, 0),
          0
        );
      },
    },
    methods: {
      updateTotalPrice() {
        // 更新总价的逻辑
      },
      handleSelectionChange(merchant) {
        return (selectedItems) => {
          // 更新每个商品的 selected 状态
          merchant.goods.forEach((item) => {
            item.selected = selectedItems.includes(item);
          });
          // 更新选中的商品列表
          this.$nextTick(() => {
            this.updateSelectedItems();
            });
        };
      },
      updateSelectedItems() {
        this.selectedItems = this.cartItems.flatMap((m) =>
          m.goods.filter((item) => item.selected)
        );
      },
      toggleSelectAll() {
        const selectAll = this.selectAll;
        this.cartItems.forEach((merchant) =>
          merchant.goods.forEach((item) => (item.selected = selectAll))
        );
        this.$nextTick(() => {
            this.updateSelectedItems();
        });
      },
      removeItem(goodsId, merchantId) {
        const merchant = this.cartItems.find((m) => m.id === merchantId);
        if (merchant) {
          merchant.goods = merchant.goods.filter((item) => item.goods_id !== goodsId);
        }
        this.updateSelectedItems();
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
  