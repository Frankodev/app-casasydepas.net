<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  // firebase
  import { auth } from "../../firebase/config.js";
  // components
  import CardsProperties from "../../components/CardsProperties.svelte";
  // spa-router
  import { link, push, replace } from "svelte-spa-router";
  // variable de estado global
  import {
    user,
    userEmail,
    brokerName,
    propertiesUser,
    imagesPropertie,
  } from "../../stores/authStore.js";

  // función que comprueba si un usuario esta logeado, si lo esta, carga su pagina de propiedades
  onMount(async () => {
    auth.onAuthStateChanged((userLog) => {
      userLog ? user.set(userLog) : user.set(null);
      $user ? replace("/mi-cuenta/#/mis-propiedades") : push("/");

      // constructor del nombre del asesor logeado
      if(userLog) {
        let fullName = [];
        const names = $userEmail.split("@", 1).join("").split("_", 2);
        names.forEach((name) => {
        const upperCase = name[0].toUpperCase();
        const wordSubString = name.substring(1);
        const full = `${upperCase}${wordSubString}`;
        fullName.push(full);
      });
      const broker = fullName.join(" ");
      brokerName.set(broker)
      console.log('broker:', broker)
      }

    });
    imagesPropertie.set([]);
  });
</script>

<div class="container">
  <div class="text-center">
    <h1>Mis propiedades</h1>
    <h6>Bienvenido a la red de casasydepas.net - Coworking Inmobiliario</h6>
  </div>
  <hr style="color: transparent; margin: 2rem 0;" />

  <div class="container" in:fade={{ duration: 600 }}>
    <div class="container-btn-upload-propertie">
      {#if $propertiesUser.length < 10}
      <a
        use:link
        href="/mi-cuenta/#/publicar-propiedades"
        class="btn btn-primary upload-propertie">Publicar propiedad</a
      >
      {/if}
    </div>

    {#if $propertiesUser.length}
      <CardsProperties properties={$propertiesUser} />
    {:else}
      <div class="text-center p-4">
        <p>
          Comienza a dar de alta las propiedades en venta o renta que quieras
          compartir en la red de casasydepas.net - Coworking Inmobiliario
        </p>
        <a
          use:link
          href="/mi-cuenta/#/publicar-propiedades"
          class="btn btn-primary">Publicar propiedad</a
        >
      </div>
    {/if}
  </div>
</div>

<style>
  .container-btn-upload-propertie {
    position: relative;
  }

  .upload-propertie {
    position: absolute;
    top: -2.4rem;
    right: 0.4rem;
  }
</style>
