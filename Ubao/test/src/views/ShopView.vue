<template>
  <el-container style="height: 100%; background-color: aliceblue; line-height: 1; border: 2px solid #eee">
    <!-- <el-header style="display: flex; align-items: center; justify-content: center; height: 80px;background-color: rgb(238, 241, 246)">
      我的数据库
    </el-header> -->
    <el-container>
      <el-aside width="200px" style="height:600px; background-color: rgb(238, 241, 246)">
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
      <el-main>
        <div v-if="currentView === 'main'">
          <h2>首页内容</h2>
          <!-- 首页的具体内容 -->
        </div>
        <div v-if="currentView === 'goods'">
          <h2>商品管理内容</h2>
          <!-- 商品管理的具体内容 -->
        </div>
        <div v-if="currentView === 'order'">
    
            

          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="订单编号">
              <el-input v-model="formInline.order_id" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select v-model="formInline.status" placeholder="全部">
                <el-option label="全部" value="9" style="color:gray"></el-option>
                <el-option label="未发货" value="1" style="color:red"></el-option>
                <el-option label="已发货" value="2" style="color:orange"></el-option>
                <el-option label="已签收" value="3" style="color:green"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
          <table border="1" style="width: 100%; border-collapse: collapse; border: 1px solid rgb(235, 235, 235); text-align: left;">

            <thead>
              <tr>
                <th style="padding: 8px;border: 1px  solid rgb(235, 235, 235);">订单编号</th>
                <th style="padding: 8px;border: 1px  solid rgb(235, 235, 235)">姓名</th>
                <th style="padding: 8px;border: 1px  solid rgb(235, 235, 235)">地址</th>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link" style="cursor: pointer;">
                    <i class="el-icon-setting" style="margin-right: 15px;"></i>
                    设置
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tableData" :key="index">
                <td style="padding: 8px;border: 1px  solid rgb(235, 235, 235)">{{ item.date }}</td>
                <td style="padding: 8px;border: 1px  solid rgb(235, 235, 235);">{{ item.name }}</td>
                <td style="padding: 8px;border: 1px  solid rgb(235, 235, 235)">{{ item.address }}</td>
              </tr>
            </tbody>
            </table>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      formInline: {
        order_id: '',
        status: ''
      },
      tableData: [],
      currentView: 'order' // 默认显示首页内容
    };
  },
  methods: {
    onSubmit() {
      alert('submit:' + JSON.stringify(this.formInline));
    }
  },
  mounted() {
    // 调整路径，确保路径正确
    axios.get("https://apifoxmock.com/m2/5075036-4736682-default/210094948")
      .then((result) => {
        // 确保数据结构符合预期
        if (result.data.formInline) {
          this.formInline = result.data.formInline;
        } else {
          console.error('formInline 数据缺失或结构错误');
        }
        if (result.data.tableData) {
          this.tableData = result.data.tableData;
        } else {
          console.error('tableData 数据缺失或结构错误');
        }
      })
      .catch(error => console.error('加载数据时出错:', error));
  }
};
</script>
