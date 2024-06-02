import "bootstrap/dist/css/bootstrap.min.css";
import "./css/my_reset.css";
import "./css/App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Company from "./pages/Company";
import Ceo from "./pages/Ceo";
import Organization from "./pages/Organization";
import Ci from "./pages/Ci";
import ShopAll from "./pages/ShopAll";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

import { Route, Routes } from "react-router-dom";

function App() {
  /* history
  const getProductList = async () => {
    // api 호출함수
    let url = `http://localhost:5000/products?category=new`; //json-server url
    let response = await fetch(url);
    let data = await response.json();
    // console.log("data", data);
    setProducts(data);
  };

  useEffect(() => {
    getProductList();
  }, []);
*/
  // console.log(list);
  // console.log("products", products); 계속 실행됨
  // console.log("products--", products); //useeffect 사용후 11개만 가져옴
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/shopall' element={<ShopAll />} />
        <Route path='/products/:id' element={<Products />} />
        <Route path='/cart' element={<Cart />} />

        <Route path='/company' element={<Company />}>
          <Route path='ceo' element={<Ceo />} />
          <Route path='organization' element={<Organization />} />
          <Route path='ci' element={<Ci />} />
        </Route>

        <Route path='*' element={<h1>not found</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
