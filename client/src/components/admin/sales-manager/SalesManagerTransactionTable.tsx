import React from 'react';
import { Transaction } from '../../../types/transactionType';

type TableProps = {
    data: Transaction[];
};

const Table: React.FC<TableProps> = ({ data }) => {
    return (
        <table className="table-auto w-full mt-4">
            <thead>
                <tr>
                    <th className="px-4 text-left p-2">Type</th>
                    <th className="px-4 text-left p-2">Amount</th>
                    <th className="px-4 text-left p-2">Date</th>
                </tr>
            </thead>
            <tbody>
                {data.map((transaction: Transaction) => (
                    <tr key={transaction._id}>
                        <td className="border px-4 py-2">{transaction.type}</td>
                        <td className="border px-4 py-2">₺{transaction.amount}</td>
                        <td className="border px-4 py-2">{new Date(transaction.date).toDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
