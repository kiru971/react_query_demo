import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Appbar from "./components/Student/Appbar";
import HomePage from "./components/Home";
import CompanyPage from "./components/Company";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Home />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/student" element={<Appbar />} />
        <Route path="/company" element={<CompanyPage />} />
      </Route>
      <Route path="*" element={<Navigate to={"/login"} />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
