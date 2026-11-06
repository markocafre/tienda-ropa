const CLAVE_PRODUCTOS = "tienda-productos";

function cargarProductos() {
  try {
    const guardado = localStorage.getItem(CLAVE_PRODUCTOS);
    if (guardado) return JSON.parse(guardado);
  } catch (error) {
    console.error("No se pudo leer el almacenamiento", error);
  }
  return productosIniciales;
}

function guardarProductos(lista) {
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(lista));
}