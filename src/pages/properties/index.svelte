<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  // firebase
  import { getDocs, collection, onSnapshot, doc } from "firebase/firestore";
  import { db } from "../../firebase/config.js";
  // components
  import CardsRender from "../../components/CardsRender.svelte";
  import CardsProperties from "../../components/CardsProperties.svelte";
  // toastify-js
  import {toastifyMessage} from '../../lib/toastify.js'
  // dataProperties de stores - variable de estado global
  import { dataProperties, cardsRenders } from "../../stores/dataProperties.js";

  onMount(async () => {
    // función que trae las propiedades que están almacenadas en firestore
    onSnapshot(
      collection(db, "properties"),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((prop) => {
          return { ...prop.data(), id: prop.id };
        });
        dataProperties.set(data);
        cardsRenders.set(false);
        console.log('dataProperties-global', $dataProperties)
      },
      (err) => {
        toastifyMessage(`Ocurrio un error ${err}`, 'deny');
        console.log(err);
      }
    );
  });

</script>

<div class="container">
  <div class="text-center">
    <h1>Ventas y Rentas</h1>
    <h6>Encuentra las mejores propiedades de la red de casasydepas.net - Coworking Inmobiliario</h6>
  </div>
  <hr />

  <div class="container" in:fade={{ duration: 600 }}>
    {#if $cardsRenders}
      <CardsRender />
    {/if}
    <CardsProperties properties={$dataProperties} />
  </div>

  <hr />
  <div>
    <p>
      En esta página se mostraran todas las propiedades que los asesores hayan
      dado de alta desde su perfil para venta o renta
    </p>
    <ul>
      <li><strong>Mostrar</strong> todas las propiedades en venta y renta</li>
      <li>
        Crear una <strong>barra de busqueda</strong> para buscar propiedades por
        descripción (título - Casa en venta en mozimba)
      </li>
      <li>
        Crear un <strong>menu para poder filtrar</strong> propiedades por precio,
        tipo de propiedad (casa, departamento, terreno), etc.
      </li>
    </ul>
  </div>
</div>
