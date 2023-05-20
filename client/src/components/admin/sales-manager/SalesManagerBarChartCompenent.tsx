import { FC } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';

type BarChartData = {
    name: string;
    value: number;
}[];

type BarChartComponentProps = {
    data: BarChartData;
};


const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip" style={{ backgroundColor: '#fff', border: '1px solid #999', margin: 0, padding: 10 }}>
              <p className="label">{`${label}`}</p>
              <p className="value">{`₺${payload[0].value.toFixed(2)}`}</p>
            </div>
          );
        }
      
        return null;
    };

const BarChartComponent: FC<BarChartComponentProps> = ({ data }) => (
    <BarChart width={450} height={450} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        
        <Bar dataKey="value">
            {
                data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Income' ? '#82ca9d' : '#d22b2b'} />
                ))
            }
        </Bar>
    </BarChart>
);

export default BarChartComponent;
