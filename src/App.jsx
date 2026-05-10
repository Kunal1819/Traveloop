import { Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { useAuth } from "./context/AuthContext";

// Screens
import { LoginScreen } from "./pages/LoginScreen";
import { DashboardScreen } from "./pages/DashboardScreen";
import { CreateTripScreen } from "./pages/CreateTripScreen";
import { MyTripsScreen } from "./pages/MyTripsScreen";
import { ItineraryBuilderScreen } from "./pages/ItineraryBuilderScreen";
import { ItineraryViewScreen } from "./pages/ItineraryViewScreen";
import { CitySearchScreen } from "./pages/CitySearchScreen";
import { ActivitySearchScreen } from "./pages/ActivitySearchScreen";
import { TripBudgetScreen } from "./pages/TripBudgetScreen";
import { PackingChecklistScreen } from "./pages/PackingChecklistScreen";
import { SharedItineraryScreen } from "./pages/SharedItineraryScreen";
import { UserProfileScreen } from "./pages/UserProfileScreen";
import { TripNotesScreen } from "./pages/TripNotesScreen";
import { AdminDashboardScreen } from "./pages/AdminDashboardScreen";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/trips/:id/public" element={<SharedItineraryScreen />} />
      
      <Route path="/" element={<PrivateRoute><AppShell /></PrivateRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardScreen />} />
        <Route path="trips" element={<MyTripsScreen />} />
        <Route path="trips/new" element={<CreateTripScreen />} />
        <Route path="trips/:id" element={<ItineraryBuilderScreen />} />
        <Route path="trips/:id/view" element={<ItineraryViewScreen />} />
        <Route path="trips/:id/budget" element={<TripBudgetScreen />} />
        <Route path="trips/:id/packing" element={<PackingChecklistScreen />} />
        <Route path="trips/:id/notes" element={<TripNotesScreen />} />
        
        <Route path="packing" element={<PackingChecklistScreen />} />
        
        <Route path="search/city" element={<CitySearchScreen />} />
        <Route path="search/city/:city/activities" element={<ActivitySearchScreen />} />
        
        <Route path="profile" element={<UserProfileScreen />} />
        <Route path="settings" element={<UserProfileScreen />} />
        
        <Route path="admin" element={<AdminDashboardScreen />} />
      </Route>
    </Routes>
  );
}
