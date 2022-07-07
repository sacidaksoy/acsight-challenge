import { ToastContainer } from 'react-toastify';
import './App.scss';
import Router from './router/Router';

function App() {
  return (
    <div className="App">
        <Router/>
        <ToastContainer />
    </div>
  );
}

export default App;
