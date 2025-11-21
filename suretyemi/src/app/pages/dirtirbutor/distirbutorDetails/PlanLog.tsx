
import { Col, Row } from 'react-bootstrap';
import { summaryStats } from '../../../api/api';
import PlanLogTbl from '../../../content/table/PlanLogTbl';

const PlanLog = () => {
    return (
        <>
            {/* --- Top Section: Plan Summary Stats --- */}
            <div className='bg-white p-4 rounded-3 mb-4 mt-3 shadow-sm'>
                <Row className='g-4'>
                    {summaryStats.map((stat, index) => (
                        <Col key={index} xs="auto" className='me-4'>
                            <div className='d-flex flex-column'>
                                <span className='text-muted small mb-1' style={{ fontSize: '12px', fontWeight: '500' }}>
                                    {stat.label}
                                </span>
                                <span className={`fs-6 `}>
                                    {stat.value}
                                </span>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
            <PlanLogTbl />

        </>
    )
}

export default PlanLog