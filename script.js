document.addEventListener('DOMContentLoaded', function () {
    // Muestra las categorías en form dependiendo ingresos o egresos
    function mostrarCategorias() {
        const tipo = document.getElementById("type").value;
        document.getElementById("categoriaIngreso").style.display = tipo === "ingresos" ? "block" : "none";
        document.getElementById("categoriaEgreso").style.display = tipo === "egresos" ? "block" : "none";
    }

    document.getElementById("type").addEventListener("change", mostrarCategorias);
    mostrarCategorias();
    // Muestra las secciones de la página
    const links = document.querySelectorAll(".register__link, .visualization__link")
    const sections = document.querySelectorAll(".section")
    function showSection(event){
        event.preventDefault();
        
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        console.log(targetId,targetSection)
        if (targetSection){
            sections.forEach(section => section.classList.remove("active"));
            targetSection.classList.add("active");
        }
    }
    links.forEach(link =>{
        link.addEventListener("click",showSection);
    });
    //Guardar la información en localstorage
    const form = document.querySelector('.form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const tipo = document.getElementById("type").value;
        const fecha = document.getElementById("date").value;
        const descripcion = document.getElementById("description").value;
        let categoria = '';
        if (tipo === 'ingresos') {
            categoria = document.getElementById("categoriaIngresoSelect").value;
        } else if (tipo === 'egresos') {
            categoria = document.getElementById("categoriaEgresoSelect").value;
        }

        const nuevaTransaccion = {
            fecha,
            tipo,
            categoria,
            descripcion
        };
        const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
        transacciones.push(nuevaTransaccion);
        localStorage.setItem("transacciones", JSON.stringify(transacciones));
        form.reset();
        mostrarCategorias();
        console.log(transacciones)
        alert("¡Transacción guardada!");
    });

});