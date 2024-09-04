<template>
  <div class="login-register-container">
    <!-- 切换按钮 -->
    <div class="toggle-buttons">
      <button @click="isLogin = true" :class="{ active: isLogin }">登录</button>
      <button @click="isLogin = false" :class="{ active: !isLogin }">注册</button>
    </div>

    <!-- 登录表单 -->
    <form v-if="isLogin" @submit.prevent="handleLogin">
      <h2>登录</h2>

      <!-- 用户名输入框 -->
      <div class="input-group">
        <label for="login-username">用户名</label>
        <input
          type="text"
          id="login-username"
          v-model="username"
          placeholder="请输入用户名"
          required
        />
      </div>

      <!-- 密码输入框 -->
      <div class="input-group">
        <label for="login-password">密码</label>
        <input
          type="password"
          id="login-password"
          v-model="password"
          placeholder="请输入密码"
          required
        />
      </div>

      <!-- 登录按钮 -->
      <button type="submit">登录</button>
    </form>

    <!-- 注册表单 -->
    <form v-else @submit.prevent="handleRegister">
      <h2>注册</h2>

      <!-- 用户名输入框 -->
      <div class="input-group">
        <label for="register-username">用户名</label>
        <input
          type="text"
          id="register-username"
          v-model="registerUsername"
          placeholder="请输入用户名"
          required
        />
      </div>

      <!-- 密码输入框 -->
      <div class="input-group">
        <label for="register-password">密码</label>
        <input
          type="password"
          id="register-password"
          v-model="registerPassword"
          placeholder="请输入密码"
          required
        />
      </div>

      <!-- 确认密码输入框 -->
      <div class="input-group">
        <label for="confirm-password">确认密码</label>
        <input
          type="password"
          id="confirm-password"
          v-model="confirmPassword"
          placeholder="请确认密码"
          required
        />
      </div>

      <!-- 注册按钮 -->
      <button type="submit">注册</button>
    </form>

    <!-- 错误提示信息 -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      // 是否处于登录状态
      isLogin: true,
      // 登录用户名和密码
      username: '',
      password: '',
      // 注册用户名、密码和确认密码
      registerUsername: '',
      registerPassword: '',
      confirmPassword: '',
      // 存储错误消息的变量
      errorMessage: '',
    };
  },
  methods: {
    // 处理登录逻辑
    handleLogin() {
      if (this.username === 'user' && this.password === 'password') {
        this.errorMessage = '';
        alert('登录成功！');
        // 在此处处理登录后的逻辑，例如导航到主页
        // this.$router.push('/home');
      } else {
        this.errorMessage = '用户名或密码错误！';
      }
    },
    // 处理注册逻辑
    handleRegister() {
      if (this.registerPassword !== this.confirmPassword) {
        this.errorMessage = '两次输入的密码不匹配！';
        return;
      }

      if (this.registerUsername && this.registerPassword) {
        this.errorMessage = '';
        alert('注册成功！');
        // 在此处处理注册后的逻辑，例如保存用户信息
        // this.$router.push('/login');
      } else {
        this.errorMessage = '请填写所有必填项！';
      }
    },
  },
};
</script>

<style scoped>
/* 登录和注册页面的样式 */
.login-register-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.toggle-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.toggle-buttons button {
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  background-color: #ddd;
  cursor: pointer;
}

.toggle-buttons button.active {
  background-color: #ff5000;
  color: white;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #ff5000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #ff5000;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>