import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

// Sample data for the charts
const bookingsData = [
    { name: 'Jan', count: 30 },
    { name: 'Feb', count: 45 },
    { name: 'Mar', count: 60 },
    { name: 'Apr', count: 50 },
    { name: 'May', count: 70 },
];

const incomeData = [
    { name: 'Jan', income: 1200 },
    { name: 'Feb', income: 1600 },
    { name: 'Mar', income: 2100 },
    { name: 'Apr', income: 1900 },
    { name: 'May', income: 2500 },
];

const userInteractionData = [
    { name: 'Jan', interactions: 200 },
    { name: 'Feb', interactions: 350 },
    { name: 'Mar', interactions: 300 },
    { name: 'Apr', interactions: 400 },
    { name: 'May', interactions: 480 },
];

// Reusable Chart Block Component
const ChartBlock = ({ title, data, dataKey, color, xLabel, yLabel }) => (
    <Box my={5}>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    label={{ value: xLabel, position: 'bottom', offset: 0 }}
                />
                <YAxis
                    label={{ value: yLabel, angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey={dataKey}
                    fill={color}
                    isAnimationActive={true}
                    animationBegin={0}
                    animationDuration={1500}
                />
            </BarChart>
        </ResponsiveContainer>
    </Box>
);

// Main Analytics Component
const Analytics = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Analytics & Reports
            </Typography>

            <ChartBlock
                title="Monthly Bookings"
                data={bookingsData}
                dataKey="count"
                color="#1976d2"
                xLabel="Month"
                yLabel="Bookings"
            />

            <ChartBlock
                title="Monthly Income"
                data={incomeData}
                dataKey="income"
                color="#388e3c"
                xLabel="Month"
                yLabel="Income ($)"
            />

            <ChartBlock
                title="User Interactions"
                data={userInteractionData}
                dataKey="interactions"
                color="#f57c00"
                xLabel="Month"
                yLabel="Interactions"
            />
        </Container>
    );
};

export default Analytics;
