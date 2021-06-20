<template>
    <div
        class="contact d-flex ml-3"
        :class="{ 'selected-contact': group.conversationId == selected }"
    >
        <figure
            class="mt-0 mb-0 figure-container pl-3"
            @click="accessContact()"
        >
            <img
                :src="'/api/src/assets/avatar/' + group.groupName"
                onerror="this.src='/src/assets/avatar/default.png'"
                class="rounded-circle figure-img m-1"
                alt="image"
            />
        </figure>
        <div
            class="ml-0 col-8 d-flex"
            @click="accessContact()"
        >
            <div class="d-flex mt-auto mb-auto ml-3">
                <div>
                    <h6 class="contact-name text-primary text-left">
                        {{ group.groupName }}
                    </h6>
                    <p class="mb-0 text-left" v-if="group.lastMessage">
                        {{ group.lastMessage }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SidebarBodyGroupContact',
    props: ['group'],
    computed: {
        selected() {
            return this.$store.getters['conversation/otherId']
        },
        userId() {
            return this.$store.getters['user/userId']
        },
        username() {
            return this.$store.getters['user/username']
        },
    },
    methods: {
        async accessContact() {
            let response = await this.$store.dispatch(
                'conversation/getConversation',
                {
                    name: this.group.groupName,
                    conversationId: this.group.conversationId,
                    Id: this.group.conversationId,
                    type: 'group',
                    userId: this.userId
                }
            )

            if (!response) {
                this.$emitter.emit('toggleModal', 'failed');
            } else {
                this.$socket.emit('seen', {
                    conversationId: this.group.conversationId,
                    userId: this.userId,
                    username: this.username,
                })
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
    border: 2px solid aqua;
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