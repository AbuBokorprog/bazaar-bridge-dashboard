import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [
      'font',
      'bold',
      'italic',
      'underline',
      'strike',
      'background',
      'color',
      'align',
      'intend',
      'direction',
      'code-block',
      'code',
      'blockquote',
    ], // Text styling
    [{ list: 'ordered' }, { list: 'bullet' }], // Lists
    ['link', 'image', 'video'], // Media
    ['clean'], // Remove formatting
  ],
};

const formats = [
  'header',
  'background',
  'bold',
  'color',
  'font',
  'code',
  'italic',
  'align',
  'direction',
  'code-block',
  'underline',
  'strike',
  'list',
  'indent',
  'blockquote',
  'bullet',
  'link',
  'image',
  'video',
];

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="h-[300px]"
        placeholder="Write something amazing..."
      />
    </div>
  );
};

export default RichTextEditor;
