<template>
  <div>
    <v-list @edit="edit" :info="info" @init="init" :list="list"></v-list>
    <v-form ref="form" :info="info" @init="init"></v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqMemberList } from '../../untils/http';
export default {
  components: {
    vList,
    vForm,
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    edit(uid) {
      this.info = {
        isshow: true,
        title: "会员修改",
      };
      this.$refs.form.getOne(uid);
    },
    init(uid){
      reqMemberList(uid).then(res=>{
      
        this.list=res.data.list
      })
    }
  },
  data() {
    return {
      info:{
        isshow:false
      },
      list:[]
    };
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
</style>