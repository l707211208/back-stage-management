<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="120px">
          <el-select placeholder="请选择分类" v-model="user.pid">
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px" v-if="user.pid!==0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加分类'">添 加</el-button>
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
  reqcateAdd,
  reqcateDetail,
  reqcateUpdate,
} from "../../../untils/http";
import { successAlert ,errorAlert} from "../../../untils/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
    cancel() {
      this.info.isshow = false;
    },
    // element-ui
    changeFile(e) {
        console.log(e);
      let file = e.raw;
      this.imgUrl = URL.createObjectURL(file);

      this.user.img = file;

      //判断文件大小
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件大小不能超过2M");
        return;
      }

      //判断文件类型
      let extname = path.extname(file.name);
      let arr = [".jpg", ".jpeg", ".png", ".gif"];
      if (!arr.includes(extname)) {
        errorAlert("请上传正确的图片格式！");
        return;
      }
    },
    add() {
      reqcateAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹成功
          successAlert("添加成功");
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
    getOne(id) {
      reqcateDetail(id).then((res) => {
        this.user = res.data.list;
        this.imgUrl = this.$imgpre + this.user.img;
        this.user.id = id;
      });
    },
    update() {
      reqcateUpdate(this.user).then((res) => {
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

    empty() {
        console.log(11111111);
      this.user = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
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
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
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

<style scoped lang="stylus">
.box >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>