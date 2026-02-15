import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const MapPage = lazy(() => import("../pages/MapPage"));
const DriversPage = lazy(() => import("../pages/DriversPage"));
const VehiclesPage = lazy(() => import("../pages/VehiclesPage"));
const ShiftsPage = lazy(() => import("../pages/ShiftsPage"));

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<MainLayout />}>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/tracking" element={<MapPage />} />
      <Route path="/drivers" element={<DriversPage />} />
      <Route path="/vehicles" element={<VehiclesPage />} />
      <Route path="/shifts" element={<ShiftsPage />} />
    </Route>
  </Routes>
);
