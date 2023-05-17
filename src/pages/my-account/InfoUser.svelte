<script>
  import { onMount } from "svelte";
  // firebase
  import { auth } from "../../firebase/config.js";
  // spa-router
  import { push, replace } from "svelte-spa-router";
  // user de stores - variable de estado global
  import { user } from "../../stores/authStore.js";

  // función que comprueba si un usuario esta logeado, si lo esta, carga su pagina de usuario
  onMount(() => {
    auth.onAuthStateChanged((userLog) => {
      userLog ? user.set(userLog) : user.set(null);
      $user ? replace("/mi-cuenta/#/mi-informacion") : push("/");
    });
  });
</script>

<div class="container">
  <div class="text-center">
    <h1 class="text-center">Mi información de perfil</h1>
    <strong>
      <p>
        Aquí el usuario tendra acceso a sus datos de contacto, y podrá modificar
        la siguiente información
      </p>
    </strong>
  </div>
  <hr />

  <ul>
    <li>nombre y apellido del asesor inmobiliario</li>
    <li>nombre de la inmobiliaria / en caso de aplicar</li>
    <li>correo electronico</li>
    <li>telefono</li>
    <li>whatsapp</li>
    <li>
      una pequeña descripcion de si mismo (cuanto tiempo tiene trabajando en el
      ramo, que quiere de los asesores con los que comparte sus propiedades, el
      horario que maneja, en donde se encuentra regularmente, etc. etc.)
    </li>
  </ul>
</div>
