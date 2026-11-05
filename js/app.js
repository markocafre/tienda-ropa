const NUMERO_WHATSAPP = "5491100000000"; // Reemplazá por tu número real

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

// Crea el enlace de WhatsApp
function crearLinkWhatsApp(producto) {
  const mensaje = `Hola! Me interesa "${producto.nombre}". ¿Sigue disponible?`;
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

// Arma el HTML de una tarjeta con imagen y botón de WhatsApp
function crearTarjeta(producto) {
  const estado = calcularEstado(producto);
  const talles = producto.variantes.map(v => v.talle).join(", ");

  const boton = estado === "agotado"
    ? ""
    : `<a class="btn-consultar" href="${crearLinkWhatsApp(producto)}" target="_blank">Consultar por WhatsApp</a>`;

  return `
    <article class="tarjeta">
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p>Talles: ${talles}</p>
      <p class="precio">$${producto.precio.toLocaleString("es-AR")}</p>
      <span class="estado ${estado}">${estado}</span>
      ${boton}
    </article>
  `;
}

// Referencia al contenedor del catálogo (declarado una sola vez)
const catalogo = document.getElementById("catalogo");

function mostrar(lista) {
  catalogo.innerHTML = lista.map(crearTarjeta).join("");
}

function filtrar(estado) {
  if (estado === "todos") {
    mostrar(productos);
  } else {
    mostrar(productos.filter(p => calcularEstado(p) === estado));
  }
}

// Conectar los botones de filtro
const botonesFiltro = document.querySelectorAll(".filtros button");

botonesFiltro.forEach(boton => {
  boton.addEventListener("click", () => {
    botonesFiltro.forEach(b => b.classList.remove("activo"));
    boton.classList.add("activo");
    filtrar(boton.dataset.estado);
  });
});

// Primera carga de todos los productos
mostrar(productos);