import React, { useState, useEffect } from 'react';
import DateApp from './DateApp';
import Cuotas from './Cuotas';

const Home = () => {
  const [dateAdded, setDateAdded] = useState(0);

  const recalculateCuotas = (totalCost, count) => {
    const newCuotaValue = Math.ceil(totalCost / count);
    return new Array(count).fill(newCuotaValue);
  };


  

  return (
    <div className="paymentApp">
      <div>
          <DateApp
            setDateAdded={setDateAdded}
            dateAdded={dateAdded}
            recalculateCuotas={recalculateCuotas}
          />
      </div>

      <div>
        <Cuotas
          dateAdded={dateAdded}
          recalculateCuotas={recalculateCuotas}
        />
      </div>
    </div>
  );
};

export default Home;

