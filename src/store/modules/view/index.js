import actions from './actions'
import mutations from './mutations'
import getters from './getters'
const state = {
    loading: false,
    searching: false,
    calling: false,
    incoming: false,
    fileType: '',
    isSidebarShow: false,
    width: window.innerWidth,
    height: window.innerHeight,
    selectedUsername: '',
    selectedUserId: '',
    requestModalType: '',
    callee: {},
    mediaStream: null,
    remoteStream: null
};

const view = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default view;