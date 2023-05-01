//import User from "../models/user"
const nodemailer = require('nodemailer');
const pdfkit = require('pdfkit');
const fs = require('fs'); 
const logo = '../../../client/public/logo.jpg';
const signature = '../../../client/public/signature.png';

require('dotenv').config();

// Specifying invoice details
const delivery = {
  customerId: "644ef5362d42d596d3a57252",
  quantity: 3,
  totalPrice: 450,
  deliveryAddress: "123 Main St, Anytown USA",
  status: "In Transit",
  date: new Date(),
  storeId: "615a9a685bd7a18b2d4481f4",
  products: [
    {
      productId: "615a9a685bd7a18b2d4481f5",
      name: "T-Shirt",
      price: 25,
      description: "White Fall Season T-Shirt",
      quantity: 3,
    },
    {
      productId: "615a9a685bd7a18b2d4481f6",
      name: "Jeans",
      price: 50,
      description: "Blue Spring Season Jeans",
      quantity: 1,
    },
    {
      productId: "615a9a685bd7a18b2d4481f7",
      name: "Shoes",
      price: 100,
      description: "Red Fall Season Shoes",
      quantity: 1,
    },
  ],
};

const date = delivery.date.toLocaleString('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

function generateHeader(doc) {
	doc.image(logo, 50, 45, { width: 50 })
		.fillColor('#444444')
		.fontSize(20)
		.text('Wardrobewizards', 110, 57)
		.fontSize(10)
		.text('Kurtkoy Organize Sanayi Bolgesi', 200, 65, { align: 'right' })
		.text('Istanbul, 10025', 200, 80, { align: 'right' })
		.moveDown();
}

function generateCustomerInformation(doc) {
	doc .fontSize(15).text('Invoice Info', 50, 175)
  generateHr(doc, 190);
  doc
    .fontSize(10)
    .text(`Invoice Number: 4546743`, 50, 200)
		.text(`Invoice Date: ${date}`, 50, 215)

    .fontSize(15).text('Customer Info', 300, 175)
    .fontSize(10)
		.text("Hasan Berkay", 300, 200)     //TO DO
		.text("Cemal Hoca Hayranlari Apt. No: 5", 300, 215)
		.text(`Beylikduzu, Istanbul, Turkey`, 300, 230,)
		.moveDown();
  generateHr(doc, 250);
}

function generateTableRow(doc, y, c1, c2, c3, c4) {
	doc.fontSize(10)
		.text(c1, 50, y)
		.text(c2, 150, y)
    .text(c3, 260, y)
    .text(c4, 420, y)
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function generateInvoiceTable(doc) {
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
	for (i = 0; i < delivery.products.length; i++) {
		const item = delivery.products[i];
		const position = invoiceTableTop + (i + 1) * 30;
		generateTableRow(
			doc,
			position,
			item.name,
			item.price,
      item.description,
      item.quantity,
		);
    generateHr(doc, position + 20);
	}
  const duePosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    duePosition,
    "Balance Due",
    delivery.totalPrice,
    "",
    "",
  );

  const signaturePos = invoiceTableTop + (i + 1) * 30;
  doc.image(signature, 330, signaturePos, { width: 100 })
  .fillColor('#444444')
  .moveDown();
}

const sendInvoiceEmail = async (invoice) => {
  //const user = await User.findById(delivery.customerId);
  // Creating the PDF document
  const doc = new pdfkit();

  generateHeader(doc);
  generateCustomerInformation(doc);
  generateInvoiceTable(doc);

  const pdfBuffer = await new Promise((resolve, reject) => {
    doc.pipe(
      fs.createWriteStream('invoice.pdf').on('finish', () => {
        fs.readFile('invoice.pdf', (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      })
    );
    doc.end();
  });

  // Create the email message
  const message = {
    from: 'Wardrobewizard',
    to: "hasanbosver@gmail.com",
    subject: `Invoice #${233432}`,
    html: `<p>Dear ${"Hasan Bosver"},</p><p>Please find attached your invoice for ${delivery.date}.</p><p>Thank you for your business!</p>`,
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
    console.log(info);
  } catch (error) {
    console.error(error);
  }
};

sendInvoiceEmail();

module.exports = sendInvoiceEmail;
