// Decide el estado de un producto según sus variantes
function calcularEstado(producto) {
  let disponibles = 0;
  let reservadas = 0;

  for (const variante of producto.variantes) {
    disponibles += variante.stock - variante.reservadas;
    reservadas += variante.reservadas;
  }

  if (disponibles > 0) return "disponible";
  if (reservadas > 0) return "reservado";
  return "agotado";
}

// Arma el HTML de una tarjeta
function crearTarjeta(producto) {
  const estado = calcularEstado(producto);
  const talles = producto.variantes.map(v => v.talle).join(", ");

  return `
    <article class="tarjeta">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p>Talles: ${talles}</p>
      <p class="precio">$${producto.precio.toLocaleString("es-AR")}</p>
      <span class="estado ${estado}">${estado}</span>
    </article>
  `;
}

// Dibuja todos los productos en la página

const catalogo = document.getElementById("catalogo");
catalogo.innerHTML = productos.map(crearTarjeta).join("");