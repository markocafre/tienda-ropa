const productos = [
  {
    id: 1,
    nombre: "Remera oversize negra",
    descripcion: "Algodón, corte holgado.",
    precio: 18000,
    imagen: "img/remera-negra.jpg",
    variantes: [
      { talle: "M", stock: 1, reservadas: 0 },
      { talle: "L", stock: 2, reservadas: 1 },
    ],
  },
  {
    id: 2,
    nombre: "Buzo gris con capucha",
    descripcion: "Frisa liviana.",
    precio: 35000,
    imagen: "img/buzo-gris.jpg",
    variantes: [
      { talle: "L", stock: 1, reservadas: 1 },
    ],
  },
  {
    id: 3,
    nombre: "Jean recto azul",
    descripcion: "Tiro alto, lavado clásico.",
    precio: 42000,
    imagen: "img/jean-azul.jpg",
    variantes: [
      { talle: "38", stock: 0, reservadas: 0 },
      { talle: "40", stock: 0, reservadas: 0 },
    ],
  },
];