import React, { useEffect, useState } from "react";
import {ethers} from 'ethers';
import {
    hanuContractAddress,
    hanuContractABI,
    lockingContractAddress,
    lockingContractAbi,
    votingContractAddress,
    votingContractAbi,
    stakingContractAbi,
    stakingContractAddress
} from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();

const getHanuContract = () => {
    const hanuContract = new ethers.Contract(hanuContractAddress, hanuContractABI, signer);
    return hanuContract;
}

const getLockContract = () => {
    const lockContract = new ethers.Contract(lockingContractAddress, lockingContractAbi, signer);
    return lockContract;
}

const getVotingContract = () => {
    const votingContract = new ethers.Contract(votingContractAddress, votingContractAbi, signer);
    return votingContract;
}

const getStakingContract = () => {
    const stakingContract = new ethers.Contract(stakingContractAddress, stakingContractAbi, signer);
    return stakingContract;
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('');

    // hanu states
    const [hanuLockingFormData, setHanuLockingFormData] = useState({ amount: 0, timeInterval: 0 });
    const [hanuLockTime, setHanuLockTime] = useState({ lockedAmount:0 , lockDays:0, lockHours: 0, lockMinutes: 0, lockSeconds: 0, isAmountLocked: true });

    // vote states
    const [votingFormData, setVotingFormData] = useState({ voteFor: 0 });

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);


    ////////////////////////////////////
    //  Action Response Notification
    ////////////////////////////////////
    const showNotification = (status) => {
        var x = document.getElementById("notification");
        
        x.innerHTML = status

        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
    }

    ////////////////////////////////////
    //  Wallet Functionality
    ////////////////////////////////////
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask") // check if MetaMask is installed

            await ethereum.request({ method: 'eth_accounts'}).then(accounts => {
                if (accounts.length) {
                    setCurrentAccount(accounts[0]);
                    userHanuLockRecords(accounts[0]);
                }
            });

        } catch (error) {
            console.log(error);

            throw new Error('No Ethereum object found.');
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask") // check if MetaMask is installed

            await ethereum.request({ method: 'eth_requestAccounts'}).then(accounts => {
                if (accounts) {
                    setCurrentAccount(accounts[0]);
                    userHanuLockRecords(accounts[0]);
                }
            });

            
        } catch (error) {
            console.log(error);

            throw new Error('No Ethereum object found.')
        }
    }

    ////////////////////////////////////
    //  Locking Functionality
    ////////////////////////////////////
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

            // check hany balance
            const hanuBalance = await hanuContract.balanceOf(currentAccount);
            if (hanuBalance >= amountInWei) {
                // call hanu lock method
                const lockContract = getLockContract();
                await lockContract.lock(hanuContractAddress, amountInWei, timeInterval)
                .then(data => {
                    response = `Successfully locked ${amount} Hanu.`;
                    userHanuLockRecords(currentAccount);
                })
                .catch(err => {
                    if (err.data.message.includes('already')) {
                        response = "You've already locked this token, please unlock them all before locking again.";
                    } else {
                        console.log(err);
                        response =  err.data.message;
                    }
                });
            } else {
                response = "You don't have enough hanu balance";
            }
        })
        .catch(err => {
            if (err.data){
                response = err.data.message;
            } else if (err.message) { 
                response = err.message;
            } else {
                console.log(err);
                response = "Something went wrong";
            }
        });
        return response
    }

    const lockHanuAmount = async () => {
        const { amount, timeInterval } = hanuLockingFormData;
        const approveAndLockResp = await hanuApproveAndLock(amount, timeInterval);
        return approveAndLockResp;
    }

    const userHanuLockRecords = async (activeAccount) => {
        const lockContract = getLockContract();
        await lockContract.userLockRecords(activeAccount, hanuContractAddress)
        .then(async (data) => {
            const lockedAmount = ethers.utils.formatEther(data.amount);
            const validity = data.validity._hex;
            // const address = data.addr;
            // const token = data.token;
            // const exists = data.doesExist;
            const insertedAt = data.insertedAt._hex;
            // const updatedAt = data.updatedAt._hex;
            
            var lockTimeSeconds = Number(parseInt(validity) - parseInt(insertedAt));
            if (lockTimeSeconds <= 0) {
                var isAmountLocked = false;
            } else {
                isAmountLocked = true;
            }
            var lockDays = Math.floor(lockTimeSeconds / (3600*24));
            var lockHours = Math.floor(lockTimeSeconds % (3600*24) / 3600);
            var lockMinutes = Math.floor(lockTimeSeconds % 3600 / 60);
            var lockSeconds = Math.floor(lockTimeSeconds % 60);
            setHanuLockTime((prevstate) => ({ ...prevstate, lockedAmount, lockDays, lockHours, lockMinutes, lockSeconds, isAmountLocked }));
        })
    }


    ////////////////////////////////////
    //  Voting Functionality
    ////////////////////////////////////
    const handleVoteFormChange = (e, name) => {
        setVotingFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }

    const getVotersData = async () => {
        const votingContract = getVotingContract();
        const votersData = await votingContract.getVotersData()
        return votersData;
    }

    const doVote = async () => {
        var resp = "";
        const votingContract = getVotingContract();
        await votingContract.vote(votingFormData.voteFor)
        .then( data => {
            resp = `Successfully voted for ${votingFormData.voteFor}`;
        })
        .catch(err => {
            if (err.data){
                resp = err.data.message;
            } else if (err.message){ 
                resp = err.message;
            } else {
                console.log(err);
                resp = "Something went wrong";
            }
        })
        return resp;
    }


    ////////////////////////////////////
    //  Staking Functionality
    ////////////////////////////////////
    const stakeAmount = async (amount) => {
        const stakingContract = getStakingContract();
        await stakingContract.stake(amount, hanuContractAddress)
        .then (
            data => {console.log(data)}
        ).catch(
            err => {console.log(err)}
        )
    }

    const initWithdraw = async () => {
        const stakingContract = getStakingContract();
        await stakingContract.initWithdraw(hanuContractAddress)
        .then(data => {console.log(data)})
        .catch(err => {console.log(err)})
    }

    const withdrawAmount = async (amount) => {
        const stakingContract = getStakingContract();
        await stakingContract.finlaizeWithdraw(amount, hanuContractAddress)
        .then(data => {console.log(data)})
        .catch(err => {console.log(err)})
    }

    return (
        <TransactionContext.Provider value={{
                showNotification,

                // hanu context
                connectWallet,
                lockHanuAmount,
                currentAccount,
                hanuLockingFormData,
                setHanuLockingFormData,
                handleHanuFormChange,
                userHanuLockRecords,
                hanuLockTime,

                // vote context
                doVote,
                getVotersData,
                votingFormData,
                handleVoteFormChange
            }}>
            {children}
        </TransactionContext.Provider>
    )
}