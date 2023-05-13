<script >
  import { viewPropertie } from '../../stores/dataProperties'
  // spa-router
  import { link } from 'svelte-spa-router'
  
  export const params = {}

  console.log('propiedad para renderizar', $viewPropertie) // error pide 'params'

</script>



<div class="container">
  <div>
    <a use:link href="/ventas-rentas">Regresar</a>
  </div>

  <div>
    {#each $viewPropertie as propertie}
    <h1>{propertie.title}</h1>
    <p>Imagenes</p>
    <p>Imagenes</p>
    <p>Imagenes</p>
    <p>{propertie.price}</p>
    <p>{propertie.description}</p>
    <a href={`tel:${propertie.tel}`} class="btn btn-primary">Contactar asesor</a>
    {/each}
  </div>

  
  
</div>
<div>
    
  <br>
  <hr>
  <div>
      <ul>
          <li>Aqui es donde debe de ir el llamado a la base de datos de firestore</li>
          <li>Se debe de crear una función que haga una consulta de forma individual</li>
          <li>Le debo de pasar como argumento el id de la propiedad que quiero consultar</li>
          <li>Cuando firestore me responda con la información de la propiedad renderizar todo el componente con los estilos</li>
      </ul>
  </div>
    
</div>