import './App.css';

function App() {
  return (
    <div className="App">
      <div className="col-span-3 sm:col-span-2">
        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
          Website
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
            http://
          </span>
          <input
            type="text"
            name="company-website"
            id="company-website"
            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="www.example.com"
          />
        </div>
      </div>
    </div>
  );
}

export default App;