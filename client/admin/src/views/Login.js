import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";

// ? Hooks
import { useLoading } from "components/Hooks/LoadingHook";
import { useModal } from "components/Hooks/ModalHook";
import { useAuth } from 'components/Hooks/AuthContext';

const Login = () => {
  // ? Hooks Context
  const { login, logged } = useAuth();
  const { showModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  // States
  const [formData, setFormData] = useState({
    user: "",
    password: "",
    rememberMe: false,
  });

  // Handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      showLoading();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.user,
          password: formData.password,
        }),
      });

      if (!response.status === 500) {
        showModal(
          `Erro`,
          `Ocorreu um erro na autenticação.`
        );
      }

      const data = await response.json();

      if (data.success) {
        try {
          if (formData.rememberMe)
            login(formData.user);
          else
            login(formData.user, 30)
        } catch (error) {
          showModal(
            `Erro`,
            `Ocorreu um erro na autenticação.`
          );
        } finally {
          hideLoading();
          navigate('/index');
        }
      } else {
        showModal(
          `Login negado`,
          `O username ou a password estão errado/os, caso não seja parte da página não tente dar login.`
        );
      }
    } catch (error) {
      showModal(
        `Erro`,
        `Ocorreu um erro na autenticação.
        O servidor parece estar offline.`
      );
    }

    hideLoading();
  };

  // Effects
  useEffect(() => {
    if (logged()) {
      navigate('/index');
    }
  }, [logged, navigate]);

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-2 py-lg-2">
            <div className="text-center mb-4">
              <small>Login com credenciais</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="User"
                    type="text"
                    name="user"
                    value={formData.user} 
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password} 
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id="customCheckLogin"
                  type="checkbox"
                  name="rememberMe" 
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customCheckLogin"
                >
                  <span className="">Manter sessão iniciada</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="danger"
                  type="button"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
