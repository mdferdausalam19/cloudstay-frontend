import PropTypes from "prop-types";
import queryString from "query-string";
import { useNavigate, useSearchParams } from "react-router";

const CategoryBox = ({ label, icon: Icon }) => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars 
  const [params, setParams] = useSearchParams();
  const category = params.get("category");
  const handleCategory = () => {
    let currentQuery = { category: label };
    const url = queryString.stringifyUrl({
      url: "/",
      query: currentQuery,
    });
    navigate(url);
  };
  return (
    <div
      onClick={handleCategory}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer mb-2 ${
        category === label && "border-b-2 border-b-rose-500 text-rose-400"
      }`}
    >
      <Icon size={26}></Icon>
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
};

export default CategoryBox;
