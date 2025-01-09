import { useState } from 'react';

const Background = () => {
  const [url, setUrl] = useState('');
  const [resultUrl, setResultUrl] = useState('');
  const [error, setError] = useState('');

  const BASEURL = import.meta.env.VITE_BASE_URL;

  const handleShortenUrl = async (event) => {
    event.preventDefault();
    if (!url.trim()) {
      setError('Please provide a valid URL to shorten.');
      return;
    }

    try {
      const response = await fetch(`${BASEURL}/api/url/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await response.json();
      setResultUrl(data.shortenedUrl);
      setError('');
    } catch (error) {
      setError(error.message || 'An unexpected error occurred.');
    }
  };

  const handleGetOriginalUrl = async () => {
    if (!url.trim()) {
      setError('Please provide a shortened URL to retrieve.');
      return;
    }

    try {
      const response = await fetch(`${BASEURL}/api/url/original?shortenedUrl=${encodeURIComponent(url)}`);

      if (!response.ok) {
        throw new Error('Failed to retrieve the original URL. Please try again later.');
      }

      const data = await response.json();
      setResultUrl(data.originalUrl);
      setError('');
    } catch (error) {
      setError(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen flex flex-col items-center text-gray-900 px-4">
      <header className="w-full py-4 bg-gray-100 text-center shadow-lg">
        <h1 className="text-4xl font-bold tracking-wide">
          <span className="text-red-500">Snip</span>
          <span className="text-black">Links</span>
        </h1>
      </header>

      <section className="max-w-4xl w-full mt-10">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Shorten or Retrieve Your Links
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Simplify your links or recover them with ease! No credit card required.
          </p>

          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-around w-full">
            <input
              type="url"
              placeholder="Enter your link here"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              className="w-full sm:w-3/4 text-black border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-red-500"
            />
            <button
              onClick={handleShortenUrl}
              className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 hover:shadow-lg transition-transform transform hover:scale-105 w-full sm:w-auto"
            >
              Shorten Link
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={handleGetOriginalUrl}
              className="bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-red-500 hover:text-white hover:shadow-lg transition-transform transform hover:scale-105"
            >
              Get Original Link
            </button>
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {resultUrl && (
            <div className="text-center mt-6">
              <p>
                Resulting Link:
                <a href={resultUrl} target="_blank" rel="noopener noreferrer" className="text-red-500 ml-2">
                  {resultUrl}
                </a>
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-4xl w-full mt-10 text-center">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Why Choose SnipLinks?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-200 rounded-lg shadow-lg p-6">
            <h4 className="text-xl font-bold text-red-500">Efficient</h4>
            <p className="text-gray-600 mt-2">
              Shorten your links quickly with just one click.
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg shadow-lg p-6">
            <h4 className="text-xl font-bold text-red-500">Secure</h4>
            <p className="text-gray-600 mt-2">
              Your links are private and encrypted for safety.
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg shadow-lg p-6">
            <h4 className="text-xl font-bold text-red-500">Recoverable</h4>
            <p className="text-gray-600 mt-2">
              Easily retrieve original links with minimal effort.
            </p>
          </div>
        </div>
      </section>

      <footer className="w-full mt-10 py-6 bg-gray-100 text-center">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} SnipLinks. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Background;