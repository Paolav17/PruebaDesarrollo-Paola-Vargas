    document.addEventListener('DOMContentLoaded', function () {
        // Muestra las categorías en form dependiendo ingresos o egresos
        function showCategory() {
            const tipo = document.getElementById("type").value;
            document.getElementById("categoriaIngreso").style.display = tipo === "ingresos" ? "block" : "none";
            document.getElementById("categoriaEgreso").style.display = tipo === "egresos" ? "block" : "none";
        }

        document.getElementById("type").addEventListener("change", showCategory);
        showCategory();
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
    // Abrir modal ver transacciones
        const openModalviewTrans = document.querySelector('.view_buttom');
        const modalContainer  = document.querySelector('.modal_viewTrans')
        const closeModalviewTrans= document.querySelector('.close_modal')

        openModalviewTrans.addEventListener('click', (e)=>{
            e.preventDefault();
            modalContainer.classList.add('modal_viewTrans--show')
            console.log(modalContainer)
        });
        closeModalviewTrans.addEventListener('click', (e)=>{
            e.preventDefault();
            modalContainer.classList.remove('modal_viewTrans--show')
            console.log(modalContainer)
        });

        // Abrir modal ver mensual
        const openModalviewmonthly = document.querySelector('.monthly_buttom');
        const modalContainerMonthly  = document.querySelector('.modal_monthly')
        const closeModalMonthly= document.querySelector('.close_modalmonthly')

        openModalviewmonthly.addEventListener('click', (e)=>{
            e.preventDefault();
            modalContainerMonthly.classList.add('modal_monthly--show')
            console.log(modalContainerMonthly)
        });
        closeModalMonthly.addEventListener('click', (e)=>{
            e.preventDefault();
            modalContainerMonthly.classList.remove('modal_monthly--show')
            console.log(modalContainerMonthly)
        });
            // Abrir modal categoría
        const openModalviewCategory = document.querySelector('.Category_buttom');
        const modalContainerCategory  = document.querySelector('.modal_category')
        const closeModalCategory= document.querySelector('.close_modalCategory')

            openModalviewCategory.addEventListener('click', (e)=>{
                e.preventDefault();
                modalContainerCategory.classList.add('modal_monthly--show')
                console.log(modalContainerCategory)
            });
            closeModalCategory.addEventListener('click', (e)=>{
                e.preventDefault();
                modalContainerCategory.classList.remove('modal_monthly--show')
                console.log(modalContainerCategory)
            });

        //Guardar la información en localstorage
            const form = document.querySelector('.form');
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const tipo = document.getElementById("type").value;
                const monto = document.getElementById("amount").value;
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
                    monto,
                    tipo,
                    categoria,
                    descripcion
                };
                const transactions = JSON.parse(localStorage.getItem("transacciones")) || [];
                transactions.push(nuevaTransaccion);
                localStorage.setItem("transacciones", JSON.stringify(transactions));
                form.reset();
                console.log(transactions)
                alert("¡Transacción guardada!");
            });

        //mostrar las transacciones
        function showTransac(){
            const transactions = JSON.parse(localStorage.getItem("transacciones")) || [];
            const container = document.querySelector(".modal_showInfo");
            console.log(transactions)
            

            if (transactions.length === 0){
                container.innerHTML = '<p> No hay transacciones registradas</p>';
                return;
            }
            let tableHTML = `
                <table class = "table_transactions">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Monto</th>
                            <th>Tipo</th>   
                            <th>Categorías</th>
                            <th>Descripción</th>
                        </tr>  
                    </thead> 
                <tbody>            
            `;
            transactions.forEach(tx => {
                tableHTML += `
                    <tr>
                        <td>${tx.fecha}</td>
                        <td>${tx.monto}</td>
                        <td>${tx.tipo}</td>
                        <td>${tx.categoria}</td>
                        <td>${tx.descripcion}</td>
                    </tr>
                `;
            });
        
            tableHTML += `</tbody></table>`;
            container.innerHTML = tableHTML;
        }
        openModalviewTrans.addEventListener('click', (e) => {
            e.preventDefault();
            modalContainer.classList.add('modal_viewTrans--show');
            showTransac(); 
        });
        function filterTransaccion(containerSelector = ".modal_showInfo") {
            const transactions = JSON.parse(localStorage.getItem("transacciones")) || [];
            const container = document.querySelector(containerSelector);
        
            const tipoFiler = document.getElementById("filtroTipo").value;
            const categoryFilter = document.getElementById("filtroCategoria").value;
        
            const transFiltradas = transactions.filter(tx => {
                const matchTipo = tipoFiler === "" || tx.tipo === tipoFiler;
                const matchCategoria = categoryFilter === "" || tx.categoria === categoryFilter;
                return matchTipo && matchCategoria;
            });
        
            if (transFiltradas.length === 0) {
                container.innerHTML = "<p>No hay transacciones que coincidan con los filtros seleccionados.</p>";
                return;
            }
        
            let tableHTML = `
                <table class="table_transactions">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Monto</th>
                            <th>Tipo</th>
                            <th>Categoría</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
        
            transFiltradas.forEach(tx => {
                tableHTML += `
                    <tr>
                        <td>${tx.fecha}</td>
                        <td>${tx.monto}</td>
                        <td>${tx.tipo}</td>
                        <td>${tx.categoria}</td>
                        <td>${tx.descripcion}</td>
                    </tr>
                `;
            });
        
            tableHTML += `</tbody></table>`;
            container.innerHTML = tableHTML;
        }
        
        openModalviewTrans.addEventListener('click', (e) => {
            e.preventDefault();
            modalContainer.classList.add('modal_viewTrans--show');
            document.getElementById("filtroTipo").value = "";
            document.getElementById("filtroCategoria").value = "";
            filterTransaccion();
        });
        document.getElementById("filtroTipo").addEventListener("change", () => {
            filterTransaccion();
        });
        document.getElementById("filtroCategoria").addEventListener("change", () => {
            filterTransaccion();
        });
        // Mostrar transacciones por mes
        function resumMonth(containerSelector = ".modal_viewMonthly") {
            const transactions = JSON.parse(localStorage.getItem("transacciones")) || [];
            const resumen = {};
            console.log(transactions)
        
            transactions.forEach(tx => {
                const fecha = new Date(tx.fecha);
                const mes = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
            
                if (!resumen[mes]) {
                    resumen[mes] = { ingresos: 0, egresos: 0, montoTotal: 0 };
                }
            
                const monto = parseFloat(tx.monto) || 0; 
            
                if (tx.tipo === "ingresos") {
                    resumen[mes].ingresos += monto;
                } else if (tx.tipo === "egresos") {
                    resumen[mes].egresos += monto;
                }
            
                resumen[mes].montoTotal += monto;
            });
        
            const container = document.querySelector(containerSelector);
            if (!container) return;
        
            if (Object.keys(resumen).length === 0) {
                container.innerHTML = "<p>No hay transacciones para mostrar.</p>";
                return;
            }
        
            let tablaHTML = `
                <table class="table_resumen">
                    <thead>
                        <tr>
                            <th>Mes</th>
                            <th>Monto</th>
                            <th>Ingresos</th>
                            <th>Egresos</th>
                            <th>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
        
            for (const mes in resumen) {
                const ingreso = resumen[mes].ingresos;
                const egreso = resumen[mes].egresos;
                const saldo = ingreso - egreso;
            
                tablaHTML += `
                    <tr>
                        <td>${mes}</td>
                        <td>${resumen[mes].montoTotal.toFixed(2)}</td>
                        <td>${ingreso.toFixed(2)}</td>
                        <td>${egreso.toFixed(2)}</td>
                        <td>${saldo.toFixed(2)}</td>
                    </tr>
                `;
            }
        
            tablaHTML += `</tbody></table>`;
            container.innerHTML = tablaHTML;
            const ctx = document.getElementById('monthlyChart').getContext('2d');

            const meses = Object.keys(resumen);
            const ingresos = meses.map(m => resumen[m].ingresos);
            const egresos = meses.map(m => resumen[m].egresos);

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: meses,
                    datasets: [
                        {
                            label: 'Ingresos',
                            data: ingresos,
                            backgroundColor: 'rgba(29, 80, 80)',
                        },
                        {
                            label: 'Egresos',
                            data: egresos,
                            backgroundColor: 'rgba(255, 99, 132)',
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Resumen mensual de transacciones'
                        }
                    }
                }
            });

        }
        const botonResumMonth = document.querySelector('.monthly_buttom');
        botonResumMonth.addEventListener('click', () => {
        resumMonth(); 

        
        });
            
        // Resumen por categoría
        function resumeCategory() {
            const transactions = JSON.parse(localStorage.getItem("transacciones")) || [];
            const resumen = {};
        
            transactions.forEach(tx => {
            if (!resumen[tx.categoria]) {
                resumen[tx.categoria] = 0;
            }
        
            const monto = tx.tipo === "ingreso" ? tx.monto : -tx.monto;
            resumen[tx.categoria] += monto;
            });
        
            const contenedor = document.getElementById("modal_vewCategory");
            contenedor.innerHTML = "<h3>Resumen por categoría</h3>";
        
            const lista = document.createElement("ul");
        
            for (const categoria in resumen) {
            const item = document.createElement("li");
            const montoFormateado = resumen[categoria].toLocaleString("es-CO", {
                style: "currency",
                currency: "COP"
            });
            item.textContent = `${categoria}: ${montoFormateado}`;
            lista.appendChild(item);
            }
        
            contenedor.appendChild(lista);
        }
        document.getElementById("btnResumCategory").addEventListener("click", resumeCategory);

        //importar archivo CVS
        document.getElementById("importBtn").addEventListener("click", () => {
            const fileInput = document.getElementById("importCSV");
            const file = fileInput.files[0];
            if (!file) return alert("Selecciona un archivo CSV.");
        
            const reader = new FileReader();
            reader.onload = function (e) {
                const lines = e.target.result.split("\n").map(line => line.trim()).filter(Boolean);
                const transactions = JSON.parse(localStorage.getItem("transacciones")) || [];
        
                lines.forEach(line => {
                    const [fecha, monto, tipo, categoria, descripcion] = line.split(",");
                    if (fecha && monto && tipo && categoria && descripcion) {
                        transactions.push({ fecha, monto, tipo, categoria, descripcion });
                    }
                });
        
                localStorage.setItem("transacciones", JSON.stringify(transactions));
                alert("Transacciones importadas");
            };
            reader.readAsText(file);
        });
        
        
    });