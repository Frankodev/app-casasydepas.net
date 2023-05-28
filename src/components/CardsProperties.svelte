<script>
  // @ts-nocheck
  // dataProperties de stores - variable de estado global
  import {
    dataProperties,
    imagePreview,
    viewPropertie,
  } from "../stores/dataProperties.js";
  import { user } from "../stores/authStore.js";
  // spa-router
  import { link } from "svelte-spa-router";

  // prop - componente
  export let properties;

  // función para mostrar propiedades en su propia página
  const getPorpertie = (title) => {
    const propertieView = $dataProperties.filter((propertie) => propertie.title === title);
    viewPropertie.set(propertieView);
  };

</script>

<div class="row row-cols-1 row-cols-md-3 g-4 row-prop">
  {#each properties as propertie}
    <div class="col">
      <div class="card h-100" style="width: 19rem; margin: auto;">
        <div
          id={propertie.title.split(RegExp(/s*([.,?:])s*/g), 1).join('').split(' ').join('')}
          class="carousel carousel-dark slide"
          data-bs-ride="true"
        >
          <div class="carousel-indicators">
            {#each propertie.imagesUrl as _, index}
              <button
                type="button"
                data-bs-target={`#${propertie.title.split(RegExp(/s*([.,?:])s*/g), 1).join('').split(' ').join('')}`}
                data-bs-slide-to={`${index}`}
                class={index == 0 ? "active" : " "}
                aria-current={index == 0 ? "true" : " "}
                aria-label={`Slide ${index + 1}`}
              />
            {/each}
          </div>

          <div class="carousel-inner">
            
            {#if !propertie.imagesUrl.length}
            <div class="carousel-item active" >
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
                  src={image}
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
            data-bs-target={`#${propertie.title.split(RegExp(/s*([.,?:])s*/g), 1).join('').split(' ').join('')}`}
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true" />
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target={`#${propertie.title.split(RegExp(/s*([.,?:])s*/g), 1).join('').split(' ').join('')}`}
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
            <span class="badge text-bg-light">{propertie.address.development.toUpperCase() || propertie.address.colony.toUpperCase()}</span>
          </div>
          <h4 class="card-title">
            {`$${Number(propertie.price).toLocaleString("en")} MXN` || "0.00"}
          </h4>
          
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
              <spam>{`${propertie.land ? propertie.land : "0"}`}</spam>
              <spam><img src="/icons/land.svg" alt="land"/></spam>
            </div>
            <div class="d-flex gap-1">
              <spam>{`${propertie.building}` || "0"}</spam>
              <spam><img src="/icons/rule.svg" alt="building"/></spam>
              <spam>m²</spam>
            </div>
          </div>

          <p class="card-text ellipsis">
            {`${propertie.description.substring(0, 51)}...` ||
              "No hay una descripción para esta propiedad"}
          </p>

          <a
            use:link
            href={`/ventas-rentas/#/${propertie.title.split(RegExp(/s*([.,?:])s*/g), 1).join('').split(' ').join('-')}`}
            on:click={getPorpertie(propertie.title)}
            class="btn btn-primary">Ver más info</a
          >
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
  .tag-venta,
  .tag-renta {
    position: absolute;
    top: 0.4rem;
    right: .4rem;
    padding: 0.1rem 0.6rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .08rem;
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

  @media (max-width: 768px) {
    .row-cols-md-3 > * {
      padding: 0;
    }
  }
</style>
