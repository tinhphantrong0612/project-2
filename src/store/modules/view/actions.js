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

export default actions;