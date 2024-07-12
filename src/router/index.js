import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

import Index from '~/pages/HomePage/home.vue'
import View from '~/pages/view/view.vue'
import Cluster from '~/pages/cluster/cluster.vue'
import Helps from '~/pages/help.vue'
import About from '~/pages/about.vue'
import NotFound from '~/pages/404.vue'
import ClView from '~/pages/cluster/cluster-view.vue'

const routes = [{
  path:"/",
  component:Index
},{
  path:"/view",
  component:View
},,{
  path:"/cluster",
  component:Cluster
},{
  path:"/cluster-view",
  component:ClView
}
,{
  path:"/helps",
  component:Helps
},
{
  path:"/about",
  component:About
},{
  path: '/:pathMatch(.*)*', 
  name: 'NotFound', 
  component: NotFound 
}
]
const router = createRouter({
  history: createWebHashHistory(),
   routes, // `routes: routes` 的缩写
})

export default router