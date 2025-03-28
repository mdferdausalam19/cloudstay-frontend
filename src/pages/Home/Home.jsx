import { Helmet } from "react-helmet-async";
import Categories from "../../components/Categories/Categories";
import Rooms from "../../components/Home/Rooms";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>CloudStay | Vacation Homes & Condo Rentals</title>
      </Helmet>
      {/* Categories section  */}
      <Categories></Categories>
      {/* Rooms section */}
      <Rooms></Rooms>
    </div>
  );
};

export default Home;
