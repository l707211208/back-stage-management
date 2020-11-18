<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="用户编号"></el-table-column>
      <el-table-column prop="username" label="用户名称"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <del-btn @confirm="del(scope.row.uid)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {reqUserDel} from "../../../untils/http" 
import {successAlert} from "../../../untils/alert"
export default {
  props:["list"],
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    
   del(uid) {
    
      reqUserDel(uid).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
      // 通知父组件刷新
          this.$emit("init");
        }
      });
    },
    edit(uid){
       this.$emit("edit",uid)
    }
  },

  mounted() {},
};
</script>

<style scoped>
</style>