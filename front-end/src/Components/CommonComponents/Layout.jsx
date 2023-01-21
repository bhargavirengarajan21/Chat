import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({children}) => {
  console.log("header");
  return(
    <div className='layout_container'>
        <Header />
        {children}
        <Footer />
    </div>
  )
};

export default Layout;