<script>
  // firebase
  import { auth } from '../firebase/config.js'
  // spa-router
  import { link } from 'svelte-spa-router'
  import active from 'svelte-spa-router/active'
  // user de stores - variable de estado global
  import { user, propertiesUser, limitPropertiesUser } from '../stores/authStore.js'

  const handleLogOut = async () => {
    await auth.signOut()
    user.set(null)
  }

  // función que cierra la sesión del usuario despues de 30 minutos

</script>

<nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid nav-max-width">

      <a class="nav-link" use:link use:active href="/">
        <span class="navbar-brand logo">casasydepas.net</span>
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <li class="nav-item">
            <a class="nav-link " use:link use:active href="/ventas-rentas">Venta / Renta</a>
          </li>

          <!-- class="nav-link disabled" -->
          <!-- <li class="nav-item">
            <a class="nav-link disabled" use:link use:active href="/marketplace">Marketplace</a>
          </li> -->

          {#if $user}
          <li class="nav-item">
            <a class="nav-link disabled" use:link use:active href="/buscador">Buscar propiedad</a>
          </li>
          {/if}

          {#if $user}
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active-link" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Mi cuenta</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" use:link use:active href="/mi-cuenta/#/mis-propiedades">Administrar mis propiedades</a></li>
              {#if $propertiesUser.length < $limitPropertiesUser}
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" use:link use:active href="/mi-cuenta/#/publicar-propiedades">Publicar propiedad</a></li>
              <!-- <li><hr class="dropdown-divider"></li> -->
              {/if}
              <!-- <li><a class="dropdown-item" use:link use:active href="/mi-cuenta/#/mi-informacion">Mi información</a></li> -->
            </ul>
          </li>
          {/if}

        </ul>

      {#if $user}
      <button on:click={handleLogOut} class="btn btn-outline-danger">Cerrar sesión</button>
      {:else}
      <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalSignIn">Ingresar</button>
      {/if}
        
      </div>
    </div>
  </nav>

  <style>
    
    .active-link {
      font-weight: 500;
      color: #000000e6;
    }

    .nav-max-width {
      max-width: 1100px;
    }
  </style>