# NFT Auction App on NEAR Protocol

## Overview

This project is an NFT (Non-Fungible Token) auction application built on the NEAR Protocol using `near-sdk-js`. The application allows users to mint NFTs, view their NFT collection, and participate in NFT auctions by placing bids.

## Contract Functions

### 1. Initialization

The contract is initialized with the following parameters:

- **`owner_id`**: The NEAR account ID of the contract owner.

- **`metadata`**: (Optional) Metadata for the NFT auction contract, including specification version, name, and symbol.

### 2. Mint NFT

- **Function**: `nft_mint`

- **Purpose**: Mint a new NFT and transfer it to the specified recipient.

- **Parameters**:

- **`token_id`**: Unique identifier for the NFT.

- **`metadata`**: Metadata associated with the NFT.

- **`receiver_id`**: NEAR account ID of the recipient.

### 3. View NFTs for a Given Account

- **Function**: `nft_tokens_for_owner`

- **Purpose**: Retrieve a list of NFTs owned by a specific account.

- **Parameters**:

- **`account_id`**: NEAR account ID of the owner.

- **`from_index`**: (Optional) Index to start retrieving NFTs from.

- **`limit`**: (Optional) Maximum number of NFTs to retrieve.

### 4. Make Bid on Auction

- **Function**: `make_bid`

- **Purpose**: Allow users to place bids on NFT auctions.

- **Parameters**:

- **`auction_id`**: Identifier for the NFT auction.

## How to Run Locally

To run the NFT auction app locally, follow these steps:

1. Install Node.js and npm: [Node.js Installation](https://nodejs.org/)

2. Clone the repository:

```bash

git clone https://github.com/your-username/nft-auction-app.git

```

3. Navigate to the project directory:

```bash

cd nft-auction-app

```

4. Install dependencies:

```bash

npm install

```

5. Create a NEAR account for testing purposes: [NEAR Wallet](https://wallet.near.org/)

6. Build and get the `wasm` file:

```bash

npm run build

```

7. Deploy:

```bash
npm run deploy
```

9. Interact with the deployed contract by calling the exposed functions.
