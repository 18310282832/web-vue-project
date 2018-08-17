<template>
  <div class="login-container">
    <div class="cont-box">
      <div class="img-box">
        <img src="../assets/images/logo.png" alt="">
      </div>
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password">
            <i slot="prefix" class="iconfont icon-3702mima"></i>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :offset="15">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="danger" @click="resetForm">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs.loginForm.resetFields()
    },
    login() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$ajax.post('login', this.loginForm)
        console.log(res)
        if (res.meta.status !== 200) {
          this.$message.error('登录失败!')
          window.sessionStorage.removeItem('token')
        }
        this.$message.success('登录成功!')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
  overflow: hidden;
}
.cont-box {
  width: 450px;
  height: 320px;
  background-color: #ffffff;
  border-radius: 4px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.img-box {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 8px;
  position: absolute;
  left: 50%;
  top: -65px;
  transform: translateX(-50%);
  box-shadow: 0 0 10px #ccc;
}
.img-box img {
  width: 100%;
  height: 100%;
  background-color: #eee;
  border-radius: 50%;
}
.el-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 15px 15px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
