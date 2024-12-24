const FormField = ({ fields, formData, onChange }) => {
    return (
      <>
        {fields.map((field, index) => (
          <div key={index} className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={onChange}
              placeholder={field.placeholder}
              required={field.required}
              className="border py-2 px-2 rounded-lg mt-1 border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none w-full"
            />
          </div>
        ))}
      </>
    );
  };
  
  export default FormField;
  