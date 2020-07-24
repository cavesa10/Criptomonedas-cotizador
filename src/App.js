import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";

import { Formulario } from "./components/Formulario";
import { Cotizacion } from "./components/Cotizacion";
import { Spiner } from "./components/Spiner";

import imagen from "./cryptomonedas.png";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [moneda, setMoneda] = useState("");
  const [cripto, setCripto] = useState("");
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    // evitamos la ejecucion la primera vez
    const cotizarCriptomoneda = async () => {
      if (moneda === "") {
        return;
      }
      // consultar  la aip para obtener la cotizaci
      const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
      const resultado = await axios.get(URL);

      // mostrar el spinner
      setCargando(true);

      // ocultar el el spiner y mostrar el resultado

      setTimeout(() => {
        setCargando(false);

        setResultado(resultado.data.DISPLAY[cripto][moneda]);
      }, 2000);
    };
    cotizarCriptomoneda();
  }, [moneda, cripto]);

  // mostrar spimmer o resultado

  const componente = cargando ? (
    <Spiner />
  ) : (
    <Cotizacion resultado={resultado} />
  );
  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="Imagen Criptomonedas" />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setMoneda={setMoneda} setCripto={setCripto} />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
