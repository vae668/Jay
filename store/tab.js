import Cookie from "js-cookie"
// import router from "../router"
export default {
    state:{
        // 头部展开合并的数据绑定
    isCollapse: false,
    // 面包屑默认初始值
        tabsList:[
            {
                path:'/',
                name: 'home',
                label:'首页',
                icon:'home'
            }
        ],
        currentMenu:null,
        menu:[]
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse=!state.isCollapse
        },
        selectMenu(state,val){
            // 如果传递进来的home不是本身的home,那么就需要给currentMenu重新赋值
            if(val.name !== 'home'){
                state.currentMenu=val
                // 判断本身的name属性，和传递的进的那么是不是相等，相等那么证明它存在
               const result= state.tabsList.findIndex(item=>item.name === val.name)
               // 如果result的还在等于-1那么它不存在，那么只有它不存在的时候才会往tabsList里面添加数据进去
               if(result === -1){
                // 把数据往tabList里面添加
                    state.tabsList.push(val)
               }
            }else{
                state.currentMenu=null
            }
        },
        /**
     * 找到当前标签，把他删除掉
     * 当前的name属性和当前传递进来的name属性一样
     * 如果能找到索引它是等于-1相当于没找到，大于0就是找到了，找到以后利用splice删除掉当前的索引
     */
        closeTag(state, val) {
          const result=state.tabsList.findIndex(item=>item.name === val.name)
           state.tabsList.splice(result,1) 
        },
        setMenu(state, val) {
            state.menu = val;
            Cookie.set('menu',JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu= []
            Cookie.remove('menu')
        },
        addMenu(state,router){
            if(!Cookie.get('menu')){
                return 
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children=item.children.map(item=>{
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            //路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main',item)
            })
        }
    }
}