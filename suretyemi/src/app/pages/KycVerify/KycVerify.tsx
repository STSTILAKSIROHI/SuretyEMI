import React, { useState } from 'react'
import { dirtirbutorKYCcolumns, dirtirbutorKYCData, kycColumns } from '../../api/api'
import DistirbutorViewDtlMdl from '../../content/model/DistirbutorViewDtlMdl'
import RemarkMdl from '../../content/model/RemarkMdl'
import DistirbutorKycTbl from '../../content/table/DistirbutorKycTbl'

const KycVerify = () => {
    const [viewKYCDetails, setKYCDetails] = useState<boolean>(false);
    const [remark, setRemark] = useState<boolean>(false);
    return (
        <>
            <div className='ps-3 pe-3 mt-3'>
                <DistirbutorKycTbl
                    data={dirtirbutorKYCData}
                    columns={dirtirbutorKYCcolumns}
                    setDetails={() => setKYCDetails(true)}
                />

                <DistirbutorViewDtlMdl
                    show={viewKYCDetails}
                    onHide={() => setKYCDetails(false)}
                    kycColumns={kycColumns}
                    flag={'k'}
                    setRemark={setRemark}
                />
                <RemarkMdl show={remark} setShow={setRemark} />
            </div>
        </>
    )
}

export default KycVerify
