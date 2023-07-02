<script>
  import { fade } from "svelte/transition";
  // firebase
  import { db } from "../../firebase/config.js";
  import { collection, getDocs, query, where } from "firebase/firestore";
  // dataProperties de stores - variable de estado global
  import { viewPropertie } from "../../stores/dataProperties";
  // user de stores - variable de estado global
  import { user } from "../../stores/authStore.js";

  // components 
  import Spinner from '../../components/Spinner.svelte'

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

<div class="wrapper">
  <main>
    <div class="container">
      <button class="btn btn__return" on:click={returnView}>
        <span><img src="/icons/arrow_left.svg" alt="arrow return"></span> Regresar 
      </button>
    </div>

    {#await getPropertie }
      
      <Spinner />

      {:then}

      {#if !$viewPropertie}

      <h5 class="text-center">La propiedad ya no se encuentra disponible.</h5>

      {/if}

      {#each $viewPropertie as propertie}

      <div in:fade={{ duration: 600 }} class="container pb-4">


      <div class="text-center mb-4">
        <h1 class="propertie__title">{propertie.title}</h1>
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
          <div class="fields-card">
            
            <div class={`tag-${propertie.transaction} mb-3 text-center`}>
              <span>{propertie.transaction || "VENTA"}</span>
            </div>

            <div class="mb-3 pt-3">
              <h5 class="title">Precio</h5>
              <h4>{`$${Number(propertie.price).toLocaleString("en")} MXN` || "0.00"}</h4>
            </div>
  
            <div class="mb-3 pt-3">
              <h5 class="title">Datos de contacto</h5>
              <span class="badge text-bg-dark mb-1">Coworker Inmobiliario</span>
              <h4 class="text-dark-emphasis">{propertie.broker || 'Coworker'}</h4>

              <div class="btns__call-broker">
                <a href={`tel:${propertie.tel}`} class="btn btn__call">
                  Llamar asesor
                  <span><img src="/icons/phone.svg" alt="whatsapp"></span>
                </a>
  
                <a target="_blank" href={`https://wa.me/52${propertie.whatsapp}`} class="btn btn__message">
                  Enviar
                  <span><img src="/icons/message.svg" alt="whatsapp"></span>
                </a>
              </div>

            </div>
  
            <div class="mb-3 pt-3">
              <span class="badge text-bg-dark mb-1">Fecha de alta</span>
              <h5>{propertie.time_stamp || '00/00/0000'}</h5>
            </div>
          </div>

        </div>
      </div>

      <!-- <div class="mb-2">
        <h5 class="title">Características</h5>
        <p class="fields-info">{propertie.features || '* Terraza * Jardín * Alberca * Área de juegos'}</p>
      </div> -->

      <div class="mb-2 fields-card">
        <h5 class="title">Distribución</h5>
        
        <div class="distribution">

          <div class="distribution__items">
            <p class="distribution__item">
              <spam><img src="/icons/land.svg" alt="land" width="26" height="26"/></spam>
              <spam class="distribution__propertie">{`${propertie.land ? propertie.land : "0"}m²`}</spam>
              | Terreno
            </p>
          </div>

          <div class="distribution__items">
            <p class="distribution__item">
              <spam><img src="/icons/rule.svg" alt="building" width="26" height="26"/></spam>
              <spam class="distribution__propertie">{`${propertie.building ? propertie.building : "0"}m²`}</spam>
              | Construcción
            </p>
          </div>

          <div class="distribution__items">
            <p class="distribution__item">
              <spam><img src="/icons/parking.svg" alt="bedroom" width="26" height="26"/></spam>
              <spam class="distribution__propertie">{propertie.parking || "1"}</spam>
              Estacionamientos
            </p>
          </div>

          <div class="distribution__items">
            <p class="distribution__item">
              <spam><img src="/icons/bed.svg" alt="bedroom" width="26" height="26"/></spam>
              <spam class="distribution__propertie">{propertie.bedroom || "1"}</spam>
              Recámaras
            </p>
          </div>

          <div class="distribution__items">
            <p class="distribution__item">
              <spam><img src="/icons/shower.svg" alt="bathroom" width="26" height="26"/></spam>
              <spam class="distribution__propertie">{propertie.bathroom || "1"}</spam>
              Baños completos
            </p>
          </div>

          <div class="distribution__items">
            <p class="distribution__item">
              <spam><img src="/icons/mid_bathroom.svg" alt="bathroom" width="26" height="26"/></spam>
              <spam class="distribution__propertie">{propertie.mid_bathroom || "0"}</spam>
              ½ Baños
            </p>
          </div>

        </div>
      </div>

      <div class="mb-2 fields-card">
        <!-- <h5 class="title">Descripción</h5> -->
        <h5 class="title">Más información</h5>
        <p class="fields-info">{propertie.description}</p>
      </div>

      <div class="mb-2 fields-card">
        <h5 class="title">Dirección</h5>
        <p class="fields-info">{`${propertie.address.direction}, ${propertie.address.colony}, ${propertie.address.city}, ${propertie.address.estate}, ${propertie.address.postal}` || "No se proporcionó la dirección de la propiedad"}</p>
      </div>

      {#if $user}
      <div class="mb-2">
        
          
        <h5 class="title">Comentarios / Notas del asesor</h5>
        <div class="fields-brokers">
          <div class="d-flex align-items-center gap-2 mb-3">
            <h6 class="text-dark fw-bold m-0">Comisión</h6>
            <p class="badge text-bg-light p-2 fw-bold m-0">{propertie.commission}</p>
  
            <h6 class="text-dark fw-bold m-0">Comparto el</h6>
            <p class="badge text-bg-light p-2 fw-bold m-0">{propertie.shared}</p>
          </div>
          <p class="fields-info">{propertie.notes || 'El asesor no dejo ninguna nota.'}</p>
        </div>
      </div>
      {/if}

    </div>
  
    {/each}

    {/await}

   

  </main>
</div>

<style>

.wrapper {
    min-height: 100vh;
    padding: 1.5rem;
  }

  h1,
  h4,
  h5,
  h6 {
    font-weight: 500;
    line-height: 1.2;
    color: #3a4a59;
  }

  .propertie__title {
    font-size: 2.5rem;
  }

  .btns__call-broker {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: .4rem;
  }

  .btn__return,
  .btn__call,
  .btn__message {
    width: max-content;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .3rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    animation: all .4s ease;

  }

  .btn__return {
    background-color: #425cc7;
    background-color: #d9def4;
    color: #fff;
    color: #2e408b;
    font-size: .98rem;
    font-weight: bold;
    padding: .2rem 1rem;
  }

  .btn__return:hover span {
    transform: translate(-2.4px, 0);
    -webkit-transform: translate(-2.4px, 0);
    -moz-transform: translate(-2.4px, 0);
    -ms-transform: translate(-2.4px, 0);
  }

  .btn__call,
  .btn__message {
    color: #fff;
    font-weight: 600;
  }

  .btn__call {
    background: #ff2131;
  }

  .btn__call:hover {
    background: #ef2533;
  }

  .btn__message {
    background: linear-gradient(172deg, #21ff30 0%, #198854 35%, #11912f 100%);
  }
  
  .btn__message:hover {
    background: linear-gradient(172deg, #21ff30 0%, #167247 35%, #11912f 100%);
  }


  /* fields cards */
  .title {
    color: #ff2131;
    font-weight: 600;
    text-transform: uppercase;
    font-family: "Nunito", sans-serif;
    letter-spacing: .8px;
    font-size: 1rem;
  }

  .fields-card {
    background-color: #fdfefe;
    color: #1c1a1c;
    color: #202021;
    padding: 1rem;
    border-radius: .2rem;
    box-shadow: 0 1px 2px 0 rgb(0, 0, 0, 25%);
  }

  .fields-brokers {
    background-color: #abd0ff;
    color: #1c1a1c;
    border-radius: .2rem;
  }

  .fields-info,
  .fields-brokers {
    padding: 1rem;
    white-space: pre-line;
  }

  .container-galery {
    width: 100%;
    display: flex;
    gap: 1rem;
    margin: .5rem 0 3rem 0;
    justify-content: space-evenly;
    align-items: flex-start;
  }

  .carousel {
    width: fit-content;
  }

  .carousel-inner {
    width: 100%;
    height: 100%;
    max-height: 450px;
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
    background: #1D976C;
    background: -webkit-linear-gradient(to right, #31d76d, #1D976C);
    background: linear-gradient(to right, #31d76d, #1D976C); 
  }

  .tag-renta {
    background: #00d2ff;
    background: -webkit-linear-gradient(to left, #3a7bd5, #00d2ff);
    background: linear-gradient(to left, #3a7bd5, #00d2ff);
  }

  .description {
    min-width: 268px;
  }

  /* distribucion */
  .distribution {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
  }

  .distribution__items {
    display: flex;
    align-items: center;
  }

  .distribution__item {
    display: flex;
    align-items: center;
    gap: .4rem;
    margin: 1rem 0;

    font-size: .9rem;
    padding: .2rem .4rem;
    border-radius: 4px;
  }
  
  .distribution__propertie {
    font-size: 18px;
    font-weight: 600;
  }


  /* medias queries */
  @media (max-width: 995px) {
    .wrapper {
    padding: .5rem;
    }

    .container-galery {
      flex-direction: column;
      margin: .5rem auto 1rem auto;
    }

    .description {
    width: 100%;
    }

  }

  @media (max-width: 768px) {
    .propertie__title {
    font-size: 1.5rem;
  }

    .carousel {
      width: 100%;
      margin: auto;
    }

    .carousel-inner {
    width: 100%;
    height: 100%;
    max-height: 480px;
    margin: auto;
  }
}

@media (max-width: 480px) {
  .distribution,
  .fields-info { 
    padding: 1rem 0;
  }

  .distribution {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }
}

</style>