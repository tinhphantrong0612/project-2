<template>
    <div
        class="contact d-flex ml-3"
        :class="{ 'selected-contact': user.userId == selected }"
    >
        <figure
            class="mt-0 mb-0 figure-container pl-3"
            @click="accessContact()"
        >
            <img
                :src="'/api/src/assets/avatar/' + user.username"
                onerror="this.src='/src/assets/avatar/default.png'"
                class="rounded-circle figure-img m-1"
                :class="{
                    online: user.status == 'online',
                    offline: user.status != 'online',
                }"
                alt="image"
            />
        </figure>
        <div class="ml-0 col-8 d-flex" @click="accessContact()">
            <div class="d-flex mt-auto mb-auto ml-3">
                <div>
                    <h6 class="contact-name text-primary text-left">
                        {{ user.username }}
                    </h6>
                    <p class="mb-0 text-left" v-if="user.lastMessage">
                        {{ user.lastMessage }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SidebarBodyContact',
    props: ['user'],
    data() {
        return {
        }
    },
    computed: {
        selected() {
            return this.$store.getters['conversation/otherId']
        },
        friends() {
            return this.$store.getters['user/friends']
        },
        userId() {
            return this.$store.getters['user/userId']
        },
        username() {
            return this.$store.getters['user/username']
        },
        sentRequests() {
            return this.$store.getters['user/sentRequests']
        },
        receivedRequests() {
            return this.$store.getters['user/receivedRequests']
        },
    },
    methods: {
        checkFriendRequest(userId) {
            let inFriends = this.friends.findIndex(
                (friend) => friend.userId == userId
            )
            let inSentRequests = this.sentRequests.findIndex(
                (friend) => friend.userId == userId
            )
            let inReceivedRequests = this.receivedRequests.findIndex(
                (friend) => friend.userId == userId
            )
            return {
                inFriends,
                inSentRequests,
                inReceivedRequests,
            }
        },
        async accessContact() {
            let checkFriendRequestResult = this.checkFriendRequest(
                this.user.userId
            )
            this.$store.dispatch('view/setSelectedUser', {
                username: this.user.username,
                userId: this.user.userId,
            })
            if (checkFriendRequestResult.inFriends !== -1) {
                let response = await this.$store.dispatch(
                    'conversation/getConversation',
                    {
                        conversationId:
                            this.friends[checkFriendRequestResult.inFriends]
                                .conversationId,
                        name: this.user.username,
                        Id: this.user.userId,
                        userId: this.userId,
                        status: this.user.status,
                        type: 'user',
                    }
                )
                if (!response) {
                    this.$emitter.emit('toggleModal', 'failed')
                } else {
                    this.$socket.emit('seen', {
                        conversationId:
                            this.friends[checkFriendRequestResult.inFriends]
                                .conversationId,
                        userId: this.userId,
                        username: this.username,
                    })
                }
            } else if (checkFriendRequestResult.inReceivedRequests !== -1) {
                this.$emitter.emit('toggleModal', 'received')
            } else if (checkFriendRequestResult.inSentRequests !== -1) {
                this.$emitter.emit('toggleModal', 'sent')
            } else {
                this.$emitter.emit('toggleModal', 'send')
            }
        },
    },
}
</script>

<style scoped>
.contact {
    height: 60px;
    border: 1px #3d4559 solid;
    border-top: 0px;
}

.contact:hover {
    background-color: #1f273b;
}

.contact .selected-contact {
    background-color: #1f273b;
}

.contact .figure-container {
    height: 60px;
}

.contact .figure-container > img {
    height: 50px;
    width: 50px;
    min-width: 50px;
    min-height: 50px;
    object-fit: contain;
}

.online {
    border: 2px green solid;
}

.offline {
    border: 2px gray solid;
}

.contact-name {
    margin-bottom: 0;
    margin-top: 0;
    font-size: 1.5rem;
}

.selected-contact {
    background-color: #1f273b;
}
</style>