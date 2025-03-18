// Importing necessary React hooks and components
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Importing components from Reactstrap library
import {
  Card,
  Container,
  Row,
  Col,
  Modal,
  ModalBody
} from 'reactstrap';

// Importing icons from React Icons
import { FaShare } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { IoLogoFacebook, IoLogoLinkedin, IoLogoTwitter, IoLogoWhatsapp, IoCloseCircle, IoCalendarSharp, IoArrowUndoSharp, IoBrushSharp } from 'react-icons/io5';

// Core components
import Page from "../Page";

// Configuration and utility modules
import { formatDate } from 'utils/helperFunctions';


const Post = () => {
  // General states
  const [dataFetched, setDataFetched] = useState(false);

  // Page-specific states
  const [post, setPost] = useState({});             
  const [shareModal, setShareModal] = useState(false); 
  const [sugestedPosts, setSugestions] = useState([]); 

  // URL parameters
  const { Title } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/title/${decodeURIComponent(Title).replace(/-+/g, ' ')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      

      try {
        const topicsResponse = await fetch(`${process.env.REACT_APP_API_URL}/topics/postTopics/${data.ID}`);
        if (!topicsResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const postTopics = await topicsResponse.json();
        const topicIDs = postTopics.map(topic => topic.ID);
        data.topics = topicIDs;
      } catch (error) {
        console.error('Error fetching post topics:', error);
      }

      setPost(data);
      setDataFetched(true);
    };

    if (Title) {
      fetchData();
      fetchRandPosts();
    }
  }, [Title]);

  useEffect(() => {
    if (post.Title) 
      document.title = post.Title;
  }, [post]);

  const fetchRandPosts = async () => {
    try {
      const postsResponse = await fetch(`${process.env.REACT_APP_API_URL}/posts/randomPosts/2/${post.ID}`);
      if (!postsResponse.ok) {
          throw new Error('Network response was not ok');
      }
      const postsData = await postsResponse.json();
      setSugestions(postsData);
    } catch (error) {
      //console.error('Error:', error);
    }
  };

  return (
    <Page dataFetched={dataFetched}>
      <>
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
        <section className="section post">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <div className="postt">
                  <div className="d-none d-md-block mt-2">
                    <Link to="/blog" className='font-weight-bold'>
                      <IoArrowUndoSharp /> {" "} Voltar
                    </Link>
                  </div>
                  <Row className='post-img mt-4'>
                    <Col lg="9">
                      <img alt="..." src={post.Image !== 'na' ? `${'https://api.simpliacoes.pt'}/${post.Image}` : `https://api.simpliacoes.pt/public/default.jpg`} />
                      <Row className='under-img'>
                        <div className='socials'>
                          <Link className='d-none like' onClick={"like"}>
                            <GoHeart />
                          </Link>
                          <Link className='share' onClick={() => setShareModal(!shareModal)}>
                            <FaShare />
                          </Link>
                        </div>
                        <p className='date'><IoCalendarSharp />{" "}{post.Creation && formatDate(post.Creation)}</p>
                        {
                          post.LastUpdate && post.LastUpdate !== "0000-00-00 00:00:00" &&
                          <p className='date ml-1'><IoBrushSharp />{" "}{formatDate(post.LastUpdate)}</p> 
                        }
                      </Row>
                      <h2 className='title font-weight-bold'>{post.Title}</h2>
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
                      <h5>{post.Introduction}</h5>
                    </Col>
                  </Row>
                  <hr />
                  <Row className="justify-content-center">
                    <Col lg="9">
                      <div className='post-content' dangerouslySetInnerHTML={{ __html: post.Content}}/>
                    </Col>
                  </Row>
                </div>
                {
                  sugestedPosts.length > 0 && (
                    <div className="py-5 border-top suggestions">
                      <div className='text-center'>
                        <h4>Vê também estas publicações</h4>  
                      </div>
                      <Row className="justify-content-center">
                        <Col md="1" className="d-none d-md-block" />
                        { 
                          sugestedPosts && sugestedPosts.map(sug => {
                            return  <Col key={`sugestion-${sug.ID}`} md="4" >
                                      <Link className='post-image' to={`/post/${sug.Title.replace(/ +/g, '-')}`}>
                                        <img alt="..." src={sug.Image !== 'na' ? `${'https://api.simpliacoes.pt'}/${sug.Image}` : `https://api.simpliacoes.pt/public/default.jpg`} />
                                      </Link>
                                    </Col>
                          })
                        }
                        <Col md="1" className="d-none d-md-block" />
                      </Row>
                    </div>
                  )
                }
              </div>
            </Card>
          </Container>
        </section>
      </>
      <Modal centered isOpen={shareModal} toggle={() => setShareModal(!shareModal)} className="modal-share">
        <div className='modal-header'>
          <span className='title'>
            Compartilhar em 
          </span>
          <Link className='close' onClick={() => setShareModal(!shareModal)}>
            <IoCloseCircle />
          </Link>                  
        </div>
        <ModalBody>
          <Link to={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target='_blank' onClick={() => setShareModal(!shareModal)}> 
            <IoLogoFacebook className='facebook' />
          </Link>
          <Link to={`https://api.whatsapp.com/send?text=${window.location.href}`} target='_blank' onClick={() => setShareModal(!shareModal)}> 
            <IoLogoWhatsapp className='whatsapp' />
          </Link>
          <Link to={`https://twitter.com/intent/tweet?url=${window.location.href}`} target='_blank' onClick={() => setShareModal(!shareModal)}> 
            <IoLogoTwitter className='twitter' />
          </Link>
          <Link to={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target='_blank' onClick={() => setShareModal(!shareModal)}> 
            <IoLogoLinkedin className='linkedin' />
          </Link>
        </ModalBody>
      </Modal>
    </Page>
  );
};

export default Post;
