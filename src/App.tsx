import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CreateEditPage } from './routes/create-edit-page'
import { MockLoadPage } from './routes/mock-load-page'
import { Feedback } from './routes/feedback'
import { MockInterviewPage } from './routes/mock-interview-page'
import { Dashboard } from './routes/dashboard'
import ProtectedRoute from './layouts/protected-route'
import MainLayout from './layouts/main-layout'
import { Generate } from './views/generate'
import { PublicLayout } from './layouts/public-layout'
import { ContactUsPage, HomePage, SignInPage, SignUpPage } from './routes'

export default function App() {
  return (
    <Router>
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
            {/* create route */}
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
    </Router>
  )
}
