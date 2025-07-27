document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const formBusqueda = document.getElementById('form-busqueda');
    const inputBusqueda = document.getElementById('input-busqueda');
    const resultados = document.getElementById('resultados-busqueda');

    // Base de datos de búsqueda (personaliza con tus páginas)
    const datosBusqueda = [
        { 
            titulo: "Inicio", 
            contenido: "Página principal con el logo y menú de navegación.", 
            url: "index.html",
            tags: "inicio home principal bienvenida logo"
        },
        { 
            titulo: "Menú de Desayunos", 
            contenido: "Huevos rancheros, chilaquiles verdes, tamales.", 
            url: "menu.html#desayunos",
            tags: "desayuno comida mañana huevos chilaquiles tamales"
        },
        { 
            titulo: "Menú de Almuerzos", 
            contenido: "Pozole, mole con pollo, enchiladas.", 
            url: "menu.html#almuerzos",
            tags: "almuerzo comida mediodía pozole mole enchiladas"
        },
        { 
            titulo: "Acerca de Nosotros", 
            contenido: "Conoce nuestra misión, visión y valores.", 
            url: "acerca.html",
            tags: "acerca sobre nosotros misión visión valores"
        },
        { 
            titulo: "Redes Sociales", 
            contenido: "Síguenos en TikTok, Instagram y Facebook.", 
            url: "redes.html",
            tags: "redes sociales tiktok instagram facebook contacto"
        },
        { 
            titulo: "Servicios y Contacto", 
            contenido: "Ubicación, horarios y WhatsApp para reservaciones.", 
            url: "servicios.html",
            tags: "servicios contacto ubicación horarios whatsapp teléfono"
        }
    ];

    // Función para redirigir o mostrar resultados
    function manejarBusqueda(termino) {
        termino = termino.toLowerCase().trim();
        
        // 1. Redirigir si hay coincidencia exacta
        const paginaExacta = datosBusqueda.find(item => 
            item.titulo.toLowerCase() === termino || 
            item.tags.split(' ').includes(termino)
        );

        if (paginaExacta) {
            window.location.href = paginaExacta.url;
            return;
        }

        // 2. Mostrar resultados sugeridos
        resultados.innerHTML = '';
        const sugerencias = datosBusqueda.filter(item => 
            item.titulo.toLowerCase().includes(termino) ||
            item.tags.toLowerCase().includes(termino) ||
            item.contenido.toLowerCase().includes(termino)
        );

        if (sugerencias.length === 0) {
            resultados.innerHTML = '<p class="sin-resultados">No encontramos resultados. Intenta con otra palabra.</p>';
            return;
        }

        sugerencias.forEach(item => {
            resultados.innerHTML += `
                <div class="item-resultado">
                    <h3><a href="${item.url}">${item.titulo}</a></h3>
                    <p>${item.contenido}</p>
                </div>
            `;
        });
    }

    // Eventos
    formBusqueda.addEventListener('submit', function(e) {
        e.preventDefault();
        manejarBusqueda(inputBusqueda.value);
    });

    inputBusqueda.addEventListener('input', function() {
        if (this.value === '') resultados.innerHTML = '';
        else manejarBusqueda(this.value);
    });
});