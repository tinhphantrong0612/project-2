import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { io } from 'socket.io-client'
import mitt from 'mitt'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
let app = createApp(App);
app.config.globalProperties.$io = io;
app.config.globalProperties.$emitter = mitt();
app.config.globalProperties.$connectSocket = function() {
    app.config.globalProperties.$socket = app.config.globalProperties.$io('https://' + window.location.hostname + ':8888/', { forceNew: true})
}
app.config.globalProperties.$disconnectSocket = function() {
    app.config.globalProperties.$socket.disconnect();
}

app.use(router).use(store).mount('#app');