document.addEventListener("DOMContentLoaded", () => {
    fetch("productos.json")
        .then(response => response.json())
        .then(data => {
            cargarProductos(data);
        })
        .catch(error => console.error("Error al cargar productos:", error));

    let carrito = [];

    const contenedorProductos = document.getElementById("productos");
    const verCarrito = document.getElementById("verCarrito");
    const modalCarrito = document.getElementById("modalCarrito");
    const cerrarCarrito = document.getElementById("cerrarCarrito");
    const contenidoCarrito = document.getElementById("contenidoCarrito");
    const cantidadCarrito = document.getElementById("cantidadCarrito");
    const finalizarCompra = document.getElementById("finalizarCompra");

    function actualizarCarrito() {
        contenidoCarrito.innerHTML = "";
        carrito.forEach(producto => {
            let item = document.createElement("div");
            item.innerHTML = `
                <p>${producto.nombre} - $${producto.precio}</p>
                <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
            `;
            contenidoCarrito.appendChild(item);
        });
        cantidadCarrito.textContent = carrito.length;
    }

    function agregarAlCarrito(id) {
        fetch("productos.json")
            .then(response => response.json())
            .then(productos => {
                const producto = productos.find(prod => prod.id === id);
                carrito.push(producto);
                actualizarCarrito();
            });
    }

    window.eliminarDelCarrito = (id) => {
        carrito = carrito.filter(prod => prod.id !== id);
        actualizarCarrito();
    };

    verCarrito.addEventListener("click", () => {
        modalCarrito.style.display = "flex";
    });

    cerrarCarrito.addEventListener("click", () => {
        modalCarrito.style.display = "none";
    });

    finalizarCompra.addEventListener("click", () => {
        Swal.fire({
            title: "Compra realizada con éxito!",
            icon: "success",
            confirmButtonText: "Aceptar"
        });
        carrito = [];
        actualizarCarrito();
        modalCarrito.style.display = "none";
    });

    function cargarProductos(productos) {
        productos.forEach(producto => {
            let card = document.createElement("div");
            card.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" width="150">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            `;
            contenedorProductos.appendChild(card);
        });
    }
});

