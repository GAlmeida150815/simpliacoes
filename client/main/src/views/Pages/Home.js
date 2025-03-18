// Importing necessary React hooks and components
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  UncontrolledTooltip,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  List,
} from 'reactstrap';

// Custom components
import Page from '../Page.js';

// Configuration and utility modules
import * as config from 'config.js';
import {} from 'utils/helperFunctions';

// Images
import Piggy from 'assets/img/brand/piggie.png'; // Brand image
import Banner from 'assets/img/banner.png';

// ETS Images //! DEPRECATED
/*
import ETS_Control from 'assets/img/ETS_Control.png';
import ETS_Calc from 'assets/img/ETS_Calc.png';
import ETS_Bundle from 'assets/img/ETS_Bundle.png';
import ETS_EBook from 'assets/img/ETS_EBook.png';
import ETS_Manual from 'assets/img/ETS_Manual.png';
*/

import HUB_Table from 'assets/img/HUB_Table_2.png';

// Patreon Images
import Patreon_T1 from 'assets/img/patreon/patreonT1.png';
import Patreon_T2 from 'assets/img/patreon/patreonT2.png';

// Brand Images
import Goparity from 'assets/img/brand/goparity.png';
import AttaPoll from 'assets/img/brand/attapoll.jpg';
import Patreon from 'assets/img/brand/patreon.jpg';
import XTB from 'assets/img/brand/xtb.jpeg';
import Freedom24 from 'assets/img/brand/freedom24.png';

const Home = () => {
  // General states
  const [dataFetched, setDataFetched] = useState(false);

  // Page-specific states
  const [latest, setLatest] = useState({});

  // Post-specific states
  const [iPost, setIPost] = useState(null);
  const [currentIIndex, setCurrentIIndex] = useState(0);

  // Modal states
  const [isMOpen, setMOpen] = useState(false);
  const [mInfo, setMInfo] = useState({
    img: 's',
    title: null,
    text: null
  });

  // Refs and other variables
  const navigate = useNavigate();

  // Carousel states
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating] = useState(false);


  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === latest.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? latest.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  //! DEPRECATED
  /*const handleRedirect = (page, id) => {
    navigate(page);
    setTimeout(() => {
      const ebookSection = document.getElementById(id);
      if (ebookSection) {
        ebookSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  const handleModalOpening = (prod) => {
    switch (prod) {
      case "ebook": 
        setMInfo(prevMInfo => ({
          ...prevMInfo,
          img: ETS_EBook,
          title: "Ebook ETFs Descomplicados",
          text: config.ebookDesc,
          redirect: 'ebook'
        }));
      break;
      case "manual": 
        setMInfo(prevMInfo => ({
          ...prevMInfo,
          img: ETS_Manual,
          title: "Manual Como Analisar uma Empresa",
          text: config.manualDesc,
          redirect: 'manual'
        }));
      break;
      case "control": 
        setMInfo(prevMInfo => ({
          ...prevMInfo,
          img: ETS_Control,
          title: "Controlo de Portefólio",
          text: config.portfolioDesc,
          redirect: 'control'
        }));
      break;
      case "bundle": 
        setMInfo(prevMInfo => ({
          ...prevMInfo,
          img: ETS_Bundle,
          title: "Bundle",
          text: config.bundleDesc,
          redirect: 'bundle'
        }));
      break;
      case "calc": 
        setMInfo(prevMInfo => ({
          ...prevMInfo,
          img: ETS_Calc,
          title: "Calculadora de Valor Intrínseco",
          text: config.calcDesc,
          redirect: 'calc'
        }));
      break;

      default: 
        console.error("Something went wrong while opening the modal.");
        return;
    }
    
    setMOpen(true);
    return;
  }*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/latest/3`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLatest(data);
        
        try {
          const lastIPost = await fetch(`${process.env.REACT_APP_API_URL}/instagram/lastPost`);
          
          setIPost((await lastIPost.json()));
        } catch {
          setIPost(-1);
        }

        setDataFetched(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Page dataFetched={dataFetched}>
      <>
        {/* Hero */}
        <div className="position-relative">
          {/* shape Hero */}
          <section className="section section-shaped pb-100">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="py-lg-md d-flex">
              <div className="col px-0">
                <Row className='pt-4'>
                  <Col lg="8" sm="6" className='title-text'>
                    <Row fluid>
                      <Col lg="6" sm="12">
                        <img className='img-fluid' src={Banner} alt="Banner" />
                      </Col>
                    </Row>
                    <h1 className="display-3 text-white">
                      <span>A tua página de Ações e Finanças Pessoais</span>
                    </h1>
                  </Col>
                </Row>
              </div>
            </Container>
            {/* SVG separator */}
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
          {/* 1st Hero Variation */}
        </div>

        {/* Instagram Reference to last post */}
        <section className="section section-lg section-insta">
          <Container>
            <Row>
              <Col lg="8">
                <h4 className='display-4'>Já viste a nossa última publicação no{" "}
                  <a className="text-secondary" href="https://www.instagram.com/simpliacoes/" target="_blank" rel="noreferrer">instagram</a>
                ?</h4>
                <p dangerouslySetInnerHTML={{ __html: config.textInstaPost.replace(/\n/g, '<br />')}} />
              </Col>
              <Col lg="4">
                {
                  (iPost != null && iPost !== -1) && (
                    iPost.images.length === 1 ? (
                      <>
                        <a href={iPost.permalink} target='__blank'>
                          
                          <img
                            className='img-fluid' 
                            src={`${iPost.images[0]}`} 
                            alt={`...${iPost.permalink}`} 
                          />
                        </a>
                      </>
                    ) : (
                      <>
                        <Carousel
                          className='insta-carousel'
                          activeIndex={currentIIndex}
                          next={() => setCurrentIIndex(currentIIndex === iPost.images.length - 1 ? currentIIndex : currentIIndex + 1)}
                          previous={() => setCurrentIIndex(currentIIndex === 0 ? currentIIndex : currentIIndex - 1)}
                        >
                          <CarouselIndicators
                            items={iPost.images.map((_, index) => ({ id: index }))}
                            activeIndex={currentIIndex}
                            onClickHandler={(index) => setCurrentIIndex(index)}
                          />
                          {iPost.images.map((post, index) => (
                            <CarouselItem key={`insta-carousel-${index}`}>
                              <a href={iPost.permalink} target='__blank'>
                              {post && post.includes('.mp4') ? (
                                <video 
                                  className='img-fluid' 
                                  src={post} 
                                />
                              ) : (
                                <img
                                  className='img-fluid' 
                                  src={post} 
                                  alt={`...${iPost.permalink}`} 
                                />
                              )}
                              </a>
                            </CarouselItem>
                          ))}
                          <CarouselControl
                            direction="prev"
                            directionText="Previous"
                            onClickHandler={() => setCurrentIIndex(currentIIndex === 0 ? currentIIndex : currentIIndex - 1)}
                          />
                          <CarouselControl
                            direction="next"
                            directionText="Next"
                            onClickHandler={() => setCurrentIIndex(currentIIndex === iPost.images.length - 1 ? currentIIndex : currentIIndex + 1)}
                          />
                        </Carousel>
                      </>
                    )
                  ) 
                } {
                  iPost === -1 && (
                    <>
                      <a href="https://www.instagram.com/simpliacoes/" target='__blank'>
                        <img
                          className='img-fluid' 
                          src={Piggy} 
                          alt={`Algo está errado, iremos corrigir o mais depressa possivel!`} 
                        />
                      </a>
                    </>
                  )
                }
              </Col>
            </Row>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-gradient"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>

        {/* Products Preview */} 
        {/* //! DEPRECATED
          <section className='section section-lg section-prod-spoiler pt-2'>
            <Modal 
              isOpen={isMOpen} 
              toggle={() => setMOpen(!isMOpen)}
              onExit={() => {
                setMInfo(prevMInfo => ({
                  ...prevMInfo,
                  img: null,
                  title: null,
                  text: null,
                  redirect: null
                }));
              }}
              backdrop
              centered
              keyboard
              fullscreen="true"  
              size='xl'
              className='modal-spoiler'
            >
              <ModalHeader className='justify-content-center'>
                    <h2 className='display-3'>
                      {mInfo.title}
                    </h2>
              </ModalHeader>
              <Row className='p-1'>
                <Col lg="6" className="d-flex align-items-center justify-content-center">
                  <img 
                    src={mInfo.img}
                    alt='...'
                    className='img-fluid ebook'
                  />
                </Col>
                <Col lg="6">
                  <ModalBody>
                    <p id="mInfoText">
                      {mInfo.text}
                    </p>
                  </ModalBody>
                </Col>
              </Row>
              <ModalFooter>
                <Row className="d-flex justify-content-between">
                  <Col >
                    <Button
                      color='danger'
                      onClick={() => {
                        setMOpen(false);
                      }}
                    >
                      Fechar
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      color='info'
                      onClick={() => {
                        handleRedirect('/produtos',mInfo.redirect)
                      }}
                    >
                      Continuar
                    </Button>
                  </Col>
                </Row>
              </ModalFooter>
            </Modal>
            <Container className='p-3 p-sm-0'>
              <Row className='justify-content-center'>
                <h3 className='display-3 text-white'>Os nossos produtos</h3>
              </Row>
              <Row className='justify-content-center'>
                <h5 className='text-info'>Clica em cima de um produto para saberes mais</h5>
              </Row>
              { EBooks }
              <h5 className='text-center text-light display-4'>EBooks</h5>
              <Row className='justify-content-center text-center'>
                <Col sm="6">
                  <Link
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      handleModalOpening('ebook');
                    }}
                  >
                    <img
                      src={ETS_EBook}
                      alt='...'
                      className='img-fluid ebook'
                    />
                  </Link>
                </Col>
                <Col sm="6">
                  <Link
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      handleModalOpening('manual');
                    }}
                  >
                    <img
                      src={ETS_Manual}
                      alt='...'
                      className='img-fluid ebook'
                    />
                  </Link>
                </Col>
              </Row>
              { Exceis }
              <h5 className='text-center text-light display-4'>Exceis</h5>
              <Row className='justify-content-center text-center'>
                <Col sm="4">
                  <Link
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      handleModalOpening('calc');
                    }}
                  >
                    <img 
                      src={ETS_Calc}
                      alt='...'
                      className='img-fluid calc'
                    />
                  </Link>
                </Col>
                <Col sm="4">
                  <Link
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      handleModalOpening('bundle');
                    }}
                  >
                    <img 
                      src={ETS_Bundle}
                      alt='...'
                      className='img-fluid bundle'
                    />
                  </Link>
                </Col>
                <Col sm="4">
                  <Link
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      handleModalOpening('control');
                    }}
                  >
                    <img 
                      src={ETS_Control}
                      alt='...'
                      className='img-fluid cntrl'
                    />
                  </Link>
                </Col>
              </Row>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
        */}

        {/* HUB */}
        <section className='section section-lg section-hub pt-2'>
          <Container fluid className='p-3 p-sm-0'>
            <Row className='justify-content-center'>
              <span className='display-3 text-white text-shadow-yellow'>Simpliações HUB</span>
            </Row>
            <Row className='justify-content-center text-center'>
              <Link to="/hub">
                <img
                  src={HUB_Table}
                  alt='Tabela de ofertas do HUB'
                  className='img-fluid' />
              </Link>
            </Row>
            <Row className='justify-content-center text-center'>
              <p className="text-white" dangerouslySetInnerHTML={{ __html: config.textHUB.replace(/\n/g, '<br />')}} />
            </Row>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
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

        {/* Last Posts */}
        <section className="section section-lg bg-white">
          <Container>
            <div className='text-center'>
              <h3><span className='display-3 text-gray-600 text-shadow-primary'>
                Últimas publicações
              </span></h3>
            </div>
            {latest && latest.length > 0 ? (
              <Row className={`align-items-center d-block d-md-flex ${latest.length <= 2 ? 'justify-content-center' : ''}`}>
                <div className='align-items-center d-md-none'>
                  {/* On small screens, show the carousel */}
                  <Carousel
                      activeIndex={activeIndex}
                      next={next}
                      previous={previous}
                      dark={true}
                  >
                    {latest &&
                      latest.map(post => (
                        <CarouselItem key={`latest-${post.ID}`}>
                          <Link className="post-image" to={`/post/${post.Title.replace(/ +/g, '-')}`}>
                            <img alt="..." src={post.Image !== 'na' ? `${'https://api.simpliacoes.pt'}/${post.Image}` : `https://api.simpliacoes.pt/public/default.jpg`} />
                          </Link>
                        </CarouselItem>
                      ))}
                    <CarouselControl
                      direction="prev"
                      directionText="Previous"
                      onClickHandler={previous}
                    />
                    <CarouselControl
                      direction="next"
                      directionText="Next"
                      onClickHandler={next}
                    />
                  </Carousel>
                </div>
                <div className={`align-items-center justify-content-center d-none d-md-flex`}>
                  {latest &&
                    latest.map(post => (
                      <Col key={`latest-${post.ID}`} md={latest.length < 3 ? latest.length < 2 ? 8 : 6 : 4}>
                        <Link className="post-image" to={`/post/${post.Title.replace(/ +/g, '-')}`}>
                          <img alt="..." src={post.Image !== 'na' ? `${'https://api.simpliacoes.pt'}/${post.Image}` : `https://api.simpliacoes.pt/public/default.jpg`} />
                        </Link>
                      </Col>
                    ))}
                </div>

              </Row>
            ) : (
              <Row>
                <Col className='text-center'>
                  <h3> Ainda não foi feita nenhuma publicação</h3>
                </Col>
              </Row>
            )}
            <Row className="justify-content-center text-center">
              <Col className="mt-5"> 
                <Button
                  className="btn-icon mb-3 mb-sm-0"
                  color="success"
                  href="/blog"
                >
                  <span className="btn-inner--text">Abrir o blog</span>
                  <span className="btn-inner--icon mr-1">
                    <i className="fa fa-hand-o-right" />
                  </span>
                </Button>
              </Col>
            </Row>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>

        {/* Patreon */}
        {false && //! DEPRECATED
        (
          <section className="section section-lg bg-white pt-0">
            <Container className="pt-lg">
              <Row className="text-center justify-content-center">
                <Col lg="10">
                  <h2 className="display-3">Já conheces o nosso <Link className="text-secondary" to="https://www.patreon.com/simpliacoes" target="_blank">Patreon</Link>?</h2>
                  <p className="lead" dangerouslySetInnerHTML={{ __html: config.textPatreon[0].replace(/\n/g, '<br />')}} />
                </Col>
              </Row>
              <Row className="row-grid mt-5 text-justified">
                <Col lg="6">
                  <img 
                    src={Patreon_T1}
                    alt='...'
                    className='img-fluid ebook'
                  />
                  <List type="unstyled" className="patreon mt-3">
                    {
                      config.patreonT1Advantages.map((advantage, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: advantage.replace(/€/g, `<img src=${Piggy} alt="piggy">`) }} />
                      ))
                    }
                  </List>
                  <div className='text-center d-sm-none'>
                    <Link to="https://www.patreon.com/checkout/simpliacoes?rid=22245315" target='_blank'>
                      <Button color="dark">
                        Aceder
                      </Button>
                    </Link>
                  </div>
                </Col>
                <Col lg="6"><img 
                    src={Patreon_T2}
                    alt='...'
                    className='img-fluid ebook'
                  />
                  <List type="unstyled" className="patreon mt-3">
                    {
                      config.patreonT2Advantages.map((advantage, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: advantage.replace(/€/g, `<img src=${Piggy} alt="piggy">`) }} />
                      ))
                    }
                  </List>
                  <div className='text-center d-sm-none'>
                    <Link to="https://www.patreon.com/checkout/simpliacoes?rid=22245343" target='_blank'>
                      <Button color="dark">
                        Aceder
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
              <Row className='d-none d-sm-flex text-center'>
                <Col lg='6'>
                  <Link to="https://www.patreon.com/checkout/simpliacoes?rid=22245315" target='_blank'>
                    <Button color="dark">
                      Aceder
                    </Button>
                  </Link>
                </Col>
                <Col lg='6'>
                  <Link to="https://www.patreon.com/checkout/simpliacoes?rid=22245343" target='_blank'>
                    <Button color="dark">
                      Aceder
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Container>
            {/* SVG separator */}
          </section>
        )}

        {/* Promos  */}
        <section className="section bg-default section-lg section-partners">
          <Container>
            <Row className="row-grid justify-content-center">
              <Col className="text-center" lg="8">
                <h2 className="display-3 text-shadow-primary">
                  <span>
                    Descontos e Códigos Promocionais que temos para ti
                  </span>
                </h2>
                <p className="lead">
                  {config.textPartners}
                </p>
                <div className="text-center mt-5">
                  <Row className="justify-content-center">
                    {/* XTB */}
                    <Col lg="2" xs="4">
                      <a
                        href="https://link-pso.xtb.com/pso/RCicS"
                        id="link_xtb"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle"
                          src={XTB}
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="link_xtb">
                        0€ de comissões para ETFs em €
                      </UncontrolledTooltip>
                    </Col>

                    {/* GoParity */}
                    <Col lg="2" xs="4">
                      <a
                        href="https://app.goparity.com/signup/voucher/RICAR32512"
                        id="link_goparity"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle"
                          src={Goparity}
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="link_goparity">
                        Ganha 5€ para investires em projetos sustentáveis!
                      </UncontrolledTooltip>
                    </Col>
                    
                    {/* AttaPoll */}
                    <Col lg="2" xs="4">
                      <a
                        href="https://attapoll.app/join/heijq"
                        id="link_attapoll"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle"
                          src={AttaPoll}
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="link_attapoll">
                        Questionários que te geram dinheiro!
                      </UncontrolledTooltip>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    </Page>
  );
};

export default Home;
