// Importing React hooks
import { useState, useEffect } from 'react';


const useIsMobile = () => {
  // State to track if the screen width is below 768px
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    // Add event listener on component mount
    window.addEventListener('resize', handleResize);
    
    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return isMobile;
};

export default useIsMobile;