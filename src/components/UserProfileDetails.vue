<script setup>
defineProps({
    user: {
        type: Object,
    }
})
</script>

<template>
    <dl class="mb-3">
        <dt>Email</dt>
        <dd>{{ user.email }}</dd>
        <dt>Nombre de usuario</dt>
        <dd>
            <template v-if="user.displayName">
                {{ user.displayName }}
            </template>
            <template v-else>
                <span class="fst-italic">No especificado</span>
            </template>
        </dd>
    </dl>
</template>
