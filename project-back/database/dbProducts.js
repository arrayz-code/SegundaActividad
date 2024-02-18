import Products from "../models/Products.js";

function addProducts() {
   Products.insertMany([
      {
          "titulo": "Destornillador de Estrella",
          "descripcion": "Destornillador con punta en forma de estrella para ajustes precisos.",
          "categoria": "Herramientas",
          "precio": 15,
          "cantidad": 20
      },
      {
          "titulo": "Martillo de Carpintero",
          "descripcion": "Martillo de mango de madera resistente para trabajos de carpintería.",
          "categoria": "Herramientas",
          "precio": 25,
          "cantidad": 15
      },
      {
          "titulo": "Sierra Circular",
          "descripcion": "Sierra circular eléctrica para cortes precisos en madera y otros materiales.",
          "categoria": "Herramientas eléctricas",
          "precio": 120,
          "cantidad": 5
      },
      {
          "titulo": "Clavos de Acero Galvanizado",
          "descripcion": "Clavos resistentes de acero galvanizado para fijaciones seguras.",
          "categoria": "Fijaciones",
          "precio": 10,
          "cantidad": 100
      },
      {
          "titulo": "Taladro Percutor",
          "descripcion": "Taladro eléctrico con función de percusión para perforaciones en concreto.",
          "categoria": "Herramientas eléctricas",
          "precio": 90,
          "cantidad": 8
      },
      {
          "titulo": "Pintura para Paredes",
          "descripcion": "Pintura de alta calidad para paredes interiores y exteriores.",
          "categoria": "Pinturas",
          "precio": 40,
          "cantidad": 10
      },
      {
          "titulo": "Cinta Métrica",
          "descripcion": "Cinta métrica retráctil para mediciones precisas en proyectos de construcción.",
          "categoria": "Accesorios de medición",
          "precio": 12,
          "cantidad": 25
      },
      {
          "titulo": "Llave Inglesa Ajustable",
          "descripcion": "Llave ajustable de alta calidad para diversos tamaños de tuercas y pernos.",
          "categoria": "Herramientas",
          "precio": 20,
          "cantidad": 18
      },
      {
          "titulo": "Escalera de Aluminio",
          "descripcion": "Escalera plegable de aluminio para trabajos en altura.",
          "categoria": "Herramientas",
          "precio": 80,
          "cantidad": 6
      },
      {
          "titulo": "Pegamento para PVC",
          "descripcion": "Adhesivo especial para uniones de tuberías de PVC.",
          "categoria": "Adhesivos",
          "precio": 8,
          "cantidad": 30
      },
      {
          "titulo": "Pala de Jardín",
          "descripcion": "Pala resistente para trabajos de jardinería y agricultura.",
          "categoria": "Herramientas de jardinería",
          "precio": 18,
          "cantidad": 12
      },
      {
          "titulo": "Broca para Madera",
          "descripcion": "Broca especializada para perforaciones limpias en madera.",
          "categoria": "Accesorios de perforación",
          "precio": 7,
          "cantidad": 40
      },
      {
          "titulo": "Candado de Seguridad",
          "descripcion": "Candado de alta seguridad para proteger puertas, portones y otros accesos.",
          "categoria": "Seguridad",
          "precio": 30,
          "cantidad": 15
      },
      {
          "titulo": "Alicate Universal",
          "descripcion": "Alicate versátil para múltiples tareas de agarre y corte.",
          "categoria": "Herramientas manuales",
          "precio": 15,
          "cantidad": 20
      },
      {
          "titulo": "Cerradura para Puerta",
          "descripcion": "Cerradura de alta resistencia para puertas de entrada.",
          "categoria": "Seguridad",
          "precio": 40,
          "cantidad": 10
      },
      {
          "titulo": "Pistola de Silicona",
          "descripcion": "Pistola eléctrica para aplicar silicona y adhesivos de forma precisa.",
          "categoria": "Herramientas eléctricas",
          "precio": 25,
          "cantidad": 10
      },
      {
          "titulo": "Tornillos de Acero Inoxidable",
          "descripcion": "Tornillos duraderos de acero inoxidable para diversas aplicaciones.",
          "categoria": "Fijaciones",
          "precio": 5,
          "cantidad": 200
      },
      {
          "titulo": "Grifo de Agua",
          "descripcion": "Grifo de calidad para instalaciones de fontanería en interiores y exteriores.",
          "categoria": "Fontanería",
          "precio": 35,
          "cantidad": 8
      },
      {
          "titulo": "Escuadra de Carpintero",
          "descripcion": "Escuadra metálica para mediciones y trazos precisos en carpintería.",
          "categoria": "Accesorios de medición",
          "precio": 10,
          "cantidad": 15
      },
      {
          "titulo": "Llave de Tubo",
          "descripcion": "Llave de tubo para apretar y aflojar conexiones de tuberías.",
          "categoria": "Herramientas",
          "precio": 22,
          "cantidad": 12
      }
  ]
  )
}

export default addProducts