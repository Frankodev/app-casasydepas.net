<script>
  import { onMount } from "svelte";
  // firebase
  import { addDoc, collection } from "firebase/firestore";
  import {
    auth,
    db,
    storageRef,
    uploadImages,
    getUrl,
  } from "../../firebase/config.js";
  // spa-router
  import { push, replace } from "svelte-spa-router";
  // user de stores - variable de estado global
  import { user, propertiesUser, imagesPropertie } from "../../stores/authStore.js";
  // toastify-js
  import { toastifyMessage } from "../../lib/toastify.js";

  // variables de entorno
  const allPropertiesUser = $propertiesUser;
  const email = $user.email;
  const today = new Date().toLocaleDateString("es-MX");
  let urlImage = "";
  let images = [];
  const propertie = {
    user: email,
    time_stamp: today,
    img_url_1: "",
    img_url_2: "",
    img_url_3: "",
    transaction: "venta",
    title: "",
    property: "casa",
    price: "",
    commission: "5%",
    shared: "50%",
    tel: "",
    land: "",
    building: "",
    bedroom: "3",
    bathroom: "2",
    mid_bathroom: "1",
    description: "",
    notes: "",
  };

  // función que comprueba si un usuario esta logeado, si lo esta, carga su pagina de usuario
  onMount(() => {
    auth.onAuthStateChanged((userLog) => {
      userLog ? user.set(userLog) : user.set(null);
      $user ? replace("/mi-cuenta/#/publicar-propiedades") : push("/");
    });
  });

  // función que crea una nueva propiedad en la db firestore - dentro de su usuario
  const handleSubmit = async () => {
    console.log("enviando propiedad ...", propertie);
    allPropertiesUser.push(propertie);
    try {
      await addDoc(collection(db, "properties"), propertie);
      replace("/mi-cuenta/#/mis-propiedades");
      propertiesUser.set(allPropertiesUser);
    } catch (error) {
      toastifyMessage("Upss. Algo salió mal vuelve a intentarlo.", "deny");
    }
  };

  // función que carga las imagenes en el storage
  const handleImages = async (event) => {
    // colocar cada url a la posicion de los espacios de las imagenes que puede tener cada propiedad

    // tener un contador de imagenes, para que el usuario sepa que solo puede cargar 10 imagenes.
    // crear un indicardor dentro del formulario que solo puede cargar 10 imagenes
    // cada que cargue una imagen sobre escribir el indicador de cuantas imagenes aun puede subir
    // ejemplo de indicador 10/10 -> 9/10 -> 8/10 -> etc.

    try {
      const img = event.target.files[0];
      // const imagePath = storageRef(`properties/${img.name}`);
      const imagePath = storageRef(`${email.split("@", 1)}/${img.name}`);
      await uploadImages(imagePath, img);
      urlImage = await getUrl(imagePath);

      images.push(urlImage);
      imagesPropertie.set(images)
      console.log("array imagenes", images);

      // console.log("url imagen", urlImage);

      toastifyMessage("Imágen cargada con exito.", "success");
    } catch (error) {
      toastifyMessage("Upss. Algo salió mal vuelve a intentarlo.", "deny");
    }
  };
</script>

<div class="container">
  <div class="text-center">
    <h1>Publicar propiedad</h1>
    <p>
      Publica tus propiedades para llegar a más clientes y a toda la red de
      asesores de <br /> casasydepas.net - Coworking Inmobiliario
    </p>
  </div>
  <hr />


  <div class="container">
    <div class="d-flex gap-1">
      {#each $imagesPropertie as image}
      <div class="border border-2 border-primary border-opacity-75 rounded" style="overflow: hidden; object-fit: cover;">
        <img src={image} alt="" width="200" height="200">
      </div>
      {/each}
    </div>
  </div>

  <form>
    <div class="mb-3 pt-3">
      <input
        class="form-control"
        type="file"
        multiple
        on:change={handleImages}
      />
    </div>
  </form>

  <form class="form-properties" on:submit|preventDefault={handleSubmit}>
    <div class="row mb-3">
      <div class="col col-auto">
        <label for="transaction" class="form-label">Operación</label>
        <select
          class="form-select"
          aria-label="Default select"
          name="transaction"
          id="transaction"
          bind:value={propertie.transaction}
        >
          <option value="venta" selected>Venta</option>
          <option value="renta">Renta</option>
        </select>
      </div>

      <div class="col col-auto">
        <label for="property" class="form-label">Tipo</label>
        <select
          class="form-select"
          aria-label="Default select"
          name="property"
          id="property"
          bind:value={propertie.property}
        >
          <option value="casa" selected>Casa</option>
          <option value="departamento">Departamento</option>
          <option value="terreno">Terreno</option>
        </select>
      </div>

      <div class="col">
        <label for="title" class="form-label">Título</label>
        <input
          bind:value={propertie.title}
          name="title"
          type="text"
          maxlength="88"
          class="form-control"
          id="title"
          placeholder="Casa en Venta de 2 niveles en la Col. Costa Azul, en Acapulco, Gro."
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <label for="price" class="form-label">Precio</label>
        <input
          bind:value={propertie.price}
          name="price"
          type="number"
          min="0"
          max="9999999"
          class="form-control"
          id="price"
          placeholder="1,250,000"
        />
      </div>

      <div class="col">
        <label for="commission" class="form-label">Comisión</label>
        <select
          class="form-select"
          aria-label="Default select"
          name="commission"
          id="commission"
          bind:value={propertie.commission}
        >
          <option value="0%">0%</option>
          <option value="3%">3%</option>
          <option value="4%">4%</option>
          <option selected>5%</option>
          <option value="6%">6%</option>
        </select>
      </div>

      <div class="col">
        <label for="shared" class="form-label">Comparto</label>
        <select
          class="form-select"
          aria-label="Default select"
          name="shared"
          id="shared"
          bind:value={propertie.shared}
        >
          <option value="0%">0%</option>
          <option value="30%">30%</option>
          <option value="40%">40%</option>
          <option selected>50%</option>
        </select>
      </div>

      <div class="col">
        <label for="tel" class="form-label">Teléfono</label>
        <input
          class="form-control"
          type="tel"
          name="tel"
          id="tel"
          placeholder="7441237788"
          bind:value={propertie.tel}
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <label for="land" class="form-label">Terreno m²</label>
        <input
          bind:value={propertie.land}
          name="land"
          type="number"
          min="0"
          max="9999"
          class="form-control"
          id="land"
          placeholder="120"
        />
      </div>

      <div class="col">
        <label for="building" class="form-label">Construcción m²</label>
        <input
          bind:value={propertie.building}
          name="building"
          type="number"
          min="0"
          max="9999"
          class="form-control"
          id="building"
          placeholder="220"
        />
      </div>

      <div class="col">
        <label for="bedroom" class="form-label">Recámaras</label>
        <select
          class="form-select"
          name="bedroom"
          id="bedroom"
          bind:value={propertie.bedroom}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3" selected>3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="+7">+7</option>
        </select>
      </div>

      <div class="col col-md-2">
        <label for="bathroom" class="form-label">Baños</label>
        <select
          class="form-select"
          name="bathroom"
          id="bathroom"
          bind:value={propertie.bathroom}
        >
          <option value="1">1</option>
          <option value="2" selected>2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="+7">+7</option>
        </select>
      </div>

      <div class="col col-md-2">
        <label for="mid_bathroom" class="form-label">½ Baños</label>
        <select
          class="form-select"
          name="mid_bathroom"
          id="mid_bathroom"
          bind:value={propertie.mid_bathroom}
        >
          <option value="1">1</option>
          <option value="2" selected>2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="+7">+7</option>
        </select>
      </div>
    </div>

    <div class="mb-3">
      <label for="description" class="form-label"
        >Descripción de la propiedad</label
      >
      <textarea
        bind:value={propertie.description}
        name="description"
        maxlength="1498"
        class="form-control"
        id="description"
        rows="3"
        placeholder="Casa en venta en excelente estado, ubicada en la Colonia Costa Azul, a 2 cuadras de la Costera Miguel Alemán, en Acapulco, Gro. Cuenta con 3 recámaras, 2 baños, cocina, sala, comedor ..."
      />
    </div>

    <div class="mb-3">
      <label for="notes" class="form-label">Notas para los asesores</label>
      <textarea
        bind:value={propertie.notes}
        name="notes"
        maxlength="1498"
        class="form-control"
        id="notes"
        rows="3"
        placeholder="* El pago de la comisión es de $50,000 mil pesos, comparto el 50%.
* La casa se entrega sin muebles, se dejan los 3 aires acondicionados."
      />
    </div>

    <button class="btn btn-primary">Publicar propiedad</button>
  </form>
</div>

<style>
  .form-properties {
    margin: 2rem 0;
  }

  .row {
    gap: 1rem;
  }

  .col {
    padding: 0;
  }

  @media (max-width: 768px) {
    .row {
      flex-direction: column;
    }

    textarea {
      height: 10rem;
    }
  }
</style>
