// react
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

// reactstrap components
import {
  Col,
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

import { getTopic, deleteTopic, addTopic, updateTopic } from "../../utils/apiUtils";

// ? Hooks
import { useLoading } from "components/Hooks/LoadingHook";
import { useModal } from "components/Hooks/ModalHook";

const TopicsEdit = () => {
  // ? Hooks
  const { showModal, showDecisionModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const { ID } = useParams();
  const navigate = useNavigate();

  // States
  const [topic, setTopic] = useState(null);
  const [original, setOriginal] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Function
  const fetchData = async () => {
    showLoading();
    try {
      showLoading();
      if (ID !== 'add') {
        setTopic(await getTopic(ID));
      }
    } catch (error) {
      hideLoading();
      showModal(
        `Erro`,
        `Ocorreu um a obter os topics. A base de dados está em baixo?`
      );
    } finally {
      hideLoading();
    }
  };

  const manageTopic = (TopicID, opt) => {
    try {
      showLoading();
      switch (opt) {
        case 'edit': 
          hideLoading();
          showDecisionModal(`Editar tópico`, `Pretende realmente atualizar o tópico de ID ${TopicID}.`)
            .then((decision) => {
              if (!decision) {
                return;
              }
              
              showLoading();
              try {
                if (original && !selectedImage) {
                  hideLoading();
                  showModal('Editar tópico','Não editou nada no tópico.');
                  return;
                }
                
                if (updateTopic(topic, selectedImage)) {
                  hideLoading();
                  showModal('Editar tópico','O tópico foi editado com sucesso.');
                }
              } catch {
                throw new Error();
              }
            })
            .catch(() => {
              throw new Error();
            });
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
                if (deleteTopic(TopicID)) {
                  hideLoading();
                  showModal("Tópico eliminado", 'O tópico foi eliminado')
                    .then(()=>{
                        navigate('/admin/topics');
                    })
                  return;
                }

                hideLoading();
                showModal('Erro','Ocorreu um erro ao eliminar o tópico. Esse tópico ainda existe?');
              } catch {
                throw new Error();
              }
            })
            .catch(() => {
              throw new Error();
            });
        break;

        case 'add':
          addTopicHandle();
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

  const addTopicHandle = async () => {
    try {
      hideLoading();
      if (!topic.Name) {
        showModal('Adicionar tópico','Tem de inserir um nome ao tópico.');
        return;
      }

      if (!selectedImage) {  
        showModal('Adicionar tópico', 'Tem de selecionar uma imagem SVG.');
        return;
      }

      if (addTopic(topic, selectedImage)) {
        const decisionAfter = await showDecisionModal('Adicionar tópico','O tópico foi adicionado com sucesso. Pretende adicionar mais?');
        if (decisionAfter) {
          window.location.reload();
          return;
        }

        navigate('/admin/topics');
      }
    } catch {
      throw new Error();
    }
  }
  
  const handleContentChange = (e) => {
    setOriginal(false);
    setTopic(prevTopic => ({
        ...prevTopic,
        Name: e.target.value
    }));
  };

  // Effects
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <Col >
            <Card className="bg-white shadow">
              {ID !== 'add' && topic ? (
                <>
                  <CardHeader className="bg-secondary border-0">
                    <Row className="align-items-center">
                      <Col className="order-lg-2" lg="4">
                      </Col>
                      <Col className="order-lg-1" lg='4' xs="8">
                        <h3 className="mb-0">Tópico</h3>
                      </Col>
                      <Col className="order-lg-3 text-right" lg='4' xs="4">
                        <Button
                          color="danger"
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            manageTopic(ID,'del');
                          }}
                          size="sm"
                        >
                          Eliminar
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <h6 className="heading-small text-muted mb-4">
                        Informação do tópico
                      </h6>
                      <div className="pl-lg-4">
                        <Row className="justify-content-center align-items-center">
                          <FormGroup>
                            <label htmlFor="input-image">
                              Icon
                            </label>
                            <Input
                              id="input-image"
                              name="image"
                              type="file"
                              accept="image/svg+xml" 
                              onChange={e => setSelectedImage(e.target.files[0])}
                            />
                            <FormText>
                              Escolhe o icon que queres para o tópico. (.svg)
                            </FormText>
                          </FormGroup>
                          <div className="p-5">
                            <img
                              className="icon-xl"
                              alt="..."
                              src={selectedImage ? URL.createObjectURL(selectedImage) : `${process.env.REACT_APP_API_URL}/public/topics/${topic.ID}.svg`}
                            />
                          </div>
                        </Row>
                        <Row>
                          <Col lg="6" sm="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-id"
                              >
                                ID
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-id"
                                placeholder="ID"
                                type="number"
                                disabled
    
                                defaultValue={topic.ID}
                              />
                              <FormText>
                                Este campo é preenchido automaticamente.
                              </FormText>
                            </FormGroup>
                          </Col>
                          <Col lg="6" sm="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-name"
                              >
                                Nome do tópico
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-name"
                                placeholder="Nome"
                                type="text"
                                onChange={handleContentChange}
    
                                defaultValue={topic.Name}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                    <Button
                      color="success"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        manageTopic(ID,'edit');
                      }}
                      size="sm"
                    >
                      Atualizar
                    </Button>
                  </CardBody>
                </>
              ) : (
                <>
                  <CardHeader className="bg-secondary border-0">
                    <Row className="align-items-center">
                      <Col className="order-lg-2" lg="4">
                      </Col>
                      <Col className="order-lg-1" lg='4' xs="8">
                        <h3 className="mb-0">Tópico</h3>
                      </Col>
                      <Col className="order-lg-3 text-right" lg='4' xs="4">
                        <Button
                          color="info"
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            manageTopic(0,'add');
                          }}
                          size="sm"
                        >
                          Adicionar
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <h6 className="heading-small text-muted mb-4">
                        Informação do tópico
                      </h6>
                      <div className="pl-lg-4">
                        <Row className="justify-content-center align-items-center">
                          <FormGroup>
                            <label htmlFor="input-image">
                              Icon
                            </label>
                            <Input
                              id="input-image"
                              name="image"
                              type="file"
                              accept="image/svg+xml" 
                              onChange={e => setSelectedImage(e.target.files[0])}
                            />
                            <FormText>
                              Escolhe o icon que queres para o tópico. (.svg)
                            </FormText>
                          </FormGroup>
                          <div className="p-5">
                            <img
                              className="icon-xl"
                              alt="..."
                              src={selectedImage ? URL.createObjectURL(selectedImage) : `${process.env.REACT_APP_API_URL}/public/topics/default.svg`}
                            />
                          </div>
                        </Row>
                        <Row>
                          <Col lg="6" sm="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-id"
                              >
                                ID
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-id"
                                placeholder="ID"
                                type="number"
                                disabled
                              />
                              <FormText>
                                Este campo é preenchido automaticamente.
                              </FormText>
                            </FormGroup>
                          </Col>
                          <Col lg="6" sm="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-name"
                              >
                                Nome do tópico
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-name"
                                placeholder="Nome"
                                type="text"
                                onChange={handleContentChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  </CardBody>
                </>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TopicsEdit;
