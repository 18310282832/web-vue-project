export default {
  data() {
    return {
      userList: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      total: 0,
      addDialogVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        username: [{
          required: true,
          message: '请输入用户名称',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入用户密码',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: '请输入用户邮箱',
          trigger: 'blur'
        }],
        mobile: [{
          required: true,
          message: '请输入用户电话',
          trigger: 'blur'
        }]
      },
      /* 需要设置visible属性，它接收Boolean，当为true时显示 Dialog */
      editDialogVisible: false,
      editUserForm: {
        username: '',
        email: '',
        mobile: ''
      },
      editFormRules: {
        email: [{
          required: true,
          message: '请输入用户邮箱',
          trigger: 'blur'
        }],
        mobile: [{
          required: true,
          message: '请输入用户电话',
          trigger: 'blur'
        }]
      },
      /* 分配角色 */
      setDialogVisible: false,
      seteditInfo: {},
      rolesList: [],
      selectRolesId: ''
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const {
        data: res
      } = await this.$ajax.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) return this.$message.error('获取数据列表失败!')
      this.userList = res.data.users
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange(newCurrent) {
      this.queryInfo.pagenum = newCurrent
      this.getUserList()
    },
    addDialogClosed() {
      this.$refs.ruleForm.resetFields()
    },
    async stateChanged(id, type, user) {
      const {
        data: res
      } = await this.$ajax.put(`users/${id}/state/${type}`)
      if (res.meta.status !== 200) {
        this.$message.error('设置状态信息失败!')
        user.mg_state = !user.mg_state
        this.getUserList()
      }
    },
    /* 添加用户 */
    addUser() {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return
        const {
          data: res
        } = await this.$ajax.post('users', this.addUserForm)
        if (res.meta.status !== 201) return this.$message.error('添加用户失败!')
        this.$message.success('添加用户成功!')
        this.addDialogVisible = false
        this.getUserList()
      })
    },
    /* 清空表单内容 */
    editDialogClosed() {
      this.$refs.editRuleForm.resetFields()
    },
    /* 编辑用户 */
    async editUserList(id) {
      const {
        data: res
      } = await this.$ajax.get('users/' + id)
      if (res.meta.status !== 200) return this.$message.error('查询用户信息失败！!')
      this.editUserForm = res.data
      this.editDialogVisible = true
    },
    /* 验证编辑表单内容 */
    saveUserInfo() {
      this.$refs.editRuleForm.validate(async valid => {
        const {
          data: res
        } = await this.$ajax.put('users/' + this.editUserForm.id, {
          email: this.editUserForm.email,
          mobile: this.editUserForm.mobile
        })
        if (res.meta.status !== 200) return this.$message.error('更新失败!')
        this.$message.success('更新成功!')
        this.getUserList()
        this.editDialogVisible = false
      })
    },
    /* 删除用户 */
    async remove(id) {
      const result = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (result === 'cancel') return this.$message.info('取消删除!')
      const {
        data: res
      } = await this.$ajax.delete('users/' + id)
      if (res.meta.status !== 200) return this.$message.error('删除失败!')
      this.$message.success('删除成功!')
      if (this.userList.length === 1 && this.queryInfo.pagenum > 1) {
        this.queryInfo.pagenum--
      }
      this.getUserList()
    },
    /* 分配角色 */
    async showSetRoleDialog(info) {
      this.setDialogVisible = true
      this.seteditInfo = info
      const {
        data: res
      } = await this.$ajax.get('/roles')
      if (res.meta.status !== 200) return this.$message.error('获取角色信息失败!')
      this.rolesList = res.data
    },
    async setRoleName() {
      if (!this.selectRolesId) return this.$message.info('请输入要分配的角色!')
      const {
        data: res
      } = await this.$ajax.put('users/' + this.seteditInfo.id + '/role', {
        rid: this.selectRolesId
      })
      if (res.meta.status !== 200) return this.$message.error('分配角色失败!')
      this.$message.success('分配角色成功!')
      this.getUserList()
      this.setDialogVisible = false
    }
  }
}
