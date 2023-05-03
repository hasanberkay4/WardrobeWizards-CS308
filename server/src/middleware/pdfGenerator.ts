const nodemailer = require('nodemailer');
import PDFDocument from 'pdfkit';
import * as fs from 'fs';


import User from "../models/user"
import Delivery, { IDelivery } from "../models/order";


const path = require('path');
const logo = path.join(__dirname, '../../../client/public/logo.jpg');
const signature = path.join(__dirname, '../../../client/public/signature.png');

require('dotenv').config();

interface IProduct {
  name: string;
  price: number;
  description: string;
  quantity: number;
}

export function generateHeader(doc: PDFKit.PDFDocument) {
  doc.image(logo, 50, 45, { width: 50 })
    .fillColor('#444444')
    .fontSize(20)
    .text('Wardrobewizards', 110, 57)
    .fontSize(10)
    .text('Kurtkoy Organize Sanayi Bolgesi', 200, 65, { align: 'right' })
    .text('Istanbul, 10025', 200, 80, { align: 'right' })
    .moveDown();
}

export function generateCustomerInformation(doc: PDFKit.PDFDocument, mail: string, name: string, address: string, date: string) {
  doc.fontSize(15).text('Invoice Info', 50, 175)
  generateHr(doc, 190);
  doc
    .fontSize(10)
    .text(`Invoice Number: 4546743`, 50, 200)
    .text(`Invoice Date: ${date}`, 50, 215)

    .fontSize(15).text('Customer Info', 300, 175)
    .fontSize(10)
    .text(`User Mail: ${mail}`, 300, 200)
    .text(`User name: ${name}`, 300, 215)     //TO DO
    .text(`User address: ${address}`, 300, 230)
    .moveDown();
  generateHr(doc, 250);
}

export function generateTableRow(doc: PDFKit.PDFDocument, y: number, c1: string, c2: string, c3: string, c4: string) {
  doc.fontSize(10)
    .text(c1, 50, y)
    .text(c2, 150, y)
    .text(c3, 260, y)
    .text(c4, 420, y)
}

export function generateHr(doc: PDFKit.PDFDocument, y: number) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

export function generateInvoiceTable(doc: PDFKit.PDFDocument, totalPrice: number, products: IProduct[]) {
  let i,
    invoiceTableTop = 330;

  generateTableRow(
    doc,
    invoiceTableTop,
    "Name",
    "Price",
    "Description",
    "Quantity",
  );
  generateHr(doc, invoiceTableTop + 20);
  for (i = 0; i < products.length; i++) {
    const item = products[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.name,
      item.price.toString(),
      item.description,
      item.quantity.toString(),
    );
    generateHr(doc, position + 20);
  }
  const duePosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    duePosition,
    "Balance Due",
    totalPrice.toString(),
    "",
    "",
  );

  const signaturePos = invoiceTableTop + (i + 1) * 30;
  doc.image(signature, 330, signaturePos, { width: 100 })
    .fillColor('#444444')
    .moveDown();
}

export const sendInvoiceEmail = async (deliveryData: IDelivery) => {
  const user = await User.findById(deliveryData.customerId);

  const date = deliveryData.date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  try {
    const doc = new PDFDocument();

    generateHeader(doc);
    generateCustomerInformation(doc, user!.email, user!.name, user!.address, date);
    generateInvoiceTable(doc, deliveryData.totalPrice, deliveryData.products);

    const pdfData = await new Promise<Buffer>((resolve, reject) => {
      const chunks: any[] = [];
      doc.on('data', (chunk) => {
        chunks.push(chunk);
      });
      doc.on('end', () => {
        const pdfData = Buffer.concat(chunks);
        resolve(pdfData);
      });
      doc.end();
    });

    await Delivery.findByIdAndUpdate(deliveryData._id, {
      pdf: {
        data: pdfData,
        contentType: 'application/pdf'
      }
    });

    // Move attachments array inside Promise
    const message = {
      from: 'Wardrobewizard',
      to: user!.email,
      subject: `Invoice #${233432}`,
      html: `<p>Dear ${user!.name},</p><p>Please find attached your invoice for ${date}.</p><p>Thank you for your business!</p>`,
      attachments: [
        {
          filename: 'invoice.pdf',
          content: pdfData,
          contentType: 'application/pdf'
        }
      ]
    };

    // Sender Infos
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "cs308mail@gmail.com",
        pass: "nwrhasqqwkpqrtqq"
      }
    });

    try {
      const info = await transport.sendMail(message);
      console.log("Succesfully invoice mail sent.");
    } catch (error) {
      console.error(error);
    }
  } catch (err) {
    console.error(err);
  }
};

/*
const nodemailer = require('nodemailer');
import PDFDocument from 'pdfkit';
import * as fs from 'fs';

import User from "../models/user"
import Delivery, { IDelivery } from "../models/order";


const path = require('path');
const logo = path.join(__dirname, '../../../client/public/logo.jpg');
const signature = path.join(__dirname, '../../../client/public/signature.png');

require('dotenv').config();

interface IProduct {
name: string;
price: number;
description:string;
quantity: number;
}
 
export function generateHeader(doc: PDFKit.PDFDocument) {
  doc.image(logo, 50, 45, { width: 50 })
      .fillColor('#444444')
      .fontSize(20)
      .text('Wardrobewizards', 110, 57)
      .fontSize(10)
      .text('Kurtkoy Organize Sanayi Bolgesi', 200, 65, { align: 'right' })
      .text('Istanbul, 10025', 200, 80, { align: 'right' })
      .moveDown();
}
 
export function generateCustomerInformation(doc: PDFKit.PDFDocument, mail: string, name: string, address: string, date: string) {
  doc .fontSize(15).text('Invoice Info', 50, 175)
generateHr(doc, 190);
doc
  .fontSize(10)
  .text(`Invoice Number: 4546743`, 50, 200)
      .text(`Invoice Date: ${date}`, 50, 215)
 
  .fontSize(15).text('Customer Info', 300, 175)
  .fontSize(10)
      .text(`User Mail: ${mail}`, 300, 200)
      .text(`User name: ${name}`, 300, 215)     //TO DO
      .text(`User address: ${address}`, 300, 230)
      .moveDown();
generateHr(doc, 250);
}
 
export function generateTableRow(doc: PDFKit.PDFDocument, y: number, c1: string, c2: string, c3: string, c4: string) {
  doc.fontSize(10)
      .text(c1, 50, y)
      .text(c2, 150, y)
  .text(c3, 260, y)
  .text(c4, 420, y)
}
 
export function generateHr(doc: PDFKit.PDFDocument, y: number) {
doc
  .strokeColor("#aaaaaa")
  .lineWidth(1)
  .moveTo(50, y)
  .lineTo(550, y)
  .stroke();
}
 
export function generateInvoiceTable(doc: PDFKit.PDFDocument, totalPrice: number, products: IProduct[]) {
  let i,
      invoiceTableTop = 330;
 
  generateTableRow(
    doc,
    invoiceTableTop,
    "Name",
    "Price",
    "Description",
    "Quantity",
  );
  generateHr(doc, invoiceTableTop + 20);
  for (i = 0; i < products.length; i++) {
      const item = products[i];
      const position = invoiceTableTop + (i + 1) * 30;
      generateTableRow(
            doc,
            position,
            item.name,
            item.price.toString(),
            item.description,
            item.quantity.toString(),
      );
  generateHr(doc, position + 20);
  }
const duePosition = invoiceTableTop + (i + 1) * 30;
generateTableRow(
  doc,
  duePosition,
  "Balance Due",
  totalPrice.toString(),
  "",
  "",
);
 
const signaturePos = invoiceTableTop + (i + 1) * 30;
doc.image(signature, 330, signaturePos, { width: 100 })
.fillColor('#444444')
.moveDown();
}
 
export const sendInvoiceEmail = async (deliveryData: IDelivery) => {
const user = await User.findById(deliveryData.customerId);

const date = deliveryData.date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
 
  const pdfBuffer = await new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    
    const pdfChunks: any[] = [];
    doc.on('data', function (chunk) {
      pdfChunks.push(chunk);
    });
    doc.on('end', async function () {
      const pdfBuffer = Buffer.concat(pdfChunks);
  
      try {
        await Delivery.findByIdAndUpdate(deliveryData._id, { pdfData: pdfBuffer });
        resolve(pdfBuffer);
      } catch (err) {
        reject(err);
      }
    });
  
    generateHeader(doc);
    generateCustomerInformation(doc, user!.email, user!.name, user!.address, date);
    generateInvoiceTable(doc, deliveryData.totalPrice, deliveryData.products);
  
    doc.end();
  });
 
 
// Create the email message
const message = {
  from: 'Wardrobewizard',
  to: user!.email,
  subject: `Invoice #${233432}`,
  html: `<p>Dear ${user!.name},</p><p>Please find attached your invoice for ${date}.</p><p>Thank you for your business!</p>`,
  attachments: [
    {
      filename: 'invoice.pdf',
      content: pdfBuffer,
      contentType: 'application/pdf'
    }
  ]
};
 
// Sender Infos
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "cs308mail@gmail.com",
        pass: "xmzxtzqwjcjycthe"
    }
});
 
try {
  const info = await transport.sendMail(message);
  console.log("Succesfully invoice mail sent.");
} catch (error) {
  console.error(error);
}
};*/