import { ethers } from "ethers";
import { createContext, useEffect } from "react";
import { contractABI, contractAddress } from "../utils/connect";

export const TransactionContext = createContext();

const { ethereum } = window;

//スマートコントラクトの取得
const getSmartContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer,
    );

    console.log(provider, signer, transactionContract);

    return transactionContract;
};


export const TransactionProvider = ({ children }) => {

    //メタマスクと連帯しているかチェック
    const checkMetamaskWalletConnected = async () => {
        if (!ethereum) return alert("メタマスクをインストールしてください");

        //メタマスクのアカウントIDを取得
        const accounts = await ethereum.request({ method: "eth_accounts" })
        console.log(accounts);
    };

    useEffect(() => {
        checkMetamaskWalletConnected();
    },[]);
    
    return (
        <TransactionContext.Provider value={{ name: "daiki" }}>
            {children}
        </TransactionContext.Provider>
    )
}