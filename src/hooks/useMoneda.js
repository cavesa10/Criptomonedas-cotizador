import React, {Fragment, useState} from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
  font-family: 'Bebas Neue';
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;
const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;
export const useMoneda = (label, stateInicial, opciones) => {

    const [monedaState, setState] = useState(stateInicial)
  
    const Seleccionar = () => (
      <Fragment>
        <Label htmlFor="">{label}</Label>
        <Select name="" id=""
          onChange= { e => setState(e.target.value)}
          value={monedaState}
        >
          <option value="">- Seleccione -</option>
          {opciones.map(opcion => (
            <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>

          ))}
        </Select>
      </Fragment>
    )
    // Retornar state, interfaz y func que modifica el sate

    return [monedaState, Seleccionar, setState]
  
}
