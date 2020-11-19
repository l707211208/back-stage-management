<template>
  <div>
    <el-dialog :title="user.status" :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="user.status" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" label-width="120px">
         
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            ></el-date-picker>
        
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
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],

  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
  },
  data() {
    return {
      user: {
        isshow: true,
        status: 1,
      },
    };
  },
  mounted() {},
  components: {},
};
</script>

<style scoped>
</style>