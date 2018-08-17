export default {
  data() {
    return {
      rolesList: [],
      addDialogVisible: false,
      /* 添加角色 */
      addRolesForm: {
        roleName: '',
        roleDesc: ''
      },
      addRules: {
        roleName: [{
          required: true,
          message: '请输入角色名称 ',
          trigger: 'blur'
        }],
        roleDesc: [{
          required: true,
          message: '请输入角色名称 ',
          trigger: 'blur'
        }]
      },
      editDialogVisible: false,
      /* 编辑角色 */
      editRolesForm: {
        roleName: '',
        roleDesc: ''
      },
      editRules: {
        roleName: [{
          required: true,
          message: '请输入角色名称 ',
          trigger: 'blur'
        }],
        roleDesc: [{
          required: true,
          message: '请输入角色名称 ',
          trigger: 'blur'
        }]
      },
      /* 分配权限的对话框 */
      showSetdialogVisible: false,
      rightTree: [],
      treeprop: {
        label: 'authName',
        children: 'children'
      },
      defaultCheckedKey: [],
      roleId: ''
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      const {
        data: res
      } = await this.$ajax.get('/roles')
      if (res.meta.status !== 200) return this.$message.error('获取角色列表失败!')
      this.rolesList = res.data
    },
    addDialogClosed() {
      this.$refs.addRuleForm.resetFields()
    },
    /* 添加角色ajax请求 */
    async addRoles() {
      const {
        data: res
      } = await this.$ajax.post('/roles', this.addRolesForm)
      if (res.meta.status !== 201) return this.$message.error('添加角色失败!')
      this.$message.success('添加成功!')
      this.getRolesList()
      this.addDialogVisible = false
    },
    editDialogClosed() {
      this.$refs.editRuleForm.resetFields()
    },
    /* 根据id获取编辑角色的内容 */
    async showEditRoleList(id) {
      this.editDialogVisible = true
      const {
        data: res
      } = await this.$ajax.get('/roles/' + id)
      this.editRolesForm = res.data
    },
    /* 编辑角色 */
    editRoleList(id) {
      this.$refs.editRuleForm.validate(async valid => {
        if (!valid) return
        const {
          data: res
        } = await this.$ajax.put('/roles/' + this.editRolesForm.roleId, {
          roleName: this.editRolesForm.roleName,
          roleDesc: this.editRolesForm.roleDesc
        })
        if (res.meta.status !== 200) return this.$message.error('编辑角色失败!')
        this.$message.success('编辑列表成功!')
        this.getRolesList()
        this.editDialogVisible = false
      })
    },
    /* 删除角色 */
    async removeRoles(id) {
      const result = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (result === 'cancel') return this.$message.info('取消删除! ')
      const {
        data: res
      } = await this.$ajax.delete('/roles/' + id)
      if (res.meta.status !== 200) return this.$message.error('删除失败!')
      this.$message.success('删除角色成功！')
      this.getRolesList()
    },
    /* 删除角色指定权限 */
    async removeRights(role, rightId) {
      const result = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (result === 'cancel') return this.$message.info('取消删除!')
      const {
        data: res
      } = await this.$ajax.delete(`roles/${role.id}/rights/${rightId}`)
      if (res.meta.status !== 200) return this.$message.error('删除角色权限失败!')
      role.children = res.data
    },
    /* 分配角色 */
    async showSetRightDialog(role) {
      this.roleId = role.id
      this.showSetdialogVisible = true
      const {
        data: res
      } = await this.$ajax.get('rights/tree')
      this.rightTree = res.data
      const keys = []
      this.getleafId(role, keys)
      this.defaultCheckedKey = keys
    },
    getleafId(node, keyArr) {
      if (!node.children) {
        return keyArr.push(node.id)
      }
      node.children.forEach(item => this.getleafId(item, keyArr))
    },
    /* 点击按钮分配权限 */
    async saveRights() {
      const k1 = this.$refs.tree.getCheckedKeys()
      const k2 = this.$refs.tree.getHalfCheckedKeys()
      const k3 = [...k1, ...k2].join(',')
      const {
        data: res
      } = await this.$ajax.post(`roles/${this.roleId}/rights`, {
        rids: k3
      })
      if (res.meta.status !== 200) return this.$message.error('分配角色权限失败!')
      this.$message.success('分配权限成功!')
      this.getRolesList()
      this.showSetdialogVisible = false
    }
  }
}
