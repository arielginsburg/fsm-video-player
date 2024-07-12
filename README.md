# FSM Video Player

A fully responsive video player app which utilizes a finite state machine to manage its state.

> “Finite state machines are a great conceptual model for many concerns facing
> developers – from conditional UI, connectivity monitoring & management to
> initialization and more. State machines can simplify tangled paths of asynchronous
> code, they're easy to test, and they inherently lend themselves to helping you avoid
> unexpected edge-case-state pitfalls.” (http://machina-js.org/)

Live demo: https://arielginsburg.github.io/fsm-video-player

_Note: The live demo uses [Render](https://render.com/) to host the videos web service. It spins down a free service that goes 15 minutes without receiving inbound traffic. Render spins the service back up whenever it next receives a request to process. Spinning up a service takes up to a minute, which causes a noticeable delay for incoming requests until the service is back up and running._

_Check that the service is up before opening the demo: https://fsm-video-player.onrender.com/api/videos_

## Getting Started

Install dependencies:

```
npm install
```

Build the FSM and start the client and server:

```
npm run start
```

## Run tests

```
npm run test
```
