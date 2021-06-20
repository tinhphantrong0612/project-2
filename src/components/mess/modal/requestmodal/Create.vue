<template>
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="requestModal">
                Create Group
            </h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
        </div>
        <div class="modal-body">
            <div class="input-group">
                <input
                    class="form-control bg-transparent outline-none text-white"
                    type="text"
                    placeholder="Group name..."
                    required
                    @input="updateInform()"
                    v-model="groupName"
                />
            </div>
            <span style="color: red;">{{ inform }}</span>
        </div>
        <div class="modal-footer">
            <button
                type="button"
                class="btn btn-primary"
                @click="createGroup()"
            >
                Create
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
    name: 'Create',
    data() {
        return {
            groupName: '',
            inform: '',
        }
    },
    computed: {
        userId() {
            return this.$store.getters['user/userId'];
        },
        username() {
            return this.$store.getters['user/username'];
        }
    },
    methods: {
        async createGroup() {
            if (!this.groupName) {
                this.updateInform();
                return;
            }
            let response = await this.$store.dispatch(
                'user/createGroup',
                {
                    fromId: this.userId,
                    from: this.username,
                    groupName: this.groupName
                }
            )

            this.groupName = '';

            if (response) {
                this.$store.dispatch('user/getGroups', {fromId: this.userId});
                this.$store.dispatch('view/showRequestModal', 'success');
            }
            else this.$store.dispatch('view/showRequestModal', 'failed')
        },
        updateInform() {
            if (!this.groupName) this.inform = 'You need to enter group name!'
            else this.inform = ''
        },
    },
}
</script>

<style scoped>
.modal-content {
    background-color: #1a2236 !important;
}
</style>