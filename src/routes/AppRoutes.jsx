import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DesignPreview from '../pages/DesignPreview';

export function AppRoutes() {
  return (
    <Routes>
      {/* Root points to /design-preview for immediate component inspection */}
      <Route path="/" element={<Navigate to="/design-preview" replace />} />
      <Route path="/design-preview" element={<DesignPreview />} />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/design-preview" replace />} />
    </Routes>
  );
}

export default AppRoutes;
