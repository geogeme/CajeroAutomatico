const saldoInicial = 10000.0;
let saldo = saldoInicial;
let intentosInvalidos = 0;

document.getElementById('retirarBtn').addEventListener('click', () => {
    retirarDinero();
});

document.getElementById('depositosBtn').addEventListener('click', () => {
    hacerDepositos();
});

document.getElementById('saldoBtn').addEventListener('click', () => {
    consultarSaldo();
});

document.getElementById('quejasBtn').addEventListener('click', () => {
    mostrarQuejas();
});

document.getElementById('movimientosBtn').addEventListener('click', () => {
    verUltimosMovimientos();
});

document.getElementById('salirBtn').addEventListener('click', () => {
    salirDelCajero();
});

document.getElementById('closeBtn').addEventListener('click', () => {
    closeModal();
});

function hacerDepositos() {
    const opcion = parseInt(prompt('Seleccione la opción de depósito:\n1) Cuenta de cheques\n2) Tarjeta de Crédito'));

    if (opcion !== 1 && opcion !== 2) {
        showModal('Error', 'Opción de depósito no válida');
        return;
    }

    const cantidadDepositar = parseFloat(prompt('Ingrese la cantidad a depositar:'));

    if (isNaN(cantidadDepositar) || cantidadDepositar <= 0) {
        showModal('Error', 'Cantidad de depósito no válida');
        return;
    }

    if (opcion === 1) {
        if (cantidadDepositar % 50 !== 0) {
            showModal('Error', 'Solo se permiten depósitos múltiplos de $50 en cuenta de cheques');
            return;
        }
        saldo += cantidadDepositar;
    } else if (opcion === 2) {
        saldo -= cantidadDepositar;
    }

    showModal('Depósito exitoso', `Ha depositado: $${cantidadDepositar.toFixed(2)}`);
}

function retirarDinero() {
    // Mostrar la cantidad disponible a retirar
    const cantidadDisponible = saldo > 6000 ? 6000 : saldo;
    const mensajeCantidad = `Cantidad disponible para retirar: $${cantidadDisponible.toFixed(2)}`;

    // Solicitar la cantidad a retirar al usuario
    const cantidadRetirar = parseFloat(prompt(`${mensajeCantidad}\nIngrese la cantidad a retirar:`));

    // Validar la cantidad ingresada
    if (isNaN(cantidadRetirar) || cantidadRetirar <= 0 || cantidadRetirar % 50 !== 0 || cantidadRetirar > cantidadDisponible) {
        showModal('Error', 'Cantidad de retiro no válida');
        return;
    }

    // Preguntar si el usuario desea donar $200
    const donar = confirm('¿Desea donar $200 para la graduación de ch30?');
    if (donar) {
        cantidadRetirar += 200;
    }

    // Actualizar el saldo y mostrar un mensaje
    saldo -= cantidadRetirar;
    showModal('Retiro exitoso', `Ha retirado: $${cantidadRetirar.toFixed(2)}`);
}

function consultarSaldo() {
    // Muestra el saldo actual 
    showModal('Saldo', `Su saldo actual es: $${saldo.toFixed(2)}`);
}

function mostrarQuejas() {
    // Muestra un mensaje de quejas 
    showModal('Quejas', 'No disponible por el momento, intente más tarde');
}

function verUltimosMovimientos() {
    // No la logré implementar :(
}

function salirDelCajero() {
    // Cierra la aplicación
    window.close();
}

function showModal(title, content) {
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    modalTitle.textContent = title;
    modalContent.textContent = content;
    document.getElementById('overlay').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('overlay').classList.add('hidden');
}
