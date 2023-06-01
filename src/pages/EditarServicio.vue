<script setup>
    import {ref, onMounted} from 'vue';
    import {useRoute, useRouter} from "vue-router";
    import {servicioEspecifico, editarServicio} from "../services/servicios.js";
    import useAuth from "../composition/useAuth.js";
    const route = useRoute();
    const router = useRouter();
    const {user} = useAuth();

    const dataVieja = ref({})

    async function dataServicio() {
        servicioEspecifico(route.params.id)
        .then(result => { 
            dataVieja.value = result
            console.log("RESULT: ", result)
        })
    }

    async function handleEdit() {
        try {
            await editarServicio(route.params.id ,{
                ...dataVieja.value,
            })
            console.log("editado")
            router.push({
                    path: '/perfil-profesional',
            })
        }
        catch(err) {
            console.log("ERROR: ", err);
        }
    }


    onMounted(() => {
        dataServicio();
    });
</script>
<template>
    <section class="container py-3">

        <h1>EDITAR SERVICIO</h1>
        <form action="#" method="post" @submit.prevent="handleEdit">
            <div>
                <label for="nombre">Nombre</label>
                <input 
                    class="form-control" 
                    type="text" 
                    name="nombre" 
                    id="nombre"
                    v-model="dataVieja.nombre"
                    >
            </div>
            <div class="my-4">
                <label for="descripcion">Descripción</label>
                <input 
                    class="form-control" 
                    type="text" 
                    name="descripcion" 
                    id="descripcion"
                    v-model="dataVieja.descripcion"
                    >
            </div>
            <div>
                <label for="precio">Precio</label>
                <input 
                    class="form-control" 
                    type="number" 
                    name="precio" 
                    id="precio"
                    v-model="dataVieja.precio"
                    >
            </div>
    
            <button type="submit" class="btn btn-primary mt-3">Editar</button>
        </form>
    </section>
</template>

<style scoped>
    .btn-primary{
            background-color: #8099c9;
            border: #8099c9;
        }
    </style>