const FormField = ({ fields, formData, onChange }) => {
    return (
      <>
        {fields.map((field, index) => (
          <div key={index} className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            {field.type === 'select' ? (
                        <select
                            name={field.name}
                            value={formData[field.name]}
                            onChange={onChange}
                            required={field.required}
                            className="w-full border py-2 px-2 rounded-lg mt-1 border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        >
                            <option value="">{field.placeholder}</option>
                            {field.options.map((option, idx) => (
                                <option key={idx} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={onChange}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="w-full border py-2 px-2 rounded-lg mt-1 border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                    )}
          </div>
        ))}
      </>
    );
  };
  
  export default FormField;
  