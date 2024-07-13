import React from 'react'
import Header from '../components/Header/header';
import MainComponent from '../components/SignupSignin/mainComponent';

const Landing = () => {
  return (
    <div>
        <Header />
        <div className='wrapper'>
            <MainComponent />
        </div>
    </div>
  )
}

export default Landing;