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
      <img src={propertie.img_url_1} width="250" alt={propertie.title}>
      <img src={propertie.img_url_2} width="250" alt={propertie.title}>
      <img src={propertie.img_url_3} width="250" alt={propertie.title}>
    </div>
    <h1>{params.propertie.split('-').join(' ')}</h1>
    <p>${propertie.price}</p>
    <p>{propertie.description}</p>
    <a href={`tel:${propertie.tel}`} class="btn btn-primary">Contactar asesor</a>
    {/each}
    
  </div>

</div>