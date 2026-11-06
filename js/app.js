let productos = cargarProductos();

const NUMERO_WHATSAPP = "5491100000000"; // reemplazá por el número real

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

function crearLinkWhatsApp(producto) {
  const mensaje = `Hola! Me interesa "${producto.nombre}". ¿Sigue disponible?`;
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

function crearTarjeta(producto) {
  const estado = calcularEstado(producto);

  const talles = producto.variantes.map(v => {
    const libres = v.stock - v.reservadas;
    const clase = libres > 0 ? "talle" : "talle sin-stock";
    return `<span class="${clase}">${v.talle}</span>`;
  }).join("");

  const boton = estado === "agotado"
    ? ""
    : `<a class="btn-consultar" href="${crearLinkWhatsApp(producto)}" target="_blank">Consultar por WhatsApp</a>`;

  return `
    <article class="tarjeta ${estado}">
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <div class="talles">${talles}</div>
      <p class="precio">$${producto.precio.toLocaleString("es-AR")}</p>
      <span class="estado ${estado}">${estado}</span>
      ${boton}
    </article>
  `;
}

const catalogo = document.getElementById("catalogo");
const contador = document.getElementById("contador");

function mostrar(lista) {
  catalogo.innerHTML = lista.map(crearTarjeta).join("");
}

// ---------- Filtros ----------
let estadoActual = "todos";
let talleActual = "todos";
let textoBusqueda = "";
let ordenActual = "ninguno";

function aplicarFiltros() {
  const resultado = productos.filter(p => {
    const coincideEstado =
      estadoActual === "todos" || calcularEstado(p) === estadoActual;

    const coincideTalle =
      talleActual === "todos" || p.variantes.some(v => v.talle === talleActual);

    const coincideTexto =
      p.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());

    return coincideEstado && coincideTalle && coincideTexto;
  });

  if (ordenActual === "menor") resultado.sort((a, b) => a.precio - b.precio);
  if (ordenActual === "mayor") resultado.sort((a, b) => b.precio - a.precio);

  if (resultado.length === 0) {
    catalogo.innerHTML = "<p>No encontramos prendas con esos filtros.</p>";
    contador.textContent = "";
  } else {
    mostrar(resultado);
    contador.textContent = resultado.length === 1
      ? "1 prenda"
      : `${resultado.length} prendas`;
  }
}

// Botones de estado
const botonesFiltro = document.querySelectorAll(".filtros button");

botonesFiltro.forEach(boton => {
  boton.addEventListener("click", () => {
    botonesFiltro.forEach(b => b.classList.remove("activo"));
    boton.classList.add("activo");
    estadoActual = boton.dataset.estado;
    aplicarFiltros();
  });
});

// Buscador
document.getElementById("buscador").addEventListener("input", (evento) => {
  textoBusqueda = evento.target.value;
  aplicarFiltros();
});

// Selector de talle: se arma con los talles que existen en los datos
const selectTalle = document.getElementById("filtro-talle");

const talles = new Set();
productos.forEach(p => p.variantes.forEach(v => talles.add(v.talle)));

talles.forEach(talle => {
  const opcion = document.createElement("option");
  opcion.value = talle;
  opcion.textContent = talle;
  selectTalle.appendChild(opcion);
});

selectTalle.addEventListener("change", (evento) => {
  talleActual = evento.target.value;
  aplicarFiltros();
});

// Orden por precio
document.getElementById("orden").addEventListener("change", (evento) => {
  ordenActual = evento.target.value;
  aplicarFiltros();
});

// Primera carga
aplicarFiltros();