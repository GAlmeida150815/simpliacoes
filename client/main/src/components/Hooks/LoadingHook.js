import React, { useState, useContext, createContext } from 'react';
import { Modal, Spinner } from 'reactstrap';

const LoadingContext = createContext();

// Custom hook for using loading context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};


export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      <Modal 
        isOpen={loading} 
        centered 
        backdrop={"static"}
        contentClassName="modal-content-transparent">
        <div className="spinner-wrapper">
            <Spinner type="grow" className='mx-1'/>
            <Spinner type="grow" className='mx-1'/>
            <Spinner type="grow" className='mx-1'/>
        </div>
      </Modal>
    </LoadingContext.Provider>
  );
};