export default function Weather() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md text-center">
      <h1 className="text-2xl font-bold text-gray-800">City Name</h1>
      <div className="h-px bg-gray-200 my-4"></div>
      <p className="text-lg text-gray-600">Temperature: 25°C</p>
      <p className="text-lg text-gray-600">Feels Like: 27°C</p>
      <p className="text-lg text-gray-600">Humidity: 60%</p>
      <p className="text-sm text-gray-500">Last Updated: 2024-12-04 12:00</p>
    </div>
  );
}
