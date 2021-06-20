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

export default getters;