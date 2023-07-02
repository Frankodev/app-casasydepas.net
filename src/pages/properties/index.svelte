<script>
  // @ts-nocheck
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  // firebase
  import { collection, onSnapshot, getDocs, query, limit } from "firebase/firestore";
  import { db } from "../../firebase/config.js";
  // components
  import CardsRender from "../../components/CardsRender.svelte";
  import CardsProperties from "../../components/CardsProperties.svelte";
  // toastify-js
  import { toastifyMessage } from "../../lib/toastify.js";
  // dataProperties de stores - variable de estado global
  import { dataProperties, cardsRenders, propertiesFilter } from "../../stores/dataProperties.js";

  onMount( async() => {
    let dataProps = []
    try {
      const queryLimit = query(collection(db, 'properties'), limit(10))
      // const querySnapshot = await getDocs(collection(db, 'properties'))
      const querySnapshot = await getDocs(queryLimit)
      querySnapshot.forEach((propertie) => {
        dataProps.push(propertie.data())
      })
      cardsRenders.set(false);
      dataProperties.set(dataProps);
      propertiesFilter.set($dataProperties);

    } catch (error) {
      toastifyMessage(`Ocurrio un error ${err}`, "deny");
    }
  });

  // Filtros
  let property = 'todas';
  let transaction = 'todas';
  // filtro Tipo de Propiedad
  const filterProperty = ({target}) => {
    property = target.value;
    if(property !== 'todas') {
      const filterProps = $dataProperties.filter((prop) => prop.property === property)
      propertiesFilter.set(filterProps);
    }else {
      propertiesFilter.set($dataProperties);
    }
  }
  // filtro Tipo de Operación
  const filterTransaction = ({target}) => {
    transaction = target.value;
    if(transaction !== 'todas') {
      const filterTransaction = $dataProperties.filter((prop) => prop.transaction === transaction)
      propertiesFilter.set(filterTransaction);
    }else {
      propertiesFilter.set($dataProperties);
    }
  }

</script>

<div class="container">
  <div class="text-center">
    <h1 class="g-title">Venta y Renta</h1>
    <p class="g-paragraph">Encuentra la propiedad que necesitas en la red de casasydepas.net</p>
  </div>

  <main in:fade={{ duration: 600 }} class="mb-2">
    <form>
      <div class="row mt-4 mb-2 filter">
        <div class="col col-md-3">
          <label class="form-label" for="property">Tipo de propiedad</label>
          <select
            class="form-select"
            name="property"
            id="property"
            bind:value={property}
            on:change={filterProperty}
          >
            <option value="todas" selected>Todas las propiedades</option>
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
            <option value="terreno">Terreno</option>
          </select>
        </div>
  
        <div class="col col-md-3">
          <label class="form-label" for="transaction">Operación</label>
          <select
            class="form-select"
            name="transaction"
            id="transaction"
            bind:value={transaction}
            on:change={filterTransaction}
          >
            <option value="todas" selected>Venta y Renta</option>
            <option value="venta">Venta</option>
            <option value="renta">Renta</option>
          </select>
        </div>

      </div>
    </form>

    <div in:fade={{ duration: 600 }}>
      {#if $cardsRenders}
      <CardsRender />
      {:else if $propertiesFilter.length > 0}
      <CardsProperties properties={$propertiesFilter} />
      {:else}
      <center class="mt-4">
        <h4 class="text-warning">No encontramos propiedades.</h4>
      </center>
      {/if}
    </div>
      

  </main>

</div>

<style>
  @media screen and (max-width: 765px) {
    .filter {
      flex-direction: column;
    }
  }
</style>