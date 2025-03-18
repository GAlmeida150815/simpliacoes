// Importing necessary React hooks and components
import React from 'react';

// Importing components from Reactstrap library
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";

// Custom components
import Page from 'views/Page';


const TOS = () => {
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
        <section className="section section-lg section-tos">
          <Container className="mt-5 mb-5">
            <Row>
              <Col>
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <h3>Termos & Condições</h3>
                  </CardHeader>
                  <CardBody className='text-justify'>
                    <p><b>Última atualização:</b> 30 de agosto de 2024</p>

                    <h5><b>1. Informações Legais</b></h5>
                    <ul>
                      <li><b>1.1 Identificação:</b> O site SimpliAções é operado por Ricardo Santos, Certified Financial Education Instructor℠ (CFEI®) pelo National Financial Educators Council (NFEC). Para qualquer questão ou esclarecimento, podes contactar-nos através do e-mail: <a href="mailto:geral@simpliacoes.pt">geral@simpliacoes.pt</a></li>
                      <li><b>1.2 Alterações:</b> Reservamo-nos o direito de alterar, adicionar ou remover qualquer parte destes Termos & Condições a qualquer momento, sem aviso prévio. Recomendo que consultes esta página regularmente para estares a par das atualizações.</li>
                    </ul>

                    <h5><b>2. Aceitação dos Termos</b></h5>
                    <p>Ao utilizares o SimpliAções, concordas em cumprir estes Termos & Condições, bem como a nossa Política de Privacidade. Se não concordares com algum dos termos, deves interromper imediatamente o uso do site.</p>

                    <h5><b>3. Condições de Utilização</b></h5>
                    <ul>
                      <li><b>3.1 Uso Permitido:</b> O conteúdo do site deve ser utilizado apenas para fins legais e de acordo com as leis em vigor em Portugal. É estritamente proibido usar o site para atividades ilegais, incluindo, mas não se limitando a, disseminação de informações falsas, spam ou práticas fraudulentas.</li>
                      <li><b>3.2 Proibições:</b>
                        <ul>
                          <li>Transmitir, armazenar ou partilhar materiais que sejam ilegais, ameaçadores, obscenos ou que infrinjam direitos de propriedade intelectual.</li>
                          <li>Prejudicar, danificar ou interferir com o funcionamento dos nossos servidores ou qualquer outro servidor na Internet.</li>
                          <li>Abusar dos nossos serviços ou tentar comprometer a integridade do nosso sistema.</li>
                        </ul>
                      </li>
                      <li><b>3.3 Responsabilidade pelo Conteúdo:</b> És responsável por todo o conteúdo que publicas no nosso site. A SimpliAções não se responsabiliza por quaisquer danos resultantes do conteúdo gerado pelos utilizadores.</li>
                    </ul>

                    <h5><b>4. Propriedade Intelectual</b></h5>
                    <ul>
                      <li><b>4.1 Direitos Autorais:</b> Todo o conteúdo do site, incluindo textos, imagens, gráficos, sons e animações, está protegido por direitos de autor. É proibida a reprodução, modificação ou distribuição de qualquer parte do site sem a autorização prévia por escrito da nossa empresa.</li>
                      <li><b>4.2 Marcas Comerciais:</b> As marcas comerciais e logotipos exibidos no site são propriedade da SimpliAções. A utilização de qualquer marca comercial sem autorização é estritamente proibida.</li>
                    </ul>

                    <h5><b>5. Limitação de Responsabilidade</b></h5>
                    <ul>
                      <li><b>5.1 Exclusão de Garantias:</b> A SimpliAções não garante que o site estará livre de erros, vírus ou interrupções. O site é fornecido “no estado em que se encontra” e não oferecemos garantias expressas ou implícitas quanto à sua precisão, disponibilidade ou adequação.</li>
                      <li><b>5.2 Danos:</b> Não seremos responsáveis por quaisquer danos diretos, indiretos, incidentais ou consequenciais resultantes do uso ou impossibilidade de uso do site.</li>
                    </ul>

                    <h5><b>6. Cookies</b></h5>
                    <p>O nosso site utiliza cookies para melhorar a tua experiência de navegação. Podes optar por não aceitar cookies, mas isso pode afetar a funcionalidade do site. Para mais informações sobre como utilizamos cookies, consulta a nossa <a href="/politica-de-cookies">Política de Cookies</a>.</p>

                    <h5><b>7. Links para Sites de Terceiros</b></h5>
                    <p>Podemos fornecer links para sites de terceiros. Estes sites não são operados por nós e não somos responsáveis pelo seu conteúdo. A utilização destes links é da tua responsabilidade.</p>

                    <h5><b>8. Modificações e Cancelamento</b></h5>
                    <ul>
                      <li><b>8.1 Alterações:</b> Reservamo-nos o direito de modificar estes Termos & Condições ou de descontinuar o site a qualquer momento. Qualquer alteração será publicada nesta página, e a tua continuidade no uso do site após qualquer alteração será considerada como aceitação das novas condições.</li>
                      <li><b>8.2 Cancelamento:</b> Reservamo-nos o direito de cancelar ou suspender o teu acesso ao site se violares estes Termos & Condições. Em caso de violação, poderemos rescindir o acesso sem aviso prévio e sem reembolso.</li>
                    </ul>

                    <h5><b>9. Lei Aplicável e Foro Competente</b></h5>
                    <p>Estes Termos e Condições são regidos pela legislação portuguesa. Qualquer litígio relacionado com estes Termos será resolvido exclusivamente nos tribunais da Comarca de Lisboa, Portugal.</p>

                    <h5><b>10. Contacto</b></h5>
                    <p>Para qualquer questão relacionada com estes Termos & Condições, podes contactar-nos através do e-mail <a href="mailto:geral@simpliacoes.pt">geral@simpliacoes.pt</a>. Inclui no teu e-mail o assunto “Questão sobre o Website SimpliAções” para uma resposta mais rápida.</p>

                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
    </Page>
  );
};

export default TOS;
