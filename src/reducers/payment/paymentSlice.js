import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    installmentDates: [],
    tableRows: [{
      position: 1,
      peopleFrom: "",
      peopleTo: "",
      totalCost: 0,
      values: [],
    }],
    error: "",
    totalImporte: '',
    selectedMonth: '01',
    selectedYear: new Date().getFullYear().toString(),
    selectedDay: '01',
    cuotasStates: [],
  };



  const getStateFromLocalStorage = () => {
    let cuotasKeyApp = localStorage.getItem('cuotasKeyApp');
    
    if (!cuotasKeyApp) {
      // Si la keyy no existe, ps se crea un nuevo estado en localStorage
      cuotasKeyApp = JSON.stringify(initialState);
      localStorage.setItem('cuotasKeyApp', cuotasKeyApp);
    }
    return JSON.parse(cuotasKeyApp);
  };

  console.log(localStorage.getItem('cuotasKeyApp'));

export const paymentsSlice = createSlice({
    name: 'payments',
    // el initial state o el localstorage
    initialState: getStateFromLocalStorage(),
    reducers: {
      setInstallmentDates: (state, action) => {
        state.installmentDates = action.payload;
  
        // Actualiza localStorage aquí
        const updatedState = {
          ...state,
          installmentDates: action.payload,
        };
  
        localStorage.setItem("cuotasKeyApp", JSON.stringify(updatedState));
      },
      setTableRows: (state, action) => {
        state.tableRows = action.payload;
  
        // Actualiza localStorage aquí
        const updatedState = {
          ...state,
          tableRows: action.payload,
        };
  
        localStorage.setItem("cuotasKeyApp", JSON.stringify(updatedState));
      },
      setSelectedMonth: (state, action) => {
        state.selectedMonth = action.payload;
      },
      setSelectedYear: (state, action) => {
        state.selectedYear = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
      setSelectedDay: (state, action) => {
        state.selectedDay = action.payload;
      },

      setCuotasStates: (state, action) => {
        state.cuotasStates = action.payload;
      },
    },
  });

  export const {
    setSelectedMonth,
    setSelectedYear,
    setError,
    setSelectedDay,
    setCuotasStates,
    setInstallmentDates,
    setTableRows,
  } = paymentsSlice.actions;

 // function que tome el state del redux y lo pushee al local storage con la key cuotasApp
 // cada vez que se modifique el state del redux


export const loadInitialData = () => {
  return (dispatch) => {
    try {
      const cuotasKeyApp = localStorage.getItem('cuotasKeyApp');
      if (cuotasKeyApp) {
        // Si hay datos en el Local Storage, carga los datos al estado de Redux
        const initialStateFromLocalStorage = JSON.parse(cuotasKeyApp);
        dispatch(setInstallmentDates(initialStateFromLocalStorage.installmentDates));
        dispatch(setTableRows(initialStateFromLocalStorage.tableRows));
      }
    } catch (error) {
      console.error(error);
    }
  };
};




export default paymentsSlice.reducer;