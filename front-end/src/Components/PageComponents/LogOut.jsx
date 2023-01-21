import React from 'react';
import { useConfig } from '../../context/DataProvider';
import { deleteCookie } from '../../helper/loginHelper';
import '../../styles/home.scss';

const Logout = () => {
  deleteCookie('uid',useConfig().userInfo._id,);
  useConfig().setUserData(null);
  return (
    <div className='logout_container'> 
      <h1>Eventica !!</h1>
      <p>You've logout.....</p>
    </div>
  )
}

export default Logout;