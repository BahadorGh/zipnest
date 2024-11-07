import { Provider } from "@nestjs/common";
import { viemClient } from "../config/viem.config";

console.log("first");
export const ViemClientProvider: Provider = {
    provide: "VIEM_CLIENT",
    useValue: viemClient,
};
