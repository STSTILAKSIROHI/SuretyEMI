import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import * as ExcelJS from 'exceljs';
import { getUserData } from "./common";
import { downloadFiles } from "./helper";
import productLogo from "../assests/images/login/logo_api.png";
// import { columnHeader } from "../types/type";
import { CellHookData, UserOptions } from "jspdf-autotable";


declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: UserOptions) => void;
    }
}

export function pdfFileDownLoad<T>(
    columnData: any[],
    data: T[],
    downloadfileName: string,
    fileNm: string,
    orientationType?: string,
    pageSize?: string,
    total?: boolean,
) {
    const userData = getUserData();

    const unit = "pt";
    const size = pageSize || "A4"; // Page size
    const orientation = orientationType === "L" ? "landscape" : "portrait"; // portrait or landscape

    const marginLeft = 10;
    const marginTop = 50;
    const borderThickness = 1; // Thickness of the border line
    const bodyPaddingLeft = 5; // Padding on the left side of the body content
    const bodyPaddingRight = 5; // Padding on the right side of the body content
    const doc = new jsPDF(orientation, unit, size);

    const title = `Print Date: ${moment().format("DD-MM-YYYY")}`;
    const printBy = `By: ${userData.userNm}`;
    const bankName = userData.clientNm;
    const email = userData.email;
    const mobileNo = userData.mobileNo;

    const headers = [columnData.map((i: any) => i.header)];

    let columnAlignment: any = {};

    columnData.map((items: any, index: number) => {
        columnAlignment = { ...columnAlignment, [index]: { halign: (items.align === "end" && "right") || (items.align === "start" && "left") || items.align } };
        return false;
    });

    const body = data.map((row: T) =>
        columnData.map((column: any) => row[column.field as keyof T])
    );

    // Add logo to the PDF
    const logoWidth = 110;
    const logoHeight = 40;
    const logoX = marginLeft;
    const logoY = marginTop - 45;
    doc.addImage(productLogo, "PNG", logoX, logoY, logoWidth, logoHeight);

    // Add company name near the logo
    const bankNameX = logoX + logoWidth + 10;
    const bankNameY = logoY + logoHeight / 3;
    doc.setTextColor(73, 105, 137);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.text(bankName, bankNameX, bankNameY);

    // Add email and mobile number below the company name
    const contactMargin = 12;
    const emailX = bankNameX;
    const emailY = bankNameY + contactMargin;
    doc.setFontSize(8);
    doc.text(`Mobile: ${mobileNo} | Email: ${email}`, emailX, emailY);

    // Add title with print date to the right side
    const titleX = doc.internal.pageSize.width - marginLeft - 150;
    const titleY = emailY + 12;
    doc.setFontSize(8);
    doc.text(title, titleX, titleY);

    // Add From and To dates to the left side, below the logo
    const fileNmX = marginLeft + 5;
    const fileNmY = titleY + 30; // Adjusted Y position to be below the header
    doc.setTextColor(0, 0, 0);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(8);
    doc.text(fileNm, fileNmX, fileNmY);

    // Draw a border line at the bottom of the header
    const borderY = titleY + 10; // Y position for the border line (bottom of header + margin)
    doc.setDrawColor(0, 0, 0); // Set border color
    doc.setLineWidth(borderThickness);
    doc.line(
        marginLeft,
        borderY,
        doc.internal.pageSize.width - marginLeft,
        borderY
    );

    // Ensure the content starts after the header section
    const contentStartY = fileNmY + 10; // Start the table just below the border line
    const content = {
        startY: contentStartY, // Start the table after the header
        head: headers,
        body: body,

        didParseCell: (items: CellHookData) => {
            if (items.row.index === data.length - 1 && total) { // Check if it's the last row
                items.cell.styles.fillColor = [52, 73, 94]; // Set fill color to blue
                items.cell.styles.textColor = [255, 255, 255]; // Set text color to white
            }
        },

        didDrawPage: function (data: CellHookData) {
            // Page number on the left side at the bottom of the page
            const pageNumberText = `Page: ${data.pageNumber}`;
            const pageSize = doc.internal.pageSize;
            const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            doc.setFontSize(10);
            doc.text(pageNumberText, data.settings.margin.left, pageHeight - 25); // Left-aligned

            // "Print By" on the right side at the bottom of the page
            const printByX = doc.internal.pageSize.width - marginLeft - 110; // Adjusted to align right
            doc.text(printBy, printByX, pageHeight - 25); // Right-aligned
        },

        margin: {
            top: contentStartY, // Adjusted margin for the table
            left: marginLeft + bodyPaddingLeft, // Left padding
            right: marginLeft + bodyPaddingRight, // Right padding
        },
        theme: "grid",
        styles: {
            fontSize: 7,
            cellPadding: 5,
            lineColor: [44, 62, 80],
            lineWidth: 0.75,
            halign: "left",
            valign: "middle",
        },
        bodyStyles: columnAlignment,
        columnStyles: columnAlignment,
        headStyles: {
            fillColor: [255, 255, 255],
            textColor: [52, 73, 94],
            fontSize: 7,
            halign: "center",
            valign: "middle",
            lineWidth: 1,
            lineColor: [0, 0, 0],
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255],
        },
    };

    (doc as any).autoTable(content);

    doc.save(downloadfileName);
}



export const excelFileDownload = async (
    columnData: any,
    apiData: any,
    fileName?: any,
    total?: boolean
) => {

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Report');

    const headerRow = sheet.addRow(columnData.map((item: any) => item.header));
    headerRow.font = { bold: true };
    headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFCFCFCF' },
    };


    apiData.forEach((data: any) => {
        sheet.addRow(columnData.map((item: any) => data[item.field]));
        return false;
    });

    const lastRow = sheet.lastRow;

    // Change the fill color of the last row
    if (lastRow && total) {
        lastRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF5D68E' } // Green color
        };
    }

    // Save the workbook
    workbook.xlsx.writeBuffer().then((data: any) => {
        const blob: any = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        var url = window.URL.createObjectURL(blob);
        downloadFiles(url, fileName + '.xlsx')
    });
};