// Importing necessary React hooks and components
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';

// Importing components from Reactstrap library
import {
  Spinner,
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  Form,
  FormGroup
} from 'reactstrap';

// Importing icons from React Icons
import { FaShare } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { IoLogoFacebook, IoLogoLinkedin, IoLogoTwitter, IoLogoWhatsapp, IoCloseCircle, IoCalendarSharp, IoClose, IoBrushSharp } from 'react-icons/io5';

// Importing custom components
import CustomCheckbox from 'components/CustomCheckbox';
import Page from 'views/Page';

// Configuration and utility modules
import { formatDate } from 'utils/helperFunctions';

// Configuration and utility modules
import * as config from 'config.js';

const Blog = () => {
    // General states
  const [dataFetched, setDataFetched] = useState(false);

  // Page-specific states
  const [shareModal, setShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');      
  const [posts, setPosts] = useState([]);             
  const [topics, setTopics] = useState();             
  const [checkedTopics, setCheckedTopics] = useState([]); 

  // State management for page behavior
  const [isResetting, setIsResetting] = useState(false);   

  // Pagination states
  const [page, setPage] = useState(1);       
  const [hasMore, setHasMore] = useState(true); 

  // Ref for tracking initial render
  const isFirstRender = useRef(true);

  const fetchData = async () => {
    try {
        await fetchTopics();
        await fetchMorePosts(1);
        setDataFetched(true);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {

    fetchData();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const resetAndFetchPosts = async () => {
      setIsResetting(true);  
      setPosts([]);      
      setPage(1);          
      setHasMore(true);   
      await fetchMorePosts(1);  
      setIsResetting(false);  
    };
  
    resetAndFetchPosts();
  }, [checkedTopics]); 
  
  useEffect(() => {
    const fetchPosts = async () => {
      if (!isResetting && page > 1) {
        await fetchMorePosts(page);
      }
    }

    fetchPosts();
  }, [page, isResetting]);
  
  const fetchMorePosts = async (pageNumber = page) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/searchPosts/${2}/${pageNumber}/${checkedTopics.join(',')}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const newPosts = await response.json();
  
      for (let post of newPosts) {
        try {
          const topicsResponse = await fetch(`${process.env.REACT_APP_API_URL}/topics/postTopics/${post.ID}`);
          if (!topicsResponse.ok) {
            throw new Error('Network response was not ok');
          }
  
          const postTopics = await topicsResponse.json();
          const topicIDs = postTopics.map(topic => topic.ID);
          post.topics = topicIDs;
        } catch (error) {
          console.error('Error fetching post topics:', error);
        }
      }
  
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
  
      if (newPosts.length === 0) {
        setHasMore(false); 
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };    

  const fetchTopics = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/topics`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonTopics = await response.json();
      
      setTopics(jsonTopics);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const handleCheckboxChange = (topicID, isChecked) => {
    if (isChecked) {
      setCheckedTopics([...checkedTopics, topicID]);
    } else {
      setCheckedTopics(checkedTopics.filter(id => id !== topicID));
    }
  };

  const toggleShareModal = (link) => {
    setShareLink(link);
    setShareModal(!shareModal);
  };

  return (
    <Page dataFetched={dataFetched}>
      <div className='position-relative divider-wavy'>
        <section className='section section-md section-shaped'>
          <div className="shape shape-style-1 blog-background" />
          <Container className="py-lg-md pb-5 d-flex">
            <div className="col px-0">
              <Row>
                <Col lg="12">
                  <div className="text-center">
                    <h3 className="display-3 text-white">
                      Blog
                    </h3>
                    <p className="text-justify text-white" dangerouslySetInnerHTML={{ __html: config.blogDesc.replace(/\n/g, '<br />')}}/>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </div>
      <section className="section section-shaped section-lg section-blog">
        <Row fluid="true" className="bg-white m-0 ">
          <Col md="10" className='order-2 order-md-1'>
            <Container fluid="true">
              <InfiniteScroll 
                dataLength={posts.length}
                next={() => setPage(prevPage => prevPage + 1)}
                hasMore={hasMore}
                loader={<Spinner  />}
                endMessage={<p style={{ textAlign: 'center' }}>Não existem mais posts para ver! Aguarda por mais...</p>}
                style={{ overflow: 'hidden' }}
              >
                {posts.map((post) => (
                  <div key={`post${post.ID}`} className="post">
                    <Link to={`/post/${post.Title.replace(/ +/g, '-')}`}>
                      <img alt="..." src={post.Image !== 'na' ? `${'https://api.simpliacoes.pt'}/${post.Image}` : `https://api.simpliacoes.pt/public/default.jpg`} />
                    </Link>
                    <Row className='under-img'>
                      <div className='socials'>
                        <Link className='d-none like' onClick={"like"}>
                          <GoHeart />
                        </Link>
                        <Link className='share' onClick={() => toggleShareModal(`https://simpliacoes.pt/post/${post.Title}`)}>
                          <FaShare />
                        </Link>
                      </div>
                      <p className='date'><IoCalendarSharp />{" "}{formatDate(post.Creation)}</p>
                      {
                        post.LastUpdate !== "0000-00-00 00:00:00" &&
                        <p className='date ml-1'><IoBrushSharp />{" "}{formatDate(post.LastUpdate)}</p> 
                      }
                    </Row>
                    <Link to={`/post/${post.Title.replace(/ +/g, '-')}`}>
                      <h2 className='title'>{post.Title}</h2>
                    </Link>
                    <Row className='post-topics m-0'>
                      {
                        post.topics.map((ID) => (
                          <svg key={`topic${ID}-post${post.ID}`} className="checkbox-svg mx-1" width="24px" height="24px" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <image 
                              width="100%" 
                              height="100%" 
                              href={`${process.env.REACT_APP_API_URL}/public/topics/${ID}.svg`} 
                            />
                          </svg>
                        ))
                      }
                    </Row>
                    <p>{post.Introduction}<Link to={`/post/${post.Title.replace(/ +/g, '-')}`} className='readmore'> ler mais...</Link></p>
                    <div className='divider'/>
                  </div>
                ))}
              </InfiniteScroll>
            </Container>
          </Col>
          <Col md="2" className='order-1 order-md-2'>
            <div
              className='filters'
            >
              <div className="categories">
                <Row fluid="true" className='justify-content-center'>
                  <h3>Tópicos:</h3>
                </Row>
                <Row fluid="true" className='justify-content-center'>
                  <Link className='topics-clear font-weight-bold' onClick={() => {setCheckedTopics([])}}>
                    <IoClose /> Limpar
                  </Link>
                </Row>
                <Form>
                  <FormGroup className='topic-group'>
                    {topics && topics.map((topic) => (
                      <CustomCheckbox 
                        key={topic.ID} 
                        topic={topic}   
                        isChecked={checkedTopics.includes(topic.ID)}
                        onCheckboxChange={handleCheckboxChange}
                      />
                    ))}
                  </FormGroup>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </section>
      <Modal centered isOpen={shareModal} toggle={toggleShareModal} className="modal-share">
        <div className='modal-header'>
          <span className='title'>
            Compartilhar em 
          </span>
          <Link className='close' onClick={() => toggleShareModal('')}>
            <IoCloseCircle />
          </Link>                  
        </div>
        <ModalBody>
          <Link to={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`} target='_blank' onClick={() => toggleShareModal(shareLink)}> 
            <IoLogoFacebook className='facebook' />
          </Link>
          <Link to={`https://api.whatsapp.com/send?text=${shareLink}`} target='_blank' onClick={() => toggleShareModal(shareLink)}> 
            <IoLogoWhatsapp className='whatsapp' />
          </Link>
          <Link to={`https://twitter.com/intent/tweet?url=${shareLink}`} target='_blank' onClick={() => toggleShareModal(shareLink)}> 
            <IoLogoTwitter className='twitter' />
          </Link>
          <Link to={`https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`} target='_blank' onClick={() => toggleShareModal(shareLink)}> 
            <IoLogoLinkedin className='linkedin' />
          </Link>
        </ModalBody>
      </Modal>
    </Page>
  );
};

export default Blog;
