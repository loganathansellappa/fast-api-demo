export const Error = () => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
      <button onClick={reloadPage} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
        Reload Page
      </button>
    </div>
  );
};
