import { useState, useEffect } from 'react';
import { GetServerSideProps } from "next"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"
import { SalesManagerLayout } from "../../../../components/admin/sales-manager/SalesManagerLayout"
import { Transaction } from "../../../../types/transactionType"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import dynamic from 'next/dynamic';
import Table from "../../../../components/admin/sales-manager/SalesManagerTransactionTable"

const BarChartComponent = dynamic(() => import('../../../../components/admin/sales-manager/SalesManagerBarChartCompenent'), { ssr: false });


type AnalyticsPageProps = {
    transactions: Array<Transaction>
}

const AnalyticsPage = ({ transactions }: AnalyticsPageProps) => {
        const [startDate, setStartDate] = useState<Date | null>(null);
        const [endDate, setEndDate] = useState<Date | null>(null);

        useEffect(() => {
            const start = new Date();
            start.setHours(0,0,0,0);
            
            const end = new Date();
            end.setHours(23,59,59,999);
        
            setStartDate(start);
            setEndDate(end);
        }, []);

        const filteredTransactions = transactions.filter((transaction: Transaction) => {
                const transactionDate = new Date(transaction.date);
                return startDate && endDate && transactionDate >= startDate && transactionDate <= endDate;
                });


    const sortedTransactions = [...filteredTransactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const processData = (transactions: Array<Transaction>) => {
        let income = 0;
        let expense = 0;
    
        filteredTransactions.forEach((transaction) => {
            if (transaction.type.toLowerCase() === "income") {
                income += transaction.amount;
            } else if (transaction.type.toLowerCase() === "expense") {
                expense += transaction.amount;
            }
        });
    
        return [{ name: "Income", value: income }, { name: "Expense", value: expense }];
    };
    
    const processedData = processData(transactions);

    const incomeData = processedData.find(item => item.name === "Income");
    const expenseData = processedData.find(item => item.name === "Expense");
    const netProfit = (incomeData?.value ?? 0) - (expenseData?.value ?? 0);


    

    return (
        <div>
            <AdminLayout>
                <SalesManagerLayout>
                <div className="flex justify-center space-x-2">
                        <div className="w-1/5 p-2 rounded-md">
                        <label>Start Date</label>
                        <input 
                        type="date" 
                        className="block w-full py-2 px-4 rounded-md border-gray-300 shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={startDate ? startDate.toISOString().split('T')[0] : ""} 
                        onChange={(e) => setStartDate(new Date(e.target.value))} 
                        />
                        </div>
                        <div className="w-1/5 p-2 rounded-md">
                        <label>End Date</label>
                        <input 
                        type="date" 
                        className="block w-full py-2 px-4 rounded-md border-gray-300 shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={endDate instanceof Date && !isNaN(endDate as any) ? endDate.toISOString().split('T')[0] : ""}  
                        onChange={(e) => setEndDate(new Date(e.target.value))} 
                        />
                        </div>
                </div>



                
                
                <div className="flex justify-center space-x-2">
                        <div className="w-1/2">
                        <BarChartComponent data={processedData} />
                        <p className="text-center font-bold">Net Profit: ₺{netProfit.toFixed(2)}</p>
                        </div>
                        

                        <div className="w-3/5">
                        <Table data={sortedTransactions} />
                        </div>
                </div>

                </SalesManagerLayout>
            </AdminLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<AnalyticsPageProps> = async () => {
    const response = await fetch(`http://localhost:5001/transaction/alltransactions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const transactions = await response.json();

    return {
        props: {
            transactions: transactions,
        }
    }
}

export default AnalyticsPage
