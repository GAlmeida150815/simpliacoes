// Importing necessary React hooks and components
import React from 'react';
import { Link } from 'react-router-dom';

// Importing components from Reactstrap library
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";

// Custom components
import Page from 'views/Page';

const PrivacyPolicy = () => {
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
        <section className="section section-lg section-privacy">
          <Container className="mt-5 mb-5">
            <Row>
              <Col>
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <h3>Política de Privacidade</h3>
                  </CardHeader>
                  <CardBody className='text-justify'>
                    <p>Explicamos como recolhemos, utilizamos e protegemos os teus dados pessoais quando visitas e utilizas o nosso site.</p>

                    <h5><b>1. Introdução</b></h5>
                    <p>
                      <ul>
                        <li>Bem vindo à, <b>SimpliAções</b>! A tua privacidade é muito importante para nós. Nesta <b>Política de Privacidade</b>, explicamos como recolhemos, utilizamos e protegemos os teus dados pessoais quando visitas e utilizas o nosso site.</li>
                      </ul>
                    </p>

                    <h5><b>2. Responsável pelo Tratamento dos Dados</b></h5>
                    <p>
                      Nós, <b>SimpliAções</b>, somos os responsáveis pelo tratamento dos teus dados pessoais. Se precisares de entrar em contacto connosco, podes fazê-lo através do nosso <Link to="/contactos">formulário de contacto</Link> ou diretamente através do nosso email: 
                      <a href="mailto:geral@simpliacoes.pt">geral@simpliacoes.pt</a>
                    </p>

                    <h5><b>3. Dados Pessoais que Recolhemos</b></h5>
                    <p>Podemos recolher e tratar diferentes tipos de dados pessoais, conforme descrito abaixo:</p>
                    <ul>
                      <li><b>Dados de Identificação:</b>
                        <ul>
                          <li>Nome completo</li>
                          <li>Endereço</li>
                          <li>Endereço de e-mail</li>
                          <li>Número de telefone</li>
                        </ul>
                      </li>
                      <li><b>Dados de Navegação e Utilização:</b>
                        <ul>
                          <li>Endereço IP</li>
                          <li>Dados de geolocalização</li>
                          <li>Informações sobre a atividade na internet, incluindo histórico de navegação e interações com o nosso site</li>
                        </ul>
                      </li>
                    </ul>
                    
                    <h5><b>4. Finalidades do Tratamento</b></h5>
                    <ul>
                      <li><b>Para Comunicação:</b> Utilizamos os teus dados para responder a pedidos de contacto e fornecer informações sobre os nossos serviços. A base legal para este tratamento é a execução de contrato ou o teu consentimento.</li>
                      <li><b>Para Newsletters e Marketing:</b> Enviamos atualizações, ofertas e promoções com base no teu consentimento. Podes optar por não receber comunicações de marketing a qualquer momento.</li>
                      <li><b>Para Análise e Melhoria:</b> Utilizamos dados para compilar e analisar estatísticas que nos ajudam a melhorar o nosso site e serviços. A base legal para este tratamento é o teu consentimento.</li>
                      <li><b>Para Cumprimento Legal:</b> Tratamos dados pessoais para cumprir obrigações legais e regulamentares. A base legal para este tratamento é o cumprimento de obrigações legais.</li>
                    </ul>

                    <h5><b>5. Base Legal para o Tratamento</b></h5>
                    <p>O tratamento dos teus dados pessoais é realizado com base nas seguintes razões legais:</p>
                    <ul>
                      <li><b>Consentimento:</b> Quando nos forneces dados para receber comunicações ou para outros fins específicos.</li>
                      <li><b>Execução de Contratos:</b> Para cumprir contratos estabelecidos contigo.</li>
                      <li><b>Obrigações Legais:</b> Para cumprir com obrigações legais às quais estamos sujeitos.</li>
                    </ul>

                    <h5><b>6. Partilha de Dados</b></h5>
                    <p>Podemos partilhar os teus dados pessoais com:</p>
                    <ul>
                      <li><b>Processadores de Dados:</b> Terceiros que prestam serviços em nosso nome, como serviços de hospedagem e análise.</li>
                      <li><b>Autoridades Legais:</b> Quando exigido por lei ou para cumprir com obrigações legais.</li>
                      <li><b>Transferências Internacionais:</b> Se os dados forem transferidos para fora da União Europeia, tomamos medidas para garantir um nível adequado de proteção.</li>
                    </ul>

                    <h5><b>7. Segurança dos Dados</b></h5>
                    <p>Comprometemo-nos a proteger os teus dados pessoais através de medidas técnicas e organizativas apropriadas.</p>

                    <h5><b>8. Cookies</b></h5>
                    <p>Utilizamos cookies para melhorar a tua experiência no nosso site. Para mais informações, consulta a nossa <a href="/politica-de-cookies">Política de Cookies</a>.</p>

                    <h5><b>9. Direitos dos Titulares dos Dados</b></h5>
                    <p>Temos o compromisso de respeitar os teus direitos em relação aos teus dados pessoais. Tens os seguintes direitos:</p>
                    <ul>
                      <li><b>Direito de Acesso:</b> Podes solicitar uma cópia dos dados pessoais que possuímos sobre ti.</li>
                      <li><b>Direito de Retificação:</b> Podes corrigir ou completar dados pessoais incorretos ou incompletos.</li>
                      <li><b>Direito ao Apagamento:</b> Podes solicitar a eliminação dos teus dados pessoais, quando aplicável.</li>
                      <li><b>Direito à Limitação do Tratamento:</b> Podes solicitar a limitação do tratamento dos teus dados pessoais.</li>
                      <li><b>Direito à Portabilidade:</b> Podes solicitar a transferência dos teus dados pessoais para outro controlador.</li>
                      <li><b>Direito de Oposição:</b> Podes opor-te ao tratamento dos teus dados para determinados fins.</li>
                      <li><b>Direito de Retirar Consentimento:</b> Podes revogar o consentimento a qualquer momento.</li>
                    </ul>

                    <h5><b>10. Alterações à Política de Privacidade</b></h5>
                    <p>Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que consultes esta página regularmente para estar a par de quaisquer alterações.</p>

                    <h5><b>11. Contacto</b></h5>
                    <p>Se tiveres dúvidas sobre esta Política de Privacidade, entra em contacto connosco através do nosso email: <a href="mailto:geral@simpliacoes.pt">geral@simpliacoes.pt</a>.</p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
    </Page>
  );
};

export default PrivacyPolicy;
