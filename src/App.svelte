<script>
  import { onMount } from "svelte";
  // spa-router
  import Router from "svelte-spa-router";
  import { routes } from "./router/router.js";
  // components
  import Nav from "./components/Nav.svelte";
  import ModalSignIn from "./components/ModalSignIn.svelte";
  // firebase
  import { auth } from "./firebase/config.js";
  // spa-router
  import { push, replace } from "svelte-spa-router";

  // user de stores - variable de estado global
  import { user, propertiesUser } from "./stores/authStore.js";

  onMount(async () => {
    // función que comprueba si un usuario esta logeado
    auth.onAuthStateChanged(async (userLog) => {
      userLog ? user.set(userLog) : user.set(null);
      $user ? replace("/mi-cuenta/#/mis-propiedades") : push("/");
      $user ? console.log("user App", $user.email) : console.log('NO hay user')

      // condicional para eliminar propiedades del usuario deslogeado
      if ($user === null) {
        propertiesUser.set([]);
      }
    });

  });
</script>

<main>
  <Nav />
  <Router {routes} />

  <slot />

  <ModalSignIn />
</main>
