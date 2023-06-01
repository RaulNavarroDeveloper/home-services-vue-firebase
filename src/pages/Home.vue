<script>
import imagenCelular from '../../public/imgs/celular-jandy2.jpg'
import imagenContratarJandy from '../../public/imgs/contratar-jandy4.jpg'
import imagenAppStore from '../../public/imgs/imagen-app-store.png'
import imagenPlayStore from '../../public/imgs/imagen-play-store.png'
export default {
    name: "Home",
    data: () => ({
      imagenCelular: imagenCelular,
      imagenContratarJandy: imagenContratarJandy,
      imagenAppStore: imagenAppStore,
      imagenPlayStore: imagenPlayStore,
    })
};
</script>

<template>
  <section>
    <div class="text-center w-100">
      <div class="text-center bg-image banner">
        <div class="mask" style="background-color: rgba(0, 0, 0, 0.6);">
          <div class="d-flex justify-content-center align-items-center h-100">
            <div class="text-white">
              <h1><span class="nombre">JANDY</span></h1>
              <p>Les damos la bienvenida a JANDY. La solución que querés al alcance de tu mano.</p>
              <div class="input-group mb-3 p-2">
                <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-magnifying-glass"></i></span>
                <input type="text" class="form-control" placeholder="Buscá Servicios" aria-describedby="basic-addon1">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        
    <section class="justify-content-center">
      <section class="row  text-center mt-5 container m-auto">
        <div class="col-md-4">
            <i class="pastillas fa-solid fa-certificate mb-3"></i>
            <h4>Trabajadores Certificados</h4>
            <p>Los servicios ofrecidos por JANDY son realizados por profesionales que están en constante evaluación por parte de clientes como usted. </p>
        </div>
        <div class="col-md-4">
            <i class="pastillas fa-solid fa-shield-halved mb-3"></i>
            <h4>Seguridad</h4>
            <p>Los posibles trabajadores de JANDY proporcionan información personal detallada. Además de que sus datos son validados como también su experiencia de servicio.</p>
        </div>
        <div class="col-md-4">
            <i class="pastillas fa-solid fa-phone mb-3"></i>
            <h4>Contamos con Soporte 24hs</h4>
            <p> Si tiene un problema, comuníquese con nuestro equipo de Servicio al cliente 24/7.</p>
        </div>
      </section>


    <section class="section-garantia p-0 mt-5 d-flex mb-5 container-fluid">
      <div class="row m-0">
        <div class="col-4 bg-jandy text-light">
            <h2 class="fs-3 text-center pt-5 px-2">Tu Felicidad, Garantizada</h2>
            <p class="w-75 m-auto mt-3 p-4">
              Tú felicidad es nuestra meta. Si no estas satisfecho, trabajaremos para corregirlo. Nuestra atención al cliente está disponibles las 24 horas del día, los 7 días de la semana. La Jandy Happiness Guarantee solo se aplica cuando reserva y paga un servicio directamente a través de la plataforma de Jandy.
            </p>
        </div>
        <div class="col-8 p-0 m-0">
            <img class="img-fluid" :src="imagenContratarJandy">
        </div>
      </div>
    </section>

    <section class="section-garantia container-fluid">
      <div class="row">
        <div class="col-7 bg-success p-0">
          <div>
            <img :src="imagenCelular">
          </div>
        </div>
        <div class="col-5 pb-5">
            <h2 class="fs-2 fw-bold text-center mt-5 pt-5 h2a">Descargá la App de JANDY</h2>
            <p class="text-center mt-3 p-4">Descargá la app de JANDY y disfrutá desde cualquier lugar la mejor experiencia contratando un servicio</p>
            <div class="d-flex justify-content-around mt-5">
              <div>
                <img :src="imagenAppStore" alt="" width="" height="48">
              </div>
              <div>
                <img :src="imagenPlayStore" alt="" width="" height="58">
              </div>
            </div>
        </div>

      </div>
    </section>




    <section class="container mt-5 row m-auto">
      <h2 class="text-center">¿Qué es JANDY?</h2>  
      <ul class="mt-5 col">
        <li class="mt-4 "> 
          <p class="fs-6" >JANDY es una aplicación de servicios para el hogar o empresa que participa como intermediaria entre clientes y profesionales, donde los usuarios puedan elegir en base a sus necesidades y presupuestos los servicios que desean adquirir. El cliente dispone de diversas funcionalidades que buscan ayudarle a encontrar al profesional y servicio perfecto, estas funciones son: Filtros por tarifas, localización, calificación, horas de trabajo,etc.
          </p> 
        </li>
        <li class="mt-4">
          <p class="fs-6"> Por otro lado, los profesionales se pueden inscribir en la plataforma con diferentes requisitos en base al servicio que se quiera ofrecer, una vez inscriptos, podrán añadir diferentes servicios y establecer los precios de cada uno.
          </p> 
        </li>
      </ul>
      <div class="col">
        <h2 class="text-center mb-5">Servicios</h2>
        <div class="row text-center">
          <div class="col mt-4">
            <i class="fs-3 fa-solid fa-screwdriver-wrench"></i>
            <p>Carpintería</p>
          </div>
          <div class="col mt-4">
          <i class="fs-3 fa-regular fa-lightbulb"></i>
            <p>Electricidad</p>
          </div>
          <div class="col mt-4">
          <i class="fs-3 fa-solid fa-house"></i>
            <p>Hogar</p>
          </div>
        </div>
        <div class="row text-center mt-5">
          <div class="col">
          <i class="fs-3 fa-solid fa-certificate"></i>
            <p>Trabajadores Certificados</p>
          </div>
          <div class="col">
          <i class="fs-3 fa-solid fa-shield-halved"></i>
            <p>Seguridad</p>
          </div>
          <div class="col">
          <i class="fs-3 fa-solid fa-phone"></i>
            <p>Soporte 24hs</p>
          </div>
        </div>
      </div>
    </section>

    </section>

  </section>
    
</template>

<style scoped>
  .btn-primary{
      background-color: #d99567;
      border: #d99567;
  }

  span{
    color: #8099c9;
  }

  i{
    color: #8099c9;
  }

  .banner {
    background-image: url('../../public/imgs/banner-escritorio.jpg');
    background-repeat: no-repeat;
    background-color: rgba(0, 0, 0, 0.6);
    height: 45vh;
}

.mask{
    position: relative;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-attachment: fixed;
}

.pastillas {
  font-size: 3.5rem;
}

.nombre{
  font-size: 4rem;
}

.section-garantia{
    height: 500px;
}
.section-garantia div{
  height: 500px;
}

.bg-jandy{
  background-color: #8099c9;
}

</style>