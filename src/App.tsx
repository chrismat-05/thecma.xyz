import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import React from "react";
import { MagneticCustomCursor } from "./components/cursor/MagneticCustomCursor";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { PageTransition } from "./components/layout/PageTransition";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <AboutPage />
            </PageTransition>
          }
        />
        <Route
          path="/projects"
          element={
            <PageTransition>
              <ProjectsPage />
            </PageTransition>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <PageTransition>
              <ProjectDetailPage />
            </PageTransition>
          }
        />
        <Route
          path="/project/:id"
          element={
            <PageTransition>
              <ProjectDetailPage />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <MagneticCustomCursor>
          <BrowserRouter>
            <ScrollToTop />
            <AnimatedRoutes />
          </BrowserRouter>
        </MagneticCustomCursor>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;