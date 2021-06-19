<template>
    <div class="content-footer d-block" :class="{ file: file }">
        <div
            class="blob-image-wrapper"
            :class="{ 'd-block': file, 'd-none': !file }"
        >
            <div>
                <div class="d-flex">
                    <img
                        v-if="fileType === 'image'"
                        @load="revokeUrl()"
                        class="blob-image"
                        :src="url"
                    />
                    <video
                        v-if="fileType === 'video'"
                        @load="revokeUrl()"
                        class="blob-image"
                        :src="url"
                    />
                    <img
                        v-if="fileType === 'attachment'"
                        class="blob-image"
                        :src="url"
                    />
                    <button
                        type="button"
                        class="btn-close btn-close-white p-0"
                        aria-label="Close"
                        style="margin-left: -4px"
                        @click="closeFile()"
                    ></button>
                </div>
            </div>
            <p
                v-if="file"
                class="m-0 d-flex text-white-50"
                style="font-size: 0.75rem"
            >
                {{ file.name }}
            </p>
        </div>
        <div class="input-group align-items-center">
            <ul class="list-inline m-0">
                <li class="list-inline-item">
                    <button
                        type="button"
                        class="upload-button btn"
                        :disabled="!otherId"
                        @click="chooseFile()"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-paperclip"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"
                            />
                        </svg>
                    </button>
                </li>
            </ul>
            <textarea
                :disabled="!otherId"
                class="input-message form-control"
                maxlength="256"
                v-model="message"
                @keypress.enter="sendMessage"
            ></textarea>
            <button
                type="button"
                class="upload-button btn"
                :disabled="!otherId"
                @click="sendMessage"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    class="bi bi-cursor-fill"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"
                    />
                </svg>
            </button>
            <input
                type="file"
                class="d-none"
                ref="fileUpload"
                @change="readFile()"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContentFooter',
    data() {
        return {
            message: '',
            file: null,
            url: null,
            footerHeight: 50,
            reader: new FileReader(),
        }
    },
    computed: {
        otherId() {
            return this.$store.getters['conversation/otherId']
        },
        username() {
            return this.$store.getters['user/username']
        },
        userId() {
            return this.$store.getters['user/userId']
        },
        conversationId() {
            return this.$store.getters['conversation/conversationId']
        },
        fileType() {
            return this.$store.getters['view/fileType']
        },
    },
    methods: {
        sendMessage() {
            if (!this.message && !this.file) return
            if (this.message == '\n') this.message = ''
            if (this.message) {
                this.$socket.emit('message', {
                    from: this.username,
                    fromId: this.userId,
                    message: this.message,
                    messageExt: '',
                    messageType: 'text',
                    conversationId: this.conversationId,
                })
                this.$store.dispatch('conversation/addMessage', {
                    from: this.username,
                    fromId: this.userId,
                    message: this.message,
                    messageExt: '',
                    messageType: 'text',
                    sent: Date.now().toString(),
                })
                this.message = ''
            }
            if (this.file) {
                this.sendFileMessage(this.fileType);
            }
        },
        chooseFile() {
            this.$refs.fileUpload.click()
        },
        readFile() {
            this.file = this.$refs.fileUpload.files[0]
            if (!this.file) {
                this.closeFile()
                return
            }
            if (this.file.size > 10240000) {
                this.$emitter.emit('toggleModal', 'filetoolarge')
                this.closeFile()
                return
            }
            var extension = this.file.name.split('.').pop()
            if (
                extension == 'png' ||
                extension == 'gif' ||
                extension == 'jpg' ||
                extension == 'jpeg'
            ) {
                this.url = URL.createObjectURL(this.file)
                this.$store.dispatch('view/updateFileType', 'image')
            } else if (
                extension == 'mp4' ||
                extension == 'ogg' ||
                extension == 'webm'
            ) {
                this.url = URL.createObjectURL(this.file)
                this.$store.dispatch('view/updateFileType', 'video')
            } else {
                this.url = '/src/assets/document_generic.png'
                this.$store.dispatch('view/updateFileType', 'attachment')
            }
        },
        closeFile() {
            this.$refs.fileUpload.value = ''
            this.file = null
            URL.revokeObjectURL(this.url)
            this.url = ''
            this.$store.dispatch('view/updateFileType', '')
        },
        sendFileMessage(type) {
            var date = Date.now()
            var chunkCount = 0
            var chunkSize = 102400
            var chunks = this.file.size / chunkSize
            var start = 0
            var end = chunkSize
            while (start < this.file.size) {
                this.reader = new FileReader()
                this.reader.onload = (e) => {
                    this.$socket.emit('file-message', {
                        from: this.username,
                        fromId: this.userId,
                        chunkIndex: chunkCount++,
                        chunks: chunks,
                        message: this.file.name,
                        messageExt: '.' + this.file.name.split('.').pop(),
                        messageType: type,
                        conversationId: this.conversationId,
                        data: window.btoa(e.target.result),
                        sent: date,
                    })
                    if (chunkCount > chunks) this.closeFile()
                }
                this.reader.readAsBinaryString(this.file.slice(start, end))
                start = end
                end += chunkSize
            }
        },
        revokeUrl() {
            URL.revokeObjectURL(this.url)
        },
    },
}
</script>

<style scoped>
.content-footer {
    height: 50px;
    border-width: 1px !important;
    border: #3d4559 solid;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 0px;
}

.input-group {
    height: 49px;
}

.file {
    height: 150px !important;
}

.blob-image-wrapper {
    padding: 5px;
    height: 100px;
}

.blob-image {
    max-height: 80px;
    max-width: 50%;
}

.content-footer .list-inline-item {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
}

.content-footer .input-group .upload-button {
    color: white;
    outline: none;
    box-shadow: none;
    border: 1px #252a36 solid;
    border-radius: 1rem;
}

.content-footer .input-group .input-message {
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #1a2236;
    color: rgba(255, 255, 255, 0.75);
    outline: none;
    box-shadow: none;
    border: 1px #3d4559 solid;
    border-radius: 10px !important;
    height: 80%;
}

.content-footer .input-group .input-message::-webkit-scrollbar {
    background-color: transparent;
    width: 0px;
}

.content-footer .input-group .input-message::-webkit-scrollbar-thumb {
    background-color: transparent;
}
</style>