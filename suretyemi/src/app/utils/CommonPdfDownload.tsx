// components/CommonPdfDownload.tsx

import { toJpeg } from "html-to-image";
import moment from "moment";
import logo from '../assests/images/login/logo_api.png';
import { Button } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";
import { getUserData } from "./common";
import { jsPDF } from "jspdf";
import { useState } from "react";
import { BiLoader } from "react-icons/bi";

type CommonPdfDownloadProps = {
    fileName?: string;
    imageRef: React.RefObject<HTMLElement | null>;
    reqDate?: string;
    apiRefNo?: string;
};

const CommonPdfDownload = ({ fileName, imageRef, reqDate, apiRefNo, }: CommonPdfDownloadProps) => {

    const [isPdfLoader, setIsPdfloader] = useState<boolean>(false)
    const userData = getUserData();
    const companyName = userData?.clientNm || "Soft-Tech Solutions";



    const handleDownload = async () => {
        try {
            setIsPdfloader(true)


            if (!imageRef.current) return;

            const doc = new jsPDF("portrait", "pt", "A4");
            const marginLeft = 10;
            const marginTop = 50;

            const printDate = `Print Date: ${moment().format("DD-MM-YYYY")}, By: ${userData?.userNm || "-"}`;

            // Header Logo
            const logoWidth = 80;
            const logoHeight = 40;
            const logoX = marginLeft;
            const logoY = marginTop - 45;

            doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);

            // Company Info
            const textX = logoX + logoWidth + 10;
            const textY = logoY + 15;

            doc.setTextColor(73, 105, 137);
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(14);
            doc.text(companyName, textX, textY);

            doc.setTextColor(0, 0, 0);
            doc.setFontSize(8);
            doc.setFont("Helvetica", "normal");
            doc.text(`Mobile: ${userData?.mobileNo} | Email: ${userData?.email}`, textX, textY + 12);
            doc.text(printDate, textX, textY + 24);

            // Bottom Line
            const borderY = textY + 35;
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(1);
            doc.line(marginLeft, borderY, doc.internal.pageSize.width - marginLeft, borderY);

            // Request Date & API Ref No (only if both exist)
            if (reqDate && apiRefNo) {
                doc.setFontSize(10);
                doc.setFont("Helvetica", "normal");
                const y = borderY + 15;

                // Left: Request Date
                doc.text(`Request Date: ${reqDate}`, marginLeft, y + 8);

                // Right: API Ref No
                const rightText = `API Ref No: ${apiRefNo}`;
                const textWidth = doc.getTextWidth(rightText);
                const pageWidth = doc.internal.pageSize.width;
                doc.text(rightText, pageWidth - marginLeft - textWidth, y + 8);
            }

            // Image capture & center it
            const imgData = await toJpeg(imageRef.current, { cacheBust: false });
            const pageWidth = doc.internal.pageSize.getWidth();
            const imgWidth = 300;
            const imgHeight = (imageRef.current.clientHeight / imageRef.current.clientWidth) * imgWidth;
            const imgX = (pageWidth - imgWidth) / 2;
            const imgY = borderY + 50;

            doc.addImage(imgData, "JPEG", imgX, imgY, imgWidth, imgHeight);

            doc.save(fileName || "document.pdf");

        }

        catch (error) {
            // Igono Case 
        } finally {
            setIsPdfloader(false);
        }
    };


    return (

        <Button disabled={isPdfLoader} onClick={handleDownload} className="btn-sm" variant='outline-danger' >
            {!isPdfLoader ? <div> <BsDownload className="me-2" /> Download PDF </div> : (
                <>
                    <BiLoader className="bx-spin text-white text-lg me-2" />
                    Loading...
                </>
            )}
        </Button>
    );
};

export default CommonPdfDownload;
