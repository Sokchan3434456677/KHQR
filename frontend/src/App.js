


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import QRCode from 'react-qr-code';

// function App() {
//   const [qrData, setQrData] = useState(null);
//   const [txnId, setTxnId] = useState('');
//   const [status, setStatus] = useState('UNPAID');
//   const [loading, setLoading] = useState(false);
//   const [checkingStatus, setCheckingStatus] = useState(false);

//   // Initialize Transaction
//   const handleInitTransaction = async () => {
//     setLoading(true);
//     try {
//       await axios.get('http://localhost:5000/api/generate-token');
//       const response = await axios.post('http://localhost:5000/api/init-transaction');
//       const { data } = response.data;
//       setQrData(data.qr);
//       setTxnId(data.txn_id);
//       setStatus('UNPAID');
//     } catch (error) {
//       console.error('Error initializing transaction:', error);
//       alert('Failed to initialize transaction');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Check Transaction Status
//   const checkStatus = async () => {
//     if (!txnId || status === 'PAID') return;

//     setCheckingStatus(true);
//     try {
//       const response = await axios.post('http://localhost:5000/api/check-transaction', { txn_id: txnId });
//       const { data } = response.data;
//       setStatus(data.txn_status);

//       if (data.txn_status === 'PAID') {
//         alert('Payment successful!');
//       }
//     } catch (error) {
//       console.error('Error checking status:', error);
//     } finally {
//       setCheckingStatus(false);
//     }
//   };

//   // Poll Transaction Status
//   useEffect(() => {
//     if (!txnId || status === 'PAID') return;

//     const interval = setInterval(() => {
//       checkStatus();
//     }, 10000); // Increased to 10s to reduce load; adjust as needed

//     return () => clearInterval(interval); // Cleanup on unmount or status change
//   }, [txnId, status]);

//   return (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <h1>KHQR Payment Demo</h1>

//       <button
//         onClick={handleInitTransaction}
//         disabled={loading}
//         style={{ padding: '10px 20px', marginBottom: '20px' }}
//       >
//         {loading ? 'Generating...' : 'Generate Payment QR'}
//       </button>

//       {qrData && status !== 'PAID' && (
//         <div>
//           <h3>Scan to Pay</h3>
//           <QRCode value={qrData} size={256} />
//           <p>Transaction ID: {txnId}</p>
//           <p>Status: {checkingStatus ? 'Checking...' : status}</p>
//           <button
//             onClick={checkStatus}
//             disabled={checkingStatus}
//             style={{ padding: '5px 10px', marginTop: '10px' }}
//           >
//             {checkingStatus ? 'Checking...' : 'Check Status Manually'}
//           </button>
//         </div>
//       )}

//       {status === 'PAID' && (
//         <div>
//           <h2>Thank You!</h2>
//           <p>Your payment (Transaction ID: {txnId}) was successful.</p>
//           <button
//             onClick={() => {
//               setQrData(null);
//               setTxnId('');
//               setStatus('UNPAID');
//             }}
//             style={{ padding: '10px 20px', marginTop: '20px' }}
//           >
//             Start New Payment
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';

function App() {
  const [qrData, setQrData] = useState(null);
  const [txnId, setTxnId] = useState('');
  const [status, setStatus] = useState('UNPAID');
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);

  // Initialize Transaction
  const handleInitTransaction = async () => {
    setLoading(true);
    try {
      await axios.get('http://localhost:5000/api/generate-token');
      const response = await axios.post('http://localhost:5000/api/init-transaction');
      const { data } = response.data;
      setQrData(data.qr);
      setTxnId(data.txn_id);
      setStatus('UNPAID');
    } catch (error) {
      console.error('Error initializing transaction:', error);
      alert('Failed to initialize transaction');
    } finally {
      setLoading(false);
    }
  };

  // Check Transaction Status
  const checkStatus = async () => {
    if (!txnId || status === 'PAID') return;

    setCheckingStatus(true);
    try {
      const response = await axios.post('http://localhost:5000/api/check-transaction', { txn_id: txnId });
      const { data } = response.data;
      setStatus(data.txn_status);

      if (data.txn_status === 'PAID') {
        alert('Payment successful!');
      }
    } catch (error) {
      console.error('Error checking status:', error);
      alert('Failed to check transaction status. Please try again.');
    } finally {
      setCheckingStatus(false);
    }
  };

  // Poll Transaction Status
  useEffect(() => {
    if (!txnId || status === 'PAID') return;

    const interval = setInterval(() => {
      checkStatus();
    }, 10000); // Poll every 10s to reduce load

    return () => clearInterval(interval); // Cleanup on unmount or status change
  }, [txnId, status]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>KHQR Payment Demo</h1>

      <button
        onClick={handleInitTransaction}
        disabled={loading}
        style={{ padding: '10px 20px', marginBottom: '20px' }}
      >
        {loading ? 'Generating...' : 'Generate Payment QR'}
      </button>

      {qrData && status !== 'PAID' && (
        <div>
          <h3>Scan to Pay</h3>
          <QRCode value={qrData} size={256} />
          <p>Transaction ID: {txnId}</p>
          <p>Status: {checkingStatus ? 'Checking...' : status}</p>
          <button
            onClick={checkStatus}
            disabled={checkingStatus}
            style={{ padding: '5px 10px', marginTop: '10px' }}
          >
            {checkingStatus ? 'Checking...' : 'Check Status Manually'}
          </button>
        </div>
      )}

      {status === 'PAID' && (
        <div>
          <h2>Thank You!</h2>
          <p>Your payment (Transaction ID: {txnId}) was successful.</p>
          <button
            onClick={() => {
              setQrData(null);
              setTxnId('');
              setStatus('UNPAID');
            }}
            style={{ padding: '10px 20px', marginTop: '20px' }}
          >
            Start New Payment
          </button>
        </div>
      )}
    </div>
  );
}

export default App;