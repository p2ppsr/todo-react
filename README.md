# TODO

Create and complete TODO items, with a reward.

A live deployment of the master branch of this repository is at [todo.babbage.systems](https://todo.babbage.systems)

## Overview

This TODO list applicaion goes beyond the classic demo traditionally used to teach people the basics of UI libraries. It showcases MetaNet technologies like tokenization, identity, encryption and state management. To learn more, check out the accompanying tutorial series.

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

## License

The license for the code in this repository is the Open BSV License.
