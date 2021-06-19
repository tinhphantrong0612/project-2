<template>
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="requestModal">Incoming call</h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="rejectCall()"
            ></button>
        </div>
        <div
            class="
                modal-body
                d-inline-flex
                justify-content-center
                align-items-start
            "
        >
            Call from {{ callee.username }}
        </div>
        <div class="modal-footer">
            <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                ref="answerButton"
                @click="answerCall()"
            >
                Answer
            </button>
            <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                ref="rejectButton"
                @click="rejectCall()"
            >
                Reject
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Incoming',
    computed: {
        mediaStream() {
            return this.$store.getters['view/mediaStream']
        },
        callee() {
            return this.$store.getters['view/callee']
        },
    },
    async mounted() {
        this.$emitter.on('beingReject', () => {
            if (this.$refs.rejectButton) this.$refs.rejectButton.click();
        })
        this.$emitter.on('stop', () => {
            if (this.$refs.rejectButton) this.$refs.rejectButton.click();
        })
    },
    methods: {
        rejectCall() {
            this.$emitter.emit('reject');
        },
        answerCall() {
            this.$emitter.emit('answer');
        }
    },
}
</script>

<style scoped>
.modal-content {
    background-color: #1a2236 !important;
}
</style>