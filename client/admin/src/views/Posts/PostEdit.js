// react
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useCookies } from "react-cookie";

// reactstrap components
import {
  Col,
  Card,
  Container,
  Row,
  Button,
  Input,
  FormText,
  FormGroup,
  CardHeader,
  CardBody,
  Form,
} from "reactstrap";
import { SimpliQuill } from "components/Components/SimpliQuill/SimpliQuill";


import { FaShare  } from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoArrowUndoSharp, IoCalendarSharp } from 'react-icons/io5';

// core components
import Header from "components/Headers/Header.js";
import EditableText from '../../components/Components/EditableText';  // Import the component

import { getPost, deletePost, updatePost, getTopics, getPostTopics, addPost, updateImage } from "../../utils/apiUtils";
import { formatDate, delay, handleImagesInContent } from "utils/helperFunctions";

// ? Hooks
import { useLoading } from "components/Hooks/LoadingHook";
import { useModal } from "components/Hooks/ModalHook";
import ImageUploader from "components/Components/ImageUploader";

const PostsEdit = () => {
  // ? Hooks
  const { showModal, showDecisionModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const { ID } = useParams();
  const navigate = useNavigate();

  // States
  const [selectedImage, setSelectedImage] = useState(null);
  const [post, setPost] = useState({Content: null});
  const [topics, setTopics] = useState(null);
  const [originalPost, setOriginalPost] = useState(null); 

  // ? Cookies
  const [cookies, setCookies] = useCookies(['simpli_preview']);

  // Function
  const fetchData = async () => {
    showLoading();
    try {
      showLoading();
      setTopics(await getTopics());
      if (ID !== 'add') {
        const fetchedPost = await getPost(ID);

        const postTopics = await getPostTopics(ID);
        const topicIds = postTopics.map((topic) => topic.ID);

        const completePost = { ...fetchedPost, topics: topicIds };

        setPost(completePost);

        setOriginalPost(completePost); 
      }
    } catch (error) {
      hideLoading();
      showModal(
        `Erro`,
        `Ocorreu um a obter os posts. A base de dados está em baixo?`
      );
    } finally {
      hideLoading();
    }
  };

  const managePost = (PostID, opt) => {
    try {
      showLoading();
      switch (opt) {
        case 'edit': 
          hideLoading();
          showDecisionModal(`Editar post`, `Pretende realmente atualizar o post de ID ${PostID}.`)
            .then((decision) => {
              if (!decision) {
                return;
              }
              
              showLoading();
              try {
                if (!hasPostChanged() && selectedImage === null) {
                  hideLoading();
                  showModal('Editar post','Não editou nada no post.');
                  return;
                }
                
                update();
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
          showDecisionModal(`Eliminar post`, `Pretende realmente eliminar o post de ID ${PostID}`)
            .then((decision) => {
              if (!decision) {
                return;
              }

              showLoading();
              try {
                if (deletePost(PostID)) {
                  hideLoading();
                  showModal("Post elminado", 'O post foi eliminado')
                    .then(()=>{
                        navigate('/admin/posts');
                    });
                  return;
                }

                hideLoading();
                showModal('Erro','Ocorreu um erro ao eliminar o post. Esse post ainda existe?');
              } catch {
                throw new Error();
              }
            })
            .catch(() => {
              throw new Error();
            });
        break;

        case 'add':
          addPostHandle();
        break;
        
        default: {
          throw new Error();
        }
      }
    } catch (error) {
      hideLoading();
      showModal('Erro','Ocorreu um erro ao tentar mexer no post. A base dados está em baixo?')
    }
  }

  const addPostHandle = async () => {
    try {
      hideLoading();
      if (!post.Title) {
        showModal('Adicionar post','Tem de inserir um título ao post');
        return;
      }
      if (!post.Description) {
        showModal('Adicionar post','Tem de inserir uma descrição ao post');
        return;
      }
      if (!post.Introduction) {
        showModal('Adicionar post','Tem de inserir uma introdução ao post');
        return;
      }   
      if (!post.Content) {
        showModal('Adicionar post','Tem de inserir conteúdo ao post');
        return;
      }
      
      if (!selectedImage) {
        const decisionImg = await showDecisionModal(`Adicionar post`, `Pretende realmente criar um post sem imagem? Irá ficar com a imagem predefinida.`);
        if (!decisionImg) {
          return;
        }
      }
      
      if (!post.topics) {
        const decisionTopics = await showDecisionModal(`Adicionar post`, `Pretende realmente criar um post sem tópicos? Poderá adicionar mais tarde.`)
        if (!decisionTopics) {
          return;
        }
      }

      const updatedContent = await handleImagesInContent(post.Content, post.Title);
      post.Content = updatedContent;
  
      if (addPost(post, selectedImage !== null ? selectedImage : null)) {
        const decisionAfter = await showDecisionModal('Adicionar post','O post foi adicionado com sucesso. Pretende adicionar mais?');
        if (decisionAfter) {
          window.location.reload();
          return;
        }

        navigate('/admin/posts');
      }
    } catch {
      throw new Error();
    }
  }

  const update = async () => {
    let pUdp = true, iUpd = true;
    showLoading();
    if (selectedImage !== null) {
      pUdp = await updateImage(post.ID, selectedImage);
    }

    const updatedContent = await handleImagesInContent(post.Content, post.Title);
    post.Content = updatedContent;

    pUdp = await updatePost(post);

    if (!pUdp || !iUpd) {
      hideLoading();
      showModal('Editar post','Algo correu mal, dá F5 á pagina.');
    }

    hideLoading();
    await delay(1000);
    showModal('Editar post','O post foi editado com sucesso.');
    return;
  }
  
  const hasPostChanged = () => {
    return JSON.stringify(post) !== JSON.stringify(originalPost);
  };

  const handleTopicChange = (e) => {
    const selectedTopics = Array.from(e.target.selectedOptions, (option) => option.value);

    setPost({
      ...post,
      topics: selectedTopics,
    });
  };

  const handleEditorChange = (content, _, __, editor) => {
    setPost(prevPost => ({
      ...prevPost,
      Content: editor.getHTML()
    }));
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  // Effects
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(post);
  }, [post]);

  return (
    <>
      <Header />
      <div className="more-info pt-5">
        <Row> 
          <Col >
            <Card className="bg-white shadow">
              <CardHeader className="bg-secondary border-0">
                <Row className="align-items-center">
                  <Col className="order-lg-2" lg="4">
                  </Col>
                  <Col className="order-lg-1" lg='4' xs="8">
                    <h3 className="mb-0">Post</h3>
                  </Col>
                  <Col className="order-lg-3 text-right" lg='4' xs="4">
                    {(
                      ID === 'add' ? (
                        <Button
                          color="info"
                          onClick={(e) => {
                            e.preventDefault();
                            managePost(0,'add');
                          }}
                          size="sm"
                        >
                          Adicionar
                        </Button>
                      ) : (
                        <>
                          <Button
                            color="danger"
                            onClick={(e) => {
                              e.preventDefault();
                              managePost(post.ID,'del');
                            }}
                            size="sm"
                          >
                            Apagar
                          </Button>
                          <Button
                            color="info"
                            onClick={(e) => {
                              e.preventDefault();
                              managePost(post.ID,'edit');
                            }}
                            size="sm"
                          >
                            Atualizar
                          </Button>
                        </>
                      )
                    )}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Informação adicional
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6" sm="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-id"
                          >
                            ID
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-new-id"
                            placeholder="ID"
                            type="number"
                            value={post.ID}
                            disabled
                          />
                          <FormText>
                            Estes campos são preenchidos automaticamente.
                          </FormText>
                        </FormGroup>
                      </Col>
                      <Col lg="6" sm="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-new-date"
                          >
                            Data de criação
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-new-date"
                            placeholder="Criação"
                            type="datetime"
                            value={post.Creation && formatDate(post.Creation)}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6" sm="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-update"
                          >
                            Data de ultima modificação
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-update"
                            placeholder="Atualização"
                            type="datetime"
                            value={post.LastUpdate && formatDate(post.LastUpdate)}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6" sm="6"> 
                      <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-topics"
                          >
                            Tópicos
                          </label>
                          <Input
                            id="input-topics"
                            multiple
                            name="input-topics"
                            type="select"
                            onChange={handleTopicChange} 
                            value={post.topics}
                          >
                            {topics && topics.map((topic) => (
                              <option key={topic.ID} value={topic.ID}>
                                {topic.Name}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Descrição e tópicos
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-new-desc"
                          >
                            Descriçao
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-new-desc"
                            placeholder="Descrição"
                            type="text"
                            value={post.Description}
                            onChange={(e) => setPost({
                              ...post,
                              Description: e.target.value
                            })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="posts pt-5">
        <section className="section-profile-cover section-shaped my-0">
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
              <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
        </section>
        <section className="section post my-5">
          <Container>
            <Card className="card-profile shadow mt--300 card">
              <div className="px-4">
                <div className="postt">
                  <div className="d-none d-md-block mt-2">
                    <Link to="/blog" className='font-weight-bold'>
                      <IoArrowUndoSharp /> {" "} Voltar
                    </Link>
                  </div>
                  <Row className='post-img mt-4'>
                    <Col lg="9">
                        <ImageUploader post={post} onImageSelect={handleImageSelect}/>
                        <Row className='under-img'>
                        <div className='socials'>
                          <Link className='d-none like' onClick={"like"}>
                            <GoHeart />
                          </Link>
                          <Link className='share disabled' >
                            <FaShare />
                          </Link>
                        </div>
                        <p className='date'><IoCalendarSharp />{" "}{post.Creation && formatDate(post.Creation)}</p>
                      </Row>
                      <EditableText
                        text={post.Title}
                        onSave={(newVal) => setPost(prevPost => ({
                          ...prevPost,
                          Title: newVal
                        }))}
                        as="h2"
                        className="title font-weight-bold"
                        defaultVal='Título'
                      />
                      <Row className='post-topics m-0'>
                        {
                          post.topics && post.topics.map((ID) => (
                            <svg key={`topic${ID}`} className="checkbox-svg mx-1" width="24px" height="24px" version="1.1" xmlns="http://www.w3.org/2000/svg">
                              <image 
                                width="100%" 
                                height="100%" 
                                href={`${process.env.REACT_APP_API_URL}/public/topics/${ID}.svg`} 
                              />
                            </svg>
                          ))
                        }
                      </Row>
                      <EditableText
                        text={post.Introduction}
                        onSave={(newVal) => setPost(prevPost => ({
                          ...prevPost,
                          Introduction: newVal
                        }))}
                        as="h5"
                        defaultVal='Introdução'
                      />
                    </Col>
                  </Row>
                  <hr />
                  <Row className="justify-content-center">
                    <Col lg="9">
                      <SimpliQuill handleEditorChange={handleEditorChange} value={post.Content}/>
                    </Col>
                  </Row>
                </div>
                <div className="py-5 border-top suggestions">
                  <div className='text-center'>
                    <h4>Vê também estas publicações</h4>  
                  </div>
                  <Row className="justify-content-center">
                    <Col md="1" className="d-none d-md-block" />
                    <Col md="4" >
                      <Link className='post-image disabled-link'>
                        <img alt="..." src={"https://api.simpliacoes.pt/public/default.jpg"} />
                      </Link>
                    </Col>
                    <Col md="4" >
                      <Link className='post-image disabled-link'>
                        <img alt="..." src={"https://api.simpliacoes.pt/public/default.jpg"} />
                      </Link>
                    </Col>
                    <Col md="1" className="d-none d-md-block" />
                  </Row>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </div>
    </>
  );
};

export default PostsEdit;
