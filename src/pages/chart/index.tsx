import { Row, Col } from "antd";
import LanguageDistributionChart from "./languageDistributionChart";
// import SubmissionAccuracyChart from "./submissionAccuracyChart";
// import AverageAccuracyPerLanguage from "./averageAccuracyPerLanguage";

const Dashboard = () => {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <LanguageDistributionChart />
      </Col>
      {/* <Col span={12}>
        <SubmissionAccuracyChart />
      </Col> */}
      {/* <Col span={24}>
        <AverageAccuracyPerLanguage />
      </Col> */}
    </Row>
  );
};

export default Dashboard;
