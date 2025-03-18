
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// node.js library that concatenates classes (strings)
import classnames from "classnames";

// javascipt plugin for creating charts
import Chart from "chart.js";

// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  CardFooter,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

// ? Hooks
import { useLoading } from "components/Hooks/LoadingHook";
import { useAuth } from 'components/Hooks/AuthContext';
import { useModal } from "components/Hooks/ModalHook";

import { getScreensAndPages, getPageViews, getUserActivity } from 'utils/apiUtils';
import RangeSelector from "components/Components/RangeSelector";
import ScreensAndPagesTable from 'components/Components/ScreensAndPagesTable';
import PageViewsLineChart from "components/Components/PageViewsLineChart";
import UserActivityLineChart from "components/Components/UserActivityLineChart";

const Acquisition = (props) => {
  // States
  const { showLoading, hideLoading } = useLoading();
  // ! LineChart
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    fetchScreensAndPages('last7days');
    fetchPageViews('last7days');
    fetchUserActivity('last7days');
  }, []);

  const fetchScreensAndPages = async (range) => {
    showLoading();
    try {
      const screensAndPages = await getScreensAndPages(range);

      if (screensAndPages) {
        setAnalyticsData((prevData) => ({
          ...prevData,          
          screensAndPages: screensAndPages
        }));
      } else {
        console.error("Failed to fetch screensAndPages");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    hideLoading();
  };

  const fetchPageViews = async (range) => {
    showLoading();
    try {
      const pageViews = await getPageViews(range);
      
      if (pageViews) {
        setAnalyticsData((prevData) => ({
          ...prevData,          
          pageViews: pageViews
        }));
      } else {
        console.error("Failed to fetch page views");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    hideLoading();
  };

  const fetchUserActivity = async (range) => {
    showLoading();
    try {
      const userActivity = await getUserActivity(range);
      
      if (userActivity) {
        setAnalyticsData((prevData) => ({
          ...prevData,          
          userActivity: userActivity
        }));
      } else {
        console.error("Failed to fetch userActivity");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    hideLoading();
  };

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  
  return (
    <>
      <Header />
      <Container className="mt--7 mb-5" fluid>
        <Row style={{ position: 'relative' }}>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Páginas e Ecrãs</h3>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <ScreensAndPagesTable analyticsData={analyticsData} fetchScreensAndPages={fetchScreensAndPages} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <hr />
        <Row className="mt-5" style={{ position: 'relative' }}>
          <Col className="mb-5 mb-xl-0" xl="5">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Atividade dos utilizadores ao longo do tempo</h3>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg={10}>
                    { 
                      analyticsData && analyticsData.userActivity &&
                      <UserActivityLineChart data={analyticsData.userActivity} />
                    }
                  </Col>
                  <Col lg={2}>
                    <div className="d-flex flex-column align-items-center h-100 justify-content-around">
                      <div className="d-flex flex-column align-items-center my-2">
                        <div className="d-flex align-items-center">
                          <div className="metric-ball mr-2" style={{ backgroundColor: "rgba(54, 162, 235, 0.2)", borderColor: 'rgba(54, 162, 235, 1)' }} />
                          <div className="metric-label">Utilizadores Ativos - 28 Dias</div>
                        </div>
                        <div className="metric-number">
                        {analyticsData && analyticsData.userActivity && analyticsData.userActivity[0].active28DayUsers}
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-center my-2">
                        <div className="d-flex align-items-center">
                          <div className="metric-ball mr-2" style={{ backgroundColor: "rgba(255, 99, 132, 0.2)", borderColor: 'rgba(255, 99, 132, 1)' }} />
                          <div className="metric-label">Utilizadores Ativos - 7 Dias</div>
                        </div>
                        <div className="metric-number">
                          {analyticsData && analyticsData.userActivity && analyticsData.userActivity[0].active7DayUsers}
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-center my-2">
                        <div className="d-flex align-items-center">
                          <div className="metric-ball mr-2" style={{ backgroundColor: "rgba(75, 192, 192, 0.2)", borderColor: 'rgba(75, 192, 192, 1)' }} />
                          <div className="metric-label">Utilizadores Ativos - 1 Dia</div>
                        </div>
                        <div className="metric-number">
                        {analyticsData && analyticsData.userActivity && analyticsData.userActivity[0].active1DayUsers}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <RangeSelector fetch={fetchUserActivity}/>
              </CardFooter>
            </Card>
          </Col>
          <Col xl="7">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Visualizações</h3>
                    </div>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg={10}>
                    {
                      analyticsData && analyticsData.pageViews &&
                      <PageViewsLineChart data={analyticsData.pageViews.data}/>
                    }
                  </Col>
                  <Col lg={2} className="d-flex align-items-center justify-content-center my-2">
                    <div className="d-flex flex-column align-items-center h-100 justify-content-around">
                      <div className="d-flex flex-column align-items-center my-2">
                        <div className="d-flex align-items-center">
                          <div className="metric-ball mr-2" style={{ backgroundColor: "rgba(54, 162, 235, 0.2)", borderColor: 'rgba(54, 162, 235, 1)' }} />
                          <div className="metric-label">Visualizações</div>
                        </div>
                        <div className="metric-number">
                          {analyticsData && analyticsData.pageViews && analyticsData.pageViews.totals && analyticsData.pageViews.totals.screenPageViews}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <RangeSelector fetch={fetchPageViews}/>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Acquisition;
