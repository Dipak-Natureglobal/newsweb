import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Main from './components/main';
import SingIn from './components/signin-page';
import React from 'react';
import NewsDetails from './components/newsDetails';

function App() {
  const navigate = useNavigate();

  const NotFoundRedirect = () => {
    React.useEffect(() => {
      navigate('/'); 
    }, []); 

    return null; 
  };

  return (
    <div>
      <Routes>
        {/* Define normal routes */}
        <Route path="/singin" element={<SingIn />} />
        <Route path="/" element={<Main />} />
        <Route path="/details" element={<NewsDetails />}/>

        {/* Add wildcard route to handle 404 errors */}
        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
    </div>
  );
}


export default App;
