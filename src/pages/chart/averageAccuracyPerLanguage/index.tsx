import { useEffect, useState } from "react";
import { Bar } from "@ant-design/charts";
import { Spin, Card } from "antd";
import axios from "axios";
import { useHooks } from "hooks";

const AverageAccuracyPerLanguageChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useHooks();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_ROOT_API}/statistics/average-accuracy`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setData(
          response.data.data.map((item: any) => ({
            language: item.language,
            accuracy: item.accuracy,
          }))
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const config = {
    data,
    xField: "accuracy",
    yField: "language",
    seriesField: "language",
    label: {
      position: "right",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
      formatter: (datum: any) =>
        datum.accuracy !== undefined ? `${datum.accuracy.toFixed(2)}%` : "",
    },
    xAxis: {
      label: {
        formatter: (value: any) => `${value}%`,
      },
      title: {
        text: "Accuracy (%)",
      },
    },
    barWidthRatio: 0.8,
  };

  return (
    <Card
      title={t("Average Accuracy Per Language")}
      style={{ width: "100%", marginTop: 20 }}
    >
      {loading ? <Spin /> : <Bar {...config} />}
    </Card>
  );
};

export default AverageAccuracyPerLanguageChart;
