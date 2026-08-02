/* ==========================================================================
   RECURSO PARA ESTUDIANTES - EVALUACIÓN JAVASCRIPT
   Dashboard de Torneos Gamer
   ========================================================================== */

// Actividad 3. Declarar el arreglo (10 puntos)
// Declarar un arreglo global vacío llamado torneos.
// Cada elemento deberá ser un objeto con las propiedades:
// nombre, categoria, participantes, valorInscripcion, email y recaudacion.
let torneos = [];
let indiceEdicion = -1;

/**
 * Actividad 4. Registrar y validar un torneo (30 puntos)
 * 12. Crear la función registrarTorneo() sin parámetros.
 */
function registrarTorneo(){

    if(indiceEdicion !== -1){
        actualizarTorneo();
        return;
    }
    // 13. Obtener los valores de todos los campos con document.getElementById()
    let nombre = document.getElementById('txtNombre').value.trim();
    let categoria = document.getElementById('categoria').value;
    let participantes = parseInt(document.getElementById('txtParticipantes').value);
    let valorInscripcion = parseInt(document.getElementById('txtInscripcion').value);
    let email = document.getElementById('txtEmail').value.trim();

    // 14. Validar que el nombre tenga al menos 4 caracteres
        if(nombre.length < 4){
            mostrarMensaje('El nombre debe tener al menos 4 caracteres','error');
            return;
        }
    // 15. Validar que se haya seleccionado una categoría
        if(categoria === '' || categoria === null){
            mostrarMensaje('Debes seleccionar una categoria','error');
            return;
        }

    // 16. Validar que los participantes sean un entero entre 1 y 100
        if(isNaN(participantes) || participantes < 1 || participantes > 100){
            mostrarMensaje('Los participantes deben ser entre un numero 1 y 100','error');
            return;
        }

    // 17. Validar que el valor de inscripción sea mayor que 0
        if(isNaN(valorInscripcion) || valorInscripcion <= 0){
            mostrarMensaje('El valor de de inscripcion debe ser mayor a 0','error');
            return;
        }

    // 18. Validar que el email no esté vacío. No se requiere validación avanzada de formato.
        if(email === ''){
            mostrarMensaje('El email no puede estar vacio','error');
            return;
        }
    // Si alguna validación falla, mostrar mensajes de error y detener la ejecución

    // 19. Calcular la recaudación estimada con: participantes × valor de inscripción
        let recaudacion = participantes * valorInscripcion;

    // 20. Crear el objeto nuevoTorneo con los datos obtenidos
        let nuevoTorneo ={
            nombre: nombre,
            categoria: categoria,
            participantes: participantes,
            valorInscripcion: valorInscripcion,
            email: email,
            recaudacion: recaudacion
        };

    // 21. Agregar el objeto al arreglo con push()
        torneos.push(nuevoTorneo);

    // 22. Llamar a mostrarTorneos() y limpiarFormulario()
        mostrarTorneos();
        limpiarFormulario();
        actualizarEstadisticas();

    // 23. Mostrar un mensaje de registro exitoso
        mostrarMensaje('Torneo registrado! Recuadacion $' + recaudacion, 'exito');

        document.getElementById('totalTorneos').textContent = torneos.length;

        console.log("🏆 Torneo registrado:", nuevoTorneo);
}

/**
 * Actividad 5. Mostrar los torneos (15 puntos)
 * 24. Crear la función mostrarTorneos() sin parámetros.
 */
function mostrarTorneos() {
    // 25. Crear una variable vacía para concatenar el HTML
        let contenido = '';

    // 26. Recorrer el arreglo torneos utilizando obligatoriamente un ciclo for
        for(let i = 0; i < torneos.length; i++){
       
    // 27. En cada vuelta, obtener el objeto actual y construir una fila de la tabla (<tr>...</tr>)
             let torneo = torneos[i];
    // 28. Mostrar todos los datos y la recaudación calculada
              contenido += `
            <tr>
                <td>${i + 1}</td>
                <td>${torneo.nombre}</td>
                <td>${torneo.categoria}</td>
                <td>${torneo.participantes}</td>
                <td>$${torneo.valorInscripcion}</td>
                <td>${torneo.email}</td>
                <td>$${torneo.recaudacion}</td>
                <td>
                <button class="btn-accion editar" onclick="editarTorneo(${i})">Editar</button>

                <button class="btn-accion eliminar" onclick="eliminarTorneo(${i})">Eliminar</button>
                </td>
                
            </tr>
        `;
        }

    // 29. Insertar el HTML final en el cuerpo de la tabla sin duplicar filas (usando innerHTML)
    let tbody = document.getElementById('tbodyTorneos');
    
    if (torneos.length === 0) {
        tbody.innerHTML = `<tr class="empty-row"><td colspan="8">No hay torneos registrados</td></tr>`;
    } else {
        tbody.innerHTML = contenido;
    }
    generarTarjetas();
}

/**
 * Actividad 6. Limpiar el formulario (5 puntos)
 * 30. Crear la función limpiarFormulario().
 */
function limpiarFormulario() {
    // 31. Vaciar los campos del formulario, restablecer la categoría y limpiar los mensajes de error
    document.getElementById('txtNombre').value = '';
    document.getElementById('txtParticipantes').value = '';
    document.getElementById('categoria').value = ''; 
    document.getElementById('txtInscripcion').value = '';
    document.getElementById('txtEmail').value = ''; 
}
function mostrarMensaje(texto, tipo) {
    let mensaje = document.getElementById('mensajeFormulario');
    mensaje.textContent = texto;
    mensaje.className = 'mensaje-formulario ' + tipo;
    mensaje.style.display = 'block';

    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 5000);
}
function editarTorneo(i){
    let torneo = torneos[i];

    document.getElementById('txtNombre').value = torneo.nombre;
    document.getElementById('categoria').value = torneo.categoria;
    document.getElementById('txtParticipantes').value = torneo.participantes;
    document.getElementById('txtInscripcion').value = torneo.valorInscripcion;
    document.getElementById('txtEmail').value = torneo.email;

    indiceEdicion = i;

    let btn = document.querySelector('.btn-primary');
    btn.innerHTML = '<span class="btn-icon">✏️</span> ACTUALIZAR TORNEO';
    mostrarMensaje('✏️ Editando: ' + torneo.nombre, 'exito');

}
function actualizarTorneo(){

    let nombre = document.getElementById('txtNombre').value.trim();
    let categoria = document.getElementById('categoria').value;
    let participantes = parseInt(document.getElementById('txtParticipantes').value);
    let valorInscripcion = parseInt(document.getElementById('txtInscripcion').value);
    let email = document.getElementById('txtEmail').value.trim();

    if(nombre.length < 4){
        mostrarMensaje('El nombre debe tener al menos 4 caracteres','error');
        return;
    }
    if(categoria === '' || categoria === null){
        mostrarMensaje('Debes selecionar una categoria','error');
        return;
    }
    if(isNaN(participantes) || participantes < 1 || participantes > 100){
        mostrarMensaje('Los participantes deben ser entre un numero 1 y 100','error');
        return;
    }
    if(isNaN(valorInscripcion) || valorInscripcion <= 0){
            mostrarMensaje('El valor de de inscripcion debe ser mayor a 0','error');
            return;
        }
    if(email === ''){
        mostrarMensaje('El email no puede estar vacio','error');
        return;
    }
    let recaudacion = participantes * valorInscripcion;

    torneos[indiceEdicion] ={
        nombre: nombre,
        categoria: categoria,
        participantes: participantes,
        valorInscripcion: valorInscripcion,
        email: email,
        recaudacion: recaudacion
    };
    mostrarTorneos();
    actualizarEstadisticas();
    document.getElementById('totalTorneos').textContent = torneos.length;

    indiceEdicion = -1;  // Ya no estamos editando
    let btn = document.querySelector('.btn-primary');
    btn.textContent = '➕ Registrar Torneo';  // Volver al texto original
    limpiarFormulario();  // Vaciar las cajitas
    mostrarMensaje('✅ Torneo actualizado correctamente', 'exito');
}
function eliminarTorneo(indice) {
    if (confirm('¿Estás seguro de eliminar este torneo?')) {
        torneos.splice(indice, 1);
        mostrarTorneos();
        actualizarEstadisticas();
        mostrarMensaje('🗑️ Torneo eliminado correctamente', 'exito');
        document.getElementById('totalTorneos').textContent = torneos.length;
    }
}
function generarTarjetas(){
    let contenedor = document.getElementById('contenedorTarjetas');
    let contenido = '';

    for(let i = 0; i < torneos.length; i++){
        let torneo = torneos[i];

        contenido += `
            <div class="tarjeta">
                <div class="tarjeta-header">
                    <h3>🏆 ${torneo.nombre}</h3>
                    <span class="tarjeta-categoria">${torneo.categoria}</span>
                </div>
                <div class="tarjeta-body">
                    <p><strong>👥 Participantes:</strong> ${torneo.participantes}</p>
                    <p><strong>💰 Valor Inscripción:</strong> $${torneo.valorInscripcion}</p>
                    <p><strong>💵 Recaudación:</strong> $${torneo.recaudacion}</p>
                </div>
                <div class="tarjeta-footer">
                    <span class="tarjeta-email">📧 ${torneo.email}</span>
                </div>
            </div>
        `;
    }

    // 27. Insertar el HTML generado en el contenedor
    contenedor.innerHTML = contenido; 
    
}   
// ============================================
// FUNCIÓN BUSCAR TORNEOS
// ============================================

function buscarTorneos() {
    let textoBusqueda = document.getElementById('buscadorInput').value;
    let textoBusquedaMinusculas = textoBusqueda.toLowerCase();
    let resultados = [];

    // 34. Si la búsqueda está vacía, mostrar todos
    if (textoBusqueda === '') {
        mostrarTorneos();
        document.getElementById('resultadosBusqueda').textContent = '';
        return;
    }

    // 31. Buscar por nombre o categoría
    for (let i = 0; i < torneos.length; i++) {
        let torneo = torneos[i];
        
        // 32. Ignorar mayúsculas y minúsculas
        let nombreMinusculas = torneo.nombre.toLowerCase();
        let categoriaMinusculas = torneo.categoria.toLowerCase();
        
        if (nombreMinusculas.includes(textoBusquedaMinusculas) || 
            categoriaMinusculas.includes(textoBusquedaMinusculas)) {
            resultados.push(torneo);
        }
    }

    // 33. Mostrar los resultados
    mostrarResultadosBusqueda(resultados);
}
function mostrarResultadosBusqueda(resultados) {
    let contenedor = document.getElementById('contenedorTarjetas');
    let contador = document.getElementById('resultadosBusqueda');
    
    // Mostrar cuántos resultados se encontraron
    if (resultados.length === 0) {
        contador.textContent = '🔍 No se encontraron torneos';
        contador.style.color = '#f87171';
    } else {
        contador.textContent = `🔍 ${resultados.length} torneo(s) encontrado(s)`;
        contador.style.color = '#4ade80';
    }

    // Generar tarjetas SOLO con los resultados
    let contenido = '';

    for (let i = 0; i < resultados.length; i++) {
        let torneo = resultados[i];
        contenido += `
            <div class="tarjeta">
                <div class="tarjeta-header">
                    <h3>🏆 ${torneo.nombre}</h3>
                    <span class="tarjeta-categoria">${torneo.categoria}</span>
                </div>
                <div class="tarjeta-body">
                    <p><strong>👥 Participantes:</strong> ${torneo.participantes}</p>
                    <p><strong>💰 Valor Inscripción:</strong> $${torneo.valorInscripcion}</p>
                    <p><strong>💵 Recaudación:</strong> $${torneo.recaudacion}</p>
                </div>
                <div class="tarjeta-footer">
                    <span class="tarjeta-email">📧 ${torneo.email}</span>
                </div>
            </div>
        `;
    }

    contenedor.innerHTML = contenido;
}
// ============================================
// FUNCIÓN ACTUALIZAR ESTADÍSTICAS
// ============================================

function actualizarEstadisticas() {
    // 37. Total de torneos
    document.getElementById('totalTorneosStat').textContent = torneos.length;
    
    // 38. Total de participantes
    let totalParticipantes = 0;
    for (let i = 0; i < torneos.length; i++) {
        totalParticipantes = totalParticipantes + torneos[i].participantes;
    }
    document.getElementById('totalParticipantesStat').textContent = totalParticipantes;
    
    // 39. Total recaudación
    let totalRecaudacion = 0;
    for (let i = 0; i < torneos.length; i++) {
        totalRecaudacion = totalRecaudacion + torneos[i].recaudacion;
    }
    document.getElementById('totalRecaudacionStat').textContent = '$' + totalRecaudacion;
    
    // Extra: Total de emails (cantidad de torneos)
    document.getElementById('totalEmailStat').textContent = torneos.length;
}