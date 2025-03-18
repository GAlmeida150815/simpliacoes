
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

import { getUsersperDay, getUsersperMonth, getSessions, getfUPCG } from 'utils/apiUtils';
import UserLineChart from "components/Components/UserLineChart";
import FUPCGBarChart from "components/Components/FUPCGBarChart";
import RangeSelector from "components/Components/RangeSelector";

const Acquisition = (props) => {
  // States
  const { showLoading, hideLoading } = useLoading();
  // ! LineChart
  const [lineChartTab, setLineChartTab] = useState(1);
  const [lineChartAmount, setLineChartAmount] = useState(90);

  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    fetchLineChartData();
    fetchSessions('last7days');
    fetchfUPCG('last7days');
  }, []);

  useEffect(() => {
    fetchLineChartData();
  }, [lineChartAmount, lineChartTab])

  const fetchLineChartData = async () => {
    showLoading();
    try {
      const fetchFunction = lineChartTab === 1 ? getUsersperDay : getUsersperMonth;

      const users = await fetchFunction(lineChartAmount);

      if (users) {
        setAnalyticsData((prevData) => ({
          ...prevData,          
          users: users
        }));
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    hideLoading();
  };

  const fetchSessions = async (range) => {
    showLoading();
    try {
      const sessions = await getSessions(range);
      
      if (sessions) {
        setAnalyticsData((prevData) => ({
          ...prevData,          
          sessions: sessions
        }));
      } else {
        console.error("Failed to fetch sessions");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    hideLoading();
  };

  const fetchfUPCG = async (range) => {
    showLoading();
    try {
      const fUPCG = await getfUPCG(range);
      
      if (fUPCG) {
        setAnalyticsData((prevData) => ({
          ...prevData,          
          fUPCG: fUPCG
        }));
      } else {
        console.error("Failed to fetch fUPCG");
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
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Visão geral
                    </h6>
                    <h2 className="text-white mb-0">Afluência do site</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: lineChartTab === 1,
                          })}
                          href="#pablo"
                          onClick={() => {
                            setLineChartTab(1);
                            setLineChartAmount(90);
                          }}
                        >
                          <span className="d-none d-md-block">Dias</span>
                          <span className="d-md-none">D</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: lineChartTab === 2,
                          })}
                          href="#pablo"
                          onClick={() => {
                            setLineChartTab(2);
                            setLineChartAmount(3);
                          }}
                        >
                          <span className="d-none d-md-block">Meses</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <Input
                          type="number"
                          value={lineChartAmount}
                          onChange={(e) => {
                            setLineChartAmount(e.target.value)
                          }}
                          min="1"
                          placeholder={lineChartTab === 1 ? "Número de dias" : "Número de meses"}
                        />
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">´
                  {
                    analyticsData && analyticsData.users &&
                    <UserLineChart data={analyticsData.users} tab={lineChartTab} />
                  }
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <hr />
        <Row className="mt-5" style={{ position: 'relative' }}>
          <Col className="mb-5 mb-xl-0" xl="7">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Canais de aquisição</h3>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                { 
                  analyticsData && analyticsData.fUPCG &&
                  <FUPCGBarChart data={analyticsData.fUPCG} />
                }
              </CardBody>
              <CardFooter>
                <RangeSelector fetch={fetchfUPCG}/>
              </CardFooter>
            </Card>
          </Col>
          <Col xl="5">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Sessões por origem</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive size="sm">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Origem</th>
                    <th className="text-center" scope="col" colSpan={"2"}>Sessões</th>
                  </tr>
                </thead>
                <tbody> 
                  {
                    analyticsData && analyticsData.sessions && 
                    analyticsData.sessions.map((session, index) => (
                      <tr key={index}>
                        <th scope="row">{session.sessionSource}</th>
                        <td>{session.sessions}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">{session.percentage}%</span>
                            <div>
                              <Progress
                                max="100"
                                value={Math.abs(session.percentage)}
                                barClassName={session.percentage > 0 ? "bg-gradient-success" : "bg-gradient-danger"}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4}>
                      <RangeSelector fetch={fetchSessions}/>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Acquisition;
