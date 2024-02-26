
import "../src/App.css";
import { Outlet } from "react-router-dom";
import { Nav } from ".//components//Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
