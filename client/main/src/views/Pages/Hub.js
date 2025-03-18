// Importing necessary React hooks and components
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Importing components from Reactstrap library
import {
  Container,
  Row,
  Col,
  Card,
  Collapse,
  CardBody,
  Button
} from "reactstrap";

// Custom components
import Page from "../Page";

// Configuration and utility modules
import * as config from 'config.js';

// Import images
import Hub_Logo from 'assets/img/hub_logo.png';
import Learn_Method from 'assets/img/learn_method.png';
import WWYL1 from 'assets/img/WWYL1.webp';
import WWYL2 from 'assets/img/WWYL2.webp';
import WWYL3 from 'assets/img/WWYL3.webp';
import WWYL4 from 'assets/img/WWYL4.webp';
import Ricardo_1 from 'assets/img/ricardo_1.png';
import Ricardo_2 from 'assets/img/ricardo_2.png';

import Product_1 from 'assets/img/Produtos/product_1.png';
import Product_2 from 'assets/img/Produtos/product_2.png';
import Product_3 from 'assets/img/Produtos/product_3.png';
import Product_4 from 'assets/img/Produtos/product_4.png';
import Product_5 from 'assets/img/Produtos/product_5.png';
import Product_6 from 'assets/img/Produtos/product_6.png';
import More from 'assets/img/Produtos/more.png';

// Importing testimonies
import Testimony_1 from 'assets/img/testimony_1.webp';
import Testimony_2 from 'assets/img/testimony_2.webp';
import Testimony_3 from 'assets/img/testimony_3.webp';
import Testimony_4 from 'assets/img/testimony_4.webp';

const Hub = () => {
  const [openIds, setOpenIds] = useState([]);

  const toggle = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Page>
        <div className='hub'>
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
              <Container className="py-lg-md d-flex description">
                <div className="col px-0">
                  <Row>
                    <Col lg="12">
                      <div className="text-center justify-content-center">
                        <img alt="Logo HUB" src={Hub_Logo}/>
                        <h4 className='text-center' dangerouslySetInnerHTML={{ __html: config.hubDesc.replace(/\n/g, '<br />')}}/>
                        <h5 className='text-center' dangerouslySetInnerHTML={{ __html: config.hubDesc2.replace(/\n/g, '<br />')}} />
                        <div className='pt-5'>
                          <a
                            className="btn flex-fill mb-2 mx-1 "
                            href="#buy_now"
                          >
                            entrar no simpliações hub
                          </a>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            </section>
            {/* 1st Hero Variation */}
          </div>

          {/* 1st section (white) */}
          <section className='section '>
            <Container>
              <h3 className='text-text-primary font-weight-bold'>O que ninguém te ensinou sobre dinheiro</h3>
              <p>Se acreditas que para ter sucesso basta estudar, conseguir um bom emprego e trabalhar duro… <strong>não és o único.</strong></p>
              <p>Desde pequenos ouvimos que esse é o caminho para uma vida estável. Mas se fosse assim tão simples, porque é que tanta gente que trabalha arduamente continua a lutar para chegar ao fim do mês?</p>
              <p>A verdade é que o trabalho paga as contas, mas <strong>não te dá liberdade financeira.</strong></p>
              <p>O segredo para <strong>prosperar</strong> não está apenas no quanto ganhas, mas <strong>no que fazes com esse dinheiro.</strong></p>
              <p><strong>Investir não é um luxo para poucos</strong> – é uma ferramenta essencial para quem quer crescer financeiramente e construir um futuro seguro.</p>
              <p>O problema? Não aprendemos isto na escola ou no trabalho.</p>
              <p>Se queres sair deste ciclo de ser apenas "chapa ganha, chapa gasta", e começar a <strong>fazer o teu dinheiro trabalhar para ti</strong>, precisas de aprender a investir.</p>
              <p>E a boa notícia é que não precisas de um grande capital ou de anos de experiência para começar.</p>
              <p>Estás pronto para dar o primeiro passo?</p>
            </Container>
          </section>
          
          {/* 2nd section (gray) */}
          <section className='section section-lg'>
            <Container className='justify-content-center text-center'>
              <Row className='pb-5'>
                <Container fluid className='testimony-box'>
                  <Row className='p-3'>
                    <Col lg="4">
                      <img className='img-fluid' alt="testimony_1" src={Testimony_1} />
                    </Col>
                    <Col lg="4">
                      <img className='img-fluid' alt="testimony_2" src={Testimony_2} />
                    </Col>
                    <Col lg="4">
                      <img className='img-fluid' alt="testimony_3" src={Testimony_3} />
                    </Col>
                  </Row>
                </Container>
              </Row>
              <Link
                className="btn flex-fill mb-2 mx-1 "
              >
                quero investir com confiança
              </Link>
            </Container>
          </section>

          {/* 3rd section (white) */}
          <section className='section section-lg'>
            <Container className='justify-content-center text-center pt-5'>
              <h3 className='legend'>
                O que vais aprender:
              </h3>
              <Row className='pt-4'>
                <Col lg="6">
                  <img className='img-fluid' alt="produto_1" src={Product_1} />
                </Col>
                <Col lg="6">
                  <img className='img-fluid' alt="produto_2" src={Product_2} />
                </Col>
              </Row>
              <Row className='pt-4'>
                <Col lg="6">
                  <img className='img-fluid' alt="produto_3" src={Product_3} />
                </Col>
                <Col lg="6">
                  <img className='img-fluid' alt="produto_4" src={Product_4} />
                </Col>
              </Row>
              <Row className='pt-4'>
                <Col lg="6">
                  <img className='img-fluid' alt="produto_5" src={Product_5} />
                </Col>
                <Col lg="6">
                  <img className='img-fluid' alt="produto_6" src={Product_6} />
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <img className='img-fluid' alt="and_more" src={More} />
                </Col>
              </Row>
            </Container>
          </section>

          {/* 4th section (purple) */}
          <section className='section section-lg'>
            <Container className=''>
              <Row>
                <Col lg="6">
                  <Container className='box'>
                    <Row className='justify-content-center text-center'>
                      <h3>Antes do <br/>SimpliAções Hub</h3>
                    </Row>
                    <ul className='list-no'>
                      <li>Não sabes por onde começar e/ou investes sem estratégia.</li>
                      <li>O teu rendimento depende apenas do teu trabalho e do tempo que consegues dedicar.</li>
                      <li>Sentes incerteza sobre como fazer crescer o teu dinheiro e alcançar a liberdade financeira.</li>
                    </ul>
                  </Container>
                </Col>
                <Col lg="6">
                  <Container className='box'>
                    <Row className='justify-content-center text-center'>
                      <h3>Depois do <br/>SimpliAções Hub</h3>
                    </Row>
                    <ul className='list-yes text-bold'>
                      <li>Tens um plano claro e investes de forma inteligente e diversificada.</li>
                      <li>Fazes o teu dinheiro trabalhar para ti, sem depender apenas do teu salário.</li>
                      <li>Constróis um caminho sólido para a tua independência financeira e uma reforma antecipada.</li>
                    </ul>
                  </Container>
                </Col>
              </Row>
              <Row className='text-center justify-content-center'>
                <Col lg="6" className='pt-5'>
                  <Link
                    className="btn flex-fill mb-2 mx-1 "
                  >
                    quero juntar-me hoje
                  </Link>
                </Col>
              </Row>
            </Container>
          </section>
          
          {/* 5th section (white) */}
          <section className='section'>
            <Container className=''>
              <Row className='justify-content-center pb-5  pt-0'>
                <h3 className='text-purple font-weight-bold'>Vais aprender com:</h3>
              </Row>
              <Row>
                  <Col lg="4">
                    <img className='img-fluid' src={Ricardo_1} alt="Ricardo Santos"/>
                  </Col>
                  <Col lg="8">
                    <div className='text-container'>
                      <p><strong>Ricardo Santos</strong>  , fundador da SimpliAções e Certified Financial Education Instructor℠ (CFEI®) pelo National Financial Educators Council (NFEC).</p>
                      <p>Alguém que acredita que investir não tem de ser complicado e que qualquer pessoa pode tomar boas decisões financeiras com o conhecimento certo.</p>
                      <p>Aqui, simplificamos o mundo das finanças e dos investimentos para que possas compreender, agir com confiança e construir um futuro financeiro mais seguro</p>
                    </div>
                  </Col>
              </Row>
            </Container>
          </section>

          {/* 6th section (purple) */}
          <section className='section section-lg' id="buy_now">
            <Container className=''>
              <Row className='justify-content-center text-center pb-4'>
                <h3 className='text-white font-weight-bold'>No SimpliAções Hub<br/>irás ter acesso:</h3>
              </Row>
              <Row>
                <Container className='box'>
                  <Row>
                    <Col lg="6" className='text-center d-flex flex-column justify-content-center align-items-center py-6'>  
                      <h2 className='text-yellow text-strike'><s>3820€</s></h2>
                      <h1 className='text-white font-weight-bolder'>89,90€/ano</h1>
                      <Link
                        className="btn red text-white mb-2 mx-1 "
                        to="https://pay.hotmart.com/A96279393T?off=udbavsxv&checkoutMode=10&bid=1740067557619"
                        target="_blank"
                      >
                        comprar agora
                      </Link>
                      <h4>ou</h4>
                      <h2 className='font-weight-bolder'>8,99€/mês</h2>
                      <Link
                        className="btn green text-white mb-2 mx-1 "
                        to="https://pay.hotmart.com/A96279393T?off=z28m2w6o&checkoutMode=10&bid=1739434398925"
                        target="_blank"
                      >
                        comprar agora
                      </Link> 
                    </Col>
                    <Col lg="6">
                      <ul>
                        <li>eBook <strong>ETFs Descomplicados</strong> <s>30€</s></li>
                        <li>eBook <strong>O Segredo dos PPRs</strong> <s>35€</s></li>
                        <li>eBook <strong>Como Analisar uma Empresa</strong> <s>40€</s></li>
                        <li><strong>Curso Como Investir nos Mercados Financeiros</strong> <s>300€</s></li>
                        <li>Extensão Google Sheets (=simpliaçoes) + 2 templates (Controlo P. e VI) - <s>360€</s></li>
                        <li>Template MyPortfolio para controlares todos os teus ativos - <s>45€</s></li>
                        <li>Template SimpliQ - <s>50€</s></li>
                        <li>2 Análises de Empresas mensais, escolhidas por ti - <s>360€</s></li>
                        <li>Análises Trimestrais - <s>240€</s></li>
                        <li>Ex-Div do mês, principais Eventos do mês, publicações antecipadas, tabelas de valores intrínsecos e watch-list - <s>360€</s></li>
                        <li><strong>Lives com Especialistas</strong> <s>2000€</s></li>
                        <li><strong>Comunidade Exclusiva</strong> - INCALCULÁVEL</li>
                      </ul>
                      <div className='text-center justify-content-center pt-2'>
                        <h3 className='font-weight-bolder'>Tudo isto teria o valor de <s>3820€</s></h3>
                        <div className='yellow-bk mt-4'>
                          <p>Entra hoje e garante, para sempre, o preço de<br/>
                          <strong>8,99€/mês ou 89,99€/ano.</strong></p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Row>
            </Container>
          </section>

          {/* 7th section (white) */}
          <section className='section'>
            <Container className=''>
              <Row className='justify-content-center text-center'>
                <Col lg="8">
                  <h1 className='text-purple font-weight-bold'>Ainda com dúvidas?</h1>
                  <img alt="Ricardo Santos" className='img-fluid' src={Ricardo_2} />
                </Col>
                
                <Col lg="4">
                  <img alt="Testemunho 4" className='img-fluid' src={Testimony_4} />
                </Col>
              </Row>
            </Container>
          </section>
          
          {/* 8th section (black) */}
          <section className='section'>
            <Container className='justify-content-center text-center'>
              <h2><strong>Aprende sem riscos!</strong></h2>
              <h4>Experimenta o Hub durante 14 dias e decide se faz sentido continuar esta caminhada connosco!</h4>
              <h4>Se não for o que procuras, devolvemos-te o dinheiro sem complicações e sem perguntas.</h4>
            </Container>
          </section>
          
          {/* 9th section (white) */}
          <section className='section'>
            <Container className=''>
              <Row className='justify-content-center text-center'>
                <h4>Perguntas Frequentes</h4>
              </Row>
              <Row>
                <div className="faq-container">
                  {/* Question 1 */}
                  <Card className="faq-item">
                    <Button onClick={() => toggle(1)} className="faq-question">
                      Ao entrar no Hub tenho acesso aos conteúdos que já foram publicados?
                    </Button>
                    <Collapse isOpen={openIds.includes(1)}>
                      <CardBody className="faq-answer">
                        Sim, enquanto fores membro tens acesso a todos os conteúdos já publicados, assim como aos novos conteúdos que colocamos regularmente.
                      </CardBody>
                    </Collapse>
                  </Card>

                  {/* Question 2 */}
                  <Card className="faq-item">
                    <Button onClick={() => toggle(2)} className="faq-question">
                      Quanto tempo dura a subscrição?
                    </Button>
                    <Collapse isOpen={openIds.includes(2)}>
                      <CardBody className="faq-answer">
                        A subscrição tem a duração de 1 mês (ou 1 ano, dependendo do plano que escolhas) e é renovada automaticamente. Caso queiras cancelar, podes fazê-lo sem perguntas uma vez que não existe qualquer fidelização.
                      </CardBody>
                    </Collapse>
                  </Card>

                  {/* Question 3 */}
                  <Card className="faq-item">
                    <Button onClick={() => toggle(3)} className="faq-question">
                      Como e onde é que posso aceder ao HUB?
                    </Button>
                    <Collapse isOpen={openIds.includes(3)}>
                      <CardBody className="faq-answer">
                        O HUB está alojado na plataforma Hotmart. Podes aceder no computador ou em qualquer dispositivo móvel, pelo browser diretamente no site da Hotmart ou fazendo o Download da aplicação. Só precisas de ter acesso à internet.
                      </CardBody>
                    </Collapse>
                  </Card>

                  {/* Question 4 */}
                  <Card className="faq-item">
                    <Button onClick={() => toggle(4)} className="faq-question">
                      Há algum tempo limite para aceder aos cursos?
                    </Button>
                    <Collapse isOpen={openIds.includes(4)}>
                      <CardBody className="faq-answer">
                        O Hub foi criado para se adaptar ao teu ritmo. Podes aceder aos conteúdos quando e onde quiseres, seja num intervalo de 15 minutos ou num fim de semana mais tranquilo. Além disso, as ferramentas e conteúdos são práticos, para que possas aplicar o que aprendes sem perder tempo.
                      </CardBody>
                    </Collapse>
                  </Card>

                  {/* Question 5 */}
                  <Card className="faq-item">
                    <Button onClick={() => toggle(5)} className="faq-question">
                      Serei capaz de aplicar o conteúdo ensinado?
                    </Button>
                    <Collapse isOpen={openIds.includes(5)}>
                      <CardBody className="faq-answer">
                        Sim, absolutamente. A plataforma foi desenhada para ser prática e acessível a todos, mesmo para quem nunca investiu. Todos os cursos e ferramentas são explicados passo a passo, com exemplos reais. Além disso, tens acesso a lives com especialistas e suporte contínuo para esclarecer dúvidas. Com dedicação, vais conseguir aplicar o que aprendes e transformar os teus objetivos financeiros em realidade.
                      </CardBody>
                    </Collapse>
                  </Card>

                  {/* Question 6 */}
                  <Card className="faq-item">
                    <Button onClick={() => toggle(6)} className="faq-question">
                      Porque é que preciso disso agora?
                    </Button>
                    <Collapse isOpen={openIds.includes(6)}>
                      <CardBody className="faq-answer">
                        Porque o tempo é o maior aliado nos investimentos. Cada dia que passa sem começares a cuidar do teu futuro financeiro é um dia perdido de crescimento e de preparação para a reforma. A Comissão Europeia prevê que as reformas vão cair para cerca de 38,5% do último salário até 2050. Não esperar é a diferença entre viver com tranquilidade ou com dificuldades no futuro.
                      </CardBody>
                    </Collapse>
                  </Card>

                  {/* Question 7 */}
                  <Card className="faq-item">
                    <Button onClick={() => toggle(7)} className="faq-question">
                      Porque é que vou estar a pagar quando há tanto conteúdo gratuito?
                    </Button>
                    <Collapse isOpen={openIds.includes(7)}>
                      <CardBody className="faq-answer">
                        Inscrever-te no Hub significa ter acesso a tudo o que precisas para começar a investir de forma informada e estruturada. É como ter um mentor financeiro disponível 24/7, com ferramentas práticas, análises detalhadas e conteúdo que te guia desde os primeiros passos até estratégias avançadas. Vais poupar tempo, evitar erros comuns e finalmente colocar o teu dinheiro a trabalhar para ti. Para além disso, pensa nisto: 89,90€ por ano são 25 cêntimos por dia... são menos de 10 cafés ou 2 maços de tabaco por mês. Não tens isso para investir no teu futuro?
                      </CardBody>
                    </Collapse>
                  </Card>
                </div>
              </Row>
            </Container>
          </section>
          
          {/* 10th section (yellow) */}
          <section className='section'>
            <Container>
              <Row className='justify-content-center text-center'>
                <Col lg="10">
                  <h1>Começa a investir de forma simples e prática, mesmo que não tenhas experiência!</h1>
                </Col>
              </Row>
              <Row className='justify-content-center text-center'>
                <h4>👉 Garante o teu acesso a conteúdos exclusivos, ferramentas úteis e suporte dedicado para te ajudar a dar os primeiros passos com confiança</h4>
              </Row>
              <Row className='justify-content-center text-center pt-5'> 
                <a
                  className="btn mb-2 mx-1 "
                  href="#buy_now"
                >
                  quero juntar me hoje
                </a>
              </Row>
            </Container>
          </section>
        </div>
    </Page>
  );
};

export default Hub;