<template>
  <div>
    <div v-for="cart in cartItems" :key="cart.id">
      <el-row>
        <h3>{{ cart.name }}</h3>
      </el-row>
      <el-table :data="cart.goods" border>
        <el-table-column width="50">
          <template v-slot:header>
            <!-- Use computed properties for v-model and indeterminate state -->
            <el-checkbox
              :indeterminate="isIndeterminate(cart.goods)"
              :checked="isAllChecked(cart.goods)"
              @change="handleCheckAllChange(cart.goods)"
            ></el-checkbox>
          </template>
          <template v-slot="scope">
            <el-checkbox
              v-model="scope.row.selected"
              @change="handleSelectionChange(scope.row)"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="goods_img" label="商品信息" width="100">
          <template v-slot="scope">
            <img :src="scope.row.goods_img" width="50" height="50" />
            <span>{{ scope.row.goods_name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="goods_price" label="单价"></el-table-column>
        <el-table-column label="数量">
          <template v-slot="scope">
            <el-input-number v-model="scope.row.goods_num" @change="updateTotal()"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="金额">
          <template v-slot="scope">
            {{ (scope.row.goods_num * scope.row.goods_price).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text" @click="removeItem(cart, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-footer height="60px">
      <el-checkbox v-model="selectAll" @change="toggleAllSelection">全选</el-checkbox>
      <span>已选商品 {{ selectedItems.length }} 件</span>
      <span>合计（不含运费）：￥{{ totalPrice }}</span>
      <el-button type="primary" @click="checkout">结算</el-button>
    </el-footer>
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
    totalPrice() {
      return this.selectedItems.reduce((acc, item) => acc + item.goods_num * item.goods_price, 0).toFixed(2);
    },
  },
  methods: {
    handleSelectionChange() {
      this.updateSelectedItems();
      this.updateTotal();
    },
    handleCheckAllChange(goods) {
      const isChecked = this.isAllChecked(goods);
      goods.forEach((item) => (item.selected = !isChecked));
      this.updateSelectedItems();
      this.updateTotal();
    },
    toggleAllSelection() {
      this.cartItems.forEach((cart) => {
        cart.goods.forEach((item) => {
          item.selected = this.selectAll;
        });
      });
      this.updateSelectedItems();
      this.updateTotal();
    },
    isAllChecked(goods) {
      return goods.every((item) => item.selected);
    },
    isIndeterminate(goods) {
      const selectedCount = goods.filter((item) => item.selected).length;
      return selectedCount > 0 && selectedCount < goods.length;
    },
    updateSelectedItems() {
      this.selectedItems = this.cartItems
        .flatMap((cart) => cart.goods)
        .filter((item) => item.selected);
    },
    updateTotal() {
      this.selectedItems = this.cartItems
        .flatMap((cart) => cart.goods)
        .filter((item) => item.selected);
    },
    removeItem(cart, row) {
      const index = cart.goods.indexOf(row);
      if (index !== -1) {
        cart.goods.splice(index, 1);
      }
      this.updateSelectedItems();
      this.updateTotal();
    },
    checkout() {
      console.log("Proceed to checkout with selected items: ", this.selectedItems);
    },
  },
};
</script>

<style scoped>
.el-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
