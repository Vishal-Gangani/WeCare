import React, { createContext } from 'react';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const value = {
    // Define any state or functions you want to provide to the context
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
}

export default DoctorContextProvider;
