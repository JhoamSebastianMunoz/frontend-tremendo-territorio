import { Footer } from './components/Shared/Footer/Footer';
import { Header } from './components/Shared/Header/Header';
import { GetDataAdminProvider } from './contexts/GetDataAdmin/GetDataAdmin'

function App() {

  return (
    <>
      <GetDataAdminProvider>
        <Header/>
        <Footer/>
      </GetDataAdminProvider>
    </>
  )
};

export default App;
