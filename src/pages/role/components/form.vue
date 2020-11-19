<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{children: 'children',label: 'title'}"
          ></el-tree>
          </el-form-item>
          <el-form-item label="状态" label-width="120px">
            <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" >取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加角色'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { reqMenuList, reqRoleAdd,reqRoleDetail,   reqRoleUpdate} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    cancel() {
      this.info.isshow = false;
    },
    add() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());

      reqRoleAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    getOne(id) {
      reqRoleDetail(id).then((res) => {
        this.user = res.data.list;
        //处理树形控件的数据
        this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
        // 补id
        this.user.id = id;
        console.log(1111111);
      });
    },
    update() {
       this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdate(this.user).then(res=>{
         if (res.data.code == 200) {
          //弹成功
          successAlert("修改成功");
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //刷新list
          this.$emit("init");
        }
      })
    },
    
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
      //把树清空
      this.$refs.tree.setCheckedKeys([]);
    },
      closed(){
      if(this.info.title==='编辑角色'){
        this.empty()
      }
    }
  },
  data() {
    return {
      user: {
        rolename: "",
        menus: "",
        status: 1,
      },
      menuList: [],
    };
  },
  mounted() {
    reqMenuList().then((res) => {
      if (res.data.code == 200) {
        this.menuList = res.data.list;
      }
    });
  },
};
</script>

<style scoped>
</style>