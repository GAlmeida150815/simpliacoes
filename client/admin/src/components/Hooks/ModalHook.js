import React, { useState, useContext, createContext } from 'react';
import { 
    Modal, 
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from 'reactstrap';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useContext must be used within a ModalProvider');
  }

  return context;
};

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [backdrop, setBackdrop] = useState(true);
    const [decision, setDecision] = useState(false);
    const [hideModalCallback, setHideModalCallback] = useState(null);

    const showModal = (tit, desc, staticBd = false) => {
        return new Promise((resolve) => {
            setTitle(tit);
            setDescription(desc);
            if (staticBd) {
                setBackdrop('static');
            }
            setModal(true);

            setHideModalCallback(() => resolve);
        });
    };

    const showDecisionModal = (tit, desc) => {
        return new Promise((resolve) => {
            setTitle(tit);
            setDescription(desc);
            setDecision(true);
            setModal(true);
    
            setHideModalCallback(() => resolve);
        });
    };

    const hideModal = () => {
        setModal(false);
        setTitle('');
        setBackdrop(true);
        setDecision(false);
        setDescription('');
        hideModalCallback && hideModalCallback(false); // resolve the Promise with false
        setHideModalCallback(null);
    };

    const handleClose = (decision) => {
        hideModalCallback && hideModalCallback(decision);
        setHideModalCallback(null);
        setModal(false);
        setTitle('');
        setBackdrop(true);
        setDecision(false);
        setDescription('');
    };

    return (
        <ModalContext.Provider value={{ showModal, showDecisionModal, hideModal, setHideModalCallback }}>
            {children}
            <Modal 
                isOpen={modal} 
                centered 
                backdrop={backdrop}
            >
                <ModalHeader className='justify-content-center'>
                    {title}
                </ModalHeader>
                <ModalBody className='justify-content-center'>
                    {description}
                </ModalBody>
                <ModalFooter>
                    <>
                        {decision ? (
                            <>
                                <Button color="success" onClick={() => handleClose(true)}>
                                    Sim
                                </Button>
                                <Button color="danger" onClick={() => handleClose(false)}>
                                    Não
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button color="danger" onClick={hideModal}>
                                    Okay
                                </Button>
                            </>
                        )}
                    </>
                </ModalFooter>
            </Modal>
        </ModalContext.Provider>
    );
};
