<script setup>
import { computed, onMounted,ref } from 'vue';
import {getTrabajadoresRegistrados} from '../services/private-chats.js'
import {getServiciosRegistrados} from '../services/servicios.js'
const trabajadores = ref(null);
const servicios = ref(null);
onMounted(() => {
    getTrabajadoresRegistrados()
    .then(result => {
        trabajadores.value = result
        
    });

    getServiciosRegistrados()
    .then(result => {
        servicios.value = result
    });
})

const numeroAzar = computed(() => {
    const num = Math.floor(Math.random() * (100 - 2 + 1) + 2);
  return num;
})
</script>

<template>
    <section class="container py-3">
            <article class="card shadow-lg  mb-5 bg-body rounded-2" style="max-width: 1200px;" v-for="trabajador in trabajadores">
                
                <div class="row g-0">
                  <div class="col-md-4 p-3 text-start">
                    <h2 class="mb-1 ms-3">{{trabajador.nombre}} {{trabajador.apellido}}</h2>
                    <p class="mb-1 ms-3"><span class="fw-bold me-2">4.0</span><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i> <span>(6)</span></p>
                    <p class="mb-1 ms-3"><i class="fa-sharp fa-solid fa-hand-point-up"></i> {{numeroAzar}} Contrataciones</p>
                    <p class="mb-1 ms-3"><i class="fa-solid fa-circle"></i> Online Ahora</p>
                    <div class="mb-1 ms-3 mt-3">
                        <router-link class="btn btn-primary nav-link btn-chat" :to="`/usuario/${trabajador.id}/chat`"><i class="fa-solid fa-comments"></i>
                        </router-link>
                    </div>
                </div>
                <div class="col-md-8 columna-2 text-white rounded-end">
                    <div class="card-body text-ce" v-for="serv in servicios">
                        <div v-if="trabajador.id == serv.user">
                            <h1>{{serv.nombre}}</h1>
                            <h3>{{serv.descripcion}}</h3>
                            <h4>${{serv.precio}}</h4>
                            <router-link class="nav-link btn btn-secondary ms-3 mb-3 mt-3" :to="`/servicios/${trabajador.nombre}/servicio/${serv.user}`">Ver más</router-link>
                        </div>
                    </div>
                </div>
            </div>
            </article>
        
    </section>
</template>

<style scoped>
.contenedor {
    border: 1px solid black;
    border-radius: 15px;
}
.contenedor p {
    width: 95%;
}
.fa-hand-point-up {
    -moz-transform: scaleX(-1);
-o-transform: scaleX(-1);
-webkit-transform: scaleX(-1);
transform: scaleX(-1);
-ms-filter: "FlipH";
filter: FlipH;
color: rgb(80, 80, 80);
}

.fa-circle {
    color: rgb(42, 170, 42);
    font-size: 12px;
}

.btn{
    width: 25%;
    height: 30px;
    line-height: 30px;
}

.btn-primary{
    background-color: #8099c9;
    border: #8099c9;
}

.btn-secondary{
    background-color: #d99567;
    border: #d99567;
}

.btn-secondary:hover{
    background-color: #a8a5ca;
    border: #a8a5ca;
}

.correo {
    font-family: 'Arial Rounded MT';
}

.card {
    border: 0px;
}

.columna-2{
    background-color: #8099c9;
}

.btn-chat:hover{
    background-color: #d99567;
    border: #d99567;
    color: white;
}
</style>