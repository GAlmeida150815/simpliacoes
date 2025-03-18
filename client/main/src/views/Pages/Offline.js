// Importing necessary React hooks and components
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Importing components from Reactstrap library
import {
  Container,
  Row
} from 'reactstrap';

// Importing custom components
import Navbar from 'components/Navbars/SimpliNavbar.js';
import SimpliFooter from 'components/Footers/SimpliFooter.js';

// Configuration and utility modules
import * as api from 'utils/apiUtils.js';

const Offline = () => {
    const [offline, setOffline] = useState(true);
    const [apiCheckCompleted, setApiCheckCompleted] = useState(false);

    const main = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPI = async () => {
            try {
              const isOnline = await api.checkOnlineStatus();
              if (isOnline) {
                setOffline(false);
              }
            } catch (error) {
              console.error('Error checking online status:', error);
            } finally {
                setApiCheckCompleted(true);
            }
        };
        
        const initialFetch = setInterval(() => {
          fetchAPI();
        }, 5000);

        return () => clearInterval(initialFetch);
    }, []);
    
    useEffect(() => {
        if (apiCheckCompleted && !offline) {
            navigate('/');
        }
    }, [offline, navigate, apiCheckCompleted]);

    return (
    <>
        <Navbar offline={true} />
        <main ref={main}>
        <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 blog-background">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            </div>
            <Row>
            <Container className="d-flex align-items-center" style={{ height: '80vh'}}>
                <h3> Algo correu mal :( </h3>
                <p>
                Parece que algo não está funcional do nosso lado. Estamos a trabalhar o mais rápido possível para resolver esta situação.
                <br />Enquanto isso podes seguir-nos no nosso <a href="aaa">Instagram</a>.
                </p>
            </Container>
            </Row>
        </section>
        </main>
        <SimpliFooter offline={true} />
    </>
    );
};

export default Offline;
