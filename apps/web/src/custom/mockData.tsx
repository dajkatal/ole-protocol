// mockData.tsx

export const generateMockData = () => {
    const names = [
        'dany', 'alex', 'mike', 'jane', 'sara', 'chris', 'emma', 'noah', 'olivia', 'liam',
        'zoe', 'lucas', 'mia', 'mason', 'sophia', 'ben', 'ella', 'jacob', 'ava', 'james',
        'isabella', 'will', 'charlotte', 'henry'
    ];

    const loanPurposes = [
        'Higher Education',
        'Vocational Training',
        'Online Learning',
        'Study Abroad Programs',
        'Continuing Education',
        'Professional Certifications',
        'STEM Programs',
        'Arts and Humanities',
        'Technical Schools',
        'Language Learning',
        'Research and Development',
        'Educational Workshops',
        'Internships and Apprenticeships',
        'Educational Startups',
        'E-learning Platforms'
    ];

    interface LoanData {
        ocid: string;
        loanAmount: number;
        collateral: string;
        apy: number;
        purpose: string;
        duration: string;
    }

    const mockDataRequested: LoanData[] = Array.from({ length: 23 }, (_, index) => ({
        ocid: `${names[index % names.length]}.edu`,
        loanAmount: Math.floor(Math.random() * 50000) + 1000,
        collateral: ['Real Estate', 'Art', 'Car', 'Jewelry', 'Cryptocurrency'][Math.floor(Math.random() * 5)],
        apy: parseFloat((Math.random() * (10 - 2) + 2).toFixed(2)),
        purpose: loanPurposes[Math.floor(Math.random() * loanPurposes.length)],
        duration: ['1 year', '2 years', '3 years', '4 years'][Math.floor(Math.random() * 4)],
    }));

    const mockDataSupplied: LoanData[] = Array.from({ length: 23 }, (_, index) => ({
        ocid: `${names[index % names.length]}.edu`,
        loanAmount: Math.floor(Math.random() * 40000) + 500,
        collateral: ['Real Estate', 'Art', 'Car', 'Jewelry', 'Cryptocurrency'][Math.floor(Math.random() * 5)],
        apy: parseFloat((Math.random() * (10 - 2) + 2).toFixed(2)),
        purpose: loanPurposes[Math.floor(Math.random() * loanPurposes.length)],
        duration: ['1 year', '2 years', '3 years', '4 years'][Math.floor(Math.random() * 4)],
    }));

    return {
        mockDataRequested,
        mockDataSupplied,
    };
};
