<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" label-width="120px" v-if="form.type===1">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="120px" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in routes"
              :key="item.path"
              :label="item.name+'--/'+item.path"
              :value="'/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" >取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title==='添加菜单'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
      {{form}}
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { routes } from "../../../router/index";
import { reqMenuAdd ,reqMenuUpdate,reqMenuDetail} from "../../../untils/http";
import { successAlert, errorAlert } from "../../../untils/alert";
export default {
  props: ["info", "list"],
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    cancel() {
      this.info.isshow = false;
    },
    changePid() {
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      };
    },
    getOne(id) {
      reqMenuDetail(id).then((res) => {
        //此时form上是没有id的
        this.form = res.data.list;
        //补id
        this.form.id = id;
      });
    },
    add() {
      reqMenuAdd(this.form).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    update() {
      reqMenuUpdate(this.form).then((res) => {
        if (res.data.code === 200) {
          //成功弹框
          successAlert("修改成功");
          //弹框消失
          this.cancel();
          //form重置
          this.empty();
          //列表刷新
          this.$emit("init");
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    closed(){
    // 如果是添加出现，点击了取消，此时，什么都不做
    // 如果是编辑出现，点击了取消，form置空
    if(this.info.title==="编辑菜单"){
        this.empty()
    }
}
  },
  data() {
    return {
      // 定义routes
      routes: routes,
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      },
      icons: ["el-icon-eleme", "el-icon-user-solid", "el-icon-s-tools"],
    };
  },
  mounted() {},
};
</script>

<style scoped>
</style>