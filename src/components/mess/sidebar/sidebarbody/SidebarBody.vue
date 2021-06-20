<template>
    <div class="sidebar-body overflow-auto">
        <div v-if="!users.length && !groups.length" class="p-2">
            {{ emptyMessage }}
        </div>
        <SidebarBodyContact
            v-for="user in users"
            :key="user.userId"
            :user="user"
        />
        <SidebarBodyGroupContact
            v-for="group in groups"
            :key="group.conversationId"
            :group="group"
        />
    </div>
</template>

<script>
import SidebarBodyGroupContact from './SidebarBodyGroupContact.vue'
import SidebarBodyContact from './SidebarBodyContact.vue'
export default {
    name: 'SidebarBody',
    created() {
        this.$nextTick(() => {
            this.$socket.on('updateRequests', this.onUpdateRequests)
            this.$socket.on('updateFriends', this.onUpdateFriends)
            this.$socket.on('unfriend', this.onUnfriend)
            this.$socket.on('joinConversation', this.onJoinConversation)
        })
    },
    computed: {
        searching() {
            return this.$store.getters['view/searching']
        },
        users() {
            if (this.searching) return this.$store.getters['user/searchResult']
            else return this.$store.getters['user/friends']
        },
        groups() {
            if (this.searching)
                return this.$store.getters['user/groupsSearchResult']
            else return this.$store.getters['user/groups']
        },
        emptyMessage() {
            if (this.searching) return 'No result'
            else return 'No contact'
        },
        userId() {
            return this.$store.getters['user/userId']
        },
        otherId() {
            return this.$store.getters['conversation/otherId']
        },
    },
    methods: {
        onUpdateRequests() {
            this.$store.dispatch('user/updateRequests', this.userId)
        },
        async onUpdateFriends(conversationId) {
            this.$store.dispatch('user/updateRequests', this.userId)
            this.$socket.emit('joinConversation', conversationId)
            await this.$store.dispatch('user/getFriends')
            this.$socket.emit('online', this.userId)
        },
        onUnfriend(data) {
            if (data.fromId == this.otherId || data.toId == this.otherId) {
                this.$store.dispatch('user/beingUnfriend')
                this.$socket.emit('emptyLastContact', this.userId)
            }
            this.$store.dispatch('user/getFriends', data)
        },
        onJoinConversation(data) {
            this.$socket.emit('joinConversation', data)
            this.$store.dispatch('user/getGroups', { fromId: this.userId })
        },
    },
    components: {
        SidebarBodyContact,
        SidebarBodyGroupContact,
    },
}
</script>

<style>
.sidebar-body {
    height: calc(var(--vh, 1vh) * 100 - 215px);
    border-width: 1px !important;
    border: #3d4559 solid;
    border-bottom: 0px;
    -webkit-box-flex: 1;
    flex: 1;
    outline: none;
    border-left: 0px;
}
</style>