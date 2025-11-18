
import React, { useEffect, useState } from 'react';
import './Step.css';
import { FaCheck } from 'react-icons/fa';
interface StepProps {
    stepNumber: number;
    Type?: string;
    steps?: any[];
}

const Step: React.FC<StepProps> = ({ stepNumber, Type, steps = [] }) => {
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='px-5'>
            <div className={`align-items-center d-flex z-2 position-relative justify-content-center ${Type === 'H' ? 'p-4 flex-column' : screenWidth > 990 ? 'my-4' : ''}`}>
                {steps.map((item, i) => (
                    <div className={`wizard-container d-flex align-items-center ${Type === 'H' && steps.length - 1 > i ? 'pb-4' : ''}`} key={i}>
                        <div className={`${stepNumber >= i ? 'wizard-active' : 'wizard-inactive'} wizard`}>
                            {stepNumber <= i ? (
                                <span>{i + 1}</span>
                            ) : (
                                <span className="text-2xl pb-1">
                                    <FaCheck width="16" height="16" />
                                </span>
                            )}
                        </div>
                        <div
                            className={`${stepNumber >= i ? 'wizard-devided-active' : 'wizard-devided-inactive'
                                } ${Type === 'H' ? 'wizard-horizantal' : 'wizard-devided'}`}
                        ></div>
                        {screenWidth > 990 && (
                            <span className={`text-md text-slate-500 px-2 wizard-text ${stepNumber >= i ? 'fw-semibold text-orange' : ''}`} >{item.apiNm} </span>
                        )}
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Step;
