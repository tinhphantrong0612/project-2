<template>
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="requestModal">Friend Request Was Sent</h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
        </div>
        <div class="modal-body">
            You have already sent this user a request. Wanna cancel it?
        </div>
        <div class="modal-footer">
            <button
                type="button"
                class="btn btn-danger"
                @click="cancelFriendRequest()"
            >
                Cancel
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
    name: 'Sent',
    computed: {
        userId() {
            return this.$store.getters['user/userId'];
        },
        username() {
            return this.$store.getters['user/username'];
        },
        selectedUsername() {
            return this.$store.getters['view/selectedUsername'];
        },
        selectedUserId() {
            return this.$store.getters['view/selectedUserId'];
        }
    },
    methods: {
        async cancelFriendRequest() {
            let response = await this.$store.dispatch('user/cancelFriendRequest', {
                from: this.username,
                fromId: this.userId,
                to: this.selectedUsername,
                toId: this.selectedUserId
            })

            if (response) this.$store.dispatch('view/showRequestModal', 'success');
            else if (!response) this.$store.dispatch('view/showRequestModal', 'failed');
        }
    }
}
</script>

<style scoped>
.modal-content {
    background-color: #1a2236 !important;
}
</style>