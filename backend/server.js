const fetch = require('node-fetch');
const fs = require('fs');

async function fetchInvoices() {
  try {
    const response = await fetch('https://targetv2.vercel.app/api/invoices');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    fs.writeFileSync('invoices.json', JSON.stringify(data, null, 2));
    console.log('Invoices fetched at', new Date().toLocaleTimeString());
  } catch (error) {
    console.error('Failed to fetch invoices:', error.message);
    fs.writeFileSync('invoices.json', JSON.stringify({ error: error.message }, null, 2));
  }
}

function startFetching() {
  console.log('Starting invoice fetcher...');
  fetchInvoices();
  setInterval(fetchInvoices, 3000);
  process.on('SIGINT', () => {
    console.log('Stopping invoice fetcher...');
    process.exit(0);
  });
}

startFetching();