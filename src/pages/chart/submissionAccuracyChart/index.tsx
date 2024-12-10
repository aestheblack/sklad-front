import { useEffect, useState } from "react";
import { Bar } from "@ant-design/charts";
import { Spin, Card } from "antd";
import axios from "axios";
import { useHooks } from "hooks";

const SubmissionAccuracyChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useHooks();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_ROOT_API}/statistics/accuracy`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setData(
          response.data.data.flatMap((item: any) => [
            { language: item.language, type: "Correct", count: item.correct },
            {
              language: item.language,
              type: "Incorrect",
              count: item.incorrect,
            },
          ])
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
    xField: "count",
    yField: "language",
    seriesField: "type",
    color: ["#5AD8A6", "#FF4D4F"],
    isStack: true,
    label: {
      layout: [
        { type: "interval-adjust-position" },
        { type: "interval-hide-overlap" },
        { type: "adjust-color" },
      ],
    },
  };

  return (
    <Card
      title={t("Submission Accuracy by Language")}
      style={{ width: "100%", marginTop: 20 }}
    >
      {loading ? <Spin /> : <Bar {...config} />}
    </Card>
  );
};

export default SubmissionAccuracyChart;
