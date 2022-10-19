import "../App.css";

const List = ({ data, handleEdit, handleDelete }) => {
  const handleLength = () => {
    if (data.length === 0) {
      return (
        <div>
          <h1 className="font-medium text-center text-lg">Empty...</h1>
        </div>
      );
    }
  };
  return (
    <section className="mt-4">
      <h1 className="text-center font-semibold text-xl mb-2">Contact Lists</h1>
      <section>
        {handleLength()}
        {data.map((contact, i) => {
          return (
            <div className="flex justify-center items-center mb-2">
            <h1>{i + 1 + "."}</h1>
              <div className="flex flex-col w-full ">
                <h1 className="font-semibold ml-2">{contact.name}</h1>
                <h1 className="ml-2">{contact.telp}</h1>
              </div>
              <div className="flex gap-3">
                <button 
                onClick={() => handleEdit(contact.id)} 
                className="bg-blue-500 hover:bg-blue-600 transition-all text-sm px-3 py-1 rounded-md font-medium text-white">
                  Edit
                </button>
                <button 
                onClick={() => handleDelete(contact.id)} 
                className="bg-red-500 hover:bg-red-600 transition-all text-sm px-3 py-1 rounded-md font-medium text-white">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </section>
  );
};

export default List;
