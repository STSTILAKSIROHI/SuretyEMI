import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { financeData } from '../../api/api'
import { Card, Form } from 'react-bootstrap'

function TradeChart() {
    return (
        <Card className="border-0 h-100">
            <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-normal text-secondary">Total finances</h5>
                    <Form.Select size="sm" style={{ width: '100px', border: 'none' }}>
                        <option>2022</option>
                        <option>2023</option>
                    </Form.Select>
                </div>
                <div style={{ height: '300px', width: '100%' }}>
                    <ResponsiveContainer>
                        <AreaChart data={financeData}>
                            <defs>
                                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ff9f43" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ff9f43" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#b9b9c3', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#b9b9c3', fontSize: 12 }} tickFormatter={(value) => `${value / 1000}k`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#7367f0', borderRadius: '8px', border: 'none', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{ stroke: '#ff9f43', strokeWidth: 1 }}
                            />
                            <Area type="monotone" dataKey="value" stroke="#ff9f43" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card.Body>
        </Card>
    )
}

export default TradeChart
