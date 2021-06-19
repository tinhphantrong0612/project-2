<template>
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="requestModal">Calling</h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="endCall()"
            ></button>
        </div>
        <div class="modal-body d-inline-flex justify-content-center align-items-start">
            <video ref="remoteMedia" autoplay width="300"></video>
            <video ref="userMedia" autoplay width="100"></video>
        </div>
        <div class="modal-footer">
            <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                ref="endCallButton"
                @click="endCall()"
            >
                End Call
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Calling',
    computed: {
        userId() {
            return this.$store.getters['user/userId']
        },
        username() {
            return this.$store.getters['user/username']
        },
        mediaStream() {
            return this.$store.getters['view/mediaStream']
        },
        remoteStream() {
            return this.$store.getters['view/remoteStream']
        },
    },
    async mounted() {
        this.$refs.userMedia.srcObject = this.mediaStream
        this.$emitter.on('gotUserMedia', () => {
            if (this.$refs.userMedia) this.$refs.userMedia.srcObject = this.mediaStream
        })
        this.$emitter.on('gotRemoteMedia', () => {
            if (this.$refs.remoteMedia) this.$refs.remoteMedia.srcObject = this.remoteStream
        })
        this.$emitter.on('beingReject', () => {
            if (this.$refs.endCallButton) this.$refs.endCallButton.click();
        })
        this.$emitter.on('stop', () => {
            if (this.$refs.endCallButton) this.$refs.endCallButton.click();
        })
        this.$emitter.on('discardModal', () => {
            if (this.$refs.endCallButton) this.$refs.endCallButton.click();
        })
    },
    methods: {
        endCall() {
            this.$refs.userMedia.srcObject = null;
            this.$emitter.emit('endCall')
        },
    },
}
</script>

<style scoped>
.modal-content {
    background-color: #1a2236 !important;
}
</style>