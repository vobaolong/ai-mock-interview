import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import ProtectedRoute from './layouts/protected-route'
import { LoaderPage } from './views/loader-page'

const PublicLayout = lazy(() =>
  import('./layouts/public-layout').then((module) => ({
    default: module.PublicLayout
  }))
)

const MainLayout = lazy(() =>
  import('./layouts/main-layout').then((module) => ({
    default: module.default
  }))
)

const HomePage = lazy(() =>
  import('./routes/home-page').then((module) => ({
    default: module.HomePage
  }))
)

const SignInPage = lazy(() =>
  import('./routes/sign-in').then((module) => ({
    default: module.SignInPage
  }))
)

const SignUpPage = lazy(() =>
  import('./routes/sign-up').then((module) => ({
    default: module.SignUpPage
  }))
)

const ContactUsPage = lazy(() =>
  import('./routes/contact').then((module) => ({
    default: module.ContactUsPage
  }))
)

const Generate = lazy(() =>
  import('./views/generate').then((module) => ({
    default: module.Generate
  }))
)

const Dashboard = lazy(() =>
  import('./routes/dashboard').then((module) => ({
    default: module.Dashboard
  }))
)

const CreateEditPage = lazy(() =>
  import('./routes/create-edit-page').then((module) => ({
    default: module.CreateEditPage
  }))
)

const MockLoadPage = lazy(() =>
  import('./routes/mock-load-page').then((module) => ({
    default: module.MockLoadPage
  }))
)

const MockInterviewPage = lazy(() =>
  import('./routes/mock-interview-page').then((module) => ({
    default: module.MockInterviewPage
  }))
)

const Feedback = lazy(() =>
  import('./routes/feedback').then((module) => ({
    default: module.Feedback
  }))
)

export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoaderPage />}>
        <Routes>
          {/* public routes */}
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/contact' element={<ContactUsPage />} />

          <Route element={<PublicLayout />}>
            <Route path='/' element={<HomePage />} />
          </Route>

          {/* protected routes */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path='/generate' element={<Generate />}>
              <Route index element={<Dashboard />} />
              <Route path=':interviewId' element={<CreateEditPage />} />
              <Route path='interview/:interviewId' element={<MockLoadPage />} />
              <Route
                path='interview/:interviewId/start'
                element={<MockInterviewPage />}
              />
              <Route path='feedback/:interviewId' element={<Feedback />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}
