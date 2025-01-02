const erc20ABI = [
    "function decimals() external pure returns (uint8)"
]

const routerAbi = [
    'function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)',
];

module.exports = {
    erc20ABI, routerAbi
}