// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OLEProtocol is Ownable, ReentrancyGuard {
    IERC20 public usdtToken;

    struct Loan {
        address borrower;
        uint256 amount;
        uint256 collateral;
        uint256 duration;
        uint256 apy;
        string reason;
        bool fulfilled;
        address lender;
        uint256 startTime;
    }

    Loan[] public loans;
    mapping(address => uint256[]) public userLoans;
    mapping(address => uint256[]) public userSupplies;

    uint256 public constant COLLATERAL_RATIO = 120; // 120% overcollateralization
    uint256 public constant BASE_APY = 1000; // 10% APY

    constructor(address _usdtToken) Ownable(msg.sender) {
        usdtToken = IERC20(_usdtToken);
    }

    function getUserLoans(address user) external view returns (uint256[] memory) {
        return userLoans[user];
    }

    function getUserSupplies(address user) external view returns (uint256[] memory) {
        return userSupplies[user];
    }

    function getAvailableLoans() external view returns (Loan[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < loans.length; i++) {
            if (!loans[i].fulfilled) {
                count++;
            }
        }

        Loan[] memory availableLoans = new Loan[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < loans.length; i++) {
            if (!loans[i].fulfilled) {
                availableLoans[index] = loans[i];
                index++;
            }
        }

        return availableLoans;
    }

    function requestLoan(uint256 amount, uint256 duration, string memory reason) external payable nonReentrant {
        require(amount > 0, "Loan amount must be greater than 0");
        require(duration > 0, "Loan duration must be greater than 0");

        uint256 collateralAmount = (amount * COLLATERAL_RATIO) / 100;
        uint256 apy = BASE_APY;

        require(msg.value >= collateralAmount, "Insufficient collateral");

        loans.push(Loan({
            borrower: msg.sender,
            amount: amount,
            collateral: collateralAmount,
            duration: duration,
            apy: apy,
            reason: reason,
            fulfilled: false,
            lender: address(0),
            startTime: 0
        }));

        userLoans[msg.sender].push(loans.length - 1);

        // Refund excess collateral
        if (msg.value > collateralAmount) {
            payable(msg.sender).transfer(msg.value - collateralAmount);
        }
    }

    function supplyLoan(uint256 loanId) external nonReentrant {
        require(loanId < loans.length, "Invalid loan ID");
        Loan storage loan = loans[loanId];
        require(!loan.fulfilled, "Loan already fulfilled");
        require(usdtToken.transferFrom(msg.sender, loan.borrower, loan.amount), "USDT transfer failed");

        loan.fulfilled = true;
        loan.lender = msg.sender;
        loan.startTime = block.timestamp;

        userSupplies[msg.sender].push(loanId);
    }

    function repayLoan(uint256 loanId) external nonReentrant {
        require(loanId < loans.length, "Invalid loan ID");
        Loan storage loan = loans[loanId];
        require(loan.fulfilled, "Loan not yet fulfilled");
        require(loan.borrower == msg.sender, "Not the borrower");
        require(block.timestamp <= loan.startTime + loan.duration * 1 days, "Loan period expired");

        uint256 interest = (loan.amount * loan.apy * loan.duration) / (365 * 10000);
        uint256 totalRepayment = loan.amount + interest;

        require(usdtToken.transferFrom(msg.sender, loan.lender, totalRepayment), "USDT transfer failed");
        
        // Return collateral
        payable(msg.sender).transfer(loan.collateral);

        // Remove the loan from userLoans and userSupplies
        removeLoanFromUser(loan.borrower, loanId);
        removeLoanFromUser(loan.lender, loanId);

        // Delete the loan (replace with the last element and pop)
        loans[loanId] = loans[loans.length - 1];
        loans.pop();
    }

    function removeLoanFromUser(address user, uint256 loanId) internal {
        uint256[] storage userLoanIds = userLoans[user];
        for (uint256 i = 0; i < userLoanIds.length; i++) {
            if (userLoanIds[i] == loanId) {
                userLoanIds[i] = userLoanIds[userLoanIds.length - 1];
                userLoanIds.pop();
                break;
            }
        }
    }

    // Function to withdraw any excess EDU tokens (native tokens) from the contract
    function withdrawExcessEDU(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(owner()).transfer(amount);
    }

    // Allow the contract to receive EDU (native token)
    receive() external payable {}
}