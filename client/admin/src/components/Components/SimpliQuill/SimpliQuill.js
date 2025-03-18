import React, { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Input } from 'reactstrap';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles

const SimpliQuill = ({ handleEditorChange, value = '' }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const toolbar = quill.getModule('toolbar');
      const colorInput = document.getElementById('exampleColor');

      toolbar.addHandler('color', () => {
        colorInput.click();
        const selectedColor = colorInput.value;
        quill.format('color', selectedColor);
      });

      const colorInputChangeHandler = () => {
        const selectedColor = colorInput.value;
        quill.format('color', selectedColor);
      };

      colorInput.addEventListener('input', colorInputChangeHandler);
      return () => {
        colorInput.removeEventListener('input', colorInputChangeHandler);
      };
    }
  }, [quillRef]);

  const modules = {
    syntax: false,
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['color', { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['blockquote', 'code-block'],
        ['clean'],
      ],
    },
  };

  return (
    <div className='simpliquill'>
      <div className='ql-color-picker-parent'>
        <Input
          id="exampleColor"
          className='quill-color-picker'
          name="color"
          placeholder="color placeholder"
          type="color"
        />
      </div>
      <ReactQuill
        ref={quillRef}
        id="input-content"
        modules={modules}
        formats={modules}
        theme="snow"
        onChange={handleEditorChange}
        value={value}
      />
    </div>
  );
};

export { SimpliQuill };
