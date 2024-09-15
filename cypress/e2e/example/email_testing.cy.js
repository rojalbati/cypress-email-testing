/// <reference types="cypress" />

describe("email testing", () => {
  const email = "your_newly_created_gmail";

  it("email details", () => {
    // Add Step to send email

    cy.getAccessToken("accessToken"); // Gets access token and store it in an alias 'accessToken'
    cy.get("@accessToken").then((accessToken) => {
      cy.checkNewEmailReceived(accessToken, email); // Checks email received for the specified email address
      cy.fetchLastEmail(accessToken, email); // Fetch the last email for the specified email address
    });

    cy.get("@lastEmail").then((email) => {
      const headers = email.payload.headers;
      cy.log(headers.find((header) => header.name === "Date")?.value);
      cy.log(headers.find((header) => header.name === "Subject")?.value);
      cy.log(headers.find((header) => header.name === "From")?.value);
      cy.log(headers.find((header) => header.name === "To")?.value);

      const emailBody = email.payload.parts[0].body.data; // the email body could be different, make sure to check the response in the console to grab emailBody, for me it was email.payload.body.data, so you should know email body data, find it
      const readableEmailBody = Buffer.from(emailBody, "base64").toString(
        "utf8"
      );
      cy.log(`Email Body: ${readableEmailBody}`);
    });
  });
});
