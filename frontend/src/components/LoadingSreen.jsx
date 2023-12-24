function LoadingScreen() {
  return (
    <div className="fixed inset-0 w-full h-full z-50 flex justify-center items-center bg-yellow-100">
      <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-yellow-300"/>
    </div>
  );
}

export default LoadingScreen;