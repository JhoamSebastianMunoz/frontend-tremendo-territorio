import { Footer } from './components/Shared/Footer/Footer';
import { Header } from './components/Shared/Header/Header';
import { GetDataAdminProvider } from './contexts/GetDataAdmin/GetDataAdmin';
import { GetUsersInformationProvider } from './contexts/UsersInformation/UsersInformation';

function App() {

  return (
    <>
      <GetDataAdminProvider>
      <GetUsersInformationProvider> 
        <Header/>
        <Footer/>
      </GetUsersInformationProvider> 
      </GetDataAdminProvider>
    </>
  )
};

export default App;
