import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { Chart } from "react-google-charts";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const options = {
  title: "Sales Over Time",
  curveType: "function",
  legend: { position: "bottom" },
  series: [{ color: "#F43F5E" }],
};
const SalesLineChart = ({ data }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <LoadingSpinner smallHeight></LoadingSpinner>;
  }

  return (
    <>
      {data.length > 1 ? (
        <Chart
          chartType="LineChart"
          width="100%"
          data={data}
          options={options}
        />
      ) : (
        <>
          <LoadingSpinner smallHeight></LoadingSpinner>
          <p className="text-center">No Data Available!</p>
        </>
      )}
    </>
  );
};

export default SalesLineChart;

SalesLineChart.propTypes = {
  data: PropTypes.array,
};
