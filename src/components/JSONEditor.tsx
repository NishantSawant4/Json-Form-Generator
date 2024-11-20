import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface JSONEditorProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ value, onChange, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="p-4 border-r border-gray-300">
      <h2 className="text-xl font-bold mb-2">JSON Editor</h2>
      <textarea
        value={value}
        onChange={handleChange}
        className="w-full h-96 border p-2"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <SyntaxHighlighter language="json" style={materialDark}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default JSONEditor;
