import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "../src/pages/Auth";
import AddTodo from "./pages/AddTodo";
import Dashboard from "./pages/Dashboard";
import EditTodo from "./pages/EditTodo";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="auth" element={<Auth />} />

          <Route
            path="add-todo"
            element={
              <ProtectedRoute>
                <AddTodo />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-todo/:id"
            element={
              <ProtectedRoute>
                <EditTodo />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;