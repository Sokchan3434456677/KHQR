

// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// // Base URL (UAT environment)
// const BASE_URL = 'https://api-uat145.phillipbank.com.kh:8441';
// const CLIENT_ID = '9501d6df-d0c3-4f33-8bf1-eee5cc7a486e';
// const CLIENT_SECRET = '59Pr4UuXwkfZX7QDVOh143Vq3UEEmplEEPvJmT2T';

// let accessToken = '';

// // Generate Token
// app.get('/api/generate-token', async (req, res) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/oauth/token`, {
//       grant_type: 'client_credentials',
//       client_id: CLIENT_ID,
//       client_secret: CLIENT_SECRET,
//       scope: 'txn-create',
//     });
//     accessToken = response.data.access_token;
//     res.json({ success: true, token: accessToken });
//   } catch (error) {
//     console.error('Token generation failed:', error.response?.data || error.message);
//     res.status(500).json({ success: false, message: 'Failed to generate token' });
//   }
// });

// // Initialize Transaction
// app.post('/api/init-transaction', async (req, res) => {
//   if (!accessToken) {
//     return res.status(401).json({ success: false, message: 'Token not generated' });
//   }

//   const txn_id = `INV_${Date.now()}`; // Generate unique txn_id
//   const transactionData = {
//     partner_id: 'banhji',
//     merchant_id: '55368',
//     merchant_name: 'HENG Sothon',
//     merchant_city: 'Phnom Penh',
//     merchant_category: '5691',
//     merchant_rdn: 'https://www.sample.com/en',
//     phone: '010888664',
//     payload: 'Item1,Item2,',
//     txn_id: txn_id, // Use dynamic txn_id
//     label: 'Invoice No',
//     currency: 'USD',
//     amount: 0.01,
//     fee: 0.0,
//     country_code: 'KH',
//     success_redirect: `https://www.sample.com.kh/api/confirm-paymentgateways?tran_id=${txn_id}&status=success`, // Dynamic txn_id
//     fail_redirect: `https://www.sample.com.kh/api/confirm-paymentgateways?tran_id=${txn_id}&status=fail`, // Dynamic txn_id
//   };

//   try {
//     const response = await axios.post(`${BASE_URL}/api/init/transaction`, transactionData, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error('Transaction init failed:', error.response?.data || error.message);
//     if (error.response?.status === 400) {
//       res.status(400).json({ success: false, message: 'Transaction ID already taken' });
//     } else {
//       res.status(500).json({ success: false, message: 'Failed to initialize transaction' });
//     }
//   }
// });

// // Check Transaction Status
// app.post('/api/check-transaction', async (req, res) => {
//   const { txn_id } = req.body; // Expect txn_id in the request body
//   if (!txn_id) {
//     return res.status(400).json({ success: false, message: 'Transaction ID is required' });
//   }

//   if (!accessToken) {
//     return res.status(401).json({ success: false, message: 'Token not generated' });
//   }

//   try {
//     // Make a real API call to check the transaction status
//     const response = await axios.get(`${BASE_URL}/api/check/transaction`, {
//       params: { txn_id }, // Adjust based on actual API requirements
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     // Assuming the API returns a 'status' field (e.g., "SUCCESS", "PENDING", "FAILED")
//     const { status } = response.data;
//     const isPaid = status === 'SUCCESS'; // Adjust based on actual API status values
//     const delay = isPaid ? 3000 : 100000; // 3s for PAID, 100s for UNPAID

//     setTimeout(() => {
//       res.json({
//         success: true,
//         message: 'Transaction status retrieved successfully',
//         data: {
//           txn_status: isPaid ? 'PAID' : 'UNPAID', // Map to your format
//           raw_status: status, // Raw status from API
//           txn_id: txn_id,
//         },
//       });
//     }, delay);
//   } catch (error) {
//     console.error('Transaction status check failed:', error.response?.data || error.message);
//     res.status(500).json({ success: false, message: 'Failed to check transaction status' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });



const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Base URL (UAT environment)
const BASE_URL = 'https://api-uat145.phillipbank.com.kh:8441';
const CLIENT_ID = '9501d6df-d0c3-4f33-8bf1-eee5cc7a486e';
const CLIENT_SECRET = '59Pr4UuXwkfZX7QDVOh143Vq3UEEmplEEPvJmT2T';

let accessToken = '';

// Generate Token
app.get('/api/generate-token', async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/oauth/token`, {
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: 'txn-create',
    });
    accessToken = response.data.access_token;
    res.json({ success: true, token: accessToken });
  } catch (error) {
    console.error('Token generation failed:', error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Failed to generate token' });
  }
});

// Initialize Transaction
app.post('/api/init-transaction', async (req, res) => {
  if (!accessToken) {
    return res.status(401).json({ success: false, message: 'Token not generated' });
  }

  const txn_id = `INV_${Date.now()}`; // Generate unique txn_id
  const transactionData = {
    partner_id: 'banhji',
    merchant_id: '55368',
    merchant_name: 'HENG Sothon',
    merchant_city: 'Phnom Penh',
    merchant_category: '5691',
    merchant_rdn: 'https://www.sample.com/en',
    phone: '010888664',
    payload: 'Item1,Item2,',
    txn_id: txn_id, // Use dynamic txn_id
    label: 'Invoice No',
    currency: 'USD',
    amount: 0.01,
    fee: 0.0,
    country_code: 'KH',
    success_redirect: `https://www.sample.com.kh/api/confirm-paymentgateways?tran_id=${txn_id}&status=success`, // Dynamic txn_id
    fail_redirect: `https://www.sample.com.kh/api/confirm-paymentgateways?tran_id=${txn_id}&status=fail`, // Dynamic txn_id
  };

  try {
    const response = await axios.post(`${BASE_URL}/api/init/transaction`, transactionData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Transaction init failed:', error.response?.data || error.message);
    if (error.response?.status === 400) {
      res.status(400).json({ success: false, message: 'Transaction ID already taken' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to initialize transaction' });
    }
  }
});

// Check Transaction Status
app.post('/api/check-transaction', async (req, res) => {
  const { txn_id } = req.body; // Expect txn_id in the request body
  if (!txn_id) {
    return res.status(400).json({ success: false, message: 'Transaction ID is required' });
  }

  if (!accessToken) {
    return res.status(401).json({ success: false, message: 'Token not generated' });
  }

  try {
    // Make a POST request to check the transaction status
    const response = await axios.post(
      `${BASE_URL}/api/check/transaction`,
      { txn_id }, // Send txn_id in the request body
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    // Assuming the API returns a 'status' field (e.g., "SUCCESS", "PENDING", "FAILED")
    const { status } = response.data;
    const isPaid = status === 'SUCCESS'; // Adjust based on actual API status values
    const delay = isPaid ? 3000 : 100000; // 3s for PAID, 100s for UNPAID

    setTimeout(() => {
      res.json({
        success: true,
        message: 'Transaction status retrieved successfully',
        data: {
          txn_status: isPaid ? 'PAID' : 'UNPAID', // Map to your format
          raw_status: status, // Raw status from API
          txn_id: txn_id,
        },
      });
    }, delay);
  } catch (error) {
    console.error('Transaction status check failed:', error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Failed to check transaction status' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});