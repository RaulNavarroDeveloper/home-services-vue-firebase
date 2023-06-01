<script setup>
    import {useRoute} from "vue-router";
    import { computed, onMounted,ref } from 'vue';
    import {getProfesionalPerfil} from '../services/private-chats.js'
    import {obtenerServicios} from '../services/servicios.js'
    const trabajador = ref(null);
    const servicio = ref(null);
        const route = useRoute();
    
        onMounted(() => {
        getProfesionalPerfil(route.params.id)
        .then(result => {
            trabajador.value = result
            console.log("datos-profesional: ", result)
        });
        
        obtenerServicios(route.params.id)
        .then(result => {
            servicio.value = result
            console.log("servicio-del-profesional: ", result)
        });
    })
    
    const numeroAzar = computed(() => {
        const num = Math.floor(Math.random() * (100 - 2 + 1) + 2);
      return num;
    })
    </script>
    <template>
        <article class="container row shadow-lg  mb-5 bg-body rounded m-auto mt-5 p-0">
            <div class="col p-4" v-for="prof in trabajador">
                <h2 class="fs-1">{{prof.nombre}} {{prof.apellido}}</h2>
                <p class="mb-1 ms-3"><span class="fw-bold me-2">4.0</span><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-solid fa-star text-warning"></i><i class="fa-regular fa-star text-warning"></i> <span>(6)</span></p>
                <p class="mb-1 ms-3"><i class="fa-sharp fa-solid fa-hand-point-up"></i> {{numeroAzar}} Contrataciones</p>
                <p class="mb-1 ms-3"><i class="fa-solid fa-circle"></i> Online Ahora</p>
                <p class="mb-1 ms-3"><i class="fa-regular fa-clock me-2"></i>15 años de experiencia</p>
            </div>
            <div class="col columna-2 text-white" v-for="serv in servicio">
                <div class="p-4">
                        <h1>{{serv.nombre}}</h1>
                        <p>{{serv.descripcion}}</p>
                        <p class="fs-2">${{serv.precio}}</p>
                        <div>
                            <div class="shadow-lg mb-5 rounded p-3">
                                <form action="">
                                    <div>
                                        <label for="codigo-postal">Código postal</label>
                                        <input type="text" class="form-control">
                                    </div>
                                    <div class="my-3">
                                        <label for="fecha">Fecha</label>
                                        <input type="date" class="form-control">
                                    </div>
                                    <div>
                                        <label for="hora-estimada">Hora estimada</label>
                                        <select name="hora-estimada" id="hora-estimada" class="form-control">
                                            <option value="10hs">10hs - 12hs</option>
                                            <option value="16hs">16hs - 18hs</option>
                                            <option value="18hs">18hs - 20hs</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-secondary mt-4">Reservar</button>
                                </form>
                            </div>
                        </div>
                </div>
            </div>
        </article>
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
    
.btn-primary{
    background-color: #8099c9;
    border: #8099c9;
}

.correo {
    font-family: 'Arial Rounded MT';
}

.columna-2{
    background-color: #8099c9;
}

.btn-secondary{
    background-color: #d99567;
    border: #d99567;
}

.btn-secondary:hover{
    background-color: #ffffff;
    border: #ffffff;
    color: #8099c9;
}
</style>