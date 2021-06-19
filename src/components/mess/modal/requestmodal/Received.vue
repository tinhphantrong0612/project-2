<template>
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="requestModal">
                Received Friend Request
            </h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
        </div>
        <div class="modal-body">
            This user send you a friend request. Do you accept?
        </div>
        <div class="modal-footer">
            <button
                type="button"
                class="btn btn-primary"
                @click="acceptFriendRequest()"
            >
                Accept
            </button>
            <button
                type="button"
                class="btn btn-danger"
                @click="rejectFriendRequest()"
            >
                Reject
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
    name: 'Received',
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
        async acceptFriendRequest() {
            let response = await this.$store.dispatch(
                'user/acceptFriendRequest',
                {
                    fromId: this.userId,
                    from: this.username,
                    toId: this.selectedUserId,
                    to: this.selectedUsername,
                }
            )

            if (response)
                this.$store.dispatch('view/showRequestModal', 'success')
            else this.$store.dispatch('view/showRequestModal', 'failed')
        },
        async rejectFriendRequest() {
            let response = await this.$store.dispatch(
                'user/rejectFriendRequest',
                {
                    fromId: this.userId,
                    from: this.username,
                    toId: this.selectedUserId,
                    to: this.selectedUsername,
                }
            )
            if (response)
                this.$store.dispatch('view/showRequestModal', 'success')
            else this.$store.dispatch('view/showRequestModal', 'failed')
        },
    },
}
</script>

<style scoped>
.modal-content {
    background-color: #1a2236 !important;
}
</style>