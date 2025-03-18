const checkOnlineStatus = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`);

    if (!response.ok) {
      // Handle non-successful response (e.g., 404 Not Found, 500 Internal Server Error)
      console.error(`Request failed with status: ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    // Handle network errors or other exceptions
    console.error('Error during fetch:', error);
    return false;
  }
};

// ? Posts

const getAllPosts = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`);

    if (!response.ok) {
      console.error(`Request failed with status: ${response.status}`);
      return false;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error retrieving all posts: ', error);
    return false;
  }
};

const getPost = async (ID) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/post/${ID}`);

    if (!response.ok) {
      console.error(`Request failed with status: ${response.status}`);
      return false;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error retrieving all posts: ', error);
    return false;
  }
};

const deletePost = async (ID) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${ID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response2 = await fetch(`${process.env.REACT_APP_API_URL}/images/image/${ID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok || !response2.ok) {
      console.error(`Request failed with status: ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting post: ', error);
    return false;
  }
};

const updatePost = async (postInfo) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postInfo),
    });
    
    if (!response.ok) {
      console.error(`Request failed with status: ${response}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating post: ', error);
    return false;
  }
}

const addPost = async (postInfo, image = null) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/add`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postInfo),
    });
    
    if (image !== null) {
      const responseData = await response.json();
      updateImage(responseData.postId, image);
    }

    if (!response.ok) {
      console.error(`Request failed with status: ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating post: ', error);
    return false;
  }
}

const uploadImageToAPI = async (base64Image) => {
  try {
    const base64Data = base64Image.split(',')[1];

    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new Blob([byteArray], { type: 'image/png' }); 
    const fileName = `image_${Date.now()}.png`; 

    const formData = new FormData();
    formData.append('image', file, fileName);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/images/contentImage`, {
      method: 'POST',
      body: formData,
    });

    await response.json();
    if (response.status === 200) 
      return fileName; 
    throw new Error();
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

// ? Topics

const getTopics = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/topics`);

    if (!response.ok) {
      console.error(`Request failed with status: ${response.status}`);
      return false;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error retrieving all posts: ', error);
    return false;
  }
};

const getTopic = async (ID) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/topics/${ID}`);

    if (!response.ok) {
      console.error(`Request failed with status: ${response.status}`);
      return false;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error retrieving all posts: ', error);
    return false;
  }
}

const getPostTopics = async (ID) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/topics/postTopics/${ID}`);

    if (!response.ok) {
      console.error(`Request failed with status: ${response.status}`);
      return false;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error retrieving all posts: ', error);
    return false;
  }
}

const deleteTopic = async (ID) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/topics/${ID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Request failed with status: ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting post: ', error);
    return false;
  }
};

const addTopic = async (topicInfo, file) => {
  try {
    const formData = new FormData();
    formData.append('Name', topicInfo.Name);
    if (file) {
      formData.append('image', file);
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/topics/add`, {
      method: 'POST', 
      body: formData,
    });


    if (!response.ok) {
      console.error(`Request failed with status: ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating topic: ', error);
    return false;
  }
};

const updateTopic = async (topicInfo, file) => {
  try {
    console.log(topicInfo);
    const formData = new FormData();
    formData.append('Name', topicInfo.Name);
    formData.append('ID', topicInfo.ID);
    if (file) {
      formData.append('image', file);
    }
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/topics/update`, {
      method: 'POST', 
      body: formData,
    });
    
    if (!response.ok) {
      console.error(`Request failed with status: ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating post: ', error);
    return false;
  }
}


// ? Imagens

const updateImage = async (ID, image) => {
  try {
    const formData = new FormData();
    formData.append('ID', ID);
    formData.append('image', image);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/images/update`, {
      method: 'POST',
      body: formData,
    });

    console.log("a");

    if (!response.ok) {
      console.error(`Request failed with status: ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating image: ', error);
    return false;
  }
}

const addImage = async (image) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/images/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(image),
    });
    
    if (!response.ok) {
      console.error(`Request failed with status: ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating image: ', error);
    return false;
  }
}

const getImage = async (ID) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/images/image/${ID}`);

    if (!response.ok) {
      console.error(`Request failed with status: ${response.status}`);
      return false;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error retrieving image of ID: ', error);
    return false;
  }
}

const addInstaImage = async (iPost) => {
  try {
    const formData = new FormData();
    formData.append('image', iPost.Image);
    formData.append('link',iPost.Link);
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/images/instagram`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      console.error(`Request failed with status: ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating image: ', error);
    return false;
  }
}

// ? Analytics

const getUsersperDay = async (daysAgo) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/metrics/usersPerDay/${daysAgo}`);
  if (!response.ok) 
    console.error(`Analytics request 'getUsersperDay' failed with status: ${response.status}`);
  return await response.json();
}

const getUsersperMonth = async (monthsAgo) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/metrics/usersPerMonth/${monthsAgo}`);
  if (!response.ok) 
    console.error(`Analytics request 'getUsersperMonth' failed with status: ${response.status}`);
  return await response.json();
}

const getActiveUsersperMonth = async (monthsAgo) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/metrics/usersPerMonth/${monthsAgo}`);
  if (!response.ok) 
    console.error(`Analytics request 'getActiveUsersperMonth' failed with status: ${response.status}`);
  return await response.json();
}

const getNewUsersperMonth = async (monthsAgo) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/metrics/newUsersPerMonth/${monthsAgo}`);
  if (!response.ok) 
    console.error(`Analytics request 'getNewUsersperMonth' failed with status: ${response.status}`);
  return await response.json();
}

const getSessions = async (range) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/metrics/sessions/${range}`);
  if (!response.ok) 
    console.error(`Analytics request 'getNewUsersperMonth' failed with status: ${response.status}`);
  return await response.json();
}

const getfUPCG = async (range) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/metrics/firstUserPrimaryGroupChannel/${range}`);
  if (!response.ok) 
    console.error(`Analytics request 'getfUPCG' failed with status: ${response.status} ${response.json()}`);
  return await response.json();
}

const getScreensAndPages = async (range) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/metrics/screensAndPages/${range}`);
  if (!response.ok) 
    console.error(`Analytics request 'getScreensAndPages' failed with status: ${response.status} ${response.json()}`);
  return await response.json();
}

const getPageViews = async (range) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/metrics/pageViews/${range}`);
  if (!response.ok) 
    console.error(`Analytics request 'getPageViews' failed with status: ${response.status} ${response.json()}`);
  return await response.json();
}

const getUserActivity = async (range) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/metrics/userActivity/${range}`);
  if (!response.ok) 
    console.error(`Analytics request 'getUserActivity' failed with status: ${response.status} ${response.json()}`);
  return await response.json();
}
export { 
  //misc
  checkOnlineStatus, 
  //posts
  getAllPosts, 
  getPost, 
  addPost,
  deletePost, 
  updatePost,
  uploadImageToAPI,
  //topics 
  getTopics,
  getTopic,
  getPostTopics,
  deleteTopic,
  updateTopic,
  addTopic,
  updateImage,
  //images
  addImage,
  getImage,
  addInstaImage,
  //analytics
  getUsersperDay,
  getUsersperMonth,
  getActiveUsersperMonth,
  getNewUsersperMonth,
  getSessions,
  getfUPCG,
  getScreensAndPages,
  getPageViews,
  getUserActivity,
};