<script >
  // @ts-nocheck
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  // firebase
  import { getDocs, collection } from "firebase/firestore"
  import { db } from '../../firebase/config.js'
  // components
  import  CardsRender  from '../../components/CardsRender.svelte'
  import CardsProperties from '../../components/CardsProperties.svelte'
  // dataProperties de stores - variable de estado global
  import { dataProperties, cardsRenders } from '../../stores/dataProperties.js'

  onMount( async() => {
    console.log('propiedades cargadas', $dataProperties)
    // variable a setear en variable global dataProperties
    let setProperties = []
    
    // función que trae las propiedades que estan almacenadas en firestore
    if(!setProperties.length) {
      const querySnapshot = await getDocs(collection(db, 'properties'))
      const data = querySnapshot.docs
      data.forEach((doc) => {
        setProperties.push(doc.data())
      })

      // seteando la variable global dataProperties y cardsRenders
      dataProperties.set(setProperties)
      if( data.length ) {
      cardsRenders.set(false)
      }
    }
  })

</script>

<h1 class="text-center">Ventas y Rentas</h1>
<hr>

<div class="container" in:fade={{duration: 600}}>
  <div class="row row-cols-1 row-cols-md-3 g-4">

    <CardsProperties />

    {#if $cardsRenders}
      <CardsRender />
      <CardsRender />
      <CardsRender />
    {/if}

  </div>  
</div>

<hr>
<p>En esta página se mostraran todas las propiedades que los asesores hayan dado de alta desde su perfil para venta o renta</p>
<ul>
  <li> <strong>Mostrar</strong> todas las propiedades en venta y renta</li>
  <li>Crear una <strong>barra de busqueda</strong> para buscar propiedades por descripción (título - Casa en venta en mozimba)</li>
  <li>Crear un <strong>menu para poder filtrar</strong> propiedades por precio, tipo de propiedad (casa, departamento, terreno), etc.</li>
</ul>

<hr>
<h3>configuración de firestore - base de datos</h3>
<ul>
  <li>crear una función que este escuchando las actualizaciones de la base de datos de firestore, para renderizar las nuevas propiedades que se den de alta.</li>
</ul>

