
export const Header = () => {
  const openDialog = () => {

  };
    return (
      <div className="flex">
        <h1 className="bg-gray-100 text-black font-bold py-2 px-4 rounded"
        >Flight Mission Control</h1>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ml-auto"
          onClick={openDialog}
        >
          Add Mission Control
        </button>

      </div>
    );
}