<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  // firebase
  import { auth, db } from "../../firebase/config.js";
  import { collection, getDocs, query, where } from "firebase/firestore";
  // components
  import CardsProperties from "../../components/CardsProperties.svelte";
  import CardsRender from "../../components/CardsRender.svelte";
  // spa-router
  import { link, push, replace } from "svelte-spa-router";
  // variable de estado global
  import { user, propertiesUser } from "../../stores/authStore.js";
  import { cardsRenders } from "../../stores/dataProperties.js";

  // función que comprueba si un usuario esta logeado, si lo esta, carga su pagina de propiedades
  onMount(() => {
    auth.onAuthStateChanged(async (userLog) => {
      userLog ? user.set(userLog) : user.set(null);
      $user ? replace("/mi-cuenta/#/mis-propiedades") : push("/");

      // función que consulta las propiedades del usuario logeado
      let properties = [];
      if ($user) {
        const docsRef = collection(db, "properties");
        const queryRef = query(docsRef, where("user", "==", `${$user.email}`));

        const querySnapshot = await getDocs(queryRef);
        querySnapshot.forEach((propertie) => {
          properties.push(propertie.data());
        });
        propertiesUser.set(properties);
        cardsRenders.set(false);
      }
    });
  });

  console.log("propertiesUser MY ACCOUNT", $propertiesUser);
</script>

<div class="container">
  <div class="text-center">
    <h1>Mis propiedades</h1>
    <h6>Bienvenido a la red de casasydepas.net - Coworking Inmobiliario</h6>    
  </div>
  <hr />

  <div class="container" in:fade={{ duration: 600 }}>

    {#if $cardsRenders}
      <CardsRender />
    {/if}
    {#if $propertiesUser.length}
      <CardsProperties properties={$propertiesUser} />
    {:else}
      <div class="text-center p-4">
        <p>
          Comienza a dar de alta las propiedades en venta o renta que quieras
          compartir en la red de casasydepas.net - Coworking Inmobiliario
        </p>
        <a use:link href="/mi-cuenta/#/publicar-propiedades" class="btn btn-primary">Publicar propiedad</a>
      </div>
    {/if}

  </div>

  <!-- Eliminar sección de abajo -->
  <hr />
  <ul>
    <li>el asesor podra administrar las propiedades</li>
    <li>
      tendra un enlace al formulario para dar de alta una propiedad en VENTA o
      RENTA
    </li>
    <li>
      podra eliminar propiedades (si ya la vendio o ya no quiero compartir la
      propiedad con los demas asesores y publico en general)
    </li>
  </ul>

  <hr />
  <h3>configuración de firestore - base de datos</h3>
  <ul>
    <li>
      1er caso, el usuario se logea y no tiene ninguna propiedad dada de alta,
      MOSTRAR mensaje de bienvenida.
    </li>
    <li>
      2do caso, el usuario ya dio de alta 1 propiedad, cuando se LOGEA de nuevo,
      mostrar las propiedades que tiene dadas de alta.
    </li>
    <li>
      3er caso, mientras el usuario este LOGEADO, mostrar las propiedades que
      tenga dadas de alta y el formulario para dar de alta una nueva propiedad
    </li>
  </ul>
</div>
