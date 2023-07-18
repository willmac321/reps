import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import { authProvider, dataProvider } from './firebase/config';
import { UsersList } from './Users';

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="users" list={UsersList} />
  </Admin>
);

export default App;
