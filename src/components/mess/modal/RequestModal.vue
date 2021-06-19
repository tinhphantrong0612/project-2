<template>
    <div
        class="modal fade"
        tabindex="-1"
        id="requestModal"
        aria-labelledby="requestModal"
        aria-hidden="true"
        ref="requestModal"
        data-bs-backdrop="static"
    >
        <div class="modal-dialog m-auto">
            <Send v-if="requestModalType == 'send'" />
            <Received v-if="requestModalType == 'received'" />
            <Sent v-if="requestModalType == 'sent'" />
            <Create v-if="requestModalType == 'create'" />
            <Success v-if="requestModalType == 'success'" />
            <Failed v-if="requestModalType == 'failed'" />
            <FileTooLarge v-if="requestModalType == 'filetoolarge'" />
            <Add v-if="requestModalType == 'add'" />
            <Calling v-if="requestModalType == 'calling'" />
            <Incoming v-if="requestModalType == 'incoming'" />
            <RequestList v-if="requestModalType == 'request-list'" />
            <GroupList v-if="requestModalType == 'group-list'" />
            <FriendList v-if="requestModalType == 'friend-list'" />
        </div>
        <button
            class="d-none"
            data-bs-dismiss="modal"
            ref="requestModalDismiss"
        ></button>
    </div>
</template>

<script>
import Send from './requestmodal/Send.vue'
import Received from './requestmodal/Received.vue'
import Sent from './requestmodal/Sent.vue'
import Create from './requestmodal/Create.vue'
import Add from './requestmodal/Add.vue'
import Success from './requestmodal/Success.vue'
import Failed from './requestmodal/Failed.vue'
import FileTooLarge from './requestmodal/FileTooLarge.vue'
import Calling from './requestmodal/Calling.vue'
import Incoming from './requestmodal/Incoming.vue'
import RequestList from './requestmodal/RequestList.vue'
import GroupList from './requestmodal/GroupList.vue'
import FriendList from './requestmodal/FriendList.vue'
export default {
    name: 'RequestModal',
    async mounted() {
        this.$emitter.on('discardModal', () => {
            if (this.$refs.requestModalDismiss)
                this.$refs.requestModalDismiss.click()
        })
    },
    computed: {
        requestModalType() {
            return this.$store.getters['view/requestModalType']
        },
    },
    components: {
        Send,
        Received,
        Sent,
        Create,
        Add,
        Success,
        Failed,
        FileTooLarge,
        Calling,
        Incoming,
        RequestList,
        GroupList,
        FriendList
    },
}
</script>

<style scoped>
.modal-content {
    background-color: #1a2236 !important;
}
</style>