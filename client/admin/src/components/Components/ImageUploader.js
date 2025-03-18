import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

const ImageUploader = ({ post, onImageSelect }) => {
    const [imagePreview, setImagePreview] = useState(`${process.env.REACT_APP_API_URL}/public/default.jpg`);

    const handleImageClick = () => {
      document.getElementById('fileInput').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            onImageSelect(file); 
        }
    };

    useEffect(() => {
      setImagePreview(
        post.Image && post.Image !== 'na'
            ? `${process.env.REACT_APP_API_URL}/${post.Image}`
            : `${process.env.REACT_APP_API_URL}/public/default.jpg`);
    }, [post]);

    return (
        <div>
            <Link onClick={handleImageClick}>
                <img
                    alt="Selected"
                    src={imagePreview}
                    style={{ cursor: 'pointer' }}
                />
            </Link>
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </div>
    );
};

export default ImageUploader;
