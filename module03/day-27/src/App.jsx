
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="layout-container">
      {/* 1. Header Component */}
      <Header />
      
      {/* 2. Middle Body */}
      <div className="content-body">
        {/* Sidebar Component */}
        <Sidebar />
        
        {/* Main section (Kallattiin asitti dabalame) */}
        <main className="main-content">
          <h2>main</h2>
        </main>
      </div>
      
      {/* 3. Footer Component */}
      <Footer />
    </div>
  );
}

export default App;
