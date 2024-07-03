import { ICreateCV } from "./../../api/user/models/index";
import config from "../../config";
import * as nodeMailer from "nodemailer";
import * as puppeteer from "puppeteer";

const transporter = nodeMailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: "openskyitschool@gmail.com",
    pass: "zainceqgscmmwcdp",
  },
});

export const generateExport = async (data: ICreateCV) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(generateCVHtml(data));
  await page.emulateMedia('screen');
  const fileName = config.mediaPath + `${Date.now()}.pdf`;
  await page.pdf({
    path: fileName,
    format: 'A4',
    printBackground: true,
  });
  await browser.close();
  return fileName;
};

function generateCVHtml(data: ICreateCV) {
  console.log("333333333333333333");
  return `
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Responsive CV </title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body style="display: flex;justify-content: center;align-items: center;width: auto;margin-left: auto;margin-right: auto;">
    <div class="container" style="max-width: 80vw;min-height:80vh;position: relative;background-color: #fff;display: flex;box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);">
        <div class="left_Side" style="max-width: 200px;position: relative;background-color: #0e586d;padding: 40px;">
            <div class="profileText" style="position: relative;display: flex;flex-direction: column;align-items: center;padding-bottom: 20px;border-bottom: 1px solid rgba(255, 255, 255, 0.2);">
                <h2 style="white-space: pre-wrap;color: #fff;font-size: 1.5em;margin-top: 20px;text-transform: uppercase;text-align: center;font-weight: 600;line-height: 1.4em;">${
                  data.name
                }<br><span style="font-size: 0.8em;font-weight: 300;">${
    data.position
  }</span> </h2>
            </div>

            <div class="contactInfo" style="padding-top: 20px;">
                <h3 class="title" style="color: #fff;text-transform: uppercase;font-weight: 600;letter-spacing: 1px;margin-bottom: 20px;">Contact Info</h3>
                <div style="position: relative;">
                    <div style="margin-bottom: 15px">
                        <i class="fa fa-envelope" style="font-size:15px;color:white; margin-right: 10px;"></i>
                        <span style="color: #fff;font-weight: 300;">${
                          data.phone
                        }</span>
                    </div>
                    <div style="margin-bottom: 15px">
                        <i class="fa fa-phone" style="font-size:15px;color:white; margin-right: 10px;"></i>
                        <span style="color: white;font-weight: 300;">${
                          data.email
                        }</span>
                    </div>
                </div>
            </div>
            <div class="contactInfo" style="padding-top: 20px;">
                <h3 class="title" style="color: #fff;text-transform: uppercase;font-weight: 600;letter-spacing: 1px;margin-bottom: 20px;">Skills</h3>
                <div style="position: relative;">
                        <span style="color: #fff;font-weight: 300;">${data.skills
                          .map((item) => `<p style="color: #fff">• ${item}</p>`)
                          .join(" ")}</span>
                </div>
            </div>
        </div>
        <div class="right_Side" style="max-width:550px;position: relative;background-color: #fff;padding: 40px;">
            <div class="about" style="margin-bottom: 40px;">
                <h2 class="title2" style="white-space: pre-wrap;color: #0e586d;text-transform: uppercase;letter-spacing: 1px;margin-bottom: 10px;">Profile</h2>
                <p style="color: #081921;white-space: pre-wrap;">${data.about.replace(
                  "<br>",
                  "\n"
                )}</p>
            </div>
            <div class="about" style="margin-bottom: 40px;">
              <h2 class="title2" style="white-space: pre-wrap;color: #0e586d;text-transform: uppercase;letter-spacing: 1px;margin-bottom: 10px;">Education</h2>
              <p style="color: #081921;white-space: pre-wrap;">${data.education.replace(
                "<br>",
                "\n"
              )}</p>
          </div>
          <div class="about" style="margin-bottom: 40px;">
              <h2 class="title2" style="white-space: pre-wrap;color: #0e586d;text-transform: uppercase;letter-spacing: 1px;margin-bottom: 10px;">Experience</h2>
              <p style="color: #081921;white-space: pre-wrap;">${data.experience.replace(
                "<br>",
                "\n"
              )}</p>
          </div>
        </div>
</div>
</body>

</html>
    `;
}
