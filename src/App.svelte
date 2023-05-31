<script>
  import { onMount } from "svelte";
  // spa-router
  import Router from "svelte-spa-router";
  import { routes } from "./router/router.js";
  // components
  import Nav from "./components/Nav.svelte";
  import ModalSignIn from "./components/ModalSignIn.svelte";
  // firebase
  import { auth, db } from "./firebase/config.js";
  import { collection, getDocs, query, where } from "firebase/firestore";
  // spa-router
  import { push, replace } from "svelte-spa-router";

  // variable de estado global
  import { user, userEmail, propertiesUser } from "./stores/authStore.js";
  import { dataProperties } from "./stores/dataProperties.js";

  onMount(() => {
    // función que comprueba si un usuario esta logeado
    auth.onAuthStateChanged(async (userLog) => {
      userLog ? user.set(userLog) : user.set(null);
      userLog ? userEmail.set(userLog.email) : userEmail.set(null);
      $user ? replace("/mi-cuenta/#/mis-propiedades") : push("/");

      console.log('user:', $userEmail)

      // función que consulta las propiedades del usuario logeado
      let properties = [];
      if (!$user) {
        propertiesUser.set([]);
      }
      const docsRef = collection(db, "properties");
      const queryRef = query(docsRef, where("user", "==", `${$userEmail}`));
      const querySnapshot = await getDocs(queryRef);
      querySnapshot.forEach((propertie) => {
        // properties.push(propertie.data(), propertie.id);
        properties.push({...propertie.data(), id: propertie.id});
      });
      propertiesUser.set(properties);
      // dataProperties.set(properties);
    });
  });
</script>

<div>
  <Nav />
  <Router {routes} />

  <slot />

  <ModalSignIn />
</div>
