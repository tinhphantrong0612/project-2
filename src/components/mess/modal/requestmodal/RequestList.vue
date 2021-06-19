<template>
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="requestModal">Request List</h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
        </div>
        <div class="modal-body">
            <div class="p-1">
                <button class="btn btn-primary w-100" data-bs-toggle="collapse" data-bs-target=".both">
                    Sent Friend Request
                </button>
                <div class="collapse show both">
                    <div class="card card-body p-1">
                        <div v-if="sentRequests.length == 0">Sent no friend request</div>
                        <RequestListSent v-for="user in sentRequests" :key="user.userId" :user="user"/>
                    </div>
                </div>
            </div>
            <div class="p-1">
                <button class="btn btn-primary w-100" data-bs-toggle="collapse" data-bs-target=".both">
                    Received Friend Request
                </button>
                <div class="collapse both">
                    <div class="card card-body p-1">
                        <div v-if="receivedRequests.length == 0">Received no friend request</div>
                        <RequestListReceived v-for="user in receivedRequests" :key="user.userId" :user="user"/>
                    </div>
                </div>
            </div>
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
import RequestListSent from './RequestListSent.vue'
import RequestListReceived from './RequestListReceived.vue'
export default {
    name: 'RequestList',
    computed: {
        username() {
            return this.$store.getters['user/username']
        },
        userId() {
            return this.$store.getters['user/userId']
        },
        sentRequests() {
            return this.$store.getters['user/sentRequests']
        },
        receivedRequests() {
            return this.$store.getters['user/receivedRequests']
        },
    },
    components: {
        RequestListSent,
        RequestListReceived
    }
}
</script>

<style scoped>
.modal-content {
    background-color: #1a2236 !important;
}
.card {
    color: white;
    background-color: rgb(37, 47, 58);
}
</style>