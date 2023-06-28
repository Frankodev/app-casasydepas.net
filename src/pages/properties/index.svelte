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
          return { ...propertie.data() };
        });
        cardsRenders.set(false);
        dataProperties.set(data);
      },
      (err) => {
        toastifyMessage(`Ocurrio un error ${err}`, "deny");
      }
    );
    return $dataProperties
  });
  
  let dataProperty = $dataProperties
  let property = '';
  let transaction = '';
  
  const filterProperty = ({target}) => {
    property = target.value;
    if(property !== '') {
      const filterProperty = dataProperty.filter((prop) => prop.property === property)
      dataProperties.set(filterProperty);
    }else {
      dataProperties.set(dataProperty);
    }
  }

  const filterTransaction = ({target}) => {
    transaction = target.value;
    if(transaction !== '') {
      const filterTransaction = dataProperty.filter((prop) => prop.transaction === transaction)
      dataProperties.set(filterTransaction);
    }else {
      dataProperties.set(dataProperty);
    }
  }

</script>

<div class="container">
  <div class="text-center">
    <h1>Bienvenido</h1>
    <h6>
      Encuentra las mejores propiedades en la red de casasydepas.net - Coworking Inmobiliario
    </h6>
  </div>

  <main in:fade={{ duration: 600 }} class="mb-2">
    <form >
      <div class="row mt-4 mb-2">

        <div class="col col-md-4">
          <label class="form-label" for="property">Tipo de propiedad</label>
          <select
            class="form-select"
            name="property"
            id="property"
            bind:value={property}
            on:change={filterProperty}
          >
            <option value="" selected>Todas las propiedades</option>
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
          </select>
        </div>
  
        <div class="col col-md-4">
          <label class="form-label" for="transaction">Operación</label>
          <select
            class="form-select"
            name="transaction"
            id="transaction"
            bind:value={transaction}
            on:change={filterTransaction}
          >
            <option value="" selected>En venta y renta</option>
            <option value="venta">Venta</option>
            <option value="renta">Renta</option>
          </select>
        </div>

      </div>
    </form>
    {#if $cardsRenders}
      <CardsRender />
    {/if}
    <CardsProperties properties={$dataProperties} />
  </main>

</div>