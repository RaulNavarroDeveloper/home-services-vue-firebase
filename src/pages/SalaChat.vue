<script setup>
    import {onMounted, ref, computed} from 'vue';
    import {getUsuariosDatos, getProfesionalesDatos} from "../services/private-chats.js";
    import useAuth from "../composition/useAuth.js";
    const {user} = useAuth();
    const usuarios = ref([]);

    async function getUsers() {
        getUsuariosDatos(user.value.id)
        .then(result => {
            usuarios.value = result;
        })
    }

    async function getProfessionals() {
        getProfesionalesDatos(user.value.id)
        .then(result => {
            usuarios.value = result;
        })
    }

    onMounted(() => {
        getUsers();
    });
    
    console.log('ACAAAA', user.value.id)
    </script>

<template>
    <section class="container py-3">
        <h1 class="mb-3">Mis mensajes</h1>

        <div class="mt-5 ">
            <template v-if="usuarios != []">
                <div v-for="user in usuarios">
                    <div class="div-msj d-flex justify-content-between align-items-center mt-4 w-75 m-auto shadow-lg  mb-5  rounded rounded-5 p-3">
                    <img src="https://via.placeholder.com/70" alt="" class="img-fluid ms-2 rounded-5">
                    <p>{{user.nombre}} {{user.apellido}}</p>
                    <router-link
                        :to="`/usuario/${user.id}/chat`"
                        class="btn btn-primary me-3"
                    ><i class="fa-solid fa-comments"></i>
                    <!-- Responder -->
                    </router-link>
                    </div>
                </div>
            </template>
            <template v-if="usuarios.length == 0">
                <p>No hay mensajes por el momento...</p>
            </template>
        </div>
</section>
</template>
<style scoped>
    .div-msj{
        border-radius: 10px;
        height: 75px;
        background-color: rgb(199, 200, 235);

    }
    .btn-primary{
        background-color: #8099c9;
        border: #8099c9;
    }
</style>