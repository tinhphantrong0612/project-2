<template>
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="requestModal">
                Group List
            </h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
        </div>
        <div class="modal-body">
            <div v-if="!groups.length">You are not in any group yet!</div>
            <Group
                v-for="group in groups"
                :key="group.conversationId"
                :group="group"
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
import Group from './Group.vue'
export default {
    name: 'GroupList',
    computed: {
        groups() {
            return this.$store.getters['user/groups']
        }
    },
    components: {
        Group,
    },
}
</script>

<style scoped>
.modal-content {
    background-color: #1a2236 !important;
}
</style>