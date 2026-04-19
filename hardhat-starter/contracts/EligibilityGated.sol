// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IEligibility
 * @dev Interface for Redbelly's on-chain eligibility check.
 * Deployed at the eligibility contract address on Redbelly Network.
 */
interface IEligibility {
    function hasChainPermission(address user) external view returns (bool);
}

/**
 * @title EligibilityGated
 * @dev Base contract for any Redbelly contract that requires KYC verification.
 * Inherit from this and use the `onlyEligible` modifier to gate any function.
 *
 * Usage:
 *   contract MyToken is EligibilityGated, ERC20 {
 *       function mint(address to, uint256 amount) external onlyEligible(to) {
 *           _mint(to, amount);
 *       }
 *   }
 */
abstract contract EligibilityGated {
    IEligibility public eligibilityContract;

    event EligibilityContractUpdated(address indexed oldAddress, address indexed newAddress);

    error NotEligible(address user);

    constructor(address _eligibilityContract) {
        require(_eligibilityContract != address(0), "EligibilityGated: zero address");
        eligibilityContract = IEligibility(_eligibilityContract);
    }

    /**
     * @dev Reverts if the given address has not completed KYC on Redbelly.
     */
    modifier onlyEligible(address user) {
        if (!eligibilityContract.hasChainPermission(user)) {
            revert NotEligible(user);
        }
        _;
    }

    /**
     * @dev Check eligibility status for any address.
     */
    function isEligible(address user) public view returns (bool) {
        return eligibilityContract.hasChainPermission(user);
    }

    /**
     * @dev Update the eligibility contract address.
     * Override in your contract and add access control (e.g., onlyOwner).
     */
    function _updateEligibilityContract(address newAddress) internal {
        require(newAddress != address(0), "EligibilityGated: zero address");
        address old = address(eligibilityContract);
        eligibilityContract = IEligibility(newAddress);
        emit EligibilityContractUpdated(old, newAddress);
    }
}
