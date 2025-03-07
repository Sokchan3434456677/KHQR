import requests

# Constants
BASE_URL = "https://api-uat145.phillipbank.com.kh:8441"
CLIENT_ID = "9501d6df-d0c3-4f33-8bf1-eee5cc7a486e"
CLIENT_SECRET = "59Pr4UuXwkfZX7QDVOh143Vq3UEEmplEEPvJmT2T"

# Function to generate a token
def generate_token():
    url = f"{BASE_URL}/oauth/token"
    payload = {
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "scope": "txn-create"
    }
    headers = {
        "Content-Type": "application/json"
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        return response.json().get("access_token")
    else:
        print(f"Error generating token: {response.status_code} - {response.text}")
        return None

# Function to initialize a transaction
def init_transaction(token, txn_id):
    url = f"{BASE_URL}/api/init/transaction"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    payload = {
        "partner_id": "banhji",
        "merchant_id": "55368",
        "merchant_name": "HENG Sothon",
        "merchant_city": "Phnom Penh",
        "merchant_category": "5691",
        "merchant_rdn": "https://www.sample.com/en",
        "phone": "010888664",
        "payload": "Item1,Item2,",
        "txn_id": txn_id,
        "label": "Invoice No",
        "currency": "USD",
        "amount": 10.75,
        "fee": 0.0,
        "country_code": "KH",
        "success_redirect": "https://www.sample.com.kh/api/confirm-paymentgateways?tran_id=INV_920919002&status=success",
        "fail_redirect": "https://www.sample.com.kh/api/confirm-paymentgateways?tran_id=INV_920919002&status=fail"
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error initializing transaction: {response.status_code} - {response.text}")
        return None

# Function to check transaction status
def check_transaction(token, txn_id):
    url = f"{BASE_URL}/api/check/transaction"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    payload = {
        "merchant_id": "55368",
        "txn_id": txn_id
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error checking transaction: {response.status_code} - {response.text}")
        return None

# Main execution
if __name__ == "__main__":
    # Step 1: Generate a token
    token = generate_token()
    if not token:
        print("Failed to generate token. Exiting.")
        exit(1)

    # Step 2: Initialize a transaction
    txn_id = "INV_920919002"  # Replace with a unique transaction ID
    init_response = init_transaction(token, txn_id)
    if init_response:
        print("Transaction Initialized Successfully:")
        print(init_response)

    # Step 3: Check transaction status
    check_response = check_transaction(token, txn_id)
    if check_response:
        print("Transaction Status:")
        print(check_response)