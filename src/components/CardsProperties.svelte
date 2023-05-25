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
  // components

  // prop - componente
  export let properties;

  // función para mostrar propiedades en su propia página
  const getPorpertie = (title) => {
    const propertieView = $dataProperties.filter(
      (propertie) => propertie.title === title
    );
    viewPropertie.set(propertieView);
    console.log(propertieView)
  };
</script>

<div class="row row-cols-1 row-cols-md-3 g-4 row-prop">
  {#each properties as propertie}
    <div class="col">
      <div class="card h-100" style="width: 19rem; margin: auto;">
        <!-- <img src={propertie.img_url || $imagePreview} class="card-img-top" alt={propertie.title} style="height: 13rem; object-fit: cover;"> -->

        <div
          id={propertie.title.split(" ").join("")}
          class="carousel carousel-dark slide"
          data-bs-ride="true"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target={`#${propertie.title.split(" ").join("")}`}
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target={`#${propertie.title.split(" ").join("")}`}
              data-bs-slide-to="1"
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target={`#${propertie.title.split(" ").join("")}`}
              data-bs-slide-to="2"
              aria-label="Slide 3"
            />
          </div>

          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src={propertie.img_url_1 || $imagePreview}
                class="d-block w-100"
                style="height: 13rem; object-fit: cover; border-radius: 4px 4px 0 0;"
                alt={propertie.title}
              />
            </div>
            <div class="carousel-item">
              <img
                src={propertie.img_url_2 || $imagePreview}
                class="d-block w-100"
                style="height: 13rem; object-fit: cover; border-radius: 4px 4px 0 0;"
                alt={propertie.title}
              />
            </div>
            <div class="carousel-item">
              <img
                src={propertie.img_url_3 || $imagePreview}
                class="d-block w-100"
                style="height: 13rem; object-fit: cover; border-radius: 4px 4px 0 0;"
                alt={propertie.title}
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target={`#${propertie.title.split(" ").join("")}`}
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true" />
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target={`#${propertie.title.split(" ").join("")}`}
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true" />
            <span class="visually-hidden">Next</span>
          </button>
          <!-- {`tag${propertie.transaction}`} | tag-sale - tag-rent -->
          <div class={`tag-${propertie.transaction}`}>
            <span>{propertie.transaction || 'VENTA'}</span>
          </div>
        </div>

        <div class="card-body border-top border-light">
          <h5 class="card-title text-primary">
            {`${propertie.title.substring(0,28)}` || "No hay un título para esta propiedad"}
          </h5>
          <h4 class="card-title">{`$${Number(propertie.price).toLocaleString('en')} MXN` || "0.00"}</h4>
          <!-- <h4 class="card-title">${propertie.price || "0.00"}</h4> -->
          <div class="d-flex gap-3 mb-2" style="height: 21px;">
            <div class="d-flex gap-1"><spam>{propertie.bedroom || '?'}</spam> <spam><img src="/icons/bed.svg" alt="bedroom"></spam></div>
            <div class="d-flex gap-1"><spam>{propertie.bathroom || '?'}</spam> <spam><img src="/icons/shower.svg" alt="bathroom"></spam></div>
            <div class="d-flex gap-1"><spam>{`${propertie.building} m²` || '?'}</spam> <spam><img src="/icons/rule.svg" alt="building"></spam></div>
          </div>
          <p class="card-text ellipsis">
            {`${propertie.description.substring(0,51)}...` ||
              "No hay una descripción para esta propiedad"}
          </p>

          <a
            use:link
            href={`/ventas-rentas/#/${propertie.title.split(" ").join("-")}`}
            on:click={getPorpertie(propertie.title)}
            class="btn btn-primary">Ver más info</a
          >
        </div>

        {#if $user}
          <div class="card-footer text-center">
            <small class="text-muted">
              Comisión {propertie.commission ||"0%"}, Comparto el {propertie.shared || "0%"}
            </small>
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>

<style>
  .tag-venta, .tag-renta {
    position: absolute;
    top: .1rem;
    right: .1rem;
    padding: .1rem .6rem;
    font-weight: 600;
    text-transform: uppercase;
    color: azure;
    border-radius: 4px;
  }

  .tag-venta {
    background-color: #fd7e14;
  }

  .tag-renta {
    background-color: #20c997;
  }

  @media (max-width: 768px) {
  .row-cols-md-3>* {
    padding: 0;
  }
}
</style>