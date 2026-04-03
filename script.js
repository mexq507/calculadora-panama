function showTab(tab) {
  document.querySelectorAll('.modulo').forEach(m => m.classList.add('oculto'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

  document.getElementById(tab).classList.remove('oculto');
  event.target.classList.add('active');
}

function calcularITBMS() {
  const precio = parseFloat(document.getElementById('precio').value);
  const tasa = parseFloat(document.getElementById('tasa').value);
  const modo = document.getElementById('modo').value;
  const resultado = document.getElementById('resultado-itbms');

  if (!precio || precio <= 0) {
    resultado.innerHTML = 'Por favor ingresa un precio válido.';
    resultado.classList.add('visible');
    return;
  }

  let impuesto, total, base;

  if (modo === 'agregar') {
    impuesto = precio * tasa;
    total = precio + impuesto;
    resultado.innerHTML = `
      Precio base: $${precio.toFixed(2)}<br>
      ITBMS (${tasa * 100}%): $${impuesto.toFixed(2)}<br>
      <strong>Total: $${total.toFixed(2)}</strong>
    `;
  } else {
    base = precio / (1 + tasa);
    impuesto = precio - base;
    resultado.innerHTML = `
      Total pagado: $${precio.toFixed(2)}<br>
      ITBMS (${tasa * 100}%): $${impuesto.toFixed(2)}<br>
      <strong>Precio base: $${base.toFixed(2)}</strong>
    `;
  }

  resultado.classList.add('visible');
}

function calcularPrestamo() {
  const monto = parseFloat(document.getElementById('monto').value);
  const tasaAnual = parseFloat(document.getElementById('tasa-interes').value);
  const plazo = parseInt(document.getElementById('plazo').value);
  const resultado = document.getElementById('resultado-prestamo');

  if (!monto || !tasaAnual || !plazo) {
    resultado.innerHTML = 'Por favor completa todos los campos.';
    resultado.classList.add('visible');
    return;
  }

  const tasaMensual = tasaAnual / 100 / 12;
  const cuota = monto * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1);
  const totalPagar = cuota * plazo;
  const totalIntereses = totalPagar - monto;

  resultado.innerHTML = `
    Cuota mensual: <strong>$${cuota.toFixed(2)}</strong><br>
    Total a pagar: $${totalPagar.toFixed(2)}<br>
    Total intereses: $${totalIntereses.toFixed(2)}
  `;

  resultado.classList.add('visible');
}