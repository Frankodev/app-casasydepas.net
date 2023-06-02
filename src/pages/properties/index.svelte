<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  // firebase
  import { collection, onSnapshot } from "firebase/firestore";
  import { db } from "../../firebase/config.js";
  // components
  import CardsRender from "../../components/CardsRender.svelte";
  import CardsProperties from "../../components/CardsProperties.svelte";
  // toastify-js
  import { toastifyMessage } from "../../lib/toastify.js";
  // dataProperties de stores - variable de estado global
  import { dataProperties, cardsRenders } from "../../stores/dataProperties.js";

  onMount(() => {
    // función que trae las propiedades que están almacenadas en firestore
    onSnapshot(
      collection(db, "properties"),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((propertie) => {
          return { ...propertie.data(), id: propertie.id };
        });
        dataProperties.set(data);
        cardsRenders.set(false);
      },
      (err) => {
        toastifyMessage(`Ocurrio un error ${err}`, "deny");
      }
    );
  });
</script>

<div class="container">
  <div class="text-center">
    <h1>Ventas y Rentas</h1>
    <h6>
      Encuentra las mejores propiedades en la red de casasydepas.net - Coworking Inmobiliario
    </h6>
  </div>
  <hr />

  <main in:fade={{ duration: 600 }} class="mb-2">
    {#if $cardsRenders}
      <CardsRender />
    {/if}
    <CardsProperties properties={$dataProperties} />
  </main>

</div>