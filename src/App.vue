<template>
    <div>
        <router-view></router-view>
        <div
            class="modal-backdrop fade root-loading"
            :class="{ 'd-block show': loading, 'd-none': !loading }"
        >
            <div class="d-flex justify-content-center text-white">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    computed: {
        loading() {
            return this.$store.getters['view/loading']
        },
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #1a2236 !important;
}

button:hover {
    background-color: #1f273b;
}

::-webkit-scrollbar {
    width: 5px;
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: #252a36;
    border-radius: 10px;
}

.modal-dialog {
    max-width: 500px !important;
    min-width: 300px !important;
}

.modal-backdrop.root-loading {
    z-index: 1100 !important;
}
</style>
