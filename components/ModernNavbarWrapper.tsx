"use client";

import ModernNavbar from './ModernNavbar';
import React from 'react';

export default function ModernNavbarWrapper() {
  // Always render ModernNavbar. Category pages should no longer include the old SharedNavbar.
  return <ModernNavbar />;
}
