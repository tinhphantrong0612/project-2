<template>
    <div class="content-header d-flex justify-content-between p-1">
        <span v-if="!otherId" class="m-auto text-2xl"
            >Select a contact to open conversation</span
        >
        <div
            v-if="otherId"
            class="content-header-user d-flex media align-items-center"
        >
            <figure class="mt-0 mb-0 avatar-container pl-0 ml-2 mr-2">
                <img
                    class="target-avatar rounded-circle"
                    :src="'/api/src/assets/avatar/' + otherName"
                    onerror="this.src='/src/assets/avatar/default.png'"
                />
            </figure>
            <div>
                <h5 class="media-body">{{ otherName }}</h5>
            </div>
        </div>
        <div class="content-header-function pr-3 d-flex">
            <ul class="list-inline d-flex m-auto">
                <li
                    v-if="otherId && otherType == 'user'"
                    class="list-inline-item"
                >
                    <button
                        type="button"
                        class="function-button btn m-auto"
                        @click="call()"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            class="bi bi-telephone-fill"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                            />
                        </svg>
                    </button>
                </li>
                <li
                    v-if="otherId && otherType == 'user'"
                    class="list-inline-item"
                >
                    <button
                        type="button"
                        class="function-button btn"
                        @click="unfriend()"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            class="bi bi-person-x-fill"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
                            />
                        </svg>
                    </button>
                </li>
                <li
                    v-if="otherId && otherType == 'group'"
                    class="list-inline-item"
                >
                    <button
                        type="button"
                        class="function-button btn"
                        @click="addToGroup()"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            class="bi bi-person-plus-fill"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                            />
                            <path
                                fill-rule="evenodd"
                                d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                            />
                        </svg>
                    </button>
                </li>
                <li
                    v-if="otherId && otherType == 'group'"
                    class="list-inline-item"
                >
                    <button
                        type="button"
                        class="function-button btn"
                        @click="leaveGroup()"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            class="bi bi-box-arrow-right"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                            />
                            <path
                                fill-rule="evenodd"
                                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                            />
                        </svg>
                    </button>
                </li>
                <li class="list-inline-item d-md-none">
                    <button
                        ref="sidebarToggle"
                        type="button"
                        class="menu-button function-button btn"
                        @click="updateIsSidebarShow()"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#sidebar-offcanvas"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            fill="currentColor"
                            class="bi bi-list"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                            />
                        </svg>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContentHeader',
    data() {
        return {
            iceConfig: {
                iceServers: [{ url: 'stun:stun.jap.bloggernepal.com:5349' }],
            },
            peerConnection: null,
            remoteDescription: null,
            candidateQueue: [],
        }
    },
    async created() {
        this.$socket.on('candidate', (data) => {
            var candidate = new RTCIceCandidate({
                sdpMLineIndex: data.rtcMessage.label,
                candidate: data.rtcMessage.candidate,
            })
            if (this.peerConnection) {
                this.peerConnection.addIceCandidate(candidate)
            } else {
                this.candidateQueue.push(candidate)
            }
        })
        this.$socket.on('offer', (data) => {
            if (this.calling) {
                this.reject({ from: this.userId, to: data.from })
            }
            var friend = {}
            for (var i = 0; i < this.friends.length; i++) {
                if (this.friends[i].userId == data.from) {
                    friend = this.friends[i]
                    break
                }
            }
            if (friend) {
                this.$store.dispatch('view/setIncoming', true)
                this.$store.dispatch('view/setCallee', {
                    userId: friend.userId,
                    username: friend.username,
                })
                this.remoteDescription = data.description
                this.$emitter.emit('toggleModal', 'incoming')
            } else {
                this.reject({ from: this.userId, to: data.from })
            }
        })

        this.$socket.on('reject', (data) => {
            if (!this.calling || data.from != this.otherId) {
                return
            } else {
                this.$emitter.emit('beingReject')
                this.remoteDescription = null
            }
        })

        this.$socket.on('answer', (data) => {
            if (!this.calling || data.from != this.otherId) {
                return
            } else {
                this.peerConnection.setRemoteDescription(
                    new RTCSessionDescription(data.description)
                )
            }
        })

        this.$socket.on('stop', (data) => {
            if (
                (!this.calling && !this.incoming) ||
                (this.calling && data.from != this.otherId)
            ) {
                return
            } else {
                this.remoteDescription = null
                this.$emitter.emit('stop')
            }
        })

        this.$emitter.on('endCall', () => {
            this.$socket.emit('stop', {
                from: this.userId,
                to: this.callee.userId,
            })
            this.$store.dispatch('view/setCallee', {});
            this.remoteDescription = null
            this.$store.dispatch('view/setCalling', false)
            this.$store.dispatch('view/setIncoming', false)
            this.$store.dispatch('view/setLoading', false);
            if (this.mediaStream)
                for (const track of this.mediaStream.getTracks()) track.stop()
            this.$store.dispatch('view/setMediaStream', null)
            this.$store.dispatch('view/setRemoteStream', null)
            if (this.peerConnection) this.peerConnection.close()
            this.peerConnection = null
            this.$emitter.emit('toggleModal', '')
        })

        this.$emitter.on('reject', () => {
            this.$store.dispatch('view/setIncoming', false)
            this.$emitter.emit('toggleModal', '')
            this.remoteDescription = null
            this.reject({ from: this.userId, to: this.callee.userId })
        })

        this.$emitter.on('answer', () => {
            this.$store.dispatch('view/setIncoming', false)
            this.answer()
        })
    },
    computed: {
        userId() {
            return this.$store.getters['user/userId']
        },
        username() {
            return this.$store.getters['user/username']
        },
        otherId() {
            return this.$store.getters['conversation/otherId']
        },
        otherName() {
            return this.$store.getters['conversation/otherName']
        },
        otherType() {
            return this.$store.getters['conversation/otherType']
        },
        conversationId() {
            return this.$store.getters['conversation/conversationId']
        },
        width() {
            return this.$store.getters['view/width']
        },
        isSidebarShow() {
            return this.$store.getters['view/isSidebarShow']
        },
        mediaStream() {
            return this.$store.getters['view/mediaStream']
        },
        friends() {
            return this.$store.getters['user/friends']
        },
        calling() {
            return this.$store.getters['view/calling']
        },
        incoming() {
            return this.$store.getters['view/incoming']
        },
        callee() {
            return this.$store.getters['view/callee']
        },
    },
    methods: {
        async unfriend() {
            await this.$store.dispatch('user/unfriend', {
                fromId: this.userId,
                from: this.username,
                toId: this.otherId,
                to: this.otherName,
                conversationId: this.conversationId,
            })
            this.$store.dispatch('user/getFriends')
        },
        async leaveGroup() {
            await this.$store.dispatch('user/leaveGroup', {
                fromId: this.userId,
                from: this.username,
                conversationId: this.conversationId,
            })
            this.$store.dispatch('user/getGroups', { fromId: this.userId })
        },
        addToGroup() {
            this.$emitter.emit('toggleModal', 'add')
        },
        async call() {
            try {
                this.$store.dispatch('view/setLoading', true)
                this.beReady().then((bool) => {
                    if (bool) {
                        this.$store.dispatch('view/setCalling', true)
                        this.$store.dispatch('view/setCallee', {
                            userId: this.otherId,
                            username: this.otherName,
                        })
                        this.$emitter.emit('toggleModal', 'calling')
                        this.$emitter.emit('gotUserMedia')
                        this.processCall()
                    }
                    this.$store.dispatch('view/setLoading', false)
                })
            } catch (error) {
                alert(error)
                this.$store.dispatch('view/setLoading', false)
            }
        },
        async answer() {
            try {
                this.$store.dispatch('view/setLoading', true)
                this.beReady().then((bool) => {
                    if (bool) {
                        this.$store.dispatch('view/setCalling', true)
                        this.$emitter.emit('toggleModal', 'calling')
                        this.$emitter.emit('gotUserMedia')
                        this.processAnswer()
                    }
                    this.$store.dispatch('view/setLoading', false)
                })
            } catch (error) {
                alert(error)
                this.reject({
                    from: this.userId,
                    to: this.callee.userId,
                })
                this.$store.dispatch('view/setLoading', false)
            }
        },
        reject(data) {
            this.$socket.emit('reject', {
                from: data.from,
                to: data.to,
            })
        },
        async createConnectionAndAddStream() {
            this.createPeerConnection()
            if (this.mediaStream)
                for (const track of this.mediaStream.getTracks())
                    this.peerConnection.addTrack(track, this.mediaStream)
            return true
        },
        async createPeerConnection() {
            try {
                this.peerConnection = new RTCPeerConnection(this.iceConfig)
                this.peerConnection.onicecandidate = this.handleIceCandidate
                this.peerConnection.ontrack = this.handleRemoteTrack
                return
            } catch (error) {
                alert(error)
                return
            }
        },
        handleIceCandidate(event) {
            if (event.candidate) {
                this.$socket.emit('candidate', {
                    from: this.userId,
                    to: this.otherId,
                    rtcMessage: {
                        label: event.candidate.sdpMLineIndex,
                        id: event.candidate.sdpMid,
                        candidate: event.candidate.candidate,
                    },
                })
            }
        },
        handleRemoteTrack(event) {
            this.$store.dispatch('view/setRemoteStream', event.streams[0])
            this.$emitter.emit('gotRemoteMedia')
        },
        async beReady() {
            try {
                let mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                })
                this.$store.dispatch('view/setMediaStream', mediaStream)
                return this.createConnectionAndAddStream()
            } catch (error) {
                alert('Can not get user media: ' + error.name)
                return false
            }
        },
        processCall() {
            this.peerConnection.createOffer(
                (sessionDecription) => {
                    this.peerConnection.setLocalDescription(sessionDecription)
                    this.$socket.emit('offer', {
                        from: this.userId,
                        to: this.otherId,
                        description: sessionDecription,
                    })
                },
                (error) => {
                    alert('Error: ' + error.name)
                }
            )
        },
        processAnswer() {
            this.peerConnection.setRemoteDescription(
                new RTCSessionDescription(this.remoteDescription)
            )
            this.peerConnection.createAnswer(
                (sessionDescription) => {
                    this.peerConnection.setLocalDescription(sessionDescription)
                    while (this.candidateQueue.length > 0) {
                        this.peerConnection
                            .addIceCandidate(this.candidateQueue.shift())
                            .catch((error) => alert(error))
                    }
                    this.$socket.emit('answer', {
                        from: this.userId,
                        to: this.callee.userId,
                        description: sessionDescription,
                    })
                },
                (error) => {
                    this.reject({
                        from: this.userId,
                        to: this.callee.userId,
                    })
                    alert('Error: ' + error.name)
                }
            )
        },
        updateIsSidebarShow() {
            if (this.isSidebarShow)
                this.$store.dispatch('view/updateIsSidebarShow', false)
            else this.$store.dispatch('view/updateIsSidebarShow', true)
        },
    },
    watch: {
        width() {
            if (this.width > 768 && this.isSidebarShow) {
                this.$refs.sidebarToggle.click()
            }
        },
    },
}
</script>

<style scoped>
.content-header {
    height: 60px;
    border-width: 1px !important;
    border: #3d4559 solid;
    border-bottom: 0px;
    border-left: 0px;
    border-top: 0px;
    border-right: 0px;
}

@media (max-width: 768px) {
    .content-header {
        position: fixed;
        top: 0;
        width: 100%;
    }
}

.content-header .target-contact {
    width: 4rem;
    height: 100%;
}

.content-header .avatar-container > img {
    height: 3rem;
    width: 3rem;
    object-fit: contain;
    border: green 1px solid;
}

.content-header .function-button {
    background-color: transparent;
    color: white;
    border: 1px #3d4559 solid;
    outline: none;
    box-shadow: none;
    border-radius: 1rem;
}

.content-header .function-button:hover {
    background-color: #3d4559;
}
</style>