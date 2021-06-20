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

export default mutations;