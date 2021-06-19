<template>
    <div class="sidebar" id="sidebar-offcanvas" ref="sidebar" data-bs-scroll="false" data-bs-backdrop="true" :class="{'offcanvas offcanvas-start': width <= 768}">
        <SidebarHeader/>
        <SidebarBody/>
        <SidebarFooter/>
    </div>
</template>

<script>
import SidebarHeader from './SidebarHeader.vue'
import SidebarBody from './sidebarbody/SidebarBody.vue'
import SidebarFooter from './SidebarFooter.vue'
export default {
    name: 'Sidebar',
    components: {
        SidebarHeader,
        SidebarBody,
        SidebarFooter
    },
    computed: {
        width() {
            return this.$store.getters['view/width']
        }
    }
}
</script>

<style scoped>
.sidebar {
    padding: 0px !important;
    border-left: 0px;
    width: 35%;
    display: block;
    overflow-y: auto;
    overflow-x: hidden;
    visibility: visible !important;
}

.offcanvas {
    background-color: #1a2236 !important;
    min-width: 300px;
}

</style>