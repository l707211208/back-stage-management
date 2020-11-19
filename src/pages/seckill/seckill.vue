<template>
  <div>
    <el-button type="primary">添加</el-button>
    <v-list :info="info"></v-list>
    <v-form :info="info"></v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
export default {
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
  },
  data() {
    return {
      info: {
        isshow: true,
        title: "添加活动",
      },
    };
  },
  mounted() {},
  components: {
    vList,
    vForm,
  },
};
</script>

<style scoped>
</style>