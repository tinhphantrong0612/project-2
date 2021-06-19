<template>
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="requestModal">
                Add A Friend Into Group
            </h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
        </div>
        <div class="modal-body">
            <div v-if="!friendsNotInGroup.length">No more friends to add to this group!</div>
            <AddFriend
                v-for="friend in friendsNotInGroup"
                :key="friend.userId"
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
import AddFriend from './AddFriend.vue'
export default {
    name: 'Add',
    computed: {
        userId() {
            return this.$store.getters['user/userId']
        },
        username() {
            return this.$store.getters['user/username']
        },
        groupMembers() {
            return this.$store.getters['conversation/users']
        },
        friends() {
            return this.$store.getters['user/friends']
        },
        friendsNotInGroup() {
            var friendsNotInGroup = this.friends.filter((friend) => {
                return (
                    this.groupMembers.findIndex(
                        (user) => user.userId == friend.userId
                    ) == -1
                )
            })
            return friendsNotInGroup
        },
    },
    methods: {
        async createGroup() {
            if (!this.groupName) {
                this.updateInform()
                return
            }
            let response = await this.$store.dispatch('user/createGroup', {
                fromId: this.userId,
                from: this.username,
                groupName: this.groupName,
            })

            this.groupName = ''

            if (response) {
                this.$store.dispatch('user/getGroups', { fromId: this.userId })
                this.$store.dispatch('view/showRequestModal', 'success')
            } else this.$store.dispatch('view/showRequestModal', 'failed')
        },
    },
    components: {
        AddFriend,
    },
}
</script>

<style scoped>
.modal-content {
    background-color: #1a2236 !important;
}
</style>