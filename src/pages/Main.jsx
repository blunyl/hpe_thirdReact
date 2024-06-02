import { useEffect } from "react";
import Banner from "../components/Banner";
import MainList from "../components/MainList";
import { useSelector } from "react-redux";
import { getProductList } from "../store/productStore";
import { useDispatch } from "react-redux";

const Main = () => {
  //productStore.js 의 initialState 가 다 들어온다
  let productsState = useSelector((state) => state.products);
  let products = productsState.products;
  console.log(productsState);
  console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList("new"));
  }, [dispatch]);

  if (productsState.status !== "succeeded") {
    return <div className='mw'>loding....</div>;
  }

  return (
    <main className='mw'>
      <Banner />
      <MainList products={products} />
    </main>
  );
};

export default Main;
