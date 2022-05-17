export function obtenerDiferenciaYear(year) {
  return new Date().getFullYear() - year;
}

export function calcularMarca(marca) {
  let increment;

  // Americano 15%
  // Europeo 30%
  // Asiático 5%
  switch (marca) {
    case "1":
      increment = 1.3;
      break;
    case "2":
      increment = 1.15;
      break;
    case "3":
      increment = 1.05;
      break;
    default:
      break;
  }
  return increment;
}

export function calcularPlan(plan) {
  return plan === "1" ? 1.2 : 1.5;
}

export function formatearDinero(cantidad) {
  return cantidad.toLocaleString('en-US',{
    style: 'currency',
    currency: 'USD'
  })
}
