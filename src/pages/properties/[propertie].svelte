<script>
  // dataProperties de stores - variable de estado global
  import { viewPropertie } from "../../stores/dataProperties";
  // user de stores - variable de estado global
  import { user } from "../../stores/authStore.js";
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
          <div class={`tag-${propertie.transaction} mb-3 text-center`}>
            <span>{propertie.transaction || "VENTA"}</span>
          </div>

          <div class="mb-3">
            <h5 class="text-info">Precio</h5>
            <h4>{`$${Number(propertie.price).toLocaleString("en")} MXN` || "0.00"}</h4>
          </div>

          <div class="mb-3">
            <h5 class="text-info">Distribución</h5>
            <div class="d-flex gap-2 mb-2 align-items-center opacity-75" style="height: 21px;">
              <div class="d-flex gap-1">
                <spam class="distribution">{propertie.bedroom || "?"}</spam>
                <spam><img class="opacity-75" src="/icons/bed.svg" alt="bedroom" width="28" height="28"/></spam>
              </div>
              <div class="d-flex gap-1">
                <spam class="distribution">{propertie.bathroom || "?"}</spam>
                <spam><img class="opacity-75" src="/icons/shower.svg" alt="bathroom" width="28" height="28"/></spam>
              </div>
              <div class="d-flex gap-1">
                <spam class="distribution">{`${propertie.land ? propertie.land : "?"}`}</spam>
                <spam><img class="opacity-75" src="/icons/land.svg" alt="land" width="28" height="28"/></spam>
              </div>
              <div class="d-flex gap-1">
                <spam class="distribution">{`${propertie.building}` || "?"}</spam>
                <spam><img class="opacity-75" src="/icons/rule.svg" alt="building" width="28" height="28"/></spam>
                <spam>m²</spam>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <h5 class="text-info">Datos de contacto</h5>
            <span class="badge text-bg-dark mb-1">Agente Inmobiliario</span>
            <h5 class="text-dark-emphasis">{propertie.broker}</h5>
            <a href={`tel:${propertie.tel}`} class="btn btn-primary">Llamar asesor</a>
            <a target="_blank" href={`https://wa.me/521${propertie.whatsapp}`} class="btn btn-success">WhatsApp</a>
          </div>

          <div class="mb-3">
            <span class="badge text-bg-dark">Fecha de alta</span>
            <p>{propertie.time_stamp || '00/00/0000'}</p>
          </div>

        </div>
      </div>

      <div class="mb-2">
        <h5 class="text-info">Características</h5>
        <p>{propertie.features || '* Terraza * Jardín * Alberca * Área de juegos'}</p>
      </div>

      <div class="mb-2">
        <h5 class="text-info">Descripción</h5>
        <p>{propertie.description}</p>
      </div>

      <div class="mb-2">
        <h5 class="text-info">Ubicación</h5>
        <p>{propertie.direction}</p>
      </div>

      {#if $user}
      <div class="mb-2">
        <div class="d-flex align-items-center gap-2 mb-3">
          <h6 class="text-info m-0">Comisión</h6>
          <p class="badge text-bg-dark m-0">{propertie.commission}</p>

          <h6 class="text-info m-0">Comparto el</h6>
          <p class="badge text-bg-dark m-0">{propertie.shared}</p>
        </div>
          
        <h5 class="text-info">Comentarios / Notas del asesor</h5>
        <p>{propertie.notes || 'El asesor no dejo ninguna nota.'}</p>
      </div>
      {/if}

      
    {/each}

  </main>
</div>

<style>

  h5,
  h6 {
    font-weight: 500;
    line-height: 1.2;
  }
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

  /* Tag VENTAS / RENTAS */
.tag-venta,
.tag-renta {
    width: 100%;
    padding: 0.2rem 0.6rem;
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .28rem;
    color: azure;
    border-radius: 4px;
  }

  .tag-venta {
    background: rgb(221,25,0);
    background: linear-gradient(172deg, rgba(221,25,0,1) 0%, rgba(249,85,39,1) 35%, rgba(255,42,0,1) 100%);
  }

  .tag-renta {
    background: rgb(137,141,255);
    background: linear-gradient(172deg, rgba(137,141,255,1) 0%, rgba(80,181,255,1) 35%, rgba(0,202,255,1) 100%);
  }

  .distribution {
    font-size: 18px;
    font-weight: 500;
  }

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