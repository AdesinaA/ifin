export default function TreeSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="h-10 bg-gray-200 rounded-md animate-pulse flex-1"></div>
        <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      <div className="bg-backgroundPrimary rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="w-4 h-4 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              </div>
              <div className="w-24 h-6 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
