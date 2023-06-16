<script>
  import { fade } from "svelte/transition";
  // firebase
  import { db } from "../../firebase/config.js";
  import { collection, getDocs, query, where } from "firebase/firestore";
  // dataProperties de stores - variable de estado global
  import { viewPropertie } from "../../stores/dataProperties";
  // user de stores - variable de estado global
  import { user } from "../../stores/authStore.js";

  // params
  export let params;
  const idPropertie = params.propertie.split('_')[1]

  // función que trae de la db la propiedad a visualizar.
  let properties = [];
  async function querySnapShot() {
    if(!$viewPropertie){
      const docsRef = collection(db, "properties");
      const queryRef = query(docsRef, where("id", "==", `${idPropertie}`));
      const querySnapshot = await getDocs(queryRef);
      querySnapshot.forEach((propertie) => {
        properties.push({...propertie.data()});
      });
      viewPropertie.set(properties);
    }
  }
  const getPropertie = querySnapShot()

  const returnView = () => window.history.back();
</script>

<div class="p-4 wrapper">
  

  <main>

    <div class="container mb-3">
      <button class="btn btn-link" on:click={returnView}>
        Regresar <span> <img src="/icons/return.svg" alt="arrow return"></span>
      </button>
    </div>

    {#await getPropertie }

      <p class="loading">Buscando...</p>

      {:then}

      {#if !$viewPropertie}

      <h5 class="text-center">La propiedad ya no se encuentra disponible.</h5>

      {/if}

      {#each $viewPropertie as propertie}

      <div in:fade={{ duration: 600 }} class="container pb-4">


      <div class="text-center mb-4">
        <h1 class="text-primary">{propertie.title}</h1>
        <span class="badge text-bg-dark">{propertie.address.development.toUpperCase() || propertie.address.colony.toUpperCase()}</span>
      </div>

      <div class="container-galery">
        <div id="carousel" class="carousel carousel-dark slide">
          
          <div class="carousel-inner">

            {#each propertie.imagesUrl as image, index}
              <div class={`carousel-item ${index == 0 ? 'active' : ''}`}>
                <img src={image.url} class="d-block w-100 min-render" alt={propertie.title}>
              </div>
            {/each}

            <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div class="description">
          <div class={`tag-${propertie.transaction} mb-3 text-center`}>
            <span>{propertie.transaction || "VENTA"}</span>
          </div>

          <div class="mb-3">
            <h5 class="text-info">Precio</h5>
            <h4 class="fields-card">{`$${Number(propertie.price).toLocaleString("en")} MXN` || "0.00"}</h4>
          </div>

          <div class="mb-3">
            <h5 class="text-info">Distribución</h5>
            <div class="d-flex gap-2 mb-2 align-items-center fields-card" >
              <div class="d-flex gap-1">
                <spam class="distribution">{propertie.bedroom || "0"}</spam>
                <spam class="opacity-75"><img class="opacity-75" src="/icons/bed.svg" alt="bedroom" width="28" height="28"/></spam>
              </div>
              <div class="d-flex gap-1">
                <spam class="distribution">{propertie.bathroom || "0"}</spam>
                <spam class="opacity-75"><img class="opacity-75" src="/icons/shower.svg" alt="bathroom" width="28" height="28"/></spam>
              </div>
              <div class="d-flex gap-1">
                <spam class="distribution">{`${propertie.land ? propertie.land : "0"}`}</spam>
                <spam class="opacity-75"><img class="opacity-75" src="/icons/land.svg" alt="land" width="28" height="28"/></spam>
              </div>
              <div class="d-flex gap-1">
                <spam class="distribution">{`${propertie.building}` || "0"}</spam>
                <spam class="opacity-75"><img class="opacity-75" src="/icons/rule.svg" alt="building" width="28" height="28"/></spam>
                <spam>m²</spam>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <h5 class="text-info">Datos de contacto</h5>
            <span class="badge text-bg-dark mb-1">Agente Inmobiliario</span>
            <h5 class="text-dark-emphasis fields-card">{propertie.broker || 'casasydepas.net'}</h5>
            <a href={`tel:${propertie.tel}`} class="btn btn-primary">Llamar asesor</a>
            <a target="_blank" href={`https://wa.me/521${propertie.whatsapp}`} class="btn btn-success">WhatsApp</a>
          </div>

          <div class="mb-3">
            <span class="badge text-bg-dark mb-1">Fecha de alta</span>
            <p class="fields-card">{propertie.time_stamp || '00/00/0000'}</p>
          </div>

        </div>
      </div>

      <!-- <div class="mb-2">
        <h5 class="text-info">Características</h5>
        <p class="fields-info">{propertie.features || '* Terraza * Jardín * Alberca * Área de juegos'}</p>
      </div> -->

      <div class="mb-2">
        <h5 class="text-info">Descripción</h5>
        <p class="fields-info">{propertie.description}</p>
      </div>

      <div class="mb-2">
        <h5 class="text-info">Dirección</h5>
        <p class="fields-info">{`${propertie.address.direction}, ${propertie.address.colony}, ${propertie.address.city}, ${propertie.address.estate}, ${propertie.address.postal}` || "No se proporcionó la dirección de la propiedad"}</p>
      </div>

      {#if $user}
      <div class="mb-2">
        
          
        <h5 class="text-info">Comentarios / Notas del asesor</h5>
        <div class="fields-info">
          <div class="d-flex align-items-center gap-2 mb-3">
            <h6 class="text-primary m-0">Comisión</h6>
            <p class="badge text-bg-dark m-0">{propertie.commission}</p>
  
            <h6 class="text-primary m-0">Comparto el</h6>
            <p class="badge text-bg-dark m-0">{propertie.shared}</p>
          </div>
          <p>{propertie.notes || 'El asesor no dejo ninguna nota.'}</p>
        </div>
      </div>
      {/if}

    </div>
  
    {/each}

    {/await}

   

  </main>
</div>

<style>

  .loading {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

.wrapper {
  min-height: 100%;
  background-color: #edf1f4;
  /* background-color: #f2f5f7; */
}

  h5,
  h6 {
    font-weight: 500;
    line-height: 1.2;
  }

  .fields-card,
  .fields-info {
    background-color: #fdfefe;
    color: #1c1a1c;
    border-radius: .2rem;
  }

  .fields-card {
    padding: .6rem .4rem; 
  }

  .fields-info {
    padding: 1rem;
    white-space: pre-line;
  }

  .container-galery {
    width: 100%;
    display: flex;
    gap: 1rem;
    margin: .5rem 0 3rem 0;
    justify-content: space-evenly;
    align-items: center;
  }

  .carousel {
    width: fit-content;
  }

  .carousel-inner {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  .min-render {
    width: 100%;
    height: 100%;
    min-height: inherit;
    object-fit: cover;
    object-position: center;
  }

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

  @media (max-width: 995px) {
    .container-galery {
      flex-direction: column;
      margin: .5rem auto 1rem auto;
    }

    .description {
    width: 100%;
  }
  }

  @media (max-width: 768px) {
    .carousel {
      width: 100%;
      margin: auto;
    }

    .carousel-inner {
    width: 100%;
    height: 100%;
    max-height: 480px;
    border-radius: 8px;
    margin: auto;
  }
}

</style>