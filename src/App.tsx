import { MotionConfig } from "framer-motion";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext.tsx";
import { Layout } from "./components/Layout.tsx";
import { LanguageProvider, useI18n } from "./i18n/LanguageContext.tsx";

const HomePage = lazy(() => import("./pages/Home.tsx"));
const AboutPage = lazy(() => import("./pages/About.tsx"));
const ServicesPage = lazy(() => import("./pages/Services.tsx"));
const ProjectsPage = lazy(() => import("./pages/Projects.tsx"));
const ReviewsPage = lazy(() => import("./pages/Reviews.tsx"));
const ContactPage = lazy(() => import("./pages/Contact.tsx"));
const LoginPage = lazy(() => import("./pages/Login.tsx"));
const AdminPage = lazy(() => import("./pages/Admin.tsx"));
const NotFoundPage = lazy(() => import("./pages/NotFound.tsx"));

function RouteFallback() {
  const { t } = useI18n();
  return (
    <div className="grid min-h-[40vh] place-items-center px-4">
      <p className="font-accent text-2xl leading-relaxed text-navy">{t.common.loading}</p>
    </div>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<LoginPage />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <AppRoutes />
      </MotionConfig>
    </LanguageProvider>
  );
}
