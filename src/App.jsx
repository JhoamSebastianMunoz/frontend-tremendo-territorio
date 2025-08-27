import { Footer } from './components/Shared/Footer/Footer';
import { Header } from './components/Shared/Header/Header';
import { GetDataAdminProvider } from './contexts/GetDataAdmin/GetDataAdmin';
import { GetUsersInformationProvider } from './contexts/UsersInformation/UsersInformation';
import { RatingProvider } from './contexts/Rating/Rating';
import { CommentsProvider } from './contexts/Comments/Comments';
import { AuthProvider } from './contexts/Auth/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <GetDataAdminProvider>
          <GetUsersInformationProvider>
            <RatingProvider>
              <CommentsProvider>
                <Header/>
                <Footer/>
              </CommentsProvider>
            </RatingProvider>
          </GetUsersInformationProvider>
        </GetDataAdminProvider>
      </AuthProvider>
    </>
  )
};

export default App;