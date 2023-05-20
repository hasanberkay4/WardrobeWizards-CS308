import { useState, useEffect } from 'react';
import { GetServerSideProps } from "next"
import { AdminLayout } from "../../../../components/admin/shared/AdminLayout"
import { SalesManagerLayout } from "../../../../components/admin/sales-manager/SalesManagerLayout"
import { Delivery } from "../../../../types/delivery"

type InvoicesPageProps = {
    deliveries: Array<Delivery>
}

const InvoicesPage = ({ deliveries }: InvoicesPageProps) => {
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

    const filteredDeliveries = deliveries.filter((delivery: Delivery) => {
        const deliveryDate = new Date(delivery.date);
        return startDate && endDate && deliveryDate >= startDate && deliveryDate < new Date(endDate.getTime() + 24 * 60 * 60 * 1000);
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    
//return the table 
    return (
        <div>
            <AdminLayout>
                <SalesManagerLayout>
                <div className="flex justify-center space-x-2">
                        <div className="w-1/5">
                                <label>Start Date</label>
                                <input 
                                type="date" 
                                className="block w-full py-2 px-4 rounded-md border-gray-300 shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={startDate ? startDate.toISOString().split('T')[0] : ""} 
                                onChange={(e) => setStartDate(new Date(e.target.value))} 
                                />
                        </div>
                        <div className="w-1/5">
                                <label>End Date</label>
                                <input 
                                type="date" 
                                className="block w-full py-2 px-4 rounded-md border-gray-300 shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={endDate instanceof Date && !isNaN(endDate as any) ? endDate.toISOString().split('T')[0] : ""} 
                                onChange={(e) => setEndDate(new Date(e.target.value))} 
                                />
                        </div>
                </div>


                <div className="mt-4">
                        <table className="table-auto w-full mt-4">
                                <thead>
                                <tr>
                                        <th className="text-left p-2">Date</th>
                                        <th className="text-left p-2">Invoice</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredDeliveries.map((delivery: Delivery) => (
                                        <tr key={delivery._id}>
                                        <td className="border border-gray-300 p-2">{new Date(delivery.date).toDateString()}</td>
                                        <td className="border border-gray-300 p-2"><a      href={`http://localhost:5001/products/delivery/invoice/${delivery._id}`} target="_blank">View Invoice</a></td>
                                        </tr>
                                ))}
                                </tbody>
                        </table>
                </div>

                </SalesManagerLayout>
            </AdminLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<InvoicesPageProps> = async () => {
    const response = await fetch(`http://localhost:5001/products/delivery`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const deliveries = await response.json();

    return {
        props: {
            deliveries: deliveries,
        }
    }
}

export default InvoicesPage

