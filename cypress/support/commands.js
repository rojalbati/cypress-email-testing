import { recurse } from "cypress-recurse";
const axios = require("axios");

const clientId = "clientId";
const clientSecret = "clientSecret";
const refreshToken = "refreshToken";
// Command to get access token and store the generated access token as 'accessToken'
Cypress.Commands.add("getAccessToken", (accessToken) => {
  cy.request({
    method: "POST",
    url: "https://oauth2.googleapis.com/token",
    body: {
      grant_type: "refresh_token",
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    },
  }).then((response) => {
    const token = response.body.access_token;
    cy.wrap(token, { log: false }).as(accessToken); // Store generated token as 'accessToken'
  });
});
// Command to check if the email is received
Cypress.Commands.add("checkNewEmailReceived", (accessToken, emailAddress) => {
  recurse(
    () =>
      cy.request({
        method: "GET",
        url: "https://www.googleapis.com/gmail/v1/users/me/messages",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        qs: {
          maxResults: 1,
          q: `to:${emailAddress}`,
        },
      }),
    (resp) => {
      expect(resp.body.messages).to.be.an("array").with.length.at.least(1);
    },
    {
      log: "✅ New Email Received",
      limit: 40,
      delay: 5_000,
      timeout: 180_000,
    }
  );
});
// Command to fetch the last email
Cypress.Commands.add("fetchLastEmail", (accessToken, emailAddress) => {
  cy.request({
    method: "GET",
    url: "https://www.googleapis.com/gmail/v1/users/me/messages",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    qs: {
      maxResults: 1,
      q: `to:${emailAddress}`,
    },
  }).then((response) => {
    const messages = response.body.messages;
    const messageId = messages[0].id;
    // Fetch the full email details by messageId
    cy.request({
      method: "GET",
      url: `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((emailResponse) => {
      // Store the full email data in an alias
      cy.wrap(emailResponse.body, { log: false }).as("lastEmail");
    });
  });
});
