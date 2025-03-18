import { useState, useEffect } from 'react';

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col, Spinner } from "reactstrap";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser,
  faUserPlus,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';

import { getActiveUsersperMonth, getNewUsersperMonth } from 'utils/apiUtils';

const Header = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const [newUsers, users] = await Promise.all([
          getNewUsersperMonth(1),
          getActiveUsersperMonth(1)
        ]);
  
        if (newUsers && users) {
          setAnalyticsData((prevData) => ({
            ...prevData,          
            newUsers: newUsers,
            users: users         
          }));
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchDataAndSetState();
  }, []);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col lg="12" xl="6">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Tráfego
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          { 
                            analyticsData && 
                            analyticsData.users[0].activeUsers !== undefined 
                              ? analyticsData.users[0].activeUsers
                              : <Spinner size="sm"/>
                          }
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                         <FontAwesomeIcon icon={faUser} />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {
                        analyticsData && analyticsData.users && analyticsData.users.length >= 2 ? (
                          (() => {
                            const currentMonthUsers = analyticsData.users[0].activeUsers;
                            const previousMonthUsers = analyticsData.users[1].activeUsers;

                            // Calculate the percentage difference
                            const diff = ((currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100;

                            return (
                              <span className={`${diff > 0 ? "text-success" : "text-danger"} mr-2`}>
                                <FontAwesomeIcon icon={diff > 0 ? faArrowUp : faArrowDown} />
                                {Math.abs(diff.toFixed(2))}%
                              </span>
                            );
                          })()
                        ) : (
                          <span className="mr-2">
                            <Spinner size="sm" />
                          </span>
                        )
                      }
                      <span className="text-nowrap">Desde o mês passado</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="12" xl="6">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Novos users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          { analyticsData && 
                            analyticsData.newUsers[0].newUsers !== undefined 
                              ? analyticsData.newUsers[0].newUsers
                              : <Spinner size="sm"/>
                          }
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <FontAwesomeIcon icon={faUserPlus} />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {
                        analyticsData && analyticsData.newUsers && analyticsData.newUsers.length >= 2 ? (
                          (() => {
                            const currentMonthUsers = analyticsData.newUsers[0].newUsers;
                            const previousMonthUsers = analyticsData.newUsers[1].newUsers;

                            // Calculate the percentage difference
                            const diff = ((currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100;

                            return (
                              <span className={`${diff > 0 ? "text-success" : "text-danger"} mr-2`}>
                                <FontAwesomeIcon icon={diff > 0 ? faArrowUp : faArrowDown} />
                                {Math.abs(diff.toFixed(2))}%
                              </span>
                            );
                          })()
                        ) : (
                          <span className="mr-2">
                            <Spinner size="sm" />
                          </span>
                        )
                      }
                      <span className="text-nowrap">Desde o mês passado</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );  
};      
    
export default Header;
