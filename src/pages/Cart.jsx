import Table from "react-bootstrap/Table";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeName, changeAge } from "../store/userStore";
import { addCount, minusCount, delItem } from "../store/cartStore";

const Cart = () => {
  let user = useSelector((state) => state.user);
  let cart = useSelector((state) => state.cart);

  console.log(user);
  console.log(cart);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  return (
    <main className='mw'>
      <h2>
        {user.username}'s Cart{" "}
        <button
          onClick={() => {
            dispatch(changeName("gildong"));
          }}
        >
          change
        </button>
      </h2>
      <p>3 items</p>
      <p>stock list</p>
      <p>
        {user.age}{" "}
        <button
          onClick={() => {
            dispatch(changeAge(10));
          }}
        >
          ageChange
        </button>
      </p>
      <Table striped bordered hover className='cart'>
        <colgroup>
          <col width={"50px"} />
          <col width={"*"} />
          <col width={"150px"} />
          <col width={"100px"} />
          <col width={"100px"} />
          <col width={"100px"} />
          <col width={"80px"} />
        </colgroup>
        <thead>
          <tr className='center'>
            <th>Id</th>
            <th>Product</th>
            <th>Price</th>
            <th>D/C</th>
            <th>Quantity</th>
            <th>Pay</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
            return (
              <tr key={item.id}>
                <td className='center'>{item.id}</td>
                <td
                  onClick={() => {
                    navigate(`/products/${item.id}`);
                  }}
                >
                  <div className='imgArea'>
                    <div>
                      <img src={`/img/${item.img}`} alt={item.title} />
                    </div>
                    <p>{item.title}</p>
                  </div>
                </td>
                <td className='right'>
                  ₩{Number(item.price).toLocaleString()}
                </td>
                <td className='center'>{item.discount}%</td>
                <td className='center'>
                  {item.count === 1 ? (
                    <button disabled>-</button>
                  ) : (
                    <button
                      onClick={() => {
                        dispatch(minusCount(item.id));
                      }}
                    >
                      -
                    </button>
                  )}
                  <span>{item.count}</span>
                  <button
                    onClick={() => {
                      dispatch(addCount(item.id));
                    }}
                  >
                    +
                  </button>
                </td>
                <td className='right'>
                  ₩
                  {Number(
                    item.price * (1 - item.discount / 100) * item.count
                  ).toLocaleString()}
                </td>
                <td
                  className='center'
                  onClick={() => {
                    dispatch(delItem(item.id));
                  }}
                >
                  <i className='fa-regular fa-trash-can'></i>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7} className='right'>
              ₩
              {cart
                .reduce((a, b) => {
                  return a + b.price * (1 - b.discount / 100) * b.count;
                }, 0)
                .toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </Table>
    </main>
  );
};

export default Cart;
