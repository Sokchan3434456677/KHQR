import { useState, useEffect } from 'react';

function App() {
  const [invoices, setInvoices] = useState(null);
  const [error, setError] = useState(null);

  const fetchInvoices = async () => {
    try {
      // Assuming invoices.json is served from a local server (see below)
      const response = await fetch('http://localhost:3001/invoices.json');
      const data = await response.json();
      setInvoices(data);
      setError(null);
    } catch (err) {
      setError('Failed to load invoices');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvoices();
    const intervalId = setInterval(fetchInvoices, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Invoices</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : invoices ? (
        <pre>{JSON.stringify(invoices, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
      <p>Last refreshed: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

export default App;