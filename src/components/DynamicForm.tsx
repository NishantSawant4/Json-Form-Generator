import React, { useState } from "react";
import JSONEditor from "./JSONEditor";
import FormPreview from "./FormPreview";

const DynamicForm: React.FC = () => {
  const [jsonSchema, setJsonSchema] = useState<string>("{}");
  const [parsedSchema, setParsedSchema] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  const handleJSONChange = (value: string) => {
    setJsonSchema(value);
    try {
      const parsed = JSON.parse(value);
      setParsedSchema(parsed);
      setError(null);
    } catch {
      setError("Invalid JSON format");
    }
  };

  const handleSubmit = (data: any) => {
    console.log("Submitted Data:", data);
    alert("Form submitted successfully!");
  };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1">
      <JSONEditor value={jsonSchema} onChange={handleJSONChange} error={error} />
      <FormPreview schema={parsedSchema} onSubmit={handleSubmit} />
    </div>
  );
};

export default DynamicForm;
