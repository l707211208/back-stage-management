<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-list :list="list" @init="init" @edit="edit"></v-list>

    <v-form :info="info" @init="init" @edit="edit" ref="form"></v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqRoleList } from "../../untils/http";
export default {
  components: {
    vList,
    vForm,
  },
  data() {
    return {
      info: {
        isshow: false,
        title: "添加角色",
      },
      list: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info = {
        isshow: true,
        title: "添加角色",
      };
    },
    init() {
      reqRoleList().then((res) => {
        this.list = res.data.list;
      });
    },
    edit(id) {
      this.info = {
        isshow: true,
        title: "编辑角色",
      };
      this.$refs.form.getOne(id);
    },
  },

  mounted() {
    this.init();
  },
};
</script>

<style scoped>
</style>