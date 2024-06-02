import ListCard from "./ListCard";

const MainList = ({ products }) => {
  return (
    <section className='mainList'>
      <h2>goods list</h2>
      <a href='/'>View All</a>
      <ul className='listCon'>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <ListCard product={product} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default MainList;
