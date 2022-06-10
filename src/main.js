import Vue from 'vue'
import App from './App'
import request from './utils/request'

Vue.prototype.$http = request 

// import { uniBadge } from '@dcloudio/uni-ui'

// Vue.use(uniBadge)

Vue.config.productionTip = false

Vue.prototype.request = request;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()