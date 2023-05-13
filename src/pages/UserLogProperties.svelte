<script>
  import { onMount } from 'svelte'
  // firebase
  import { auth } from '../firebase/config.js'
  // spa-router
  import { push, replace } from 'svelte-spa-router'
  // user de stores - variable de estado global
  import { user } from '../stores/authStore.js'
  


    // función que comprueba si un usuario esta logeado, si lo esta, carga su pagina de propiedades
    onMount(() => {
        auth.onAuthStateChanged((userLog) => {
        userLog ? user.set(userLog) : user.set(null)
        $user ? push('/mis-propiedades') : replace('/')

        //TODO
        // crear una función que traega de la base de datos de firestore todas las propiedades que el asesro ha dado de alta, utilizando su cuenta de correo y contraseña.

        // crear una funcion que sirva para que el asesor logeado con su correo y contraseña pueda dar de alta una nueva propiedad por medio de un formulario
      })
    })
</script>

<h1>Mis propiedades</h1>
<p>Aqui se mostrarán <strong>las propiedades que el asesor haya dado de alta para vender o rentar</strong></p>
<hr>

<p>En esta página <strong>se mostrarán todas las propiedades que el asesor haya dado del alta</strong> para venta o renta</p>
<ul>
  <li>el asesor podra administrar las propiedades</li>
  <li>tendra un enlace al formulario para dar de alta una propiedad en VENTA o RENTA</li>
  <li>podra eliminar propiedades (si ya la vendio o ya no quiero compartir la propiedad con los demas asesores y publico en general)</li>
</ul>

<hr>
<h3>configuración de firestore - base de datos</h3>
<ul>
  <li>1er caso, el usuario se logea y no tiene ninguna propiedad dada de alta, MOSTRAR mensaje de bienvenida.</li>
  <li>2do caso, el usuario ya dio de alta 1 propiedad, cuando se LOGEA de nuevo, mostrar las propiedades que tiene dadas de alta.</li>
  <li>3er caso, mientras el usuario este LOGEADO, mostrar las propiedades que tenga dadas de alta y el formulario para dar de alta una nueva propiedad</li>
</ul>