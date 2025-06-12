# Intro

This document shall provide an overview over how to integrate Human Passport.
The following options are available:

- using embeds UI widget
- API
- on-chain

## Embeds

Steps:

1. create react app: `pnpm create vite embeds-demo --template react-ts`
1. install the `embeds` library: `pnpm add https://github.com/passportxyz/passport-embed.git#v0.1.6-rc.4`
1. add the widget:

   1. add this import: `import { PassportScoreWidget } from "@passportxyz/passport-embed";
   1. add this content:

      ```jsx
      <PassportScoreWidget
        apiKey={"PASSPORT_API_KEY"}
        scorerId={"PASSPORT_SCORER_ID"}
      />
      ```

1. add an address ...
1. add callback:

   1. connect the wallet
   1. sign message - required for non-evm stamp


## On-chain

Check passport decoder on base:
Relevant on-chain info: https://github.com/passportxyz/eas-proxy/blob/main/deployments/onchainInfo.json
OP decoder: https://optimistic.etherscan.io/address/0x5558D441779Eca04A329BcD6b47830D2C6607769

