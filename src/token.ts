import { AccountId, near } from "near-sdk-js";
import { Contract } from "./contract";
import { JsonToken } from "./metadata";
import { internalJsonTokenForTokenId } from "./internal";

export function internalNftTokensForOwner({
  contract,
  accountId,
  fromIndex,
  limit,
}: {
  contract: Contract;
  accountId: AccountId;
  fromIndex?: number;
  limit?: number;
}): JsonToken[] {
  near.log("AccountId: " + accountId);
  const tokenVector = contract.tokensByOwner.get(accountId);

  if (tokenVector === null) {
    return [];
  }

  let tokens = [];
  let start = fromIndex ? fromIndex : 0;
  let max = limit ? limit : 50;

  for (let i = start; i < max; i++) {
    if (i >= 0 && i < tokenVector.length) {
      let token = internalJsonTokenForTokenId({
        contract,
        tokenId: tokenVector.get(i),
      });
      tokens.push(token);
    }
  }

  return tokens;
}
