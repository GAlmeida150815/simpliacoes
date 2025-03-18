// Importing React hooks
import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';

// Importing layout components from Reactstrap
import { Container } from 'reactstrap';

// Importing custom components
import SimpliSidebar from '../components/Navbars/SimpliSidebar';
import SimpliNavbar from '../components/Navbars/SimpliNavbar';
import SimpliFooter from '../components/Footers/SimpliFooter.js';
import Loading from 'components/Loading.js';
import SimpliBottomNavbar from 'components/Navbars/SimpliBottomNavbar';
import CookieToast from 'components/CookieToast';

// Importing custom hook
import useIsMobile from '../components/Hooks/useIsMobile';

// Importing configuration module
import * as api from 'utils/apiUtils.js';
import * as config from 'config.js';


const Template = ({ children, dataFetched = true }) => {
  const [isHovered, setHovered] = useState(false);
  const [offline, setOffline] = useState(false);

  const main = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchAPI = async () => {
      const isOnline = await api.checkOnlineStatus();
      if (!isOnline) 
        setOffline(true);
    }

    document.title = "SimpliAções";
    fetchAPI();
  }, []);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleClick = () => {
    setHovered(true);
    setTimeout(() => {
      setHovered(false);
    }, 2000);
  };

  const handleMouseOut = () => {
    setTimeout(() => {
      setHovered(false);
    }, 2000);
  };

  if (offline) {
    return <Navigate to="/offline" />;
  }

  return (
    <>
      {isMobile ? (
          <Container fluid className='page-container'>
            <SimpliNavbar />
            <main ref={main} className='page-content'>
              {!dataFetched && <Loading />}
              {children}
              <Container
                fluid
                className={`warning ${isHovered ? 'd-none' : 'd-block'}`}
              >
                <div className="text-center"
                  onMouseOver={handleMouseOver}
                  onClick={handleClick}
                  onMouseOut={handleMouseOut} dangerouslySetInnerHTML={{ __html: config.investWarn.replace(/\n/g, '<br />')}}/>
              </Container>
              <SimpliFooter />
              <CookieToast />
            </main>
            <SimpliBottomNavbar />
          </Container>
      ) : (
          <Container fluid className='page-container'>
            <SimpliSidebar />
            <main ref={main} className='page-content'>
              {!dataFetched && <Loading />}
              {children}
              <Container
                fluid
                className={`warning ${isHovered ? 'd-none' : 'd-block'}`}
              >
                <div className="text-center"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut} dangerouslySetInnerHTML={{ __html: config.investWarn.replace(/\n/g, '<br />')}}/>
              </Container>
              <SimpliFooter />
              <CookieToast />
            </main>
          </Container>
      )}
    </>
  );
};

export default Template;
