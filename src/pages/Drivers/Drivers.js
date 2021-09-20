import React from 'react';
import DriverList from './../../components/DriverList/DriverList';
import MainLayout  from '../../layouts/MainLayout';

function Home(){
  return (
    <MainLayout>
      <DriverList />
    </MainLayout>
  );
}

export default Home;
