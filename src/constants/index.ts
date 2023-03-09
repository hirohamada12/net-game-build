import { BigNumber } from "@ethersproject/bignumber";
import type { AddEthereumChainParameter } from "@web3-react/types";

import { ReactComponent as BridgeSVG } from "@assets/game/Bridge.svg";
import { ReactComponent as DaoSVG } from "@assets/game/Dao.svg";
import { ReactComponent as DexSVG } from "@assets/game/Dex.svg";
import { ReactComponent as FarmingSVG } from "@assets/game/Farming.svg";
import { ReactComponent as GamingSVG } from "@assets/game/Gaming.svg";

import { abi as DB_ABI } from "./abi/DB_ABI.json";
import { abi as GAME_ABI } from "./abi/GAME_ABI.json";
import { abi as PRESALE } from "./abi/PRESALE_ABI.json";
import { abi as TOKEN_ABI } from "./abi/TOKEN_ABI.json";

export const isDev = true;

export const ACHIEVEMENTS_KEY = "blocky-achievements";

export const CHAIN_PARAMS: AddEthereumChainParameter = isDev
  ? {
      chainId: 421613,
      chainName: "Arbitrum Goerli",
      nativeCurrency: {
        name: "AGOR",
        symbol: "AGOR",
        decimals: 18,
      },
      rpcUrls: ["https://goerli-rollup.arbitrum.io/rpc"],
      blockExplorerUrls: ["https://goerli-rollup-explorer.arbitrum.io"],
    }
  : {
      chainId: 137,
      chainName: "Polygon",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://matic-mainnet.chainstacklabs.com"],
      blockExplorerUrls: ["https://polygonscan.com"],
    };

export const CONTRACTS = {
  GAME: {
    ABI: GAME_ABI,
    ADDRESS: "0x508Aaf72aE3F44857ab3D127E2506a1843355Ac0",
  },
  TOKEN: {
    ABI: TOKEN_ABI,
    ADDRESS: "0x13F905B79B48c444Cb2E40E33f4D2Fb1Ba81bEE1",
  },
  DB: {
    ABI: DB_ABI,
    ADDRESS: "0x7E582AB73371D786057A67ec257fF8bf25972D65",
  },
  PRESALE: {
    ABI: PRESALE,
    ADDRESS: "0x22322818Cff3e3160A4C518a8D94562D9340A333",
  },
};

export enum DAPP_ID {
  DEX = 0,
  FARM = 1,
  GAMEFI = 2,
  BRIDGE = 3,
  DAO = 4,
}

export const HIDEN_CHEST_REWARD = [
  {
    name: "Big Chest",
    win: 2000,
    ratio: "0,00001%",
  },
  {
    name: "Normal Chest",
    win: 500,
    ratio: "0,001%",
  },
  {
    name: "Small chest",
    win: 100,
    ratio: "0,01%",
  },
  {
    name: "Tiny chest",
    win: 10,
    ratio: "5%",
  },
];

export const DAPPS_ICONS = {
  [DAPP_ID.DEX]: DexSVG,
  [DAPP_ID.FARM]: FarmingSVG,
  [DAPP_ID.GAMEFI]: GamingSVG,
  [DAPP_ID.BRIDGE]: BridgeSVG,
  [DAPP_ID.DAO]: DaoSVG,
};

export interface Node {
  price: BigNumber;
  tps: BigNumber;
}

export interface DApp {
  id: DAPP_ID;
  price: BigNumber;
  tps: BigNumber;
  liquidityPerBlock: BigNumber;
}

export interface IBlockchain {
  id: BigNumber;
  owner: string;
  color: string;
  liquidity: BigNumber;
  liquidityPerBlock: BigNumber;
  startLiquidityEarnAt: BigNumber;
  tps: BigNumber;
  usedTps: BigNumber;
  nodes: BigNumber;
  dappsIds: BigNumber[];
}
