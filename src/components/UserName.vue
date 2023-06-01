<script setup>
defineProps({
    message: {
        type: Object,
    },
    showLink: {
        type: Boolean,
        default: false,
    }
})
</script>

<template>
    <router-link
        v-if="showLink"
        :to="`/usuario/vvR3TFt6TngbViEoStqOp7flI793`"
    >
        {{ message.name }}
    </router-link>
    <template v-else>{{ message.name }}</template>
</template>
