<script>
  import { onMount } from "svelte";
  // firebase
  import { auth } from "./firebase/config.js";
  // dataProperties de stores - variable de estado global
  import { dataProperties } from "./stores/dataProperties.js";
  // spa-router
  import Router from "svelte-spa-router";
  import { routes } from "./router/router.js";
  // components
  import Nav from "./components/Nav.svelte";
  import ModalSignIn from "./components/ModalSignIn.svelte";

  // variable de estado global
  import { user, userEmail } from "./stores/authStore.js";

  onMount(() => {
    // función que comprueba si un usuario esta logeado
    auth.onAuthStateChanged(async (userLog) => {
      userLog ? user.set(userLog) : user.set(null);
      userLog ? userEmail.set(userLog.email) : userEmail.set(null);
      // $user ? replace("/mi-cuenta/#/mis-propiedades") : push("/");
    });
    });
</script>


<Nav />
<Router {routes} />

<slot />

<ModalSignIn />

