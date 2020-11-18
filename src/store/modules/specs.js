import { reqspecsList,reqspecsCount } from "../../untils/http"
const state = {
    //分类list
    list: [],
    page: 1,
    size: 2,
    total: 0
}

const mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr;
    },
    changeTotal(state,num) {
        state.total = num;
    },
    changePage(state, page) {
        state.page = page;
    }
}

const actions = {
    //发起请求
    reqList(context) {
        //发请求，成功之后，修改list
        reqspecsList({ page: context.state.page, size: context.state.size }).then(res => {
            let list = res.data.list ? res.data.list : []

            if (list.length == 0 && context.state.page > 1) {
                context.commit("changePage", context.state.page - 1)
                context.dispatch("reqList");
                return;
            }

            list.forEach(item => {
                item.attrs = JSON.parse(item.attrs)
            })
            context.commit("changeList", list)
        })
    },

    // 总数
    reqCount(context){
        reqspecsCount().then(res=>{
            context.commit("changeTotal",res.data.list[0].total)
        })
    },
    changePage(context,page){
        // 翻页 
        context.commit("changePage",page)
        //重新请求数据
        context.dispatch("reqList")
    }
}

const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    }, 
    size(state) {
        return state.size
    },

}

export default {
    state, mutations, getters, actions,
    namespaced: true
}