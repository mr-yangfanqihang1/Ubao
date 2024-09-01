<template>
    <el-container style="height: 100%; background-color: aliceblue; line-height: 1; border: 2px solid #eee">
    <el-header  style="display: flex; align-items: center; justify-content: center; height: 5%;">
      我的数据库
    </el-header>
        <el-container>
            <el-aside width="200px"  style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['1', '3']">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i><router-link to="/dept">部门管理</router-link></template>
                    <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i><router-link to="/emp">员工管理</router-link></template>
                    <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-setting"></i>导航三</template>
                    <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="3-1">选项1</el-menu-item>
                    <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                    <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                </el-menu>
            </el-aside>

           
      
    <el-main>
        <el-dropdown trigger="click">
        <span class="el-dropdown-link" style="cursor: pointer;">
            <i class="el-icon-setting" style="margin-right: 15px;"></i>
            设置
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>

        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="订单编号">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
            <el-form-item label="商品名称">
                <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="北邮海淀" value="1"></el-option>
                    <el-option label="北邮沙河" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <table border="1" style="width: 100%; border-collapse: collapse; border: 1px solid rgb(235, 235, 235); text-align: left;">

      <thead>
        <tr>
          <th style="padding: 8px;border: 1px  solid rgb(235, 235, 235);">日期</th>
          <th style="padding: 8px;border: 1px  solid rgb(235, 235, 235)">姓名</th>
          <th style="padding: 8px;border: 1px  solid rgb(235, 235, 235)">地址</th>
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
    </el-main>
  </el-container>
</el-container>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 100px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: []
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
      })
      .catch(error => console.error('加载 formInline 数据时出错:', error));

    axios.get("https://apifoxmock.com/m2/5075036-4736682-default/210094948")
      .then((result) => {
        // 确保数据结构符合预期
        if (result.data.tableData) {
          this.tableData = result.data.tableData;
        } else {
          console.error('tableData 数据缺失或结构错误');
        }
      })
      .catch(error => console.error('加载 tableData 数据时出错:', error));
  }
};
</script>

           