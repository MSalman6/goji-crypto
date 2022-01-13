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
    gabaContractAddress,
    farmingContractAddress,
    farmingContractAbi
} from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

// get contracts methods
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

const getFarmingContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const farmingContract = new ethers.Contract(farmingContractAddress, farmingContractAbi, signer);
    return farmingContract;
}


export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const setLoader = (state) => {
        if (state) {
            document.getElementById('loading').style.display = 'flex';
        } else {
            document.getElementById('loading').style.display = 'none';
        }
    }

    // any token lock states
    const [tokenLockingFormData, setTokenLockingFormData] = useState({ amount: 0, timeInterval: 0, tokenAddress: '' });

    // hanu states
    const [hanuLockingFormData, setHanuLockingFormData] = useState({ amount: 0, timeInterval: 0 });
    const [hanuLockTime, setHanuLockTime] = useState({ lockedAmount:0 , lockDays:0, lockHours: 0, lockMinutes: 0, lockSeconds: 0, isAmountLocked: true });
    const [hanuLockedDate, setHanuLockedDate] = useState({ lockDay: 0, lockMonth: 0, lockYear: 0, lockStarted: '0/0/0', lockEnds: '0/0/0' });

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

    // farming states
    const [hanuHarvestFormData, setHanuHarvestFormData] = useState({ amount: 0 });
    const [hanuUnharvestFormData, setHanuUnharvestFormData] = useState({ amount: 0 });
    const [hanuHarvestedAmountData, setHanuHarvestedAmountData] = useState({ harvestedAmount: 0 });

    const [gojiHarvestFormData, setGojiHarvestFormData] = useState({ amount: 0 });
    const [gojiUnharvestFormData, setGojiUnharvestFormData] = useState({ amount: 0 });
    const [gojiHarvestedAmountData, setGojiHarvestedAmountData] = useState({ harvestedAmount: 0 });

    const [miaHarvestFormData, setMiaHarvestFormData] = useState({ amount: 0 });
    const [miaUnharvestFormData, setMiaUnharvestFormData] = useState({ amount: 0 });
    const [miaHarvestedAmountData, setMiaHarvestedAmountData] = useState({ harvestedAmount: 0 });

    const [gabaHarvestFormData, setGabaHarvestFormData] = useState({ amount: 0 });
    const [gabaUnharvestFormData, setGabaUnharvestFormData] = useState({ amount: 0 });
    const [gabaHarvestedAmountData, setGabaHarvestedAmountData] = useState({ harvestedAmount: 0 });

    useEffect(() => {
        checkIfWalletIsConnected();
        setLoader(false)
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

            try {
            await ethereum.on('accountsChanged', function (accounts) {
                setCurrentAccount(accounts[0]);
                userHanuLockRecords(accounts[0]);
            })} catch( err) {
                console.log(err, "#################")
            }

            await ethereum.on('disconnect', function(accounts) {
                console.log(accounts)
            });

            await ethereum.request({ method: 'eth_accounts'}).then(async (accounts) => {
                if (accounts.length) {
                    setCurrentAccount(accounts[0]);
                    userHanuLockRecords(accounts[0]);
                    getStakedValue(accounts[0]);
                    getHarvestedValue(accounts[0]);
                } else {
                    await connectWallet();
                }
            }).catch( err => {
                showNotification("Please connect MetaMask!")
            });

        } catch (error) {
            console.log(error);

            showNotification('No Ethereum object found. Install MetaMask!');
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

            showNotification('No Ethereum object found. Install MetaMask!')
        }
        return currentAccount;
    }

    ////////////////////////////////////
    //  Locking Functionality
    ////////////////////////////////////

    // Any token locking functionality
    const handleLockTokenFormChange = (e, name) => {
        setTokenLockingFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }

    const tokenApproveAndLock = async (amount, timeInterval, tokenAddress) => {
        var response = "";
        const hanuContract = getHanuContract();

        // check currently approved value
        setLoader(true);
        await hanuContract.allowance(currentAccount, tokenAddress)
        .then(async (data) => {
            const val = parseInt(data._hex);
            const amountInWei = ethers.utils.parseEther(amount)._hex;

            // call approve method if amount entered is greater than previously approved value
            if (val <= parseInt(amountInWei)) {
                const amount = ethers.utils.parseEther("1000000000")._hex;
                await hanuContract.approve(tokenAddress, amount);
                showNotification("Token Approved.")
                // wait for 5 seconds after approve
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
            
            // check token balance
            const tokenBalance = await hanuContract.balanceOf(currentAccount);
            if (tokenBalance >= amountInWei) {
                // call hanu lock method
                const lockContract = getLockContract();
                console.log(tokenAddress, amountInWei, timeInterval);
                await lockContract.lock(tokenAddress, amountInWei, timeInterval)
                .then(data => {
                    response = `Successfully locked ${amount} Token(s).`;
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
                response = "You don't have enough token balance";
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
        setLoader(false);
        return response
    }

    const lockTokenAmount = async () => {
        if (!currentAccount) {
            connectWallet() // makesure site has connection to metamask
            return "Please connect MetaMask before performing any actions."
        }

        const { amount, timeInterval, tokenAddress } = tokenLockingFormData;
        var dateInterval = ethers.utils.hexlify(Date.parse(timeInterval) / 1000);
        console.log(dateInterval)
        const approveAndLockResp = await tokenApproveAndLock(amount, dateInterval, tokenAddress);
        return approveAndLockResp;
    }

    // hanu locking functionality
    const handleHanuFormChange = (e, name) => {
        setHanuLockingFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }

    const hanuApproveAndLock = async (amount, timeInterval, lockType) => {
        var response = "";
        const hanuContract = getHanuContract();
        
        // check currently approved value
        setLoader(true);
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
        setLoader(false);
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

            const validityDate = new Date(validity * 1000);
            const insertedDate = new Date(insertedAt * 1000);

            const dateToday = new Date();

            var lockTimeSeconds = validityDate - dateToday;
            lockTimeSeconds /= 1000

            if (lockTimeSeconds <= 0) {
                var isAmountLocked = false;
            } else {
                isAmountLocked = true;
            }

            if (isAmountLocked) {
                var seconds = lockTimeSeconds;
                const timer = () => {
                    var days        = Math.floor(seconds/24/60/60);
                    var hoursLeft   = Math.floor((seconds) - (days*86400));
                    var hours       = Math.floor(hoursLeft/3600);
                    var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
                    var minutes     = Math.floor(minutesLeft/60);
                    var remainingSeconds = Math.floor(seconds % 60);

                    var lockDays = days;
                    var lockHours = hours;
                    var lockMinutes = minutes;
                    var lockSeconds = remainingSeconds;
                    setHanuLockTime((prevstate) => ({ ...prevstate, lockedAmount, lockDays, lockHours, lockMinutes, lockSeconds, isAmountLocked }));

                    if (seconds === 0) {
                        clearInterval(countdownTimer);
                        document.getElementById('countdown').innerHTML = "Completed";
                    } else {
                        seconds--;
                    }
                }
                var countdownTimer = setInterval(()=>{timer()}, 1000);

                // updated locked day, year and month
                setHanuLockedDate(prevstate => ({...prevstate,
                    lockEnds: validityDate.toLocaleDateString('en-GB'),
                    lockStarted: insertedDate.toLocaleDateString('en-GB')
                }));
            } else {
                setHanuLockTime((prevstate) => ({ ...prevstate, isAmountLocked }));
            }
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
        setLoader(true);
        await liquidityContract.allowance(currentAccount, lockingContractAddress)
        .then(async (data) => {
            const val = parseInt(data._hex);
            const amountInWei = ethers.utils.parseEther(amount)._hex;

            // call approve method if amount entered is greater than previously approved value
            if (val <= parseInt(amountInWei)) {
                const amount = ethers.utils.parseEther("1000000000")._hex;
                await liquidityContract.approve(lockingContractAddress, amount);
                showNotification("Liquidity approved.")
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
        setLoader(false);
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
        setLoader(true);
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
        setLoader(false);
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
        setLoader(true);
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
        setLoader(false);
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

        setLoader(true);
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
        setLoader(false);
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
        .catch(err => {})
        // get mia current staked value
        await stakingContract.StakeMap(miaContractAddress, account)
        .then(data => {
            var stakedAmount = ethers.utils.formatEther(data);
            setMiaStakedAmountData({ stakedAmount });
        })
        .catch(err => {})
        // get goji current staked value
        await stakingContract.StakeMap(liquidityContractAddress, account)
        .then(data => {
            var stakedAmount = ethers.utils.formatEther(data);
            setGojiStakedAmountData({ stakedAmount });
        })
        .catch(err => {})
        // get gaba current staked value
        await stakingContract.StakeMap(gabaContractAddress, account)
        .then(data => {
            var stakedAmount = ethers.utils.formatEther(data);
            setGabaStakedAmountData({ stakedAmount });
        })
        .catch(err => {})
    }

    ////////////////////////////////////
    //  Farming Functionality
    ////////////////////////////////////
    const handleHanuHarvestFormChange = (e, name) => {
        setHanuHarvestFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }
    const handleHanuUnharvestFormChange = (e, name) => {
        setHanuUnharvestFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }

    const handleGojiHarvestFormChange = (e, name) => {
        setGojiHarvestFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }
    const handleGojiUnharvestFormChange = (e, name) => {
        setGojiUnharvestFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }

    const handleMiaHarvestFormChange = (e, name) => {
        setMiaHarvestFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }
    const handleMiaUnharvestFormChange = (e, name) => {
        setMiaUnharvestFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }

    const handleGabaHarvestFormChange = (e, name) => {
        setGabaHarvestFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }
    const handleGabaUnharvestFormChange = (e, name) => {
        setGabaUnharvestFormData((prevstate) => ({...prevstate, [e.target.name]: e.target.value}))
    }

    const harvestToken = async (tokenName) => {
        var amount = 0;
        var response = "";
        var harvestTokenAddress = "";
        var tokenContract = "";

        if (!currentAccount) {
            connectWallet() // makesure site has connection to metamask stake
            return "Please connect MetaMask before performing any actions."
        }

        if (tokenName === 'hanu') {
            harvestTokenAddress = hanuContractAddress;
            tokenContract = getHanuContract();
            amount = hanuHarvestFormData.amount;
        } else if (tokenName === 'goji') {
            harvestTokenAddress = liquidityContractAddress;
            tokenContract = getLiquidityContract();
            amount = gojiHarvestFormData.amount;
        } else if (tokenName === 'mia') {
            harvestTokenAddress = '';
            tokenContract = '';
            amount = miaHarvestFormData.amount;
        } else if (tokenName === 'gaba') {
            harvestTokenAddress = '';
            tokenContract = '';
            amount = gabaHarvestFormData.amount;
        }

        const farmingContract = getFarmingContract();

        // check currently approved token value
        setLoader(true);
        await tokenContract.allowance(currentAccount, farmingContractAddress)
        .then(async (data) => {
            const val = parseInt(data._hex);
            const amountInWei = ethers.utils.parseEther(amount)._hex;

            // call approve method if amount entered is greater than previously approved value
            if (val <= parseInt(amountInWei)) {
                const amount = ethers.utils.parseEther("1000000000")._hex;
                await tokenContract.approve(farmingContractAddress, amount);
                showNotification(`${tokenName.charAt(0).toUpperCase() + tokenName.slice(1)} approved.`)
                // wait for 5 seconds after approve
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
            // check if user has enough token balance
            const tokenBalance = await tokenContract.balanceOf(currentAccount);
            if (tokenBalance >= amountInWei) {
                await farmingContract.harvest(amountInWei, harvestTokenAddress)
                .then( data => {
                    response = `Successfully Harvested ${amount} ${tokenName.charAt(0).toUpperCase() + tokenName.slice(1)}.`
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
        setLoader(false);
        return response
    }

    const unharvestToken = async (tokenName) => {
        var resp = "";
        var amount = "";
        var unHarvestTokenAddress = "";
        var unHarvestAmount = "";
        const farmingContract = getFarmingContract();

        if (tokenName === 'hanu') {
            unHarvestTokenAddress = hanuContractAddress;
            unHarvestAmount = hanuUnharvestFormData.amount;
            amount = ethers.utils.parseEther(unHarvestAmount);
        } else if (tokenName === 'goji') {
            unHarvestTokenAddress = liquidityContractAddress;
            unHarvestAmount = gojiUnharvestFormData.amount;
            amount = ethers.utils.parseEther(unHarvestAmount);
        } else if (tokenName === 'mia') {
            unHarvestTokenAddress = miaContractAddress;
            unHarvestAmount = miaUnharvestFormData.amount;
            amount = ethers.utils.parseEther(unHarvestAmount);
        } else if (tokenName === 'gaba') {
            unHarvestTokenAddress = gabaContractAddress;
            unHarvestAmount = gabaUnharvestFormData.amount;
            amount = ethers.utils.parseEther(unHarvestAmount);
        }

        setLoader(true);
        await farmingContract.Unharvest(amount, unHarvestTokenAddress)
        .then(data => {
            console.log(data);
            resp = `Successfully Unharvested ${unHarvestAmount} ${tokenName.charAt(0).toUpperCase() + tokenName.slice(1)}.`
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
        setLoader(false);
        return resp
    }

    const getHarvestedValue = async (account) => {
        const farmingContract = getFarmingContract();
        // get hanu current harvested value
        await farmingContract.FarmMap(hanuContractAddress, account)
        .then(data => {
            var harvestedAmount = ethers.utils.formatEther(data);
            setHanuHarvestedAmountData({ harvestedAmount });
        })
        .catch(err => {})
        // get mia current harvested value
        await farmingContract.FarmMap(miaContractAddress, account)
        .then(data => {
            var harvestedAmount = ethers.utils.formatEther(data);
            setMiaHarvestedAmountData({ harvestedAmount });
        })
        .catch(err => {})
        // get goji current harvested value
        await farmingContract.FarmMap(liquidityContractAddress, account)
        .then(data => {
            var harvestedAmount = ethers.utils.formatEther(data);
            setGojiHarvestedAmountData({ harvestedAmount });
        })
        .catch(err => {})
        // get gaba current harvested value
        await farmingContract.FarmMap(gabaContractAddress, account)
        .then(data => {
            var harvestedAmount = ethers.utils.formatEther(data);
            setGabaHarvestedAmountData({ harvestedAmount });
        })
        .catch(err => {})
    }

    return (
        <TransactionContext.Provider value={{
                // general context
                connectWallet,
                currentAccount,
                showNotification,

                // Any Token lock context
                lockTokenAmount,
                tokenLockingFormData,
                handleLockTokenFormChange,

                // Hanu lock context
                lockHanuAmount,
                hanuLockingFormData,
                setHanuLockingFormData,
                handleHanuFormChange,
                hanuLockTime,
                hanuLockedDate,

                // Liquidity lock context
                lockLiquidityAmount,
                liquidityLockingFormData,
                setLiquidityLockingFormData,
                handleLiquidityFormChange,
                liquidityLockTime,
                
                // Voting context
                doVote,
                getVotersData,
                votingFormData,
                handleVoteFormChange,

                // Staking context
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

                // Farming context
                harvestToken,
                unharvestToken,
                // Farming hanu context
                hanuHarvestedAmountData,
                handleHanuHarvestFormChange,
                handleHanuUnharvestFormChange,
                // Farming goji context
                gojiHarvestedAmountData,
                handleGojiHarvestFormChange,
                handleGojiUnharvestFormChange,
                // Farming mia context
                miaHarvestedAmountData,
                handleMiaHarvestFormChange,
                handleMiaUnharvestFormChange,
                // Farming gaba context
                gabaHarvestedAmountData,
                handleGabaHarvestFormChange,
                handleGabaUnharvestFormChange,
            }}>
            {children}
        </TransactionContext.Provider>
    )
}