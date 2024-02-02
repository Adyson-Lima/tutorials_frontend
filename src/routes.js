import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tutorials from './pages/Tutorials';
import NewUpdate from './pages/NewUpdate';

export default function TutorialsRouter(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tutorials/>} />
        <Route path="/newupdate/:tutorial_id" element={<NewUpdate/>} />
      </Routes>
    </BrowserRouter>
  );
}