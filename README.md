# Cypress Email Testing

This project provides a Cypress setup for email testing using the Gmail API. Follow the instructions below to get started with installation and configuration.

## Installation

1. **Clone the Repository**: Begin by cloning the repository to your local machine:

   ```bash
   git clone https://github.com/rojalbati/cypress-email-testing
   cd cypress-email-testing

2. **Install dependencies**

   ```bash
   npm install

## Configure Your Credentials

1. **Update Email Address**:
   - Open `cypress/e2e/example/email_testing.cy.js` and replace the placeholder email address with your newly created Gmail address.

2. **Update OAuth 2.0 Credentials**:
   - Open `cypress/support/commands.js` and update the following placeholders with your credentials:
     - `clientId`: Your OAuth 2.0 Client ID.
     - `clientSecret`: Your OAuth 2.0 Client Secret.
     - `refreshToken`: Your obtained Refresh Token.

## Running test

   ```bash
   npx cypress open
