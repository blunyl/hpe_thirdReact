import { useEffect, useState } from "react";
import ListCard from "../components/ListCard";
import { useSelector, useDispatch } from "react-redux";
import { getProductList } from "../store/productStore";

const ShopAll = () => {
  // const [products, setProducts] = useState([]);
  /* history
  //전체상품 가져오기
  const getProductList = async () => {
    let url = `http://localhost:5000/products`;
    let response = await fetch(url);
    let data = await response.json();
    setProducts(data);
  };

  const getNewList = async () => {
    let url = `http://localhost:5000/products?category=new`;
    let response = await fetch(url);
    let data = await response.json();
    setProducts(data);
  };

  const getTopList = async () => {
    let url = `http://localhost:5000/products?category=top`;
    let response = await fetch(url);
    let data = await response.json();
    setProducts(data);
  };
  
  const getLowPrice = async () => {
    products.sort((a, b) => {
      return a.price - b.price;
    });
    setProducts([...products]);
  };

  const getHighPrice = async () => {
    products.sort((a, b) => {
      return b.price - a.price;
    });
    setProducts([...products]);
  };

  const getDiscountRate = async () => {
    products.sort((a, b) => {
      return b.discount - a.discount;
    });
    setProducts([...products]);
  };
  */
  let productsState = useSelector((state) => state.products);
  let products = productsState.products;

  let [list, setList] = useState(products);

  const dispatch = useDispatch();

  const sortProduct = (type) => {
    let sortList = [...list];
    if (type === "lowPrice") {
      sortList.sort((a, b) => a.price - b.price);
    } else if (type === "highPrice") {
      sortList.sort((a, b) => b.price - a.price);
    } else if (type === "highDiscount") {
      sortList.sort((a, b) => b.discount - a.discount);
    }
    setList(sortList);
  };

  /*history
  const sortProduct = useCallback(
    (type) => {
      let sortList = [...products]; //copy
      if (type === "lowPrice") {
        sortList.sort((a, b) => a.price - b.price);
      } else if (type === "highPrice") {
        sortList.sort((a, b) => b.price - a.price);
      } else if (type === "highDiscount") {
        sortList.sort((a, b) => b.discount - a.discount);
      }
      setProducts(sortList);
    },
    [products, setProducts]
  ); //[] 안 애들이 바뀌면 안의 내용이 실행되게 한다

  useEffect(() => {
    getProductList();
  }, [getProductList]);
  */

  useEffect(() => {
    dispatch(getProductList(""));
  }, [dispatch]);

  useEffect(() => {
    setList(products);
  }, [products]);

  return (
    <main className='mw shopall'>
      <h2>ShopAll</h2>
      <nav>
        <button
          onClick={() => {
            dispatch(getProductList(""));
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            dispatch(getProductList("new"));
          }}
        >
          Latest
        </button>
        <button
          onClick={() => {
            dispatch(getProductList("top"));
          }}
        >
          Hot
        </button>
        <hr />
        <button
          onClick={() => {
            sortProduct("lowPrice");
          }}
        >
          Lower Price
        </button>
        <button
          onClick={() => {
            sortProduct("highPrice");
          }}
        >
          Higher Price
        </button>
        <button
          onClick={() => {
            sortProduct("highDiscount");
          }}
        >
          Higher D/C
        </button>
      </nav>
      <ul className='listCon'>
        {list.map((product) => {
          return (
            <li key={product.id}>
              <ListCard product={product} />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default ShopAll;
