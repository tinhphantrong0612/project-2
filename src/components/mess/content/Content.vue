<template>
    <div class="content">
        <ContentHeader />
        <ContentBody />
        <ContentFooter />
    </div>
</template>

<script>
import ContentHeader from './ContentHeader.vue'
import ContentBody from './ContentBody.vue'
import ContentFooter from './ContentFooter.vue'
export default {
    name: 'Content',
    components: {
        ContentHeader,
        ContentBody,
        ContentFooter,
    }
}
</script>

<style scoped>
.content {
    padding: 0px !important;
    border-right: 0px;
    max-height: 100%;
    width: 65%;
    z-index: 0;
}

@media (max-width: 768px) {
    .content {
        z-index: 0;
        width: 100%;
        display: block;
        position: absolute;
    }
}
</style>