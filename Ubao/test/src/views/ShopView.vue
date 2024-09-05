<template>
  <div>
    <el-form ref="productForm" :model="productForm" label-width="100px" style="margin: 20px;">
      <!-- 商品名称 -->
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="productForm.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>

      <!-- 商品图片 -->
      <el-form-item label="商品图片" prop="image">
        <el-upload
          action="http://localhost:8080/api/upload"
          list-type="picture-card"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :file-list="productForm.imageList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <!-- 商品售价 -->
      <el-form-item label="商品售价" prop="price">
        <el-input v-model="productForm.price" placeholder="请输入商品售价" type="number"></el-input>
      </el-form-item>

      <!-- 商家名称 -->
      <el-form-item label="商家名称" prop="merchantName">
        <el-input v-model="productForm.merchantName" placeholder="请输入商家名称"></el-input>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitProduct">提交商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productForm: {
        name: '',
        image: '',
        imageList: [],
        price: null,
        merchantName: ''
      }
    };
  },
  methods: {
    handleUploadSuccess(response) { // 移除 file 参数
      // 假设后端返回图片URL
      this.productForm.image = response.url;
      this.productForm.imageList.push({
        name: '上传成功的图片',
        url: response.url
      });
    },
    handleUploadError(error) { // 移除 file 参数
      console.error('图片上传失败:', error);
    },
    submitProduct() {
      // 数据校验
      if (!this.productForm.name || !this.productForm.image || !this.productForm.price || !this.productForm.merchantName) {
        this.$message.error('请填写完整的商品信息！');
        return;
      }

      // 向后端发送商品数据
      this.$axios
        .post('http://localhost:8080/api/addProduct', {
          name: this.productForm.name,
          image: this.productForm.image,
          price: this.productForm.price,
          merchantName: this.productForm.merchantName
        })
        .then(() => { // 移除 res 参数
          this.$message.success('商品上传成功！');
          // 清空表单数据
          this.productForm = { name: '', image: '', imageList: [], price: null, merchantName: '' };
        })
        .catch((err) => {
          console.error('商品上传失败:', err);
          this.$message.error('商品上传失败，请重试！');
        });
    }
  }
};
</script>

<style scoped>
.el-upload-list__item {
  width: 100px;
  height: 100px;
}
</style>


