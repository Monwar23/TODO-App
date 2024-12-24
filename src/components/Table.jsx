
const Table = ({ columns, data, renderActions }) => {
  return (
    <table className="table-auto border-collapse mt-4 w-2/3 mx-auto">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              className="border px-4 py-2 text-orange-500"
            >
              {column.header}
            </th>
          ))}
          {renderActions && (
            <th className="border px-4 py-2 text-orange-500">Action</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                className="border px-4 py-2 text-center"
              >
                {column.accessor(item)}
              </td>
            ))}
            {renderActions && (
              <td className="border px-4 py-2">
                <div className="flex justify-center items-center ">
                  {renderActions(item)}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
