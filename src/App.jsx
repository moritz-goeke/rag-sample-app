import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import MenuBar from "./components/MenuBar";
import About from "./pages/About";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <MenuBar />
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
