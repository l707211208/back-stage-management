<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="user.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px" v-for="(item,index) in attrArr" :key="index">
          <div class="line">
            <el-input v-model="item.value" autocomplete="off"></el-input>
            <el-button type="primary" v-if="index===0" @click="addAttr">新增规格属性</el-button>
            <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加规格'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import { mapActions, mapGetters } from "vuex";
import {
  reqRoleList,
  reqspecsAdd,
  reqspecsDetail,
  reqspecsUpdate,
} from "../../../untils/http";
import { successAlert, errorAlert } from "../../../untils/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqCount: "specs/reqCount",
    }),
    // 新增规格属性
    addAttr() {
      this.attrArr.push({ value: "" });
    },

    // 删除属性
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    cancel() {
      this.info.isshow = false;
    },

    //  添加规格
    add() {
      // map返回数组 再转字符串
      this.user.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqspecsAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹成功
          successAlert("添加成功");
          this.cancel();
          this.empty();
          this.reqList();
          this.reqCount;
        }
      });
    },
    getOne(id) {
      reqspecsDetail(id).then((res) => {
        this.user = res.data.list[0];

        this.attrArr = JSON.parse(this.user.attrs).map((item) => ({
          value: item,
        }));
      });
    },
    update() {
      this.user.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqspecsUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹成功
          successAlert("修改成功");
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //刷新list
          this.reqList();
        }
      });
    },
    // 清空
    empty() {
      this.user = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [{ value: "" }];
    },
    closed() {
      if (this.info.title === "编辑分类") {
        this.empty();
      }
    },
  },
  data() {
    return {
      user: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      attrArr: [{ value: "" }],
    };
  },
  mounted() {
    reqRoleList().then((res) => {
      if (res.data.code == 200) {
        this.roleList = res.data.list;
      }
    });
  },
};
</script>

<style scoped >
.line {
  display: flex;
}
.line .el-input {
  flex: 1;
}
.line .el-button {
  width: auto;
}
</style>