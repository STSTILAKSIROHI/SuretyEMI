import React from 'react';
import { Badge, Card, Row, Col } from 'react-bootstrap';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// Default data in case none is passed via props
const defaultData = [
    { name: 'Failed EMI', value: 30, color: '#5e5ce6' },
    { name: 'Successful EMI', value: 70, color: '#ff9f43' },
];

const DonutChart = ({
    data = defaultData,
    title = "EMI Analysis",
    totalLabel = "Total EMI",
    totalValue = "23,454"
}) => {
    return (
        <Card className="border-0  h-100 ">
            <Card.Body className="p-4">
                {/* --- Header Section --- */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
                    <h5 className="fw-normal text-secondary mb-0">{title}</h5>
                    <div className="d-flex gap-2">
                        <Badge bg="light" text="secondary" className="fw-normal cursor-pointer">Daily</Badge>
                        <Badge bg="secondary" text="white" className="fw-normal cursor-pointer">Monthly</Badge>
                        <Badge bg="light" text="secondary" className="fw-normal cursor-pointer">Yearly</Badge>
                    </div>
                </div>

                <Row className="align-items-center">
                    {/* --- Chart Section --- */}
                    <Col xs={12} sm={7} className="position-relative" style={{ minHeight: '220px' }}>
                        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    innerRadius="65%"
                                    outerRadius="90%"
                                    paddingAngle={0}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* --- Center Text (Absolute Centered) --- */}
                        <div
                            className="position-absolute top-50 start-50 translate-middle text-center"
                            style={{ pointerEvents: 'none' }} // Allows clicking through text to the chart
                        >
                            <small className="text-muted d-block text-uppercase" style={{ fontSize: '0.75rem' }}>
                                {totalLabel}
                            </small>
                            <h4 className="fw-bold mb-0 text-dark">{totalValue}</h4>
                        </div>
                    </Col>

                    {/* --- Legend Section --- */}
                    <Col xs={12} sm={5} className="mt-3 mt-sm-0">
                        <div className="d-flex flex-column justify-content-center gap-3">
                            {data.map((entry, index) => (
                                <div key={index} className="d-flex align-items-center justify-content-between w-100">
                                    <div className="d-flex align-items-center">
                                        <span
                                            className="rounded-circle d-inline-block me-2"
                                            style={{ width: 10, height: 10, backgroundColor: entry.color }}
                                        ></span>
                                        <span className="text-secondary small fw-medium">
                                            {entry.name}
                                        </span>
                                    </div>
                                    <span className="fw-bold small text-dark">
                                        {entry.value}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default DonutChart;