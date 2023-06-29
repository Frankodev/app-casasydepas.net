<script>
  // @ts-nocheck
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  // firebase
  import { collection, onSnapshot, getDocs } from "firebase/firestore";
  import { db } from "../../firebase/config.js";
  // components
  import CardsRender from "../../components/CardsRender.svelte";
  import CardsProperties from "../../components/CardsProperties.svelte";
  // toastify-js
  import { toastifyMessage } from "../../lib/toastify.js";
  // dataProperties de stores - variable de estado global
  import { dataProperties, cardsRenders } from "../../stores/dataProperties.js";

  onMount( async() => {
    // función que trae las propiedades que están almacenadas en firestore
    // const refOnSnaoShot = onSnapshot(
    //   collection(db, "properties"),
    //   (querySnapshot) => {
    //     const data = querySnapshot.docs.map((propertie) => {
    //       return { ...propertie.data() };
    //     });
    //     cardsRenders.set(false);
    //     dataProperties.set(data);
    //   },
    //   (err) => {
    //     toastifyMessage(`Ocurrio un error ${err}`, "deny");
    //   }
    //   );
    
    let data = []
    try {
      const querySnapshot = await getDocs(collection(db, 'properties'))
      querySnapshot.forEach((propertie) => {
        data.push(propertie.data())
      })
      cardsRenders.set(false);
      dataProperties.set(data);
      console.log(data)
    } catch (error) {
      toastifyMessage(`Ocurrio un error ${err}`, "deny");
    }
  });


  let dataProperty = $dataProperties
  let property = 'todas';
  let transaction = 'todas';
  
  const filterProperty = ({target}) => {
    property = target.value;
    if(property !== 'todas') {
      const filterProp = dataProperty.filter((prop) => prop.property === property)
      dataProperties.set(filterProp);
    }else {
      dataProperties.set(dataProperty);
    }
  }

  const filterTransaction = ({target}) => {
    transaction = target.value;
    if(transaction !== 'todas') {
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
    {#if $cardsRenders}
      <CardsRender />
      {:else if $dataProperties.length > 0}
      <CardsProperties properties={$dataProperties} />
      {:else}
      <center class="mt-4">
        <h4 class="text-warning">No encontramos propiedades.</h4>
      </center>
    {/if}
      

  </main>

</div>

<style>
  @media screen and (max-width: 798px) {
    .filter {
      flex-direction: column;
    }
  }
</style>