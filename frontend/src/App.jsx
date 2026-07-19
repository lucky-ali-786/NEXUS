import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice.js";
import { getCurrentUser } from ".././appwrite/auth.js";
import Headers from "./components/Headers.jsx";
import Footers from "./components/Footers.jsx";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res.success) {
          dispatch(login(res.data));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900">
      {/* Header */}
      <Headers />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20 pb-12">
        <div className="w-full h-full">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footers />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900">
      {/* Loading Spinner */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-1 bg-white dark:bg-gray-950 rounded-full"></div>
          <div className="absolute inset-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-75 animate-pulse"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default App;
