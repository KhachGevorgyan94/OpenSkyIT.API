"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const nodeMailer = require("nodemailer");
const puppeteer = require("puppeteer");
const transporter = nodeMailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: "openskyitschool@gmail.com",
        pass: "zainceqgscmmwcdp",
    },
});
exports.generateExport = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = yield browser.newPage();
    yield page.setContent(generateCVHtml(data));
    yield page.emulateMedia('screen');
    const fileName = config_1.default.mediaPath + `${Date.now()}.pdf`;
    yield page.pdf({
        path: fileName,
        format: 'A4',
        printBackground: true,
    });
    yield browser.close();
    return fileName;
});
function generateCVHtml(data) {
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
                <h2 style="white-space: pre-wrap;color: #fff;font-size: 1.5em;margin-top: 20px;text-transform: uppercase;text-align: center;font-weight: 600;line-height: 1.4em;">${data.name}<br><span style="font-size: 0.8em;font-weight: 300;">${data.position}</span> </h2>
            </div>

            <div class="contactInfo" style="padding-top: 20px;">
                <h3 class="title" style="color: #fff;text-transform: uppercase;font-weight: 600;letter-spacing: 1px;margin-bottom: 20px;">Contact Info</h3>
                <div style="position: relative;">
                    <div style="margin-bottom: 15px">
                        <i class="fa fa-envelope" style="font-size:15px;color:white; margin-right: 10px;"></i>
                        <span style="color: #fff;font-weight: 300;">${data.phone}</span>
                    </div>
                    <div style="margin-bottom: 15px">
                        <i class="fa fa-phone" style="font-size:15px;color:white; margin-right: 10px;"></i>
                        <span style="color: white;font-weight: 300;">${data.email}</span>
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
                <p style="color: #081921;white-space: pre-wrap;">${data.about.replace("<br>", "\n")}</p>
            </div>
            <div class="about" style="margin-bottom: 40px;">
              <h2 class="title2" style="white-space: pre-wrap;color: #0e586d;text-transform: uppercase;letter-spacing: 1px;margin-bottom: 10px;">Education</h2>
              <p style="color: #081921;white-space: pre-wrap;">${data.education.replace("<br>", "\n")}</p>
          </div>
          <div class="about" style="margin-bottom: 40px;">
              <h2 class="title2" style="white-space: pre-wrap;color: #0e586d;text-transform: uppercase;letter-spacing: 1px;margin-bottom: 10px;">Experience</h2>
              <p style="color: #081921;white-space: pre-wrap;">${data.experience.replace("<br>", "\n")}</p>
          </div>
        </div>
</div>
</body>

</html>
    `;
}
