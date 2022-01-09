import React, { useEffect, useState } from "react";
import {ethers} from 'ethers';
import {
    hanuContractAddress,
    hanuContractAbi,
    liquidityContractAbi,
    liquidityContractAddress,
    lockingContractAddress,
    lockingContractAbi,
    votingContractAddress,
    votingContractAbi,
    stakingContractAbi,
    stakingContractAddress,
    miaContractAbi,
    miaContractAddress,
    gabaContractAbi,
    gabaContractAddress
} from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getHanuContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const hanuContract = new ethers.Contract(hanuContractAddress, hanuContractAbi, signer);
    return hanuContract;
}

const getLiquidityContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const liquidityContract = new ethers.Contract(liquidityContractAddress, liquidityContractAbi, signer);
    return liquidityContract;
}

const getLockContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const lockContract = new ethers.Contract(lockingContractAddress, lockingContractAbi, signer);
    return lockContract;
}

const getVotingContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const votingContract = new ethers.Contract(votingContractAddress, votingContractAbi, signer);
    return votingContract;
}

const getStakingContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const stakingContract = new ethers.Contract(stakingContractAddress, stakingContractAbi, signer);
    return stakingContract;
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('');

    // hanu states
    const [hanuLockingFormData, setHanuLockingFormData] = useState({ amount: 0, timeInterval: 0 });
    const [hanuLockTime, setHanuLockTime] = useState({ lockedAmount:0 , lockDays:0, lockHours: 0, lockMinutes: 0, lockSeconds: 0, isAmountLocked: true });

    // liquidiy states
    const [liquidityLockingFormData, setLiquidityLockingFormData] = useState({ amount: 0, timeInterval: 0 });
    const [liquidityLockTime, setLiquidityLockTime] = useState({ lockedAmount:0 , lockDays:0, lockHours: 0, lockMinutes: 0, lockSeconds: 0, isAmountLocked: true });

    // vote states
    const [votingFormData, setVotingFormData] = useState({ voteFor: 0 });

    // staking states
    const [hanuStakeFormData, setHanuStakeFormData] = useState({ amount: 0 });
    const [hanuUnstakeFormData, setHanuUnstakeFormData] = useState({ amount: 0 });
    const [hanuStakedAmountData, setHanuStakedAmountData] = useState({ stakedAmount: 0 });

    const [gojiStakeFormData, setGojiStakeFormData] = useState({ amount: 0 });
    const [gojiUnstakeFormData, setGojiUnstakeFormData] = useState({ amount: 0 });
    const [gojiStakedAmountData, setGojiStakedAmountData] = useState({ stakedAmount: 0 });

    const [miaStakeFormData, setMiaStakeFormData] = useState({ amount: 0 });
    const [miaUnstakeFormData, setMiaUnstakeFormData] = useState({ amount: 0 });
    const [miaStakedAmountData, setMiaStakedAmountData] = useState({ stakedAmount: 0 });

    const [gabaStakeFormData, setGabaStakeFormData] = useState({ amount: 0 });
    const [gabaUnstakeFormData, setGabaUnstakeFormData] = useState({ amount: 0 });
    const [gabaStakedAmountData, setGabaStakedAmountData] = useState({ stakedAmount: 0 });

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

            await ethereum.on('accountsChanged', function (accounts) {
                setCurrentAccount(accounts[0]);
                userHanuLockRecords(accounts[0]);
            })

            await ethereum.on('disconnect', function(accounts) {
                console.log(accounts)
            });

            await ethereum.request({ method: 'eth_accounts'}).then(async (accounts) => {
                if (accounts.length) {
                    setCurrentAccount(accounts[0]);
                    userHanuLockRecords(accounts[0]);
                    getStakedValue(accounts[0])
                } else {
                    await connectWallet();
                }
            }).catch( err => {
                showNotification("Please connect MetaMask!")
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
                    window.location.reload();
                }
            }).catch( err => {
                showNotification("Please connect MetaMask!")
            });
            
        } catch (error) {
            console.log(error);

            throw new Error('No Ethereum object found.')
        }
        return currentAccount;
    }

    ////////////////////////////////////
    //  Locking Functionality
    ////////////////////////////////////
    const handleHanuFormChange = (e, name) => {
        setHanuLockingFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }

    const hanuApproveAndLock = async (amount, timeInterval, lockType) => {
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
                showNotification("Hanu approved.")
                // wait for 5 seconds after approve
                await new Promise(resolve => setTimeout(resolve, 5000));
            }

            // check hanu balance
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
        if (!currentAccount) {
            connectWallet() // makesure site has connection to metamask
            return "Please connect MetaMask before performing any actions."
        }

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

    // liquidity lock functionality
    const handleLiquidityFormChange = (e, name) => {
        setLiquidityLockingFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }

    const liquidityApproveAndLock = async (amount, timeInterval, lockType) => {
        var response = "";
        const liquidityContract = getLiquidityContract();
        
        // check currently approved value
        await liquidityContract.allowance(currentAccount, lockingContractAddress)
        .then(async (data) => {
            const val = parseInt(data._hex);
            const amountInWei = ethers.utils.parseEther(amount)._hex;

            // call approve method if amount entered is greater than previously approved value
            if (val <= parseInt(amountInWei)) {
                const amount = ethers.utils.parseEther("1000000000")._hex;
                await liquidityContract.approve(lockingContractAddress, amount);
                showNotification("Hanu approved.")
                // wait for 5 seconds after approve
                await new Promise(resolve => setTimeout(resolve, 5000));
            }

            // check liquidity balance
            const liquidityBalance = await liquidityContract.balanceOf(currentAccount);
            if (liquidityBalance >= amountInWei) {
                // call liquidity lock method
                const lockContract = getLockContract();
                await lockContract.lock(liquidityContractAddress, amountInWei, timeInterval)
                .then(data => {
                    response = `Successfully locked ${amount} Liquidity.`;
                    userLiquidityLockRecords(currentAccount);
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
                response = "You don't have enough liquidity balance";
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

    const lockLiquidityAmount = async () => {
        if (!currentAccount) {
            connectWallet() // makesure site has connection to metamask
            return "Please connect MetaMask before performing any actions."
        }

        const { amount, timeInterval } = liquidityLockingFormData;
        const approveAndLockResp = await liquidityApproveAndLock(amount, timeInterval);
        return approveAndLockResp;
    }

    const userLiquidityLockRecords = async (activeAccount) => {
        const lockContract = getLockContract();
        await lockContract.userLockRecords(activeAccount, liquidityContractAddress)
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
            setLiquidityLockTime((prevstate) => ({ ...prevstate, lockedAmount, lockDays, lockHours, lockMinutes, lockSeconds, isAmountLocked }));
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
        if (!currentAccount) {
            connectWallet() // makesure site has connection to metamask
            return "Please connect MetaMask before performing any actions."
        }

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
    const handleHanuStakeFormChange = (e, name) => {
        setHanuStakeFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }
    const handleHanuUnstakeFormChange = (e, name) => {
        setHanuUnstakeFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }

    const handleGojiStakeFormChange = (e, name) => {
        setGojiStakeFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }
    const handleGojiUnstakeFormChange = (e, name) => {
        setGojiUnstakeFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }

    const handleMiaStakeFormChange = (e, name) => {
        setMiaStakeFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }
    const handleMiaUnstakeFormChange = (e, name) => {
        setMiaUnstakeFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }

    const handleGabaStakeFormChange = (e, name) => {
        setGabaStakeFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }
    const handleGabaUnstakeFormChange = (e, name) => {
        setGabaUnstakeFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }

    const stakeToken = async (tokenName) => {
        var amount = 0;
        var response = "";
        var stakeToken = "";
        var tokenContract = "";

        if (!currentAccount) {
            connectWallet() // makesure site has connection to metamask
            return "Please connect MetaMask before performing any actions."
        }

        if (tokenName === 'hanu'){
            stakeToken = hanuContractAddress;
            tokenContract = getHanuContract();
            amount = hanuStakeFormData.amount;
        } else if (tokenName === 'goji') {
            stakeToken = liquidityContractAddress;
            tokenContract = getLiquidityContract();
            amount = gojiStakeFormData.amount;
        } else if (tokenName === 'mia') {
            stakeToken = '';
            tokenContract = '';
            amount = miaStakeFormData.amount;
        } else if (tokenName === 'gaba') {
            stakeToken = '';
            tokenContract = '';
            amount = gabaStakeFormData.amount;
        }

        const stakingContract = getStakingContract();

        // check currently approved token value
        await tokenContract.allowance(currentAccount, stakingContractAddress)
        .then(async (data) => {
            const val = parseInt(data._hex);
            const amountInWei = ethers.utils.parseEther(amount)._hex;

            // call approve method if amount entered is greater than previously approved value
            if (val <= parseInt(amountInWei)) {
                const amount = ethers.utils.parseEther("1000000000")._hex;
                await tokenContract.approve(stakingContractAddress, amount);
                showNotification(`${tokenName.charAt(0).toUpperCase() + tokenName.slice(1)} approved.`)
                // wait for 5 seconds after approve
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
            // check if user has enough token balance
            const tokenBalance = await tokenContract.balanceOf(currentAccount);
            if (tokenBalance >= amountInWei) {
                await stakingContract.stake(amountInWei, stakeToken)
                .then( data => {
                    response = `Successfully Staked ${amount} ${tokenName.charAt(0).toUpperCase() + tokenName.slice(1)}.`
                })
                .catch(err => {
                    response = err.data.message
                });
            } else {
                response = `You don't have enough ${tokenName} balance`;
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

    const unStakeToken = async (tokenName) => {
        var resp = "";
        var amount = "";
        var unstakeToken = "";
        var stakedAmount = "";
        const stakingContract = getStakingContract();

        if (tokenName === 'hanu') {
            unstakeToken = hanuContractAddress;
            stakedAmount = hanuUnstakeFormData.amount;
            amount = ethers.utils.parseEther(stakedAmount);
        } else if (tokenName === 'goji') {
            unstakeToken = liquidityContractAddress;
            stakedAmount = gojiUnstakeFormData.amount;
            amount = ethers.utils.parseEther(stakedAmount);
        } else if (tokenName === 'mia') {
            unstakeToken = miaContractAddress;
            stakedAmount = miaUnstakeFormData.amount;
            amount = ethers.utils.parseEther(stakedAmount);
        } else if (tokenName === 'gaba') {
            unstakeToken = gabaContractAddress;
            stakedAmount = gabaUnstakeFormData.amount;
            amount = ethers.utils.parseEther(stakedAmount);
        }

        await stakingContract.unstake(amount, unstakeToken)
        .then(data => {
            console.log(data);
            resp = `Successfully unstaked ${stakedAmount} ${tokenName.charAt(0).toUpperCase() + tokenName.slice(1)}.`
        }).catch( err => {
            if (err.data){
                resp = err.data.message;
            } else if (err.message) { 
                resp = err.message;
            } else {
                console.log(err);
                resp = "Something went wrong";
            }
        })
        return resp
    }

    const getStakedValue = async (account) => {
        const stakingContract = getStakingContract();
        // get hanu current staked value
        await stakingContract.StakeMap(hanuContractAddress, account)
        .then(data => {
            var stakedAmount = ethers.utils.formatEther(data);
            setHanuStakedAmountData({ stakedAmount });
        })
        .catch(err => {console.log(err)})
        // get mia current staked value
        await stakingContract.StakeMap(miaContractAddress, account)
        .then(data => {
            var stakedAmount = ethers.utils.formatEther(data);
            setMiaStakedAmountData({ stakedAmount });
        })
        .catch(err => {console.log(err)})
        // get goji current staked value
        await stakingContract.StakeMap(liquidityContractAddress, account)
        .then(data => {
            var stakedAmount = ethers.utils.formatEther(data);
            setGojiStakedAmountData({ stakedAmount });
        })
        .catch(err => {console.log(err)})
        // get gaba current staked value
        await stakingContract.StakeMap(gabaContractAddress, account)
        .then(data => {
            var stakedAmount = ethers.utils.formatEther(data);
            setGabaStakedAmountData({ stakedAmount });
        })
        .catch(err => {console.log(err)})
    }

    return (
        <TransactionContext.Provider value={{
                // general context
                connectWallet,
                currentAccount,
                showNotification,

                // hanu context
                lockHanuAmount,
                hanuLockingFormData,
                setHanuLockingFormData,
                handleHanuFormChange,
                hanuLockTime,

                // liquidity context
                lockLiquidityAmount,
                liquidityLockingFormData,
                setLiquidityLockingFormData,
                handleLiquidityFormChange,
                liquidityLockTime,
                
                // vote context
                doVote,
                getVotersData,
                votingFormData,
                handleVoteFormChange,

                // staking context
                stakeToken,
                unStakeToken,
                // staking hanu context
                hanuStakedAmountData,
                handleHanuStakeFormChange,
                handleHanuUnstakeFormChange,
                // staking goji context
                gojiStakedAmountData,
                handleGojiStakeFormChange,
                handleGojiUnstakeFormChange,
                // staking mia context
                miaStakedAmountData,
                handleMiaStakeFormChange,
                handleMiaUnstakeFormChange,
                // staking gaba context
                gabaStakedAmountData,
                handleGabaStakeFormChange,
                handleGabaUnstakeFormChange,
            }}>
            {children}
        </TransactionContext.Provider>
    )
}