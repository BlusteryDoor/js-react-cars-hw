import React, {useState, useEffect} from 'react';
import MainLayout  from '../../layouts/MainLayout';

function Spectators() {
  const [spectators, setSpectators] = useState([]);

  useEffect(() => {
    const fetchSpectators = async () => {
      try {
        const response = await fetch('/guests');
        if(!response.ok) throw response;
        const data = await response.json();
        console.log('data', data);
        setSpectators(data)
      } catch (err) {
        console.error(err);
      }
    }
    fetchSpectators();
  }, []);
  return (
    <MainLayout>
    <h1>Spectators</h1>
    <ul>
      {spectators.map(({firstName, lastName, email}) => <li>{lastName}, {firstName} ({email})</li>)}
    </ul>
    </MainLayout>
  );
}

export default Spectators;