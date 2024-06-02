import ListCard from "../components/ListCard";
import style from "../css/Detail.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addItem } from "../store/cartStore";
import { useDispatch } from "react-redux";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Products = () => {
  const { id } = useParams(); // listcard product.id
  const [products, setProducts] = useState([]);
  const [similarList, setSimilarList] = useState([]);
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  //상품 한개 가져오기
  const getProductList = async () => {
    let url = `https://my-json-server.typicode.com/blunyl/hpe_thirdReact/products/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    setProducts(data);

    let url2 = `https://my-json-server.typicode.com/blunyl/hpe_thirdReact/products/?category=${data.category}`;
    let response2 = await fetch(url2);
    let data2 = await response2.json();
    setSimilarList(data2);
  };

  useEffect(() => {
    getProductList();
  }, [id]); //연관 상품 클릭시 메인에 나옴
  // console.log("products--", products);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <main className='mw'>
      <h2>details page</h2>
      <section className={style.productCon}>
        <div className={style.imgCon}>
          <img src={`/img/${products?.img}`} alt={products.title} />
        </div>
        <div className={style.pInfo}>
          <p>Product : {products?.title}</p>
          <p>Price : ₩{Number(products?.price).toLocaleString()}</p>
          <p>D/C : {products?.discount}%</p>
          <div className={style.count}>
            <span>Quantity</span>
            {count === 1 ? (
              <button onClick={decrement} disabled>
                -
              </button>
            ) : (
              <button onClick={decrement}>-</button>
            )}
            <span>{count}</span>
            <button onClick={increment}>+</button>
          </div>
          <button
            className={style.cartBtn}
            onClick={() => {
              handleShow();
            }}
          >
            cart
          </button>
        </div>
      </section>
      <section className={style.pDesc}>
        <Tabs defaultActiveKey='profile' id='fill-tab-example' className='mb-3'>
          <Tab eventKey='Description' title='Description'></Tab>
          <Tab eventKey='Additional' title='Additional information'></Tab>
          <Tab eventKey='Reviews' title='Reviews'></Tab>
        </Tabs>
      </section>
      <section>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className='mySwiper'
        >
          {similarList.map((p) => (
            <SwiperSlide key={p.id}>
              <ListCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>추가 상품 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>추가 상품 정보를 다시 보여줄 수도 있습니다.</p>
          {products.title}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              dispatch(
                addItem({
                  id: products.id,
                  title: products.title,
                  img: products.img,
                  price: products.price,
                  category: products.category,
                  discount: products.discount,
                  count: count,
                })
              );
              navigate("/cart");
            }}
          >
            장바구니 추가
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default Products;
