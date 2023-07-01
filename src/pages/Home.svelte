<script>
  import Loading from '../components/Spinner.svelte';
  import {fade} from 'svelte/transition';
</script>

<div class="container">


<header>
  <div class="text-center">
    <span class="logo logo__hero">casasydepas.net</span>
    <span class="pitch">Coworking Inmobiliario</span>
  </div>

</header>

<main >
  
  <div in:fade={{ duration: 600 }} class="g-card">
    <h4 class="g-card__title">¿Qué es casasydepas.net?</h4>
    <p class="g-card__paragraph">casasydepas.net es una plataforma pensada para todos los <strong>Brokers Inmobiliarios</strong> que quieren compartir con otros brokers una propiedad en venta o renta, así mismo podrás buscar en toda la red la propiedad que necesitas para tu cliente.</p>    
  </div>

  <div in:fade={{ duration: 600 }} class="g-card">
    <h4 class="g-card__title">¿Qué tipo de propiedades puedo buscar?</h4>
    <p class="g-card__paragraph">Podrás encontrar Casas, Villas, Departamentos y Terrenos, pero seguimos trabajando para poder extender el tipo de propiedades que se podrán publicar en la plataforma y así crecer el catálogo de todos los <strong>Coworkers</strong></p>
  </div>

  <div in:fade={{ duration: 600 }} class="g-card">
    <h4 class="g-card__title">¿Qué beneficios obtengo?</h4>
    <p class="g-card__paragraph">Si eres broker inmobiliario, sigue estos pasos para darte de alta en la plataforma y poder <strong>buscar y compartir tus propiedades en venta o renta con toda la red</strong> de casasydepas.net</p>
  </div>

  <div class="accordion mb-4" id="accordion">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          1.- Solicita tu acceso
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordion">
        <div class="accordion-body">
          <p class="g-card__paragraph">
            Puedes llamarnos o enviarnos un mensaje de WhatsApp al
            <em>teléfono
              <a href="https://wa.me/527444545657/?text=%C2%A1Hola!%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20para%20tener%20mi%20cuenta%20en%20la%20plataforma%20de%20casasydepas.net,%20gracias." target="_blank" rel="noopener noreferrer">(744) 454 5657</a>
            </em>, para brindarte toda la información para tu acceso a la plataforma. 
          </p>
          <p class="g-card__paragraph"><strong>Comienza a vender más rápido con la ayuda de toda la comunidad de Coworkers.</strong></p>
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          2.- Busca una propiedad
        </button>
      </h2>
      <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordion">
        <div class="accordion-body">
          <p class="g-card__paragraph">
            Busca la propiedad que necesites para tu cliente ya sea una casa, departamento o terreno en venta o renta, ponte en contacto con el <strong>Coworker</strong> que público la propiedad para afinar detalles y concretar una cita.
          </p>
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          3.- Publica tus propiedades
        </button>
      </h2>
      <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordion">
        <div class="accordion-body">
          <p class="g-card__paragraph">
            Publica las propiedades que quieras compartir con los <strong>Coworkers de la red de casasydepas.net</strong>, impulsa tus ventas con la ayuda de toda la comunidad.
          </p>
        </div>
      </div>
    </div>

  </div>

</main>

</div>

<style>
  
  h4 {
    font-weight: 500;
    line-height: 1.2;
    color: #3a4a59;
  }

  .accordion {
    --bs-accordion-active-bg: #101419;
    --bs-accordion-bg: #edf1ff;
    --bs-accordion-active-bg: #abd0ff;
  }
</style>