import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function Userauth() {
  const [userAuthenticated, setuserAuthenticated] = useState(null);

  useEffect(() => {
    const jwtToken = Cookies.get('jwtToken');
    if (jwtToken) {
      setuserAuthenticated(true);
    } else {
      setuserAuthenticated(false);
    }
  }, []);

  return userAuthenticated;
}

export default Userauth;
