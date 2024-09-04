
<template>
  <div class="login-register-container">
    <!-- 背景图 -->
    <div class="background-image"></div>
    
    <!-- 商标图标 -->
    <div class="logo">
      <img src="@/assets/logo.png" alt="Logo" />
    </div>
    
    <!-- 切换按钮 -->
    <div class="toggle-buttons">
      <button @click="isLogin = true" :class="{ active: isLogin }">登录</button>
      <button @click="isLogin = false" :class="{ active: !isLogin }">注册</button>
    </div>

    <!-- 登录表单 -->
    <form v-if="isLogin" @submit.prevent="handleLogin" class="login-form">
      <h2>登录</h2>
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
      <button type="submit">登录</button>
    </form>

    <!-- 注册表单 -->
    <form v-else @submit.prevent="handleRegister" class="register-form">
      <h2>注册</h2>
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
      <div class="input-group">
        <label for="register-email">邮箱</label>
        <input
          type="email"
          id="register-email"
          v-model="registerEmail"
          placeholder="请输入邮箱"
          required
        />
      </div>
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
      <button type="submit">注册</button>
    </form>

    <!-- 错误提示信息 -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios'; // 引入axios库

export default {
  name: 'LoginView',
  data() {
    return {
      isLogin: true,
      username: '',
      password: '',
      registerUsername: '',
      registerEmail: '',
      registerPassword: '',
      confirmPassword: '',
      errorMessage: '',
    };
  },
  methods: {
  handleLogin() {
    axios
      .post('http://localhost:8080/api/login', {
        username: this.username,
        password: this.password,
      })
      .then(response => {
        const { status, message, token } = response.data;
        if (status === 1) {
          this.errorMessage = '';
          localStorage.setItem('token', token); // 存储 JWT 令牌
          alert('登录成功！');
          // 进行页面跳转或其他操作
        } else {
          this.errorMessage = message;
        }
      })
      .catch(error => {
        console.error('登录请求失败:', error);
        this.errorMessage = '登录失败，请稍后重试。';
      });
  },
    handleRegister() {
      if (this.registerPassword !== this.confirmPassword) {
        this.errorMessage = '两次输入的密码不匹配！';
        return;
      }

      axios
        .post('http://localhost:8080/api/register', {
          userType: 1,
          username: this.registerUsername,
          email: this.registerEmail,
          password: this.registerPassword,
          address: '',
        })
        .then(response => {
          const { status, message } = response.data;
          if (status === 1) {
            this.errorMessage = '';
            alert('注册成功！');
            this.isLogin = true;
          } else {
            this.errorMessage = message;
          }
        })
        .catch(error => {
          console.error('注册请求失败:', error);
          this.errorMessage = '注册失败，请稍后重试。';
        });
    },
  },
};
</script>

<style scoped>
.login-register-container {
  position: relative;
  width: 400px;
  margin: 100px auto;
  padding: 40px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/login-bg2.jpg');
  background-size: cover;
  z-index: -1;
  opacity: 0.8;
}

.logo {
  margin-bottom: 20px;
}

.logo img {
  width: 150px;
  height: auto;
}

.toggle-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.toggle-buttons button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-buttons button.active {
  background-color: #0056b3;
}

.toggle-buttons button:hover {
  background-color: #0056b3;
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
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button[type="submit"] {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #218838;
}

.error-message {
  color: red;
  margin-top: 15px;
}
</style>
