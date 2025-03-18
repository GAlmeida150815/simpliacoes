// react
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

import { getAllPosts, deletePost } from "../../utils/apiUtils";
import { formatDate } from "utils/helperFunctions";

// ? Hooks
import { useLoading } from "components/Hooks/LoadingHook";
import { useModal } from "components/Hooks/ModalHook";


const Posts = () => {
  // ? Hooks
  const { showModal, showDecisionModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  // States
  const [posts, setPosts] = useState(null);

  // Function
  const fetchPosts = async () => {
    try {
      showLoading();
      setPosts(await getAllPosts());
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
        case 'add': 
          navigate('/admin/post/add');
        break;

        case 'show':
          navigate(`/admin/post/${PostID}`);
        break;

        case 'edit': 
          navigate(`/admin/post/${PostID}`);
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
                handleDel(PostID)
                return;
              } catch {
                throw new Error();
              }
            })
            .catch(() => {
              throw new Error();
            });
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

  const handleDel = async (ID) => {
    if (await deletePost(ID)) {
      await fetchPosts();
      hideLoading();
      showModal("Post elminado", 'O post foi eliminado');
      return;
    }

    hideLoading();
    showModal('Erro','Ocorreu um erro ao eliminar o post. Esse post ainda existe?');
  }

  // Effects
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7 mb-7 " fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Posts</h3>
                <Button
                  color="secondary"
                  onClick={() => managePost(0, 'add')}
                  className="ml-auto"
                >
                  Adicionar Post
                </Button>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Imagem</th>
                    <th scope="col">Id</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Data de criação</th>
                    <th scope="col">Data da ultima edição</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {posts &&
                    posts.map((post) => (
                      <tr key={post.ID}>
                        <th scope="row">
                          <Media className="align-items-center ">
                            <img 
                              className="rounded posts-image"
                              alt='...' 
                              src={post.Image !== 'na' ? `${process.env.REACT_APP_API_URL}/${post.Image}` : `${process.env.REACT_APP_API_URL}/public/default.jpg`} 
                            />
                          </Media>
                        </th>
                        <td>{post.ID}</td>
                        <td>{post.Title}</td>
                        <td>{post.Description}</td>
                        <td>{formatDate(post.Creation)}</td>
                        <td>{formatDate(post.LastUpdate)}</td>
                        {/* Add more cells based on your post data structure */}
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="ni ni-books" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => {
                                  e.preventDefault();
                                  managePost(post.ID,'show');
                                }}
                              >
                                Ver em detalhe
                              </DropdownItem>
                              
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => {
                                  e.preventDefault();
                                  managePost(post.ID,'del');
                                }}
                              >
                                Apagar
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Posts;
