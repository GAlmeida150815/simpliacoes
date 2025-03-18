// Importing necessary React components
import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

// Custom components
import Page from 'views/Page';

import Piggy from 'assets/img/brand/piggie.png'; 
import Owner from 'assets/img/ricardo_3.jpg'

const WhoAreWe = () => {
  return (
    <Page>
      <div className="position-relative">
        {/* shape Hero */}
        <section className="section section-shaped">
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
              <Row>
                <Col lg="8" sm="6" className='title-text'>
                  <h1 className="display-3 text-white">
                    Quem Somos{" "}
                    <span>Conheça a nossa história e missão</span>
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

      <section className="section section-lg section-about-us">
        <Container fluid={true} className="mt-5 mb-5">
          <Row className="justify-content-center">
            <Col lg="8" md="10">
                  <Card className="shadow">
                    <CardHeader className="bg-transparent">
                      <h3>Bem-vindos ao nosso mundo, Piggies 🐷💸</h3>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col md="8" className='text-justify'>
                          <p>
                            No vasto e complexo mundo das finanças pessoais e investimentos, 
                            é fácil perderes-te em conceitos confusos e jargões incompreensíveis. 
                            Foi por isso que criámos a <strong>SimpliAções</strong>: para ser a tua bússola financeira, 
                            guiando-te com clareza e simplicidade.
                          </p>
                          <p>
                            O meu nome é <strong>Ricardo Santos</strong>, sou o fundador da SimpliAções e sou 
                            <strong> Certified Financial Education Instructor℠ (CFEI®)</strong> pelo National Financial Educators Council (NFEC). 
                            Aqui, transformamos a complexidade do mercado de ações e das finanças pessoais em algo acessível e descomplicado.
                          </p>
                          <p>
                            A nossa missão é <strong>"Simplificar para Capacitar"</strong> — para que possas aprender e crescer financeiramente de 
                            forma contínua e confiante.
                          </p>
                          <p>
                            Acreditamos que a literacia financeira é essencial para o teu sucesso, e estamos comprometidos em fornecer-te o 
                            conhecimento, as ferramentas e as estratégias para que possas tomar as melhores decisões financeiras.
                          </p>
                          <p>
                            Lembra-te, o conhecimento financeiro é uma jornada, e estamos aqui para te acompanhar em cada passo.
                          </p>
                          <p className="lead">
                            Segue-nos agora e começa a tua caminhada rumo à independência financeira! 🚀
                          </p>
                        </Col>
                        <Col md="4">
                          <img alt="Ricardo" className="w-100" src={Owner} />
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </Page>
  );
};

export default WhoAreWe;
