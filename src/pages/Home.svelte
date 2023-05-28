<script>
  const today = new Date().toLocaleDateString('es-MX')

  const email = 'francisco_cisneros@coworking.net'.split('@', 1).join('').split('_', 2)

  let names = []
  email.forEach((word) => {
    const upperCase = word[0].toUpperCase()
    const wordSubString = word.substring(1)
    const name = `${upperCase}${wordSubString}`
    names.push(name)
  })
  const broker = names.join(' ')
  // console.log(broker)
</script>

<div class="container">
  <div class="text-center">
    <h1>Home</h1>
    <h6>Bienvenido a casasydepas.net - Coworking Inmobiliario</h6>
  </div>
  <hr />

  <p>
    En esta página estará toda la información de presentación de casasydepas.net
  </p>
  <ul>
    <li>Cual es la finalidad del sitio web</li>
    <li>Los productos y servicios que ofrece el sitio web</li>
    <li>Seccion de preguntas frecuentes</li>
    <li>Formas de contactar con un asesor de ventas</li>
    <li>Informacion de contacto</li>
  </ul>
</div>
