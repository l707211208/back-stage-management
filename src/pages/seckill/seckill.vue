<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-list  @edit="edit"></v-list>
   

    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
export default {
  components: {
    vList,
    vForm,
  },
  data() {
    return {
      info: {
        isshow: false,
        title: "添加活动",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
}),
    willAdd() {
      this.info = {
        isshow: true,
        title: "添加活动",
      };
    },
  
    edit(id) {
      this.info = {
        isshow: true,
        title: "修改活动",
      };
      this.$refs.form.getOne(id);
    }, 
  },

  mounted() {
 
  },
};
</script>

<style scoped>
</style>