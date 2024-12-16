import React, { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const StatisticsPage: React.FC = () => {
  const [contractsByMonth, setContractsByMonth] = useState<any[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<any[]>([]);
  const [productsByCustomer, setProductsByCustomer] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractsRes = await fetch(
          `${process.env.REACT_APP_ROOT_API}/statistics/contracts-month`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const contractsData = await contractsRes.json();
        setContractsByMonth(contractsData.data);

        const categoryRes = await fetch(
          `${process.env.REACT_APP_ROOT_API}/statistics/products-category`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const categoryData = await categoryRes.json();
        setProductsByCategory(categoryData.data);

        const customerRes = await fetch(
          `${process.env.REACT_APP_ROOT_API}/statistics/products-customer`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const customerData = await customerRes.json();
        setProductsByCustomer(customerData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const contractsByMonthChartData = {
    labels: contractsByMonth.map((item) => `Month ${item._id}`),
    datasets: [
      {
        label: "Contracts Per Month",
        data: contractsByMonth.map((item) => item.total),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const productsByCategoryChartData = {
    labels: productsByCategory.map(
      (item) => item.categoryDetails?.name || "Unknown"
    ),
    datasets: [
      {
        label: "Products Per Category",
        data: productsByCategory.map((item) => item.total),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const productsByCustomerChartData = {
    labels: productsByCustomer.map(
      (item) => item.customerDetails?.fullName || "Unknown"
    ),
    datasets: [
      {
        label: "Products Per Customer",
        data: productsByCustomer.map((item) => item.total),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Contracts By Month */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Contracts By Month</h2>
          <Bar data={contractsByMonthChartData} />
          <ul className="mt-4">
            {contractsByMonth.map((item) => (
              <li key={item._id}>
                <strong>Month {item._id}:</strong> {item.total} contracts{" "}
                {item.customerDetails &&
                  `(${item.customerDetails.map((c: any) => c.fullName).join(", ")})`}
              </li>
            ))}
          </ul>
        </div>

        {/* Products By Category */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Products By Category</h2>
          <Pie data={productsByCategoryChartData} />
          <ul className="mt-4">
            {productsByCategory.map((item) => (
              <li key={item._id}>
                <strong>{item.categoryDetails?.name || "Unknown"}:</strong>{" "}
                {item.total} products
              </li>
            ))}
          </ul>
        </div>

        {/* Products By Customer */}
        <div className="bg-white shadow rounded-lg p-4 md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Products By Customer</h2>
          <Line data={productsByCustomerChartData} />
          <ul className="mt-4">
            {productsByCustomer.map((item) => (
              <li key={item._id}>
                <strong>{item.customerDetails?.fullName || "Unknown"}:</strong>{" "}
                {item.total} products
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
