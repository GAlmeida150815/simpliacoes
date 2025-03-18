import { uploadImageToAPI } from "./apiUtils";

function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

const formatDate = (dateString) => {
  // Parse the SQL DATETIME string into a JavaScript Date object
  const date = new Date(dateString);
  console.log(date);

  // Check if the date is valid
  if (isNaN(date)) {
      return 'Nunca';
  }

  // Formatting options
  const options = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // 24-hour format
      timeZone: 'WET', // You can adjust the time zone if necessary
  };

  // Format the date
  const formattedDate = new Intl.DateTimeFormat('pt-PT', options).format(date);
  console.log(formattedDate);

  // Return the formatted date without the comma
  return formattedDate.replace(',', ''); 
};

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = minutes.toLocaleString('pt-PT', { minimumIntegerDigits: 2 });
  const formattedSeconds = seconds.toLocaleString('pt-PT', { minimumIntegerDigits: 2 });

  return `${formattedMinutes}:${formattedSeconds}`;
};


const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const handleImagesInContent = async (contentHtml, title) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = contentHtml;

  const images = tempDiv.querySelectorAll('img');
  
  for (let img of images) {
    const base64Image = img.src;

    if (base64Image.startsWith('data:image')) {
      const imageUploadResult = await uploadImageToAPI(base64Image);

      img.src = `https://api.simpliacoes.pt/public/posts/${imageUploadResult}`;
    }
  }

  return tempDiv.innerHTML;
};

export { isNumber, formatDate, formatTime, delay, handleImagesInContent};