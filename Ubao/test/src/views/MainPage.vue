
<template>
<div>
  <el-container style="margin-left:5%;margin-right:5%; ">
    <el-header height="100px"  >

<!--      <el-link type="primary" href="https://element.eleme.io" target="_blank">主要链接</el-link>-->
      <el-row >
        <el-col :span="4">
          <el-image style="height: 100px;" :src="logo2" :fit="fit" />
        </el-col>
        <el-col :span="8">
          <el-input v-model="input" placeholder="请输入商品"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="toSelectGoods" style="background-color: #ff5000">搜索</el-button>
        </el-col>
<!--        空白占位-->
        <el-col :span="4" style="border: 1px solid transparent;">
        </el-col>
        <el-col :span="3">
          <el-link  type="primary"  target="_blank" style="color: #FF5000" @click="toLogin" >登录/注册</el-link>
        </el-col>
        <el-col :span="3">
          <el-link type="primary"   target="_blank" @click="toCart" style="color: #FF5000">购物车</el-link>
        </el-col>
      </el-row>
    </el-header>

    <el-container >
<!--      <el-row :gutter="20">-->
<!--        <el-col :span="16">-->
<!--        </el-col>-->
<!--        <el-col :span="16">-->
<!--        </el-col>-->
<!--      </el-row>-->

      <el-aside width="200px">
        <el-table
            :data="tableData"
            style="width: 100%" show-header="false"
            :header-cell-style="{color:'#ff5000',fontWeight:'bold'}" >
          <el-table-column
              prop="date"
              width="60px" label="分类">
            <template slot-scope="scope">
              <a @click="toCategory(scope.row.date)" target="_blank" class="buttonText" style="font-size: large;cursor: pointer; text-decoration: none">{{scope.row.date}}</a>
            </template>
          </el-table-column>
          <el-table-column
              prop="name"
              width="60">
            <template slot-scope="scope">
              <a @click="toCategory(scope.row.name)" target="_blank" class="buttonText" style="font-size: large;cursor: pointer; text-decoration: none">{{scope.row.name}}</a>
            </template>
          </el-table-column>
          <el-table-column
              prop="address"
               width="60">
            <template slot-scope="scope">
              <a @click="toCategory(scope.row.address)" target="_blank" class="buttonText" style="font-size: large;cursor: pointer; text-decoration: none">{{scope.row.address}}</a>
            </template>
          </el-table-column>
        </el-table>

      </el-aside>
        <el-main style="overflow-y:hidden" >
<!--          360px没有滑动框-->
          <el-carousel indicator-position="outside" height="360px">
            <el-carousel-item v-for="item in images" :key="item" style="width: 100%; height: 100%" >
              <img :src="item" alt="" style="object-fit: scale-down;cursor: pointer; width:100%;height:100%" @click="toSelectGoods" >
            </el-carousel-item>
          </el-carousel>
        </el-main>
    </el-container>

    <el-footer height="300px" >
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark" >
          好物推荐
        </div></el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="5" v-for="(o, index) in count" :key="o" :offset="index%4 > 0 ? 1 : 0"  v-infinite-scroll="load" style="overflow:auto;cursor: pointer;">
          <el-card :body-style="{ padding: '0px',height: '500px'}" style="height: 360px">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" @click="toGoodsDetail(index)" class="image">
            <div style="padding: 14px;" @click="toGoodsDetail(index)" >
              <span>好吃的汉堡</span>
              <div class="bottom clearfix" >
                <div>价格十元</div>
                <el-button type="text" class="button">立即购买</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</div>
</template>

<script>
import logo from '@/assets/logo.png'
import logo2 from '@/assets/logo2.png'
import goodsDetail from "@/views/GoodsDetail.vue";
export default {
  name: "MainPage",
  computed: {
    goodsDetail() {
      return goodsDetail
    }
  },
  data() {
    return {
      input: '',
      logo,
      logo2,
      count: 4,
      tableData: [{
        date: '女装',
        name: '内衣',
        address: '奢品',
      }, {
        date: '女鞋',
        name: '男鞋',
        address: '箱包'
      }, {
        date: '美妆',
        name: '饰品',
        address: '洗护'
      }, {
        date: '男装',
        name: '运动',
        address: '百货'
      },
        {
          date: '手机',
          name: '数码',
          address: '礼品'
        },
        {
          date: '家装',
          name: '电器',
          address: '车品'
        },
        {
          date: '食品',
          name: '生鲜',
          address: '母婴'
        },
        {
          date: '医药',
          name: '保健',
          address: '进口'
        },
      ],
      images: [
          'https://img.alicdn.com/imgextra/i1/O1CN01YGUXOM1k5VKBPo5J3_!!6000000004632-2-tps-846-472.png',
          'https://img.alicdn.com/imgextra/i3/O1CN017Z2XUL1nnQ94i2MTP_!!6000000005134-0-tps-846-472.jpg',
          'https://img.alicdn.com/imgextra/i3/O1CN01Sf6dER1zbJ3uVQ0lE_!!6000000006732-0-tps-846-472.jpg',
          'https://gw.alicdn.com/imgextra/i4/O1CN01a71ilU1T2RCTvUXDY_!!6000000002324-0-tps-846-472.jpg'
      ],
      currentDate: new Date(),
      goodsList: []
    }
  },
  methods: {
    load () {
      if(this.count<20)
      this.count += 2
    },
    toLogin: function (){
      this.$router.push('/login')
      console.log('去登陆')
    },
    toSelectGoods: function (){
      this.$router.push({
         path: '/selectGoods',
         query: {
            input: this.input,
         }
      })
    },
    toGoodsDetail: function (index){
     // let id=this.goodsList[index].id
      let id=index
      this.$router.push({
        path: '/goodsDetail',
        query: {
          id: id
        }
      })
    },
    toCart: function (){
      this.$router.push({
        path: '/cart'
      })
    },
    toCategory: function (category){
      this.$router.push({
        path: '/selectGoods',
        query: {
          input: category
        }
      })
    }
  }
}
</script>


<style scoped>
a {
  font-size: 25px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.85);
}
a:hover,
a:active {
  color: #f1657d;
}

.el-header, .el-footer {
  background-color: #eae8eb;
  color: #333;
  text-align: center;


}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 10px;
  width: 100px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 100px;
  height: 420px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}


</style>

