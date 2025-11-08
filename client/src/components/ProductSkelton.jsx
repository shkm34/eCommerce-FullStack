const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-64 bg-gray-300"></div>

      {/* Content Skeleton */}
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>

        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-300 rounded w-24"></div>
          <div className="h-10 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
