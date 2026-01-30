import puppeteer from "puppeteer";

export const generateResumePDF = async (data) => {
  try {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
            color: #222;
            line-height: 1.6;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 5px;
          }
          h2 {
            font-size: 16px;
            margin-top: 20px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
          }
          ul {
            margin-left: 20px;
          }
        </style>
      </head>

      <body>

        <h1>${data.name}</h1>

        <h2>Professional Summary</h2>
        <p>${data.summary || ""}</p>

        <h2>Skills</h2>
        <ul>
          ${(data.skills || [])
            .map((skill) => `<li>${skill}</li>`)
            .join("")}
        </ul>

        <h2>Experience</h2>
        <ul>
          ${(data.experience || [])
            .map((exp) => `<li>${exp}</li>`)
            .join("")}
        </ul>

        <h2>Projects</h2>
        <ul>
          ${(data.projects || [])
            .map((proj) => `<li>${proj}</li>`)
            .join("")}
        </ul>

        <h2>Education</h2>
        <p>${data.education || ""}</p>

      </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();
    return pdf;

  } catch (err) {
    console.error("PDF Generation Error:", err);
    throw err;
  }
};
