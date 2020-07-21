import React, {useState} from 'react';
import styled from '@emotion/styled';
import { obtenerDiferenciaYear, totalPagarPorMarca, obtenerPlan } from '../helper.js'
import PropTypes from 'prop-types';

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;
const Label = styled.label`
  flex: 0 0 100px;
`;
const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;
const InputRadio = styled.input`
  margin: 0 1rem;
`;
const Boton = styled.button`
  background-color: #00838F;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #FFF;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  margin-top: 2rem;
  transition: 0.5s;
  &:hover{
    cursor: pointer;
    background-color: #26C6DA;
    transition: 0.5s;
  }
`;
const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Formulario = ({setResumen, setCargando}) => {

//creamos un espacio para almacenar los datos del form
  const [datos, setDatos] = useState({
    marca: '',
    year: '',
    plan: ''
  })

  const[error, setError]= useState(false);

//conseguimos los datos del State, los extraemos de datos
  const {marca, year, plan} = datos;

//leer los datos del formulario y colocarlos en el State
  const obtenerInformacion = e => {
    setDatos({
      ...datos,
      [e.target.name] : e.target.value
    })
  }

//cuando el usuario envia el formulario
  const cotizarSeguro = e =>{
    e.preventDefault();

    if(marca.trim()=== ''|| plan.trim()===''|| year.trim()===''){
      setError(true)
      return;
    }
    setError(false)

    //base de precio de $2000
    let resultado = 2000;

    //obtener la diferencia de años
    const diferencia = obtenerDiferenciaYear(year);

    //por cada año, hay que restarle 3%
    resultado = resultado - (((diferencia * 3) * resultado ) / 100)

    //Europeo 30%
    //Americano 15%
    //Asiatico 5%
    resultado = totalPagarPorMarca(marca) * resultado;

    //basico aumenta 20%
    //completo aumenta 50%
    resultado = parseFloat(obtenerPlan(plan) * resultado).toFixed(2);

    setCargando(true);

//elimina el spinner, y pasa la info al componente principal
    setTimeout(()=>{
      setCargando(false);
      setResumen({
        cotizacion: Number(resultado),
        datos
      })
    }, 2000)


  }

  return(
    <form
      onSubmit={cotizarSeguro}
    >
    {error ? <Error>Todos los campos son obligatorios</Error> : null}
      <Campo>
        <Label>Marca</Label>
        <Select
          name="marca"
          value={marca}
          onChange={obtenerInformacion}
        >
          <option value="">-- Seleccione -- </option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Año</Label>
        <Select
          name="year"
          value={year}
          onChange={obtenerInformacion}
        >
          <option value="">-- Seleccione -- </option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
          <option value="2011">2011</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Plan</Label>
        <InputRadio
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={obtenerInformacion}
        />Básico
        <InputRadio
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={obtenerInformacion}
        />Completo
      </Campo>
      <Boton
        type="submit"
        >Cotizar
      </Boton>
    </form>
  )
}
Formulario.propTypes = {
  setResumen: PropTypes.func.isRequired,
  setCargando: PropTypes.func.isRequired
}
export default Formulario
