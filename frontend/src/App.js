import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/home/Home/Home'
import Auth from './views/Auth/Auth'
import AuthContextProvider from './contexts/AuthContext';
import Landing from './components/auth/Landing/Landing';
import ProtectedRoute from './components/auth/ProtectedRoute/ProtectedRoute';
import ExamContextProvider from './contexts/ExamContext';
import TestForm from './components/Content/ExamForm/ExamForm';
import History from './components/me/History/History'
import Info from './components/me/Info/Info'
import NotFound from './components/Content/NotFound/NotFound';
import Rank from './components/Content/Rank/Rank';
import Admin from './components/admin/Admin/Admin';
import ProtectedAdmin from './components/auth/ProtectedAdmin/ProtectedAdmin';
import Exams from './components/admin/Exams/Exams';
import Users from './components/admin/Users/Users';
import AdminContextProvider from './contexts/AdminContext';
import UpdateExam from './components/admin/UpdateExam/UpdateExam';
import { MathJaxContext } from 'better-react-mathjax'
import LayoutRoute from './components/auth/LayoutRoute/LayoutRoute';
import ExamContext from './components/Content/ExamContent/ExamContent';
import MyRank from './components/me/MyRank/MyRank';
import CreateExam from './components/admin/CreateExam/CreateExam';
import TrialExam from './components/Content/TrialExam/TrialExam';
import UserContextProvider from './contexts/UserContext';

function App() {  
  return (
    <AuthContextProvider>
      <AdminContextProvider>
        <UserContextProvider>
          <MathJaxContext>
            <ExamContextProvider>
              <Router>
                <Routes>
                  <Route path='/' element={<Landing/>} />
                  <Route path='/login' element={<Auth authRoute='login'/>} />
                  <Route path='/register' element={<Auth authRoute='register'/>} />
                  <Route path='/home' element={<LayoutRoute Component={Home}/>}/>
                  <Route path='/admin' element={<ProtectedAdmin Component={Admin} flag='no-nav'/>}/>
                  <Route path='/admin/exams-management/view/:slug' element={<ProtectedAdmin Component={UpdateExam} flag='no-nav'/>}/>
                  <Route path='/admin/exams-management/create/:slug' element={<ProtectedAdmin Component={CreateExam} flag='no-nav'/>}/>
                  <Route path='/admin/exams-management' element={<ProtectedAdmin Component={Exams} />}/>
                  <Route path='/admin/users-management' element={<ProtectedAdmin Component={Users} />}/>
                  <Route path='/rank' element={<LayoutRoute Component={Rank}/>}/>
                  <Route path='/exams' element={<LayoutRoute Component={ExamContext}/>} />
                  <Route path='/exams/try/:slug' element={<LayoutRoute Component={TrialExam} flag='no-nav'/>} />
                  <Route path='/exams/:slug' element={<ProtectedRoute Component={TestForm} flag='no-nav' />} />
                  <Route path='/me/history' element={<ProtectedRoute Component={History} />} />
                  <Route path='/me/rank' element={<ProtectedRoute Component={MyRank} flag='no-nav'/>} />
                  <Route path='/me/info' element={<ProtectedRoute Component={Info} flag='no-nav'/>} />
                  <Route path='*' element={<NotFound />}></Route>
                </Routes>
              </Router>
            </ExamContextProvider>
          </MathJaxContext>
        </UserContextProvider>
      </AdminContextProvider>
    </AuthContextProvider>
  )
}

export default App;
