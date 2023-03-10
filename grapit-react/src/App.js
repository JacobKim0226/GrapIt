import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LogIn, LogOut } from './routes/LogIn';
import ChatRoom from './routes/ChatRoom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home/Home';
import Header from './components/common/header/Header';
import OCR from './routes/ocr/OCR';
import JoinMember from './routes/JoinMember';
import SurveyComponent from './components/home/survey/survey';
import ThreeCanvas from './components/ThreeCanvas';
import BaseCanvas from './components/BaseCanvas';
import 'survey-core/defaultV2.min.css';
import Result from './components/home/survey/result';
import Vidu from './routes/vidu/Vidu';
import RtcChat from './routes/RtcChat';
import DrawAlone from './routes/DrawAlone';

function App() {
  let chat = useSelector(state => state.chat);

  return (
    <div className="App">
      {/* <NavScroll/> */}
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/join" element={<JoinMember />} />
        <Route path="/room" element={<ChatRoom />} />
        <Route path="/room/:roomId" element={<RtcChat chat={chat} />} />
        <Route path="/draw_alone" element={<DrawAlone />} />
        <Route path="/ocr" element={<OCR />} />
        <Route path="/survey" element={<SurveyComponent />} />
        <Route path="/three" element={<ThreeCanvas />} />
        <Route path="/base" element={<BaseCanvas />} />
        <Route path="/vidu" element={<Vidu />} />
        <Route path="/tutorfind" element={<SurveyComponent />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
