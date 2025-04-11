# 邮宝电商平台

## 一、项目概述
**项目名称**：邮宝（YouBao）  
**参考原型**：淘宝网(www.taobao.com)  
**项目定位**：校园二手商品交易平台  
![image](https://github.com/user-attachments/assets/fc4e9ee7-8566-41ca-b311-ab2897a2c637)
![image](https://github.com/user-attachments/assets/edff0739-bf7b-4276-bf78-c6fe97835438)
![image](https://github.com/user-attachments/assets/a39e9f5c-090e-4d9c-9df7-e34e5e852038)
![image](https://github.com/user-attachments/assets/7efb566a-12dd-443c-ab18-90ba742e5a12)
![image](https://github.com/user-attachments/assets/7a6fa38e-519d-4eb0-91cb-38f7260517aa)

### 技术架构
| 模块       | 技术选型                                                                 |
|------------|--------------------------------------------------------------------------|
| 前端技术   | HTML5 + CSS3 + JavaScript + jQuery + LayUI                               |
| 后端技术   | Node.js + Express + MySQL                                               |
| 辅助工具   | Git（版本控制） + Gulp4（自动化构建） + Postman（接口测试）              |
| 安全认证   | JWT（JSON Web Token）                                                   |

## 二、功能模块
### 2.1 核心功能
| 模块           | 功能要点                                                                 |
|----------------|--------------------------------------------------------------------------|
| 首页           | 商品瀑布流展示、智能搜索、分类导航、轮播广告                             |
| 用户中心       | 注册/登录（邮箱+密码）、个人信息管理、收藏夹                             |
| 商品系统       | 商品发布、多条件筛选（价格/成色/距离）、详情页（图文详情+卖家信息）      |
| 交易流程       | 购物车管理、订单生成、模拟支付、物流跟踪                                 |

### 2.2 特色功能
- 🎓 校园认证系统（学生身份验证）
- 📍 基于LBS的附近商品推荐
- 💬 内置买卖双方即时通讯
- ⏰ 课程教材季节性推荐

## 三、快速启动
### 3.1 环境准备
```bash
# 克隆项目
git clone https://github.com/yourname/youbao.git

# 安装依赖
npm install

# 数据库初始化（MySQL 5.7+）
mysql -u root -p < db/youbao_schema.sql
```

### 3.2 配置说明
修改`config/default.json`：
```json
{
  "database": {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "youbao"
  },
  "jwtSecret": "your_secret_key"
}
```

### 3.3 运行项目
```bash
# 开发模式
npm run dev

# 生产构建
gulp build
```

## 四、API接口文档
### 4.1 基础规范
- 请求根路径：`http://api.youbao.com/v1`
- 认证方式：`Authorization: Bearer <token>`

### 4.2 核心接口
#### 用户注册
```markdown
POST /auth/register
请求参数：
{
  "email": "user@example.com",
  "password": "P@ssw0rd123",
  "student_id": "20230001"  // 学号验证
}

响应示例：
{
  "code": 201,
  "message": "注册成功",
  "data": {
    "uid": 10001,
    "token": "xxxxxx"
  }
}
```

#### 商品发布
```markdown
POST /goods
Headers: 
  Authorization: Bearer xxxxxx

请求参数：
{
  "title": "二手教材-数据结构",
  "price": 35.00,
  "category": "书籍",
  "condition": 8,  // 1-10成新
  "images": ["img1.jpg", "img2.jpg"]
}
```

## 五、开发进度
### 2023.Q3
- [x] 完成首页静态页面开发
- [x] 实现JWT认证模块
- [ ] 商品搜索功能开发（进行中）

### 近期计划
1. 接入校园认证API
2. 实现WebSocket即时通讯
3. 开发移动端适配方案

## 六、项目结构
```
youbao/
├── client/            # 前端代码
│   ├── css/
│   ├── js/
│   └── index.html
├── server/            # 后端代码
│   ├── controllers/
│   ├── models/
│   └── app.js
├── docs/              # 文档
└── gulpfile.js        # 构建配置
```

