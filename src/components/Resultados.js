import React from 'react';
import styled from '@emotion/styled';

const Mensaje = styled.p`
  background-color: rgb(127, 224, 237);
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
`;
const ResultadoCotizacion = styled.div`
  text-align: center;
  padding: 0.5rem;
  border: 1px solid #26C6DA;
  background-color: rgb(127, 224, 237);
  margin-top: 1rem;
  position: relative;
`;
const TextoCotizacion = styled.p`
  color: #00838F;
  padding: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
`;

const Resultados = () => {

  const mostrar = () =>{
    for(let i=1; i<6; i++){
      console.log("hola")
    }
  }

  return(
      <h1 >asd {mostrar}</h1>
  )
}

export default Resultados
