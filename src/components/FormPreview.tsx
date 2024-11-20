import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface FormPreviewProps {
  schema: any;
  onSubmit: (data: any) => void;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema, onSubmit }) => {
  // Make sure `fields` is always an array
  const fields = schema.fields || [];

  const validationSchema = z.object(
    fields.reduce((acc: any, field: any) => {
      if (field.required) acc[field.id] = z.string().nonempty(`${field.label} is required`);
      return acc;
    }, {})
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{schema.formTitle || "Dynamic Form"}</h2>
      <p className="mb-4">{schema.formDescription || "Please fill out the form below:"}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields?.map((field: any) => (
          <div key={field.id} className="mb-4">
            <label className="block mb-1 font-semibold">{field.label}</label>
            <Controller
              name={field.id}
              control={control}
              render={({ field: controllerField }) => {
                switch (field.type) {
                  case "text":
                  case "email":
                    return (
                      <input
                        type={field.type}
                        {...controllerField}
                        placeholder={field.placeholder}
                        className="w-full border p-2"
                      />
                    );
                  case "select":
                    return (
                      <select {...controllerField} className="w-full border p-2">
                        {field.options?.map((option: any) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    );
                  case "textarea":
                    return (
                      <textarea
                        {...controllerField}
                        placeholder={field.placeholder}
                        className="w-full border p-2"
                      />
                    );
                  default:
                    return <span>Unsupported field type</span>;
                }
              }}
            />
            {/* Ensure the error message is rendered as a string */}
            {errors[field.id]?.message && (
              <p className="text-red-500 text-sm">{errors[field.id]?.message as string}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPreview;



