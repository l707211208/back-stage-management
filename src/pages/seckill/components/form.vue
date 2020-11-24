<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user" :rules="rules">
        <el-form-item label="活动名称" label-width="120px" prop="title">
          <el-input v-model="user.title" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="120px" prop="goodsname">
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
          <el-select placeholder="请选择一级分类" v-model="user.first_cateid" @change="changeFirst">
            <!-- <el-option :value="1" label="家用电器"></el-option> -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select placeholder="请选择二级分类" v-model="user.second_cateid" @change="changeSecond">
            <!-- <el-option :value="1" label="洗衣机"></el-option> -->
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="120px" prop="second_cateid">
          <el-select placeholder="请选择商品" v-model="user.goodsid">
            <!-- <el-option :value="1" label="家用电器"></el-option> -->
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :value="item.id"
              :label="item.goodsname"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加活动'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import { mapActions, mapGetters } from "vuex";
import {
  reqgoodsList,
  reqcateList,
  reqseckAdd,
  reqseckDetail,
  reqseckList,
  reqseckUpdate,
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      // 请求规格列表
      reqCateList: "cate/reqList",
      reqseckList: "seck/reqList",
    }),
    getTime() {
      this.user.begintime = Date.parse(this.value[0]) / 1000;
      this.user.endtime = Date.parse(this.value[1]) / 1000;
    },
    format(timer) {
      //timer是整数，否则要parseInt转换
      var time = new Date(timer * 1000);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return new Date(y, m, d, h, mm);
    },
    getDate() {
      this.value[0] = this.format(this.user.begintime);
      this.value[1] = this.format(this.user.endtime);
    },

    cancel() {
      this.info.isshow = false;
    },
    // 根据一级分类 获取2级分类列表数据
    changeFirst() {
      this.user.second_cateid = "";
      this.getSecondList();
    },
    changeSecond() {
      this.user.goodsid = "";
      this.getgoodsList();
    },

    // 获取2级分类
    getSecondList() {
      reqcateList({ pid: this.user.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },
    // 根据2级分类，获取商品
    getgoodsList() {
      reqgoodsList({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid,
      }).then((res) => {
        this.goodsList = res.data.list;
      });
    },
    add() {
      this.getTime();
      this.check().then(() => {
        reqseckAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert("添加成功");
            this.empty();
            this.cancel();
            this.reqseckList();
          }
        });
      });
    },
    // 获取指定一条数据
    getOne(id) {
      reqseckDetail(id).then((res) => {
        this.user = res.data.list;
        this.getSecondList();
        this.getgoodsList();
      });
    },
    // 修改
    update() {
      this.getTime();
      this.check().then(() => {
        reqseckUpdate(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert("修改成功");
            this.getSecondList();
            this.getgoodsList();
            this.cancel();
            this.empty();
            this.reqseckList();
          }
        });
      });
    },

    // 清空
    empty() {
      this.user = {
        title: "",
        first_cateid: "",
        begintime: "",
        endtime: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      //二级分类的list
      this.secondCateList = [];

      this.goodsList = [];
    },

    closed() {
      if (this.info.title === "修改活动") {
        this.empty();
      }
    },

    //封装验证方法
    check() {
      return new Promise((resolve, reject) => {
        if (this.user.title === "") {
          errorAlert("活动名称不能为空");
          return;
        }

        resolve();
      });
    },
  },
  //  定义空的原始数据
  data() {
    return {
      user: {
        title: "",
        first_cateid: "",
        begintime: "",
        endtime: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      secondCateList: [],
      goodsList: [],
      value: [],

      rules: {
        title: [
          { required: true, message: "请输入一级分类", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.reqCateList();
  },
};
</script>

<style>
</style>