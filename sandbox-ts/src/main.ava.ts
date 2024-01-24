import { Worker, NearAccount, NEAR } from "near-workspaces";
import anyTest, { TestFn } from "ava";

const test = anyTest as TestFn<{
  worker: Worker;
  accounts: Record<string, NearAccount>;
}>;

test.beforeEach(async (t) => {
  // Init the worker and start a Sandbox server
  const worker = await Worker.init();

  // Deploy contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount("test-account");

  // Get wasm file path from package.json test script in folder above
  await contract.deploy(process.argv[2]);

  // Initialize the contract
  await contract.call(contract, "init", {
    owner_id: root.accountId,
  });

  // Save state for test runs, it is unique for each test
  t.context.worker = worker;
  t.context.accounts = { root, contract };
});

test.afterEach.always(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log("Failed to stop the Sandbox:", error);
  });
});

test("mints NFT", async (t) => {
  const { root, contract } = t.context.accounts;

  const testTokenId = "123";
  const testTokenMetadata = {
    title: "Test NFT",
    description: "Test NFT description",
  };

  await root.call(
    contract,
    "nft_mint",
    {
      token_id: testTokenId,
      metadata: testTokenMetadata,
      receiver_id: root.accountId,
    },
    {
      attachedDeposit: NEAR.parse("1 N").toString(),
    }
  );

  const nfts = await contract.view("nft_tokens_for_owner", {
    account_id: root.accountId,
  });
  t.deepEqual(nfts, [
    {
      tokenId: testTokenId,
      ownerId: root.accountId,
      metadata: testTokenMetadata,
    },
  ]);
});
