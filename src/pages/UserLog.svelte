<script>
    import { onMount } from 'svelte'
    // firebase
    import { auth } from '../firebase/config.js'
    // spa-router
    import { push, replace } from 'svelte-spa-router'
    // user de stores - variable de estado global
    import { user } from '../stores/authStore.js'

    // función que comprueba si un usuario esta logeado, si lo esta, carga su pagina de usuario
    onMount(() => {
        auth.onAuthStateChanged((userLog) => {
        userLog ? user.set(userLog) : user.set(null)
        $user ? push('/mi-informacion') : replace('/')
        })
    })
</script>


<h1 class="text-center">Mi información de perfil</h1>
<strong>
    <p>Aqui el usuario tendra acceso a sus datos de contacto, y podra modificar la siguiente información</p>
</strong>
<ul>
    <li>
        <p>nombre y apellido del asesor inmobiliario</p>
    </li>
    <li>
        <p>nombre de la inmobiliaria / en caso de aplicar</p>
    </li>
    <li>
        <p>correo electronico</p>
    </li>
    <li>
        <p>telefono</p>
    </li>
    <li>
        <p>whatsapp</p>
    </li>
    <li>
        <p>una pequeña descripcion de si mismo (cuanto tiempo tiene trabajando en el ramo, que quiere de los asesores con los que comparte sus propiedades, el horario que maneja, en donde se encuentra regularmente, etc. etc.)</p>
    </li>
</ul>

