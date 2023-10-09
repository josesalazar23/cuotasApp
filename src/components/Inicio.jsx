import React from 'react';

const Inicio = ({
  totalPersonas,
  setTotalPersonas,
  totalImporte,
  setTotalImporte,
  totalPorcentaje,
  setTotalPorcentaje,
  handleAddClick,
}) => {

  const handleInputChange = (e, setterFunction, minValue = null) => {
    const value = parseInt(e.target.value, 10);

    if (!isNaN(value)) {
      if (minValue !== null && value < minValue) {
        // Muestra un mensaje de error si el valor es menor que el mínimo
        alert(`El valor no puede ser menor que ${minValue}`);
        setterFunction(minValue);
      } else {
        setterFunction(value);
      }
    } else {
      setterFunction('');
    }
  };

  const handleAddDataClick = () => {
    if (totalPersonas !== '' && totalImporte !== '' && totalPorcentaje !== '') {
      // Si se han ingresado valores en todos los campos, oculta los campos
      handleAddClick(); // Llama a la función para continuar con la lógica deseada
    }
  };

  console.log("este es el porcentaje en inicio", totalPorcentaje)

  return (
    <div className='containerInitialApp'>
      <div className='inicio'>
        <div>
          <label className="label">Total de Personas:</label>
          <input
            className="input-number"
            type="number"
            step="1"
            value={totalPersonas}
            onChange={(e) => handleInputChange(e, setTotalPersonas)}
          />
        </div>
        <div>
          <label className="label">Importe Total:</label>
          <input
            className="input-number"
            type="number"
            step="1"
            value={totalImporte}
            onChange={(e) => handleInputChange(e, setTotalImporte)}
          />
        </div>
        <div>
          <label className="label">Porcentaje de Pago:</label>
          <input
            className="input-number"
            type="number"
            step="1"
            value={totalPorcentaje}
            onChange={(e) => handleInputChange(e, setTotalPorcentaje, 30)}
          />
        </div>
        <div className='btnContainer'>
          <button className="btnAñadir" onClick={handleAddDataClick}>Añadir Data</button>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
