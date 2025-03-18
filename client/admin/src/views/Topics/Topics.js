// react
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

import { getTopics, deleteTopic } from "../../utils/apiUtils";
import { formatDate } from "utils/helperFunctions";

// ? Hooks
import { useLoading } from "components/Hooks/LoadingHook";
import { useModal } from "components/Hooks/ModalHook";


const Topics = () => {
  // ? Hooks
  const { showModal, showDecisionModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  // States
  const [topics, setTopics] = useState(null);

  // Function
  const fetchTopics = async () => {
    try {
      showLoading();
      setTopics(await getTopics());
    } catch (error) {
      hideLoading();
      showModal(
        `Erro`,
        `Ocorreu um a obter os tópicos. A base de dados está em baixo?`
      );
    } finally {
      hideLoading();
    }
  };

  const manageTopic = (TopicID, opt) => {
    try {
      showLoading();
      switch (opt) {
        case 'add': 
          navigate('/admin/topic/add');
        break;

        case 'show':
          navigate(`/admin/topic/${TopicID}`);
        break;
        
        case 'del':
          hideLoading();
          showDecisionModal(`Eliminar tópico`, `Pretende realmente eliminar o tópico de ID ${TopicID}`)
            .then((decision) => {
              if (!decision) {
                return;
              }

              showLoading();
              try {
                handleDel(TopicID)
                return;
              } catch {
                throw new Error();
              }
            })
            .catch(() => {
              throw new Error();
            });
        break;

        default: {
          throw new Error();
        }
      }
    } catch (error) {
      hideLoading();
      showModal('Erro','Ocorreu um erro ao tentar mexer no tópico. A base dados está em baixo?')
    }
  }

  const handleDel = async (ID) => {
    if (await deleteTopic(ID)) {
      await fetchTopics();
      hideLoading();
      showModal("Tópico eliminado", 'O tópico foi eliminado');
      return;
    }

    hideLoading();
    showModal('Erro','Ocorreu um erro ao eliminar o tópico. Esse tópico ainda existe?');
  }

  // Effects
  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7 mb-7 " fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Tópicos</h3>
                <Button
                  color="secondary"
                  onClick={() => manageTopic(0, 'add')}
                  className="ml-auto"
                >
                  Adicionar Tópico
                </Button>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Icon</th>
                    <th scope="col">Nome</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {topics &&
                    topics.map((topic) => (
                      <tr key={topic.ID}>
                        <td>{topic.ID}</td>
                        <td><img className="icon-sm" src={`${process.env.REACT_APP_API_URL}/public/topics/${topic.ID}.svg`} alt={`${topic.ID}.svg`}/></td>
                        <td>{topic.Name}</td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="ni ni-books" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => {
                                  e.preventDefault();
                                  manageTopic(topic.ID,'show');
                                }}
                              >
                                Editar
                              </DropdownItem>

                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => {
                                  e.preventDefault();
                                  manageTopic(topic.ID,'del');
                                }}
                              >
                                Apagar
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Topics;
