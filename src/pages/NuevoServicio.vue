<script setup>
    import {ref} from 'vue';
    import {agregarServicio} from "../services/servicios.js";
    import useAuth from "../composition/useAuth.js";
    import {useRouter} from 'vue-router';

    const router = useRouter();
    const {user} = useAuth();
    const dataForm = ref({
        nombre: '',
        descripcion: '',
        precio: '',
    })

    async function handleSubmit() {
        try {
            await agregarServicio({
                ...dataForm.value,
                user: user.value.id,
            })
            console.log("anda")
            router.push({
                    path: '/perfil-profesional',
            })
        }
        catch(err) {
            console.log("ERROR: ", err);
        }
    }
</script>
<template>
    <section class="container py-3 my-4">

        <h1>CARGAR SERVICIO</h1>
        <form action="#" method="post" @submit.prevent="handleSubmit">
            <div>
                <label for="nombre">Nombre</label>
                <input 
                    class="form-control" 
                    type="text" 
                    name="nombre" 
                    id="nombre"
                    v-model="dataForm.nombre"
                    >
            </div>
            <div class="my-4">
                <label for="descripcion">Descripción</label>
                <input 
                    class="form-control" 
                    type="text" 
                    name="descripcion" 
                    id="descripcion"
                    v-model="dataForm.descripcion"
                    >
            </div>
            <div>
                <label for="precio">Precio</label>
                <input 
                    class="form-control" 
                    type="number" 
                    name="precio" 
                    id="precio"
                    v-model="dataForm.precio"
                    >
            </div>
    
            <button type="submit" class="btn btn-primary mt-4">Cargar</button>
        </form>
    </section>
</template>

<style scoped>
.btn-primary{
        background-color: #8099c9;
        border: #8099c9;
    }
</style>