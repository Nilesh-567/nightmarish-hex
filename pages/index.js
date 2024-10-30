import { useState, useEffect } from 'react';

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [number, setNumber] = useState('');
  const [storeStatus, setStoreStatus] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Check MongoDB connection status on component mount
    const checkConnection = async () => {
      try {
        const response = await fetch('/api/connect');
        const data = await response.json();
        setConnectionStatus(data.status);
      } catch (error) {
        console.error('Error checking MongoDB connection:', error);
        setConnectionStatus('fail');
      }
    };

    checkConnection();
  }, []);

  // Function to calculate factorial
  const calculateFactorial = (num) => {
    if (num < 0) return 'Factorial of negative numbers is undefined';
    let factorial = 1;
    for (let i = 1; i <= num; i++) {
      factorial *= i;
    }
    return factorial;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const num = parseInt(number, 10);

    try {
      const response = await fetch('/api/storeNumber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: num }),
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        setStoreStatus('Number stored successfully');
        setResult(calculateFactorial(num));
      } else {
        setStoreStatus('Failed to store the number');
      }
    } catch (error) {
      console.error('Error storing number:', error);
      setStoreStatus('Failed to store the number');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full text-center">
        {connectionStatus === null ? (
          <p className="text-gray-700">Connecting to MongoDB...</p>
        ) : connectionStatus === 'success' ? (
          <>
            <h2 className="text-green-600 text-2xl font-semibold mb-4">
              Connected to MongoDB successfully!
            </h2>
            <h1 className="text-3xl font-bold text-gray-800 mb-5">
              Factorial Calculator
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter a number"
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300"
              >
                Calculate Factorial
              </button>
            </form>
            {storeStatus && (
              <p className="mt-4 text-green-600 font-semibold">{storeStatus}</p>
            )}
            {result !== null && (
              <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
                <h2 className="text-xl font-semibold text-gray-800">
                  Result: <span className="text-indigo-600">{result}</span>
                </h2>
              </div>
            )}
          </>
        ) : (
          <h2 className="text-red-600 text-2xl font-semibold">
            Failed to connect to MongoDB
          </h2>
        )}
      </div>
    </div>
  );
}
