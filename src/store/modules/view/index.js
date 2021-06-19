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

const actions = {
    onResize({commit}) {
        commit("UPDATE_WIDTH");
        commit("UPDATE_HEIGHT")
    },
    setSelectedUser({commit}, payload) {
        commit("UPDATE_SELECTEDUSERNAME", payload.username);
        commit("UPDATE_SELECTEDUSERID", payload.userId);
    },
    showRequestModal({commit}, payload) {
        commit("UPDATE_REQUESTMODALTYPE", payload);
        return true;
    },
    updateIsSidebarShow({commit}, payload) {
        commit("UPDATE_ISSIDEBARSHOW", payload);
    },
    updateFileType({commit}, payload) {
        commit("UPDATE_FILETYPE", payload);
    },
    setLoading({commit}, payload) {
        commit("UPDATE_LOADING", payload);
    },
    setMediaStream({commit}, payload) {
        commit("UPDATE_MEDIASTREAM", payload);
    },
    setRemoteStream({commit}, payload) {
        commit("UPDATE_REMOTESTREAM", payload);
    },
    setCallee({commit}, payload) {
        commit("UPDATE_CALLEE", payload);
    },
    setCalling({commit}, payload) {
        commit("UPDATE_CALLING", payload);
    },
    setIncoming({commit}, payload) {
        commit("UPDATE_INCOMING", payload);
    }
};
const mutations = {
    UPDATE_WIDTH(state) {
        state.width = window.innerWidth;
    },
    UPDATE_HEIGHT(state) {
        state.height = window.innerHeight;
    },
    UPDATE_LOADING(state, payload) {
        state.loading = payload;
    },
    UPDATE_SEARCHING(state, payload) {
        state.searching = payload;
    },
    UPDATE_FILETYPE(state, payload) {
        state.fileType = payload;
    },
    UPDATE_ISSIDEBARSHOW(state, payload) {
        state.isSidebarShow = payload;
    },
    UPDATE_SELECTEDUSERNAME(state, payload) {
        state.selectedUsername = payload;
    },
    UPDATE_SELECTEDUSERID(state, payload) {
        state.selectedUserId = payload;
    },
    UPDATE_REQUESTMODALTYPE(state, payload) {
        state.requestModalType = payload
    },
    UPDATE_MEDIASTREAM(state, payload) {
        state.mediaStream = payload;
    },
    UPDATE_REMOTESTREAM(state, payload) {
        state.remoteStream = payload;
    },
    UPDATE_CALLEE(state, payload) {
        state.callee = payload;
    },
    UPDATE_CALLING(state, payload) {
        state.calling = payload;
    },
    UPDATE_INCOMING(state, payload) {
        state.incoming = payload
    }
};
const getters = {
    loading: (state) => state.loading,
    searching: (state) => state.searching,
    width: (state) => state.width,
    height: (state) => state.height,
    isSidebarShow: (state) => state.isSidebarShow,
    selectedUsername: (state) => state.selectedUsername,
    selectedUserId: (state) => state.selectedUserId,
    requestModalType: (state) => state.requestModalType,
    fileType: (state) => state.fileType,
    mediaStream: (state) => state.mediaStream,
    remoteStream: (state) => state.remoteStream,
    callee: (state) => state.callee,
    calling: (state) => state.calling,
    incoming: (state) => state.incoming
}

const view = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default view;