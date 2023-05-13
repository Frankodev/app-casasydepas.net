<script>
// @ts-nocheck
  // dataProperties de stores - variable de estado global
  import { dataProperties, imagePreview, viewPropertie } from '../stores/dataProperties.js'
  import { user } from '../stores/authStore.js'
  // spa-router
  import { link } from 'svelte-spa-router'

  // función para mostrar propiedades en su propia página
  const getPorpertie = (id) => {
    const propertieView = $dataProperties.filter(propertie =>  propertie.id === id)
    viewPropertie.set(propertieView)
  }
</script>

{#each $dataProperties as propertie}
        <div class="col">
          <div class="card h-100" style="width: 18rem; margin: auto;">
            <!-- <img src={propertie.img_url || $imagePreview} class="card-img-top" alt={propertie.title} style="height: 13rem; object-fit: cover;"> -->

            
            <div id={propertie.title.split(' ').join('')} class="carousel carousel-dark slide" data-bs-ride="true">
              <div class="carousel-indicators">
                <button type="button" data-bs-target={`#${propertie.title.split(' ').join('')}`} data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target={`#${propertie.title.split(' ').join('')}`} data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target={`#${propertie.title.split(' ').join('')}`} data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
             
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src={propertie.img_url_1 || $imagePreview} class="d-block w-100" style="height: 13rem; object-fit: cover; border-radius: 4px 4px 0 0;" alt={propertie.title}>
                </div>
                <div class="carousel-item">
                  <img src={propertie.img_url_2 || $imagePreview} class="d-block w-100" style="height: 13rem; object-fit: cover; border-radius: 4px 4px 0 0;" alt={propertie.title}>
                </div>
                <div class="carousel-item">
                  <img src={propertie.img_url_3 || $imagePreview} class="d-block w-100" style="height: 13rem; object-fit: cover; border-radius: 4px 4px 0 0;" alt={propertie.title}>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target={`#${propertie.title.split(' ').join('')}`} data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target={`#${propertie.title.split(' ').join('')}`} data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>

            <div class="card-body border-top border-light">
              <h4 class="card-title">${propertie.price || '0.00'}</h4>
              <h5 class="card-title">{propertie.title || 'No hay un título para esta propiedad'}</h5>
              <p class="card-text">{propertie.description || 'No hay una descripción para esta propiedad'}</p>

              <a use:link href={`/ventas-rentas/#/${propertie.title.split(' ').join('-')}`} on:click={getPorpertie(propertie.id)} class="btn btn-primary">Ver más</a>
              
            </div>

            {#if $user}
            <div class="card-footer">
              <small class="text-muted">Comparto el {propertie.shared || 0}% de mi comisión del {propertie.commission || 0}%</small>
            </div>
            {/if}
          </div>
        </div>
    {/each}