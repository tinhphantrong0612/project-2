<template>
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="requestModal">Send Friend Request</h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
        </div>
        <div class="modal-body">
            You and this user is not friends yet. Wanna send friend request?
        </div>
        <div class="modal-footer">
            <button
                type="button"
                class="btn btn-primary"
                @click="sendFriendRequest()"
            >
                Send
            </button>
            <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
            >
                Close
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Send',
    computed: {
        selectedUsername() {
            return this.$store.getters['view/selectedUsername']
        },
        selectedUserId() {
            return this.$store.getters['view/selectedUserId']
        },
        username() {
            return this.$store.getters['user/username']
        },
        userId() {
            return this.$store.getters['user/userId']
        },
    },
    methods: {
        async sendFriendRequest() {
            let response = await this.$store.dispatch('user/sendFriendRequest', {
                fromId: this.userId,
                from: this.username,
                toId: this.selectedUserId,
                to: this.selectedUsername
            })

            if (response) this.$store.dispatch('view/showRequestModal', 'success');
            else if (!response) this.$store.dispatch('view/showRequestModal', 'failed');
        },
    },
}
</script>

<style scoped>
.modal-content {
    background-color: #1a2236 !important;
}
</style>