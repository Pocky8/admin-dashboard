import React, { useState, useEffect } from 'react';
import supabase from '../data/supabase';

function Finance() {
    const [costs, setCosts] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [totalCosts, setTotalCosts] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);


    async function addFinanceData(costs, revenue) {
        const { data, error } = await supabase
            .from('finance')
            .insert([{ costs: costs, revenue: revenue }]);
    
        if (error) {
            console.error('Error adding finance data:', error.message);
        } else {
            console.log('Data added:', data);
            fetchTotals();  // <-- Ensure this line is here.
        }
    }
    

    async function fetchTotals() {
        try {
            const { data, error } = await supabase.from('finance').select('*');
            console.log(data);
            
            if (error) {
                console.error('Error fetching finance:', error.message);
            } else {
                const totalc = [];
                const totalr = [];
                
                data.forEach((fin) => {
                    totalc.push(fin.costs);
                    totalr.push(fin.revenue);
                });
    
                const totalCosts = totalc.reduce((acc, cost) => acc + cost, 0);
                const totalRevenue = totalr.reduce((acc, revenue) => acc + revenue, 0);
    
                console.log(totalCosts, totalRevenue);
    
                setTotalCosts(totalCosts);
                setTotalRevenue(totalRevenue);
            }
        } catch (error) {
            console.error("Error fetching totals:", error);
        }
    }
    

    

    useEffect(() => {
        fetchTotals();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        addFinanceData(Number(costs), Number(revenue));
        setCosts(0);
        setRevenue(0);
    };

    const centerContainer = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const cardStyle = {
        padding: '20px',
        border: '1px solid #eee',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '300px',
        backgroundColor: "#000000",
        color: 'white',
    };

    return (
        <div style={centerContainer}>
            <h1>Finance Management</h1>

            <div style={cardStyle}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="costs">Costs:</label>
                    <input
                        type="number"
                        id="costs"
                        value={costs}
                        onChange={(e) => setCosts(e.target.value)}
                        required
                    />
                    <br />

                    <label htmlFor="revenue">Revenue:</label>
                    <input
                        type="number"
                        id="revenue"
                        value={revenue}
                        onChange={(e) => setRevenue(e.target.value)}
                        required
                    />
                    <br />

                    <button type="submit">Add Data</button>
                </form>
            </div>

            <div style={cardStyle}>
                <h3>Totals:</h3>
                <p>Total Costs: ₹{totalCosts}</p>
                <p>Total Revenue: ₹{totalRevenue}</p>
            </div>
        </div>
    );
}

export default Finance;
