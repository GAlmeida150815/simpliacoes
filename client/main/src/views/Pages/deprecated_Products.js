
/**
* @deprecated This file is no longer in use. Do not modify.
*/

// Importing necessary React hooks and components
import React from 'react';

// Importing components from Reactstrap library
import {
  Container,
  Row,
  Col
} from "reactstrap";

// Custom components
import Page from "../Page";

// Configuration and utility modules
import * as config from 'config.js';

const Products = () => {;
  return (
    <Page>
        <>
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped ">
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
                    <Col lg="12">
                      <div className="text-center">
                        <h3 className="display-3 text-white">
                          Produtos
                        </h3>
                        <p className='text-center text-white' dangerouslySetInnerHTML={{ __html: config.productsDesc.replace(/\n/g, '<br />')}} />
                      </div>
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
          <section className='section-products'>
            <section className="section section-lg section-ebook">
              <div className='text-center pb-3'>
                <h3 className='display-3 text-primary'>Os nossos EBooks</h3>
              </div>
              <Container id="ebook">
                <Row className="row-grid align-items-center">
                  <Col className="order-md-2 align-items-center text-center" md="4">
                    <a 
                      href="https://hotmart.com/pt-br/marketplace/produtos/etfs-descomplicados-domina-os-etfs-de-forma-simples/D86755164E" 
                      target="_blank" rel="noreferrer"
                      className='product-img'
                    >
                      <img
                        alt="..."
                        className="img-fluid"
                        src={require("assets/img/ETS_EBook_promo.gif")}
                      />
                    </a>
                  </Col>
                  <Col className="order-md-1" md="8">
                    <div className="pr-md-5">
                      <h3>Ebook ETFs Descomplicados</h3>
                      <p className='text-justify' dangerouslySetInnerHTML={{ __html: config.ebookDesc.replace(/\n/g, '<br />')}} />
                      <a 
                        href="https://hotmart.com/pt-br/marketplace/produtos/etfs-descomplicados-domina-os-etfs-de-forma-simples/D86755164E" 
                        className="font-weight-bold product-link"
                        target="_blank" rel="noreferrer"
                      >
                        Ver mais...
                      </a>
                      </div>
                  </Col>
                </Row>
              </Container>
              <hr className='w-75 color-black'/>
              <Container id="manual">
                <Row className="row-grid align-items-center">
                  <Col className="order-md-1 align-items-center text-center" md="4">
                    <a 
                      href="https://go.hotmart.com/L93564060P" 
                      target="_blank" rel="noreferrer"
                      className='product-img'
                    >
                      <img
                        alt="..."
                        className="img-fluid"
                        src={require("assets/img/ETS_Manual_promo.gif")}
                      />
                    </a>
                  </Col>
                  <Col className="order-md-2" md="8">
                    <div className="pr-md-5">
                      <h3>Manual Como Analisar uma Empresa</h3>
                      <p className='text-justify' dangerouslySetInnerHTML={{ __html: config.manualDesc.replace(/\n/g, '<br />')}} />
                      <a 
                        href="https://go.hotmart.com/L93564060P" 
                        className="font-weight-bold product-link"
                        target="_blank" rel="noreferrer"
                      >
                        Ver mais...
                      </a>
                      </div>
                  </Col>
                </Row>
              </Container>
            </section>
            <hr />
            <section className="section section-excels">
              <div className='text-center pb-3'>
                <h3 className='display-2 text-primary'>Os nossos Exceis</h3>
              </div>
              <Container fluid className='px-3 px-lg-7' id="excels">
                <Row className="row-grid">
                  <Col md="4" id="calc">
                    <a 
                      href="https://go.hotmart.com/E88459642E" 
                      target="_blank" rel="noreferrer"
                      className='product-img'
                    >
                      <img
                        alt="..."
                        className="img-fluid"
                        src={require("assets/img/ETS_Calc.png")}
                      />
                    </a>
                    <div className="pr-md-5 pb-2 excel-desc">
                      <p className='text-justify' dangerouslySetInnerHTML={{ __html: config.calcDesc.replace(/\n/g, '<br />')}} />
                      <a 
                        href="https://go.hotmart.com/E88459642E" 
                        className="font-weight-bold product-link"
                        target="_blank" rel="noreferrer"
                      >
                        Ver mais...
                      </a>
                    </div>
                  </Col>
                  <Col md="4" id="bundle">
                    <a 
                      href="https://go.hotmart.com/V88513150I" 
                      target="_blank" rel="noreferrer"
                      className='product-img'
                    >
                      <img
                        alt="..."
                        className="img-fluid"
                        src={require("assets/img/ETS_Bundle.png")}
                      />
                    </a>
                    <div className="pr-md-5 pb-2 excel-desc">
                      <p className='text-justify' dangerouslySetInnerHTML={{ __html: config.bundleDesc.replace(/\n/g, '<br />')}} />
                      <a 
                        href="https://go.hotmart.com/V88513150I" 
                        className="font-weight-bold product-link"
                        target="_blank" rel="noreferrer"
                      >
                        Ver mais...
                      </a>
                    </div>
                  </Col>
                  <Col md="4" id="control">
                    <a 
                      href="https://go.hotmart.com/G88512931B" 
                      target="_blank" rel="noreferrer"
                      className='product-img'
                    >
                      <img
                        alt="..."
                        className="img-fluid"
                        src={require("assets/img/ETS_Control.png")}
                      />
                    </a>
                    <div className="pr-md-5 pb-2 excel-desc">
                      <p className='text-justify' dangerouslySetInnerHTML={{ __html: config.portfolioDesc.replace(/\n/g, '<br />')}} />
                      <a 
                        href="https://go.hotmart.com/G88512931B" 
                        className="font-weight-bold product-link"
                        target="_blank" rel="noreferrer"
                      >
                        Ver mais...
                      </a>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </section>
        </>
    </Page>
  );
};

export default Products;
