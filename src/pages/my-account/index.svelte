<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  // firebase
  import { auth, db } from "../../firebase/config.js";
  import { collection, getDocs, query, where } from "firebase/firestore";
  // components
  import CardsProperties from "../../components/CardsProperties.svelte";
  // spa-router
  import { link, push, replace } from "svelte-spa-router";
  // variable de estado global
  import {
    user,
    userEmail,
    propertiesUser,
    limitPropertiesUser
  } from "../../stores/authStore.js";

  // función que comprueba si un usuario esta logeado, si lo esta, carga su pagina de propiedades
  onMount(() => {
    auth.onAuthStateChanged(async (userLog) => {
      userLog ? user.set(userLog) : user.set(null);
      $user ? replace("/mi-cuenta/#/mis-propiedades") : push("/");

       // función que consulta las propiedades del usuario logeado
      let properties = [];
      if (!$user) {
        propertiesUser.set([]);
      }
      const docsRef = collection(db, "properties");
      const queryRef = query(docsRef, where("user", "==", `${$userEmail}`));
      const querySnapshot = await getDocs(queryRef);
      querySnapshot.forEach((propertie) => {
        properties.push({...propertie.data()});
      });
      propertiesUser.set(properties);

    });
    // imagesPropertie.set([]);
  });
</script>

<div class="container">
  <div class="text-center">
    <h1 class="g-title">Mis propiedades</h1>
    <p class="g-paragraph">Administra tus propiedades</p>
  </div>
  <hr style="color: transparent; margin: 2rem 0;" />

  <div class="container" in:fade={{ duration: 600 }}>
    <div class="container-btn-upload-propertie">
      {#if $propertiesUser.length < $limitPropertiesUser}
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
          compartir con la red de Coworkers Inmobiliarios de casasydepas.net
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
