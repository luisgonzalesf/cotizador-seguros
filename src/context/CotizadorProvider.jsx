import { Children, createContext, useState } from "react";
import { calcularMarca, calcularPlan, formatearDinero, obtenerDiferenciaYear } from "../helpers";

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    marca: "",
    anio: "",
    plan: "",
  });

  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState(0);
  const [error, setError] = useState("");

  const handleChangeDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const cotizarSeguro = () => {
    // Base
    let resultado = 2000;

    // Obtener diferencia de años
    const diferencia = obtenerDiferenciaYear(datos.anio);

    // Restar el 3% por cada año
    resultado -= (diferencia * 3 * resultado) / 100;
    
    // Americano 15%
    // Europeo 30%
    // Asiático 5%
    resultado *= calcularMarca(datos.marca)
    
    // Básico 20%
    // Completo 50%
    resultado *= calcularPlan(datos.plan)

    // Formatear dinero
    resultado = formatearDinero(resultado)

    setCargando(true)
    setTimeout(() => {
      setResultado(resultado);
      setCargando(false)
    }, 2000);
  };

  return (
    <CotizadorContext.Provider
      value={{ datos, error, setError, handleChangeDatos, cotizarSeguro, resultado, cargando }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorProvider };

export default CotizadorContext;
