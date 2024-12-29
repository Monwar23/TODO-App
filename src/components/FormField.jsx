import { useEffect, useState } from "react";

const FormField = ({ fields, onSubmit, initialValues = {} }) => {

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = initialValues[field.name] || ''
      return acc;
    }, {})
  );

  useEffect(() => {
    setFormData(() =>
      fields.reduce((acc, field) => {
        acc[field.name] = initialValues[field.name] || '';
        return acc;
      }, {})
    );
  }, [initialValues, fields]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };


  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index} className="mt-5">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          {field.type === 'select' ? (
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
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
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full border py-2 px-2 rounded-lg mt-1 border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          )}
        </div>
      ))}
      <button type="submit" className="btn border font-medium py-2 px-2 mt-5 rounded-lg hover:border-orange-500 hover:bg-white bg-orange-500 text-white hover:text-orange-500 w-full">
        Submit
      </button>
    </form>
  );
};

export default FormField;
