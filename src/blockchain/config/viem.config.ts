import * as dotenv from "dotenv";
import path from "path";
import { createPublicClient, http, webSocket } from "viem";
import { mainnet } from "viem/chains";

dotenv.config({
    path: `${process.cwd()}/.env`
})

const { ETHERUEM_RPC_WS } = process.env;
console.log("ETHERUEM_RPC_WS:", ETHERUEM_RPC_WS);
// console.log("ETHERUEM_RPC_WS:", ETHERUEM_RPC_WS);

export const viemClient = createPublicClient({
    batch: {
        multicall: true,
    },
    chain: mainnet,
    transport: webSocket(ETHERUEM_RPC_WS),
    // transport: http(ethRPC),
});
