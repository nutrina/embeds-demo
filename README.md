# Intro

This document shall provide an overview over how to integrate Human Passport.
The following options are available:

- using embeds UI widget
- API
- on-chain

## API integration

- API playground: https://api.passport.xyz/v2/docs
- Check out the docs: https://docs.passport.xyz/
- Integration requires yout to have an api and a scorer, which you can create on our [Developer Portal](https://developer.passport.xyz/)
- if you only want to check this out, use the API key `DEMO.API_KEY` and scorer_id `-1`.

## Onchain

- Use cases can include gating calls to other msart contracts.
- Find information about the chains we have deplyed on [here](https://github.com/passportxyz/eas-proxy/blob/main/deployments/onchainInfo.json)
- For onchain integrations we recommend to look at the decoder smart contract:
  - use the helper functions we provide there, for example:
    - `getPassport`
    - `getScore`
    - `isHuman`
- Deployment on OP: https://optimistic.etherscan.io/address/0x5558D441779Eca04A329BcD6b47830D2C6607769#readProxyContract
  - test with address: 0x85fF01cfF157199527528788ec4eA6336615C989

## Embeds

- our newest offering
- check out our demo integration on our campaign page: https://app.passport.xyz/#/campaign/embed
- it is a react component you can integrate directy in your app
- allows you to check a users score and also allow him to claim stamp directly from the widget (no need to redirect huim away from your app)
- integration requires yout to have an api and a scorer, which you can create on our [Developer Portal](https://developer.passport.xyz/)
- if you only want to check this out, use the API key `DEMO.API_KEY` and scorer_id `-1`
- check out more examples in the repo: https://github.com/passportxyz/passport-embed/
- more details in the [docs](https://github.com/passportxyz/passport-embed/)
