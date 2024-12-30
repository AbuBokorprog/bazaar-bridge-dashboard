import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/shared/Sidebar';

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <div>
        {/* <PrivateRoute> */}
        <Outlet />
        {/* </PrivateRoute> */}
      </div>
    </div>
  );
};

export default Dashboard;
