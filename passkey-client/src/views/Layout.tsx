import { useUserContext } from '@/hooks/contextHooks';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  const { user, handleAutoLogin } = useUserContext();

  if (!user) {
    handleAutoLogin();
  }

  return (
    <>
      <header className="mb-8 p-4 border-2 border-slate-200 rounded-lg">
        <nav>
          <ul className="flex justify-evenly">
            <li className="bg-slate-300 p-2 rounded-sm">
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li className="bg-slate-300 p-2 rounded-sm">
                  <Link to="/secret">Secret</Link>
                </li>
                <li className="bg-slate-300 p-2 rounded-sm">
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            ) : (
              <li className="bg-slate-300 p-2 rounded-sm">
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main className="m-4">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
