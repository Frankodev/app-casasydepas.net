<script>
  // dataProperties de stores - variable de estado global
  import { viewPropertie } from "../../stores/dataProperties";
  // spa-router
  import { link } from "svelte-spa-router";
  // user de stores - variable de estado global
  import { user } from "../../stores/authStore.js";
  import { each } from "svelte/internal";
  export let params;

  console.log("propiedad para renderizar", $viewPropertie);

  const returnUser = () => window.history.back();
</script>

<div class="container p-4">
  <div class="mb-3">
    <button class="btn btn-link" on:click={returnUser}>
      Regresar <span>&#11148;</span>
    </button>
  </div>

  <main>
    {#each $viewPropertie as propertie}

      <h1 class="text-center mb-4 text-primary">{params.propertie.split("-").join(" ")}</h1>

      <div class="container-galery">
        <div id="carousel" class="carousel slide carousel-fade">
          <div class="carousel-inner">
            {#each propertie.imagesUrl as image, index}
              <div class={`carousel-item ${index == 0 ? 'active' : ''}`}>
                <img src={image} class="d-block w-100" alt={propertie.title}>
              </div>
            {/each}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <div>
          <div class="mb-3">
            <h5 class="text-info mb-0">PRECIO</h5>
            <h4>{`$${Number(propertie.price).toLocaleString("en")} MXN` || "0.00"}</h4>
          </div>

          <div class="mb-3">
            <h5 class="text-info mb-0">CARACTERÍSTICAS</h5>
            <div class="d-flex gap-2 mb-2 align-items-center" style="height: 21px;">
              <div class="d-flex gap-1">
                <spam>{propertie.bedroom || "?"}</spam>
                <spam><img src="/icons/bed.svg" alt="bedroom"/></spam>
              </div>
              <div class="d-flex gap-1">
                <spam>{propertie.bathroom || "?"}</spam>
                <spam><img src="/icons/shower.svg" alt="bathroom"/></spam>
              </div>
              <div class="d-flex gap-1">
                <spam>{`${propertie.land ? propertie.land : "?"}`}</spam>
                <spam><img src="/icons/land.svg" alt="land"/></spam>
              </div>
              <div class="d-flex gap-1">
                <spam>{`${propertie.building}` || "?"}</spam>
                <spam><img src="/icons/rule.svg" alt="building"/></spam>
                <spam>m²</spam>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <h5 class="text-info mb-1">TELÉFONO DE CONTACTO</h5>
            <a href={`tel:${propertie.tel}`} class="btn btn-primary">Contactar asesor</a>
          </div>
        </div>
      </div>

      <div class="mb-2">
        <h5 class="text-info">DESCRIPCIÓN</h5>
        <p>{propertie.description}</p>
      </div>

      
    {/each}

    

    <h5 class="text-info">COMENTARIOS PARA EL ASESOR</h5>
    <h5 class="text-info">
      COMISION, COMENTARIOS Y CUANTO COMPARTE - <strong>SOLO A ASESORES LOGEADOS</strong>
    </h5>
  </main>
</div>

<style>
  .container-galery {
    width: 100%;
    display: flex;
    gap: 1rem;
    margin: .5rem 0 3rem 0;
    justify-content: space-evenly;
  }

  .carousel {
    width: fit-content;
  }

  .carousel-inner {
    width: 32rem;
    height: 22rem;
    border-radius: 8px;
  }

  /* .carousel-item {
    width: ;
  } */

  @media (max-width: 768px) {
    .container-galery {
      flex-direction: column;
      margin: .5rem auto 1rem auto;
    }

    .carousel {
      width: 100%;
      margin: auto;
    }

    .carousel-inner {
    width: 100%;
    height: 100%;
    max-width: 360px;
    max-height: 480px;
    border-radius: 8px;
    margin: auto;
  }
    }
</style>