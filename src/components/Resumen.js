import React from 'react';
import styled from '@emotion/styled';
import {primeraMayuscula} from '../helper.js'
import PropTypes from 'prop-types';

const ContResumen = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00838F;
  color: white;
  margin-top: 1rem;
`;

const Resumen = ({datos}) => {

//extraemos de datos, para evitar escribir datos.variable
  const {marca, year, plan} = datos

  if(marca.trim()=== ''|| plan.trim()===''|| year.trim()===''){
    return null;
  }

  return(
    <ContResumen>
      <h2>Resumen de cotización</h2>
      <ul>
        <li>Marca: {primeraMayuscula(marca)}</li>
        <li>Plan: {primeraMayuscula(plan)}</li>
        <li>Año del auto: {primeraMayuscula(year)}</li>
      </ul>
    </ContResumen>
  )
}
Resumen.propTypes = {
  datos: PropTypes.object.isRequired
}
export default Resumen
