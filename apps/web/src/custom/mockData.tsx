// mockData.tsx

export const generateMockData = () => {
    const names = [
        'dany', 'alex', 'mike', 'jane', 'sara', 'chris', 'emma', 'noah', 'olivia', 'liam',
        'zoe', 'lucas', 'mia', 'mason', 'sophia', 'ben', 'ella', 'jacob', 'ava', 'james',
        'isabella', 'will', 'charlotte', 'henry',
    ];

    const loanPurposes = [
        'Tuition Fees',
        'Textbooks and Supplies',
        'Online Course Enrollment',
        'Laptop or Computer Purchase',
        'Tutoring Classes',
        'Study Abroad Expenses',
        'Certification Exam Fees',
        'Laboratory Equipment',
        'Educational Software Licenses',
        'Professional Development Workshops',
        'Research Project Funding',
        'Field Trip Costs',
        'Student Housing Fees',
        'Academic Conference Attendance',
        'Language Learning Courses',
        'Internship Relocation Costs',
        'Art Supplies and Equipment',
        'Vocational Training Materials',
        'Music or Dance Lessons',
        'SAT/ACT Preparation Classes',
    ];

    interface RequestedLoanData {
        amount: number;
        reason: string;
        fulfilled: boolean;
        daysTillExpiry: number;
        apy: number;
    }

    interface SuppliedLoanData {
        amount: number;
        borrowerOCID: string;
        status: 'Ongoing' | 'Defaulted' | 'Paid'; // Updated status field
        daysTillExpiry: number;
        apy: number;
        profitOnFulfilment: number;
    }

    // Generating mock data for requested loans
    const mockDataRequested: RequestedLoanData[] = Array.from({ length: 6 }, () => ({
        amount: Math.floor(Math.random() * 50000) + 1000,
        reason: loanPurposes[Math.floor(Math.random() * loanPurposes.length)],
        daysTillExpiry: Math.floor(Math.random() * 365), // Random number of days till expiry,
        fulfilled: Math.random() > 0.65, // Randomly set fulfilled to true or false
        apy: parseFloat((Math.random() * (10 - 2) + 2).toFixed(2))
    })).map((loan) => ({
        ...loan,
        repay: loan.fulfilled ? Math.random() > 0.5 : undefined, // Set repay if fulfilled is true
    }));

    // Generating mock data for supplied loans
    const mockDataSupplied: SuppliedLoanData[] = Array.from({ length: 4 }, (_, index) => {
        const amount = Math.floor(Math.random() * 40000) + 500;
        const apy = parseFloat((Math.random() * (10 - 2) + 2).toFixed(2));

        // Determine the status randomly
        const status = Math.random() > 0.85 ? 'Defaulted' : (Math.random() > 0.35 ? 'Paid' : 'Ongoing');

        return {
            amount,
            borrowerOCID: `${names[index % names.length]}.edu`,
            status, // Use the new status field
            daysTillExpiry: Math.floor(Math.random() * 365), // Random number of days till expiry
            apy,
            profitOnFulfilment: amount * (apy / 100), // Calculate profit on fulfilment
        };
    });

    return {
        mockDataRequested,
        mockDataSupplied,
    };
};
