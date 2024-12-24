
const NoData = () => {
    return (
        <div className="flex items-center justify-center " style={{ minHeight: "calc(100vh - 155px)" }}>
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-center mt-4 text-gray-500">No tasks found.</p>
        </div>
    </div>
    );
};

export default NoData;