# ToDo List — Get Rewarded!

Create and complete TODO items, with a reward.

A Stageline ("testnet") deployment of the master branch of this repository is at [staging-todo.babbage.systems](https://staging-todo.babbage.systems)

## Overview

This TODO list application goes beyond the classic demo traditionally used to teach people the basics of UI libraries. It showcases MetaNet technologies like tokenization, identity, encryption and state management. To learn more, check out the accompanying tutorial series.

You also need to understand the [TODO Protocol Bridge](https://github.com/p2ppsr/todo-bridge), which tracks and manages state within this application, allowing the user to reload the page.

To learn more about building Bitcoin-powered applications for the MetaNet with these tools, head over to the [Babbage Platform Documentation](https://projectbabbage.com/docs).

## Development Instructions

To run this app, you will also [need its backend bridge](https://github.com/p2ppsr/todo-bridge). Clone the repositories so that your directory structure looks like this:

```
todo
| - todo-react
| - todo-bridge
```

Clone the repo, then run `npm i` to install packages.

To start the live development server on `localhost:3000`, run `npm run start`.

Start the MetaNet services required for this application by running `docker-compose up`.

Your changes should be reflected on-screen whenever you reload.

## Tools Used

This ToDo application uses various Bitcoin and web-related tools for different things:

- [**React**](https://reactjs.org) We use React to render the webpage UI for this application, and track the state of the page.
- [**MUI**](https://mui.com) We use a UI framework within React called MUI to help with page styling, text fields, buttons and dialog boxes.
- [**Bitcoin SV**](https://bitcoinsv.com) We use the Bitcoin SV blockchain to timestamp and register our ToDo task tokens, and we rely on *satoshis* (a measurement of Bitcoin), so that the ToDo tokens are valuable.
- [**Babbage SDK**](https://github.com/p2ppsr/babbage-sdk) We use the Babbage SDK so that users are able to have a Bitcoin-native identity, and can create and redeem Bitcoin tokens. The SDK also allows us to easily encrypt task data for added user privacy.
- [**PushDrop**](https://github.com/p2ppsr/pushdrop) We use PushDrop to create Bitcoin tokens that follow the ToDo protocol, and later redeem those tokens. PushDrop makes it easier to add data payloads to tokens, while still being able to give them value and spend them.
- [**Bridgeport**](https://projectbabbage.com/bridgeport) We use Bridgeport to track which Bitcoin transactions (a.k.a. "Actions" with a capital A) are part of this application's protocol namespace. Bridgeport hosts the ToDo Token Bridge.
- [**The ToDo Token Bridge**](https://github.com/p2ppsr/todo-bridge) We use the ToDo Bridge to track which tokens are associated with which users, and keep them around so we can get the correct ones back if the user re-loads the page.
- [**Parapet**](https://github.com/p2ppsr/parapet) We use Parapet to talk to the ToDo Token Bridge, and query it for the tokens associated with the user when the page first loads. Parapet allows queries to be run against data stored in Bridgeport bridges.

## ToDo Protocol Document

You can find the ToDo Protocol in [PROTOCOL.md](PROTOCOL.md)

## License

The license for the code in this repository is the Open BSV License.
