import React, { useState, useEffect } from 'react';

const Cuotas = ({
  totalImporte,
  paymentDates,
  totalPersonas,
  totalPorcentaje,
  setTotalPorcentaje,
  showCuotas,
  refreshCuotas,
  setRefreshCuotas,

}) => {
  const [personasAdicionales, setPersonasAdicionales] = useState(0);
  const [cuotasStates, setCuotasStates] = useState([]);
  const [porcentajeReduccion, setPorcentajeReduccion] = useState(0);

  useEffect(() => {
    if (showCuotas && cuotasStates.length === 0) {
      const initialCuotas = paymentDates.map(() => totalImporte / paymentDates.length);
      setCuotasStates([initialCuotas]);
    }
  }, [showCuotas, totalImporte, paymentDates, cuotasStates]);

  const handleCuotaChange = (e, personaIndex, cuotaIndex) => {
    const newCuotasStates = [...cuotasStates];
    const newValue = parseFloat(e.target.value) || 0;

    if (cuotaIndex === 0) {
      const minCuota = Math.min(...newCuotasStates[personaIndex].slice(1));
      newCuotasStates[personaIndex][0] = Math.max(newValue, minCuota);
    } else {
      newCuotasStates[personaIndex][cuotaIndex] = Math.min(
        newValue,
        newCuotasStates[personaIndex][0]
      );
    }

    const totalCuotas = newCuotasStates[personaIndex].reduce((acc, cuota) => acc + cuota, 0);
    if (totalCuotas !== totalImporte) {
      const diferencia = totalImporte - totalCuotas;
      const cuotaRestante = newCuotasStates[personaIndex].findIndex((cuota) => cuota !== 0);
      if (cuotaRestante >= 0) {
        newCuotasStates[personaIndex][cuotaRestante] += diferencia;
      }
    }

    setCuotasStates(newCuotasStates);
  };

  const handleMasPersonasClick = () => {
    const porcentajeAcumulado = porcentajeReduccion + 10;
    const nuevoTotal = totalImporte * (1 - porcentajeAcumulado / 100);

    setPorcentajeReduccion(porcentajeAcumulado);
    setPersonasAdicionales(personasAdicionales + 50);

    const nuevasCuotas = paymentDates.map(() => nuevoTotal / paymentDates.length);

    setCuotasStates((prevState) => [...prevState, nuevasCuotas]);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '100%' }}>
          <table className="cuotas-table">
            <thead>
              <tr>
                <th>Número de Personas</th>
                <th>Total</th>
                {showCuotas && paymentDates.map((date, index) => (
                  <th key={index}>{`Cuota ${index + 1} (${date})`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {showCuotas && cuotasStates.map((cuotas, personaIndex) => (
                <tr key={personaIndex}>
                  <td>{totalPersonas + personaIndex * 50}</td>
                  <td>{(totalImporte * (1 - (personaIndex * 10) / 100)).toFixed(2)}</td>
                  {cuotas.map((cuota, cuotaIndex) => (
                    <td key={cuotaIndex}>
                      <input
                        type="number"
                        step="0.01"
                        value={cuota}
                        onChange={(e) =>
                          handleCuotaChange(e, personaIndex, cuotaIndex)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {showCuotas && (
            <button className="btnDate" onClick={handleMasPersonasClick}>Más Personas</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cuotas;














