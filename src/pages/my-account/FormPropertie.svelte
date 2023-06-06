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
    deleteToImg,
  } from "../../firebase/config.js";
  // spa-router
  import { push, replace } from "svelte-spa-router";
  // user de stores - variable de estado global
  import {
    user,
    userEmail,
    brokerName,
    propertiesUser,
    imagesPropertie,
  } from "../../stores/authStore.js";
  // toastify-js
  import { toastifyMessage } from "../../lib/toastify.js";
  // uuid
  import { v4 as uuidv4 } from "uuid"

  // función que comprueba si un usuario esta logeado, si lo esta, carga su pagina de usuario
  onMount(() => {
    auth.onAuthStateChanged((userLog) => {
      userLog ? user.set(userLog) : user.set(null);
      $user ? replace("/mi-cuenta/#/publicar-propiedades") : push("/");
    });
  });

   // constructor del nombre del asesor logeado
   if($user) {
     let fullName = [];
      const names = $userEmail.split("@", 1).join("").split("_", 2);
      names.forEach((name) => {
        const upperCase = name[0].toUpperCase();
        const wordSubString = name.substring(1);
        const names = `${upperCase}${wordSubString}`;
        fullName.push(names);
      });
      const brokerFullName = fullName.join(" ");
      brokerName.set(brokerFullName) 
   }

  // variables de entorno
  let urlImage = "";
  let images = [];
  let folder = `propertie_${uuidv4().split('-', 1).join('')}`;

  // constructor objeto propertie
  const allPropertiesUser = $propertiesUser;
  const email = $userEmail;
  const today = new Date().toLocaleDateString("es-MX");
  const broker = $brokerName;
  
  const propertie = {
    user: email,
    time_stamp: today,
    transaction: "venta",
    title: "",
    property: "casa",
    price: "",
    commission: "5%",
    shared: "50%",
    broker: broker,
    tel: "",
    whatsapp: "",
    land: "",
    building: "",
    bedroom: "2",
    bathroom: "1",
    mid_bathroom: "0",
    address: {direction: "", development: "", colony: "", city: "", estate: "Guerrero", postal: ""},
    description: "",
    notes: "",
  };

  // función que carga las imagenes en el storage
  const handleImages = async (event) => {
    try {
      const img = event.target.files[0];
      // referencia en donde se creará la carpeta y contendra las imgs
      const imagePath = storageRef(`${email.split("@", 1)}/${folder}/${img.name}`);
      await uploadImages(imagePath, img);

      urlImage = await getUrl(imagePath);
      toastifyMessage("Imágen cargada con exito.", "success");
      images.push({ url: urlImage, path: imagePath.fullPath });
      imagesPropertie.set(images);
    } catch (error) {
      toastifyMessage("Upss. Algo salió mal vuelve a intentarlo.", "deny");
    }
  };

  // función para eliminar imágenes del storage
  const imageDelete = async ({ target }) => {
    try {
      const imagePathDelete = target.dataset.path;
      await deleteToImg(imagePathDelete);
      
      const newImages = $imagesPropertie.filter((image) => image.path !== imagePathDelete);
      imagesPropertie.set(newImages);
      toastifyMessage("Se eliminó la imagen.", "delete");
    } catch (error) {
      toastifyMessage("No se pudo eliminar la imagen.", "deny");
    }
  };

  // función que crea una nueva propiedad en la db firestore - dentro de su usuario
  const handleSubmit = async () => {
    allPropertiesUser.push({ ...propertie, imagesUrl: $imagesPropertie });
    try {
      await addDoc(collection(db, "properties"), {...propertie, imagesUrl: $imagesPropertie});

      toastifyMessage("Tu propiedad se ha publicado exitosamente.", "success");
      propertiesUser.set(allPropertiesUser);
      // @ts-ignore
      document.getElementById("form").reset();
      imagesPropertie.set([]);
      replace("/mi-cuenta/#/mis-propiedades");
    } catch (error) {
      toastifyMessage("Upss. Algo salió mal vuelve a intentarlo.", "deny");
    }
  };
</script>

<div class="container relative">
  <div class="text-center">
    <h1>Publicar propiedad</h1>
    <p>
      Publica tus propiedades para llegar a más clientes y a toda la red de
      asesores de <br /> casasydepas.net - Coworking Inmobiliario
    </p>
  </div>
  <hr />

  <div class="carrousel-images">
    <div class="d-flex gap-1 carrousel">
      {#if !$imagesPropertie.length}
        <div
          class="border border-2 border-primary border-opacity-75 rounded d-flex justify-content-center align-items-center"
          style="overflow: hidden; object-fit: cover; width: 104px; height: 104px;"
        >
          <img
            src="/icons/add_photo.svg"
            alt="add_photo"
            width="48"
            height="48"
          />
        </div>
      {/if}

      {#each $imagesPropertie as image}
      <div class="relative">
        <button
          class="close-image bg-danger border rounded-circle"
          on:click={imageDelete}
          data-path={image.path}
        >
          X
        </button>
        <img
          src={image.url}
          alt="Imagen de la propiedad"
          class="border rounded border-2 border-primary border-opacity-75"
          style="object-fit: cover;"
          width="148"
          height="148"
        />
      </div>
      {/each}
        
    </div>
  </div>

  <form
    class="form-properties"
    on:submit|preventDefault={handleSubmit}
    id="form">
    <div class="mb-5">
      {#if $imagesPropertie.length < 10}
        <input
          name="files"
          id="files"
          class="form-control"
          style="background-color: #f8f8f8;"
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          size="2500000"
          on:change={handleImages}
        />
      {/if}
      <label for="files" class="form-label badge text-bg-primary">
        Sube las mejores fotos <span class="badge bg-danger">{$imagesPropertie.length}/10</span>
      </label>
    </div>

    <div class="mb-3">
      <h2 class="badge text-bg-dark">Tipo de operación</h2>
      <div class="row mt-0">
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
            required
          />
        </div>
      </div>
    </div>

    <div class="row mb-4 mt-0">
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
          required
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

      <div class="col col-md-2">
        <label for="tel" class="form-label">Teléfono</label>
        <input
          class="form-control"
          type="tel"
          name="tel"
          id="tel"
          placeholder="7443218899"
          bind:value={propertie.tel}
        />
      </div>

      <div class="col col-md-2">
        <label for="whatsapp" class="form-label">WhatsApp</label>
        <input
          class="form-control"
          type="tel"
          name="whatsapp"
          id="whatsapp"
          placeholder="7443218899"
          bind:value={propertie.whatsapp}
        />
      </div>
    </div>

    <div class="mb-3">
      <h2 class="badge text-bg-dark">Distribución</h2>
      <div class="row mt-0">
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
          <div class="form-text mt-0">
            <small class="text-muted">
              Opcional
            </small>
          </div>
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
            <option value="2" selected>2</option>
            <option value="3">3</option>
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
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="+4">+4</option>
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
            <option value="0" selected>0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="+3">+3</option>
          </select>
        </div>
      </div>
    </div>

    <div class="mb-3">
      <h2 class="badge text-bg-dark">Dirección</h2>
      <div class="row mt-0 mb-2">
        <div class="col">
          <label for="address" class="form-label">Calle y número</label>
          <input name="address" id="address" bind:value={propertie.address.direction} class="form-control" type="text" placeholder="Av. Principal #123">
          <div class="form-text mt-0">
            <small class="text-muted">
              Opcional
            </small>
          </div>
        </div>
  
        <div class="col col-md-4">
          <label for="development" class="form-label">Desarrollo</label>
          <input name="development" id="development" bind:value={propertie.address.development} class="form-control" type="text" placeholder="Fracc. La Marquesa">
          <div class="form-text mt-0">
            <small class="text-muted">
              Opcional
            </small>
          </div>
        </div>
      </div>

      <div class="row mt-0">
        <div class="col col-md-4">
          <label for="colony" class="form-label">Colonia</label>
          <input name="colony" id="colony" bind:value={propertie.address.colony} class="form-control" type="text" placeholder="Col. Llano Largo">
        </div>

        <div class="col col-md-3">
          <label for="city" class="form-label">Ciudad</label>
          <input name="city" id="city" bind:value={propertie.address.city} class="form-control" type="text" placeholder="Acapulco de Juárez">
        </div>

        <div class="col col-md-3">
          <label for="estate" class="form-label">Estado</label>
          <select
            class="form-select"
            name="estate"
            id="estate"
            bind:value={propertie.address.estate}
          >
            <option value="Guerrero" selected>Guerrero</option>
          </select>
        </div>

        <div class="col col-md-1">
          <label for="postal" class="form-label">C.P.</label>
          <input name="postal" id="postal" bind:value={propertie.address.postal} class="form-control" type="text" placeholder="39906">
        </div>
      </div>
    </div>

    <div class="mb-3">
      <h2 class="badge text-bg-dark">Descripción</h2>
      <div class="row mt-0">
        <div class="col">
          <label for="description" class="form-label">Descripción de la propiedad</label>
          <textarea
            bind:value={propertie.description}
            name="description"
            maxlength="1498"
            class="form-control"
            id="description"
            rows="6"
            cols="10"
            wrap="hard"
            placeholder="Casa en venta en excelente estado, ubicada en la Colonia Costa Azul, a 2 cuadras de la Costera Miguel Alemán, en Acapulco, Gro. Cuenta con 3 recámaras, 2 baños, cocina, sala, comedor ..."
            required
          />
        </div>
      </div>
    </div>

    <div class="mb-3">
      <h2 class="badge text-bg-dark">Notas para los asesores de la red</h2>
      <div class="row mt-0">
        <div class="col">
          <label for="notes" class="form-label">Notas y obervaciones</label>
          <textarea
            bind:value={propertie.notes}
            name="notes"
            maxlength="1498"
            class="form-control"
            id="notes"
            rows="3"
            placeholder="El pago de la comisión es de $50,000 mil pesos, comparto el 50%. La propiedad se entrega sin muebles, se dejan los 3 aires acondicionados. Etc."
          />
          <div class="form-text mt-0">
            <small class="text-muted">
              Opcional
            </small>
          </div>
        </div>
      </div>
      
    </div>

    <button
      class={`btn btn-primary ${
        $imagesPropertie.length <= 4 ? "disabled" : ""
      }`}>Publicar propiedad</button
    >
  </form>
</div>

<style>
  input::placeholder,
  textarea::placeholder {
    color: #dadada;
  }
  input:-ms-input-placeholder,
  input::-webkit-input-placeholder,
  input::-moz-placeholder {
    color: #eaeaea;
  }

  .relative {
    position: relative;
    overflow: hidden;
  }

  .carrousel-images {
    position: relative;
    overflow: scroll;
    width: 100%;
    min-width: 10rem;
    height: 100%;
    padding: 0.5rem;
    border-radius: 4px;
  }

  .carrousel {
    overflow: scroll;
    min-width: fit-content;
  }

  .carrousel::-webkit-scrollbar {
    display: none;
  }

  /* Estilos para motores Webkit y blink (Chrome, Safari, Opera... )*/
  .carrousel-images::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  .carrousel-images::-webkit-scrollbar:vertical {
    display: none;
  }

  .carrousel-images::-webkit-scrollbar:horizontal {
    width: 0.5rem;
    height: 0.68rem;
  }

  .carrousel-images::-webkit-scrollbar-button:increment,
  .carrousel-images::-webkit-scrollbar-button {
    display: none;
  }

  .carrousel-images::-webkit-scrollbar-thumb {
    background-color: #737373;
    border-radius: 0.5rem;
    border: 0.15rem solid #edf1f4;
  }

  .carrousel-images::-webkit-scrollbar-track {
    border-radius: 0.25rem;
  }

  .close-image {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    font-weight: 600;
    color: antiquewhite;

    cursor: pointer;
  }

  .form-properties {
    margin: 1rem 0 2rem 0;
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
