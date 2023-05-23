<script>
  import { onMount } from "svelte";
  // firebase
  import {addDoc, collection } from "firebase/firestore";
  import { auth, db } from "../../firebase/config.js";
  // spa-router
  import { push, replace } from "svelte-spa-router";
  // user de stores - variable de estado global
  import { user } from "../../stores/authStore.js";

  // función que comprueba si un usuario esta logeado, si lo esta, carga su pagina de usuario
  onMount(() => {
    auth.onAuthStateChanged((userLog) => {
      userLog ? user.set(userLog) : user.set(null);
      $user ? replace("/mi-cuenta/#/publicar-propiedades") : push("/");
    });
  });

  // form - object constructor propertie
  const email = $user.email
  const today = new Date().toLocaleDateString('es-MX')
  const propertie = {
    user: email,
    time_stamp: today,
    img_url_1: "",
    img_url_2: "",
    img_url_3: "",
    title: "",
    bedroom: "",
    bathroom: "",
    building: "",
    description: "",
    price: 0,
    commission: 0,
    shared: 0,
    transaction: "",
    tel: "",
  };
  console.log('email:', email)
  
  // función que crea una nueva propiedad en la db firestore - dentro de su usuario
  const handleSubmit = async () => {
    await addDoc(collection(db, "properties"), propertie);
    replace("/mi-cuenta/#/mis-propiedades")

    // console.log('objeto', propertie)
  };
</script>

<div class="container">
  <div class="text-center">
    <h1>Publicar propiedad</h1>
  </div>
  <hr />
  <p>
    Publica tus propiedades para llegar a más clientes, tambien puedes compartir
    tu propiedad con la red de asesores de casasydepas.net - Coworking
    Inmobiliario
  </p>

  <div class="container">
    <br />

    <form on:submit|preventDefault={handleSubmit}>
      <div class="mb-3">
        <label for="title" class="form-label">Títle</label>
        <input
          bind:value={propertie.title}
          type="text"
          class="form-control"
          id="title"
          placeholder="Casa en Venta de 2 niveles en el fraccionamiento la marquesa"
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Descripción</label>
        <textarea
          bind:value={propertie.description}
          class="form-control"
          id="description"
          rows="3"
          placeholder="Casa en excelente estado en venta en el fraccionamiento la marquesa, cuenta con 3 recámaras, 2 baños, cocina, sala, comedor ..."
        />
      </div>
      <button class="btn btn-primary">Enviar</button>
    </form>

    <br />
  </div>

  <hr />
  <br />
  <h2>UX - UI</h2>
  <ul>
    <li>Llena formulario</li>
    <li>Envia formulario</li>
    <i><li>Resetear formulario</li></i>
    <i><li>replace('/mis-propiedades')</li></i>
  </ul>
</div>
