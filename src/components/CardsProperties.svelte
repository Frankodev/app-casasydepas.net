<script>
  // @ts-nocheck
  // firebase
  import { deletePropertie, deleteToImg } from "../firebase/config.js";
  // stores - variable de estado global
  import {
    imagePreview,
    viewPropertie,
  } from "../stores/dataProperties.js";
  import { user, userEmail, propertiesUser } from "../stores/authStore.js";
  // toastify-js
  import { toastifyMessage } from "../lib/toastify.js";
  // spa-router
  import { link } from "svelte-spa-router";

  // prop - componente
  export let properties;

  // función para mostrar propiedades en su propia página
  const getPorpertie = (id) => {
    const propertieView = properties.filter((propertie) => propertie.id === id);
    viewPropertie.set(propertieView);
  };

  const deleteProperties = async ({ target }) => {
    try {
      const idPropertie = target.dataset.id;
      const newsPropertiesUser = $propertiesUser.filter((propertie) => propertie.id !== idPropertie)
      await deletePropertie(idPropertie)

      // función que elimina las imágenes del storage
      const propertie = $propertiesUser.filter((propertie) => propertie.id === idPropertie);
      const imagesPropertie = propertie[0].imagesUrl.map((image) => image.path);

      function getPathImage() {
        let path = imagesPropertie.pop()
        return path
      }
      
      async function imagesPop() {
        let path = getPathImage();
        await deleteToImg(path);
      }

      const delayClear = imagesPropertie.length * 1350
      let imgPath = setInterval(() => imagesPop(), 1250)
      setTimeout(() => { clearInterval(imgPath) }, delayClear)

      toastifyMessage("Se eliminó la propiedad de forma correcta.", "delete");
      propertiesUser.set(newsPropertiesUser)

    } catch (error) {
      toastifyMessage("No se pudo eliminar la propiedad.", "deny");
    }
  };
</script>

<div class="row row-cols-1 row-cols-md-3 g-4 row-prop">
  {#each properties as propertie}
    <div class="col">
      <div class="card h-100">
        <div
          id={`slide-${propertie.id}`}
          class="carousel carousel-dark slide"
          data-bs-ride="true"
        >
          <div class="carousel-indicators">
            {#each propertie.imagesUrl as _, index}
              <button
                type="button"
                data-bs-target={`#slide-${propertie.id}`}
                data-bs-slide-to={`${index}`}
                class={index == 0 ? "active" : " "}
                aria-current={index == 0 ? "true" : " "}
                aria-label={`Slide ${index + 1}`}
              />
            {/each}
          </div>

          <div class="carousel-inner">
            {#if !propertie.imagesUrl.length}
              <div class="carousel-item active">
                <img
                  src={$imagePreview}
                  class="d-block w-100 card-img-top"
                  style="height: 13rem; object-fit: cover; border-radius: 4px 4px 0 0;"
                  alt={propertie.title}
                />
              </div>
            {:else}
              {#each propertie.imagesUrl as image, index}
                <div class="carousel-item {index == 0 ? 'active' : ' '}">
                  <img
                    src={image.url}
                    class="d-block w-100 card-img-top"
                    style="height: 13rem; object-fit: cover; border-radius: 4px 4px 0 0;"
                    alt={propertie.title}
                  />
                </div>
              {/each}
            {/if}
          </div>

          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target={`#slide-${propertie.id}`}
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true" />
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target={`#slide-${propertie.id}`}
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true" />
            <span class="visually-hidden">Next</span>
          </button>
          <div class={`tag-${propertie.transaction}`}>
            <span>{propertie.transaction || "VENTA"}</span>
          </div>
        </div>

        <div class="card-body border-top border-light">
          <div class="mb-2">
            <h5 class="card-title text-primary mb-0">
              {`${propertie.title.substring(0, 28)}` ||
                "No hay un título para esta propiedad"}
            </h5>
            <span class="badge text-bg-light"
              >{propertie.address.development.toUpperCase() ||
                propertie.address.colony.toUpperCase()}</span
            >
          </div>
          <h4 class="card-title">
            {`$${Number(propertie.price).toLocaleString("en")} MXN` || "0.00"}
          </h4>

          <div
            class="d-flex gap-1 mb-2 align-items-center"
            style="height: 21px;"
          >
            <div class="distribution__item">
              <spam class="distribution__item-value">{propertie.bedroom || "0"}</spam>
              <spam><img src="/icons/bed.svg" alt="bedroom" /></spam>
            </div>
            <div class="distribution__item">
              <spam class="distribution__item-value">{propertie.bathroom || "0"}</spam>
              <spam><img src="/icons/shower.svg" alt="bathroom" /></spam>
            </div>
            <div class="distribution__item">
              <spam class="distribution__item-value">{`${ propertie.parking || "1"}`}</spam>
              <spam><img src="/icons/parking.svg" alt="parking" /></spam>
            </div>
            <div class="distribution__item">
              <spam class="distribution__item-value">{`${propertie.building}m²` || "0"}</spam>
              <spam><img src="/icons/rule.svg" alt="building" /></spam>
              <!-- <spam>m²</spam> -->
            </div>
          </div>

          <p class="card-text ellipsis">
            {`${propertie.description.substring(0, 51)}...` ||
              "No hay una descripción para esta propiedad"}
          </p>

          <a
            use:link
            href={`/ventas-rentas/#/${propertie.title
              .split(RegExp(/s*([.,?:])s*/g), 1)
              .join("")
              .split(" ")
              .join("-")}_${propertie.id}`}
            on:click={getPorpertie(propertie.id)}
            class="btn btn-primary">Ver más info</a
          >

          {#if propertie.user === $userEmail}
            <button
              data-id={propertie.id}
              class="btn btn-outline-danger"
              on:click={deleteProperties}>Eliminar</button
            >
          {/if}
        </div>

        {#if $user}
          <div class="card-footer text-center">
            <small class="text-muted">
              Comisión {propertie.commission || "0%"}, Comparto el {propertie.shared ||
                "0%"}
            </small>
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>

<style>
  .card {
    width: 19rem;
    margin: auto;
  }

  .tag-venta,
  .tag-renta {
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
    padding: 0.1rem 0.6rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08rem;
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

  /* card propiedades */
  .distribution__item {
    display: flex;
    align-items: center;
    gap: .25rem;

    background-color: #ebedee;
    padding: .25rem .50rem;
    border-radius: 4px;
  }

  .distribution__item-value {
    color: #0c0f12;
    font-weight: 600;
  }

  @media (max-width: 945px) {
    .row-cols-md-3>* {
    width: 36.333333%;
    }
  }

  @media (max-width: 768px) {

    .card {
      width: 21rem;
    }

    .row-cols-md-3 > * {
      padding: 0;
      width: 100%;
    }
  }

  @media (max-width: 375px) {
    .card {
      width: 17rem;
    }
  }
</style>
