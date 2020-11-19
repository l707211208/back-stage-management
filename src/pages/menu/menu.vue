<template>
  <div>
    <el-button type="primary" @click="willadd">添加</el-button>
    <v-list :list="list" @init="init" @edit="edit"></v-list>
    <v-form :info="info" :list="list" @init="init" ref="form"></v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqMenuList } from "../../utils/http"; 
export default {
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willadd() {
      this.info.isshow = true;
      this.info.title="添加菜单"
    },
    init() {
      reqMenuList().then((res) => {
        this.list = res.data.list;
      });
    },
    edit(id){
      this.info.isshow=true
      this.info.title="编辑菜单"
      //父组件调用子组件 form.vue 的getOne()
      this.$refs.form.getOne(id)
    }
  },
  data() {
    return {
      info: {
        isshow: false,
      }, 
      list: [],
    };
   
  },
  mounted() {
    this.init();
  },
  components: {
    vList,
    vForm,
  },
};
</script>

<style scoped>
</style>