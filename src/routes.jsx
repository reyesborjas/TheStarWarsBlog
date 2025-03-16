import React from 'react';
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route 
} from 'react-router-dom';

// Import components
import Layout from './pages/Layout';
import Home from './pages/Home';
import List from './pages/List';
import Details from './pages/Details';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Home Route */}
      <Route index element={<Home />} />

      {/* List Routes */}
      <Route path="/people" element={<List type="people" />} />
      <Route path="/planets" element={<List type="planets" />} />
      <Route path="/vehicles" element={<List type="vehicles" />} />

      {/* Details Routes */}
      <Route path="/people/:id" element={<Details type="people" />} />
      <Route path="/planets/:id" element={<Details type="planets" />} />
      <Route path="/vehicles/:id" element={<Details type="vehicles" />} />
    </Route>
  )
);