<template>
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="requestModal">Notify</h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
        </div>
        <div class="modal-body">
            The file is exceed 10MB.
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
export default {
    name: "FileTooLarge"
}
</script>

<style scoped>
.modal-content {
    background-color: #1a2236 !important;
}
</style>