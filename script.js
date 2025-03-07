document.addEventListener("DOMContentLoaded", () => {
    const productos = [
        { id: 1, nombre: "Heladera", precio: 150000, imagen: "heladera.jpg" },
        { id: 2, nombre: "Lavarropas", precio: 120000, imagen: "lavarropas.jpg" },
        { id: 3, nombre: "Microondas", precio: 80000, imagen: "microondas.jpg" }
    ];

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
        const producto = productos.find(prod => prod.id === id);
        carrito.push(producto);
        actualizarCarrito();
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
        alert("Compra realizada con éxito!");
        carrito = [];
        actualizarCarrito();
        modalCarrito.style.display = "none";
    });

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
});
