import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { Header } from './Components';
import { useAppSelector } from './redux/hooks';
import { selectUser } from './redux/reducers/userSlice';
import {
  NotFound,
  Dashboard,
  AddItem,
  ItemDetails,
  Items,
  Activity,
  Login,
} from './views/';
import { Register } from './views/Register';

type ProtectedRoutesProps = {
  isAllowed: boolean;
  redirectPath?: string;
  children: JSX.Element;
};
const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/login',
  children,
}: ProtectedRoutesProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export const AppRoutes = () => {
  const user = useAppSelector(selectUser);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute isAllowed={!!user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/items">
          <Route index element={<Items />} />
          <Route path=":itemId" element={<ItemDetails />} />
          <Route
            path="new"
            element={
              <ProtectedRoute isAllowed={!!user}>
                <AddItem />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/activity" element={<Activity />} />{' '}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
