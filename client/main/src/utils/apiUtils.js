export const checkOnlineStatus = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/`);

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
