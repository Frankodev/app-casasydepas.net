<script>
  import { onMount } from 'svelte'
  // spa-router
  import Router from 'svelte-spa-router'
  import { routes } from './router/router.js'
  // components
  import Nav from './components/Nav.svelte'
  import ModalSignIn from "./components/ModalSignIn.svelte"
  // firebase
  import { auth } from './firebase/config.js'
  // spa-router
  import { push, replace } from 'svelte-spa-router'

  // user de stores - variable de estado global
  import { user } from './stores/authStore.js'

  // función que comprueba si un usuario esta logeado, si lo esta, carga su sección de usuario (información y propiedades)
  onMount(() => {
    auth.onAuthStateChanged((userLog) => {
      userLog ? user.set(userLog) : user.set(null)
      $user ? replace('/mis-propiedades') : push('/')
      console.log('user app', $user)
    })
  })

</script>

<main>
  <Nav />
  <Router {routes} />

  <slot />

  <ModalSignIn />
</main>