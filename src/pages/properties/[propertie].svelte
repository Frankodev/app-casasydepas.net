<script>
  // dataProperties de stores - variable de estado global
  import { viewPropertie } from '../../stores/dataProperties'
  // spa-router
  import { link } from 'svelte-spa-router'
  // user de stores - variable de estado global
  import { user } from "../../stores/authStore.js";
  export let params

  console.log('propiedad para renderizar', $viewPropertie)
</script>

<div class="container p-4">
  <div class="pt-2">
    {#if $user}
    <a use:link href="/mi-cuenta/#/mis-propiedades">Regresar</a>
    {:else}
    <a use:link href="/ventas-rentas">Regresar</a>
    {/if}
  </div>

  <div>

    {#each $viewPropertie as propertie}
    
    <div class="mt-3">
      <h4 class="text-primary">IMAGENES</h4>
      <img src={propertie.img_url_1} width="250" alt={propertie.title}>
      <img src={propertie.img_url_2} width="250" alt={propertie.title}>
      <img src={propertie.img_url_3} width="250" alt={propertie.title}>
    </div>
    <h4 class="text-primary">TITULO</h4>
    <h1>{params.propertie.split('-').join(' ')}</h1>
    <h4 class="text-primary">PRECIO</h4>
    <p>${propertie.price}</p>
    <h4 class="text-primary">DESCRIPCION</h4>
    <p>{propertie.description}</p>
    <h4 class="text-primary">TELEFONO CONTACTO</h4>
    <a href={`tel:${propertie.tel}`} class="btn btn-primary">Contactar asesor</a>
    {/each}
    
    <h4 class="text-primary">COMO SE ENTREGA</h4>
    <h4 class="text-primary">COMISION Y CUANTO COMPARTE - <strong>SOLO A ASESORES LOGEADOS</strong></h4>
    
  </div>

</div>