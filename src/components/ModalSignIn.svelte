<script>
  // firebase
  import { auth } from "../firebase/config.js";
  import { signInWithEmailAndPassword } from "firebase/auth";
  // spa-router
  import { push } from "svelte-spa-router";
  // user de stores - variable de estado global
  import { brokerName } from '../stores/authStore.js'
  // toastify-js
  import { toastifyMessage } from "../lib/toastify.js";

  // función de login - modalSignIn
  let email = "";
  let password = "";
  
  const handleEmailLogin = async () => {
  // función login
    try {
      await signInWithEmailAndPassword(auth, email, password);
      push("/mis-propiedades");
      handleResetForm();
      // toastifyMessage(`¡Hola ${email.split("@", 1).join("").split("_", 2).join(" ")} bienvenido!`, "success");
      toastifyMessage(`¡Hola ${$brokerName} bienvenido!`, "success");
    } catch (error) {
      // console.log('error mensaje', error.message)
      // console.log('error codigo', error.code)

      if (error.code === "auth/too-many-requests") {
        toastifyMessage(
          "Demasiados intentos fallidos, intenta ingresar mas tarde o ponte en contacto con el administrador del sitio web",
          "deny"
        );
      } else if (error.code === "auth/user-not-found") {
        toastifyMessage("Ingresa un usuario valido", "deny");
        document.getElementById("email").focus();
      } else if (error.code === "auth/wrong-password") {
        toastifyMessage("Contraseña incorrecta", "deny");
        document.getElementById("password").focus();
      } else if (error.code) {
        toastifyMessage(
          "Upss... algo salio mal, ponte en contacto con el administrador del sitio web",
          "deny"
        );
      }
    }
  };

  // función que resetea los valores del formulario - modalSignIn
  const handleResetForm = () => {
    // @ts-ignore
    document.getElementById("form-signin").reset();
    const modalSignIn = document.querySelector("#modalSignIn");
    // @ts-ignore
    const modal = bootstrap.Modal.getInstance(modalSignIn);
    modal.hide();
  };
</script>

<!-- modalSignIn -->
<div
  class="modal fade"
  id="modalSignIn"
  tabindex="-1"
  aria-labelledby="ModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="ModalLabel">Coworking Inmobiliario</h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>

      <div class="modal-body">
        <form id="form-signin" on:submit|preventDefault={handleEmailLogin}>
          <label for="email">Correo:</label>
          <input
            type="email"
            name="email"
            id="email"
            bind:value={email}
            class="form-control mb-3"
            placeholder="usuario@casasydepas.net"
            required
          />

          <label for="password">Contraseña:</label>
          <input
            type="password"
            name="password"
            id="password"
            bind:value={password}
            class="form-control mb-3"
            placeholder="********"
            required
          />

          <button type="submit" class="btn btn-primary">Ingresar</button>
        </form>
        <div class="pt-4">
          <h6 class="text-dark">
            No tienes una cuenta?<a
              href="https://wa.me/5217445889420"
              class="link-register"
              target="_blank">Regístrate</a
            >
          </h6>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .link-register {
    color: #6610f2;
    margin-left: 0.2rem;
  }
</style>
