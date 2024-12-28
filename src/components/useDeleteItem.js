import { toast } from "react-toastify";

const useDeleteItem = () => {
  const deleteItem = (items, setItems, id, key, successMessage) => {
    // Filter out the deleted item
    const updatedItems = items.filter((item) => item.id !== id);

    // Update state and local storage
    setItems(updatedItems);
    if (key) {
      localStorage.setItem(key, JSON.stringify(updatedItems));
    }

    // Show a toast notification
    toast.success(successMessage);

    return updatedItems; 
  };

  return deleteItem;
};

export default useDeleteItem;
