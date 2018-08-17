<template>
  <div>
    <!-- 头部面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 按钮 -->
      <el-button type="primary" @click="addDialogVisible= true">添加角色</el-button>
      <!-- 表格 -->
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-row v-for="(item1,i1) in scope.row.children" :key="item1.id" :style="{ 'border-bottom': '1px solid #eee','border-top': i1 === 0 ? '1px solid #eee' : ''}">
                <el-col :span="5">
                  <el-tag closable @close="removeRights(scope.row,item1.id)">{{item1.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="19">
                  <el-row v-for="(item2,i2) in item1.children" :key="item2.id" :style="{'border-top': i2 === 0 ? '' : '1px solid #eee'}">
                    <el-col :span="6">
                      <el-tag closable @close="removeRights(scope.row,item2.id)" type="success">{{item2.authName}}</el-tag>
                      <i class="el-icon-caret-right "></i>
                    </el-col>
                    <el-col :span="18 ">
                      <el-tag closable @close="removeRights(scope.row,item3.id)" v-for="(item3) in item2.children " :key="item3.id " type="warning ">{{item3.authName}}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditRoleList(scope.row.id)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click=" removeRoles(scope.row.id)">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <el-form :model="addRolesForm" :rules="addRules" ref="addRuleForm" label-width="100px " class="demo-ruleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRolesForm.roleName "></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRolesForm.roleDesc "></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑角色列表 -->
    <el-dialog title="修改角色" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editRolesForm" :rules="editRules" ref="editRuleForm" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="editRoleList">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="showSetdialogVisible" width="50%">
      <el-tree ref="tree" :data="rightTree" :props="treeprop" show-checkbox node-key="id" :default-checked-keys="defaultCheckedKey" default-expand-all>
      </el-tree>
      <span slot="footer">
        <el-button @click="showSetdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mixins from './Roles-mixins.js'
export default mixins
</script>
<style>
.el-tag {
  margin: 10px 5px;
}
.el-row {
  display: flex;
  align-items: center;
}
</style>
