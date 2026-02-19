import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";

import Compressor from "./components/pages/Compressor";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Navbar from "./components/Navbar";
import CropImage from "./components/pages/CropImage";
import EditorPage from "./components/pages/EditorPage";
import ChangeFormatPage from "./components/pages/ChangeFormatPage";
import Transform from "./components/pages/Transform";
import TransformEditor from "./components/pages/TransformEditor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Home />} />
        <Route path="/transform" element={<Transform />} />
        <Route path="/compressor" element={<Compressor />} />
        <Route path="/crop-image" element={<CropImage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/change-format" element={<ChangeFormatPage />}/>
      </Route>

      <Route path="/crop-editor" element={<EditorPage />} />
      <Route path="/transform-editor" element={<TransformEditor />} />
    </Routes>
  );
}

export default App;
