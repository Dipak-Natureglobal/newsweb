import { Routes , Route} from 'react-router-dom';
import './App.css';
import Main from './components/main';
import SingIn from './components/signin-page'


function App() {
  return (
    <h1 className=''>
      <Routes>
        <Route path='/singin' element={<SingIn />}/>
        <Route  path='/' element={<Main />}/>
      </Routes>
    </h1>    
  );
}

export default App;
