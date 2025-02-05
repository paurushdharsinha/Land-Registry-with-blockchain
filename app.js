// Connect to the blockchain using Web3
if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    ethereum.request({ method: 'eth_requestAccounts' });
} else {
    alert('Please install MetaMask to use this application.');
}

const contractAddress = 'YOUR_SMART_CONTRACT_ADDRESS'; // Replace with your contract address
const abi = [
    // Add your contract's ABI here
];

const contract = new web3.eth.Contract(abi, contractAddress);

// Register land
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const owner = document.getElementById('owner').value;
    const landId = document.getElementById('landId').value;
    const location = document.getElementById('location').value;

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.registerLand(owner, landId, location).send({ from: accounts[0] });
        document.getElementById('registerMessage').textContent = 'Land successfully registered!';
    } catch (error) {
        console.error(error);
        document.getElementById('registerMessage').textContent = 'Error registering land.';
    }
});

// Transfer land ownership
const transferForm = document.getElementById('transferForm');
transferForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fromOwner = document.getElementById('fromOwner').value;
    const toOwner = document.getElementById('toOwner').value;
    const landId = document.getElementById('transferLandId').value;

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.transferOwnership(fromOwner, toOwner, landId).send({ from: accounts[0] });
        document.getElementById('transferMessage').textContent = 'Ownership transferred successfully!';
    } catch (error) {
        console.error(error);
        document.getElementById('transferMessage').textContent = 'Error transferring ownership.';
    }
});

// Verify land ownership
const verifyForm = document.getElementById('verifyForm');
verifyForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const landId = document.getElementById('verifyLandId').value;

    try {
        const owner = await contract.methods.getOwner(landId).call();
        document.getElementById('verifyMessage').textContent = `Land is owned by: ${owner}`;
    } catch (error) {
        console.error(error);
        document.getElementById('verifyMessage').textContent = 'Error verifying ownership.';
    }
});
