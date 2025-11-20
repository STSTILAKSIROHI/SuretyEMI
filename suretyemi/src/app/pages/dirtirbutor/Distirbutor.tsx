
import DistirbutorTbl from '../../content/table/DistirbutorTbl';
import DistirbutorViewDtlMdl from '../../content/model/DistirbutorViewDtlMdl';
import { dirtirbutorcolumns, dirtirbutorData, kycColumns } from '../../api/api';
import { useState } from 'react';
import RemarkMdl from '../../content/model/RemarkMdl';

const Distirbutor = () => {
    const [viewDetails, setDetails] = useState<boolean>(false);
    const [remark, setRemark] = useState<boolean>(false);
    return (
        <div className='ps-3 pe-3 mt-3'>
            <DistirbutorTbl
                data={dirtirbutorData}
                columns={dirtirbutorcolumns}
                setDetails={() => setDetails(true)}
            />

            <DistirbutorViewDtlMdl
                show={viewDetails}
                onHide={() => setDetails(false)}
                kycColumns={kycColumns}
                flag="v"
                setRemark={setRemark}
            />
            <RemarkMdl show={remark} setShow={setRemark} />
        </div>
    );
}

export default Distirbutor;