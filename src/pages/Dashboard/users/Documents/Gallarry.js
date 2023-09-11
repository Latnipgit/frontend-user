import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const FileGallery = () => {
  const [files, setFiles] = useState([]);
  const [showGallery, setShowGallery] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // You can specify the allowed file types here
  });

  const openGallery = () => {
    setShowGallery(true);
  };

  const closeGallery = () => {
    setShowGallery(false);
  };

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag &amp; drop some files here, or click to select files</p>
      </div>
      <button onClick={openGallery}>Show Gallery</button>
      {showGallery && (
        <div className="gallery-container">
          <button onClick={closeGallery}>Close Gallery</button>
          <Gallery items={files} />
        </div>
      )}
    </div>
  );
};

export default FileGallery;