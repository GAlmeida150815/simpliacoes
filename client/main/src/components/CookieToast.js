// Importing necessary React components
import React, { useState, useEffect } from 'react';

// Importing reactstrap components
import { Button } from 'reactstrap';

// Importing cookie related components
import { toast, ToastContainer, Zoom } from 'react-toastify';
import Cookies from 'js-cookie';

// Importing images
import Cookie from '../assets/img/icons/common/cookie.png';

const CookieToast = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    if (!cookiesAccepted && !Cookies.get('simpliacoes_cookie-accept')) {
      toast(
        <div className='cookie-toast'>
          O nosso site utiliza cookies para melhorar a sua experiência.
          <Button color="success" onClick={handleAcceptCookies} className='cookie-accept'>
            Aceitar
          </Button>
        </div>,
        {
          icon: () => <img src={Cookie} alt="Cookie Icon" style={{ width: '24px', height: '24px' }} />
        }
      );
    }

    if (Cookies.get('simpliacoes_cookie-accept')) {
      setCookiesAccepted(true);
    }
  }, [cookiesAccepted]);

  const handleAcceptCookies = () => {
    Cookies.set('simpliacoes_cookie-accept', 'true', { expires: 365 });
    setCookiesAccepted(true);
  };

  return (
    <ToastContainer
      className="toast-position"
      position="bottom-center"
      limit={1}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Zoom}
    />
  );
};

export default CookieToast;
