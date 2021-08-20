import puppeteer from 'puppeteer';
import pdf from 'html-pdf';
import fs from 'fs';

const __dirname = fs.realpathSync('.');

(async () => {
    // launch a new chrome instance
    const browser = await puppeteer.launch({
        headless: true
    });
    // create a new page
    const page = await browser.newPage();

    // set your html as the pages content
    const html = fs.readFileSync(`${__dirname}/index.html`, 'utf8')
    // await page.setContent(html, {
    //     waitUntil: 'domcontentloaded'
    // });

    await page.goto('http://localhost:9090', {
        waitUntil: 'networkidle2',
    });

    // create a pdf buffer
    const pdfBuffer = await page.pdf({
        format: 'A4'
    });

    // or a .pdf file
    await page.pdf({
        format: 'A4',
        path: `${__dirname}/test3.pdf`
    });

    // close the browser
    await browser.close()
})()

// var html = fs.readFileSync('./index.html', 'utf8');
// var options = { format: 'Letter' };

// pdf.create(html, options).toFile('.test-file.pdf', function(err, res) {
//   if (err) return console.log(err);
//   console.log(res); // { filename: '/app/businesscard.pdf' }
// });