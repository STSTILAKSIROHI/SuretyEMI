
import { Card, Col, Row } from 'react-bootstrap';
import { MdOutlineShowChart, MdTrendingDown } from 'react-icons/md';
import { TbCurrencyRupeeNepalese } from 'react-icons/tb';
import { sellerdata } from '../../../api/api';
import SellerTbl from '../../../content/table/SellerTbl';

const SellerInfo = () => {
    return (
        <div>
            <Row className="g-3">
                {sellerdata.map((item) => (
                    <Col sm={6} lg={3} key={item.id}>
                        <Card className="border-0 shadow-sm h-100 hover-scale">
                            <Card.Body className="p-4">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    {/* Icon Box */}
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3"
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            backgroundColor: item.bg,
                                            color: item.text
                                        }}
                                    >
                                        {item.icon}
                                    </div>

                                    {/* Trend Badge */}
                                    <div className={`d-flex align-items-center small fw-bold ${item.trendUp ? 'text-success' : 'text-danger'}`}>
                                        {item.trend}
                                        {item.trendUp ? <MdOutlineShowChart className="ms-1" /> : <MdTrendingDown className="ms-1" />}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-muted text-uppercase fw-semibold small mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                                        {item.title}
                                    </p>
                                    <h3 className="fw-bold text-dark mb-1 d-flex align-items-center">
                                        {item.id !== 1 && <TbCurrencyRupeeNepalese size={26} className="me-1 text-secondary opacity-50" />}
                                        {item.amount}
                                    </h3>
                                    <p className="text-muted small mb-0">
                                        {item.desc}
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <SellerTbl />
        </div>
    )
}

export default SellerInfo;