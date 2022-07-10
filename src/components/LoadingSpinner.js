const LoadingSpinner = () => {
  return (
    <div className="spinner-container fixed w-full h-full top-0 left-0">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="loading-spinner"></div>
      </div>
    </div>
  )
}

export default LoadingSpinner