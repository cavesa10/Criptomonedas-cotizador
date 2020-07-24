import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import PropTypes from 'prop-types'


import { Error } from "./Error";
import { useMoneda } from "../hooks/useMoneda";
import { useCriptomonedas } from "../hooks/useCriptomonedas";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background: #66a2f3;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.4s ease;
  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

export const Formulario = ({ setMoneda, setCripto }) => {
  const MONEDAS = [
    { codigo: "COP", nombre: "Peso Colombiano" },
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];

  // state del listado de criptomonedas
  const [listadocripto, setListadocripto] = useState([]);

  // error del formulario
  const [error, setError] = useState(false);

  const [monedaState, Seleccionar] = useMoneda("Elige tu moneda", "", MONEDAS);
  const [criptoState, SelectCripto] = useCriptomonedas(
    "Elige tu Criptomoneda",
    "",
    listadocripto
  );

  // Ejecuta lllamada a la API

  useEffect(() => {
    const consultarAPI = async () => {
      const URL =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(URL);
      setListadocripto(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // validiar que los cambpos estan llenos
    if (monedaState === "" || criptoState === "") {
      setError(true);
      return;
    }
    // pasar los datos al componente principal
    setError(false);
    setMoneda(monedaState);
    setCripto(criptoState);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje="Todos los campos son obligatorio" /> : null}
      <Seleccionar />
      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

Formulario.propTypes = {
  setMoneda: PropTypes.func.isRequired,
  setCripto: PropTypes.func.isRequired
}