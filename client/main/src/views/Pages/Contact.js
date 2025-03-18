// Importing necessary React hooks and components
import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

// Custom components
import Page from 'views/Page';

// Configuration and utility modules
import * as config from 'config.js';
import { IoLogoInstagram, IoMailOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { PiLinktreeLogo } from 'react-icons/pi';

// Importing cookie related components
import { toast, ToastContainer, Zoom } from 'react-toastify';

const Contact = () => {
  // State to handle form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!isValidEmail(formData.email)) {
      toast.error('Insira um email válido!',{containerId: 'notifications'})
      return; 
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const responseJSON = await response.json();
      if (responseJSON.success) {
        toast.success(<p>Mensagem enviada com sucesso!<br/>Aguarde pelo nosso contacto.</p>,{containerId: 'notifications'})
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        return;
      }
      
      toast.error('Insira um email válido!',{containerId: 'notifications'})
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Page>
      <ToastContainer
        containerId="notifications"
        position="top-right"
        closeOnClick
        draggable
        pauseOnHover
        theme='dark'
        transition={Zoom}
      />
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
                    SimpliAções{" "}
                    <span>A tua página de Ações e Finanças Pessoais</span>
                </h1>
                {
                //<p className="lead text-white align-justify" dangerouslySetInnerHTML={{ __html: config.textLanding.replace(/\n/g, '<br />')}} />
                }
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
      <section className="section section-lg section-contact">
        <Container fluid={true} className="mt-5 mb-5">
          <Row className="justify-content-center">
            <Col lg="8" md="10">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h3>Contactos</h3>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="6" className="order-2 order-md-1">
                      <Form onSubmit={handleSubmit}>
                        <FormGroup>
                          <Label for="name">Nome</Label>
                          <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Insira o seu nome e sobrenome"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="email">Email</Label>
                          <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Insira o seu email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="message">Mensagem</Label>
                          <Input
                            type="textarea"
                            name="message"
                            id="message"
                            placeholder="Escreva aqui a sua mensagem"
                            value={formData.message}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                        <Button type="submit" color="primary" block>Enviar</Button>
                      </Form>
                    </Col>
                    <Col sm="6" className="order-1 order-md-2">
                      <Row>
                        <Col sm="12">
                          <h3>Fala conosco</h3>
                          <hr />
                          <p>Estamos disponiveis para te ajudar no que seja necessário.</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="6" className='d-flex'>
                          <IoMailOutline className='w-100 h-100'/>
                          <div className='mx-2'>
                            <h4 className='mb-0'>Email</h4>
                            <p className='muted'>geral@simpliacoes.pt</p>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="4" className='d-flex contacts-socials'>
                          <Link to="https://www.instagram.com/simpliacoes/" target="_blank" className="nav-link mx-2" activeclassname="active">
                              <IoLogoInstagram /> 
                          </Link>
                          <Link to="https://linktr.ee/simpliacoes" target="_blank" className="nav-link" activeclassname="active">
                              <PiLinktreeLogo /> 
                          </Link>
                        </Col>
                      </Row>
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

export default Contact;
