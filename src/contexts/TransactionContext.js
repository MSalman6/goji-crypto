import React, { useEffect, useState } from "react";
import {ethers} from 'ethers';
import { hanuContractAddress, hanuContractABI, lockingContractAddress, lockingContractAbi } from "../utils/constants";


export const TransactionContext = React.createContext();

const { ethereum } = window;

const getHanuContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const hanuContract = new ethers.Contract(hanuContractAddress, hanuContractABI, signer);

    return hanuContract;
}

const getHanuLockContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const hanuLockContract = new ethers.Contract(lockingContractAddress, lockingContractAbi, signer);

    return hanuLockContract;
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [hanuLockingFormData, setHanuLockingFormData] = useState({ amount: 0, timeInterval: 0 });

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    ///////////////////////////////////////////////
    //  Wallet Functionality
    ///////////////////////////////////////////////
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask") // check if MetaMask is installed

            const accounts = await ethereum.request({ method: 'eth_accounts'});

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            }

        } catch (error) {
            console.log(error);

            throw new Error('No Ethereum object found.');
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask") // check if MetaMask is installed

            const accounts = await ethereum.request({ method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error('No Ethereum object found.')
        }
    }

    ///////////////////////////////////////////////
    //  Hanu Lock Functionality
    ///////////////////////////////////////////////
    const handleHanuFormChange = (e, name) => {
        setHanuLockingFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }

    const hanuApproveAndLock = async (amount, timeInterval) => {
        var response = "";
        const hanuContract = getHanuContract();
        
        // check currently approved value
        await hanuContract.allowance(currentAccount, lockingContractAddress)
        .then(async (data) => {
            const val = parseInt(data._hex);
            const amountInWei = ethers.utils.parseEther(amount)._hex;

            // call approve method if amount entered is greater than previously approved value
            if (val <= parseInt(amountInWei)) {
                const amount = ethers.utils.parseEther("1000000000")._hex;
                await hanuContract.approve(lockingContractAddress, amount);
            }

            // call hanu lock method
            const hanuLockContract = getHanuLockContract();
            await hanuLockContract.lock(hanuContractAddress, amountInWei, timeInterval)
            .then(data => {response = true})
            .catch(err => {
                if (err.data.message.includes('already')) {
                    response =  "You've already locked this token, please unlock them all before locking again.";
                } else {
                    console.log(err);        
                    response =  false;
                }
            });
            
        })
        .catch(err => {
            console.log(err);
            response = false;
        });
        return response
    }

    const lockHanuAmount = async () => {
        const { amount, timeInterval } = hanuLockingFormData;
        const approveAndLockResp = await hanuApproveAndLock(amount, timeInterval);
        return approveAndLockResp;
    }

    const userHanuLockRecords = async () => {
        const hanuLockContract = getHanuLockContract();
        await hanuLockContract.userLockRecords(currentAccount, hanuContractAddress)
        .then(async (data) => {
            const amount = ethers.utils.formatEther(data.amount._hex);
            const validity = ethers.utils.formatEther(data.validity._hex);
            const address = data.addr;
            const token = data.token;
            const exists = data.doesExist;
            const insertedAt = data.insertedAt._hex;
            const updatedAt = data.updatedAt._hex;

            console.log({
                amount,
                validity,
                address,
                token,
                exists,
                insertedAt,
                updatedAt,
            })
        })
    }

    return (
        <TransactionContext.Provider value={{ connectWallet,  lockHanuAmount, currentAccount, hanuLockingFormData, setHanuLockingFormData, handleHanuFormChange, userHanuLockRecords }}>
            {children}
        </TransactionContext.Provider>
    )
}