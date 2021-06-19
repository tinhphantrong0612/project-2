<template>
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="requestModal">
                Friend List
            </h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
        </div>
        <div class="modal-body">
            <div v-if="!friends.length">You have no friend. Search and send request!</div>
            <Friend
                v-for="friend in friends"
                :key="friend.conversationId"
                :friend="friend"
            />
        </div>
        <div class="modal-footer">
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
import Friend from './Friend.vue'
export default {
    name: 'FriendList',
    computed: {
        friends() {
            return this.$store.getters['user/friends']
        }
    },
    components: {
        Friend,
    },
}
</script>

<style scoped>
.modal-content {
    background-color: #1a2236 !important;
}
</style>