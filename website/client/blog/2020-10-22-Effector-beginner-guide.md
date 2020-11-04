---
slug: effector-beginner-guide
title: Effector's beginner guide
author: Yan Lobat
author_title: Effector team member
authorURL: https://github.com/yanlobat
author_image_url: https://avatars2.githubusercontent.com/u/5307423?s=460&u=d1a4c1f6823836eeb66f6291eb5e84a4fc1c51ce&v=4
tags: [effector, guide, dataflow]
---

In this article, I will answer repetitive questions and resolve common misunderstandings about the state manager effector.js

<!--truncate-->

Why do you need it at all? Because it's a tool that can actually help ease frontend engineer's routine. After all, it will be possible to forget almost completely about props, its types, business logic inside components, learning a dozen other operators, using proxies or decorators, and at the same time to get the most powerful tool on the market for **data flow** management, providing only functions and objects.

The only problem is to get the available introduction to technology because you need to rebuild the mindset a bit. I believe I have found the way to a softer introduction, so I released a complete instruction in this post.

## The application is a system

Yes, this is a really important detail in understanding and why all this is necessary.

Let's try to get to this thesis step by step:

1) Are the applications whole by nature? Yes

2) Can applications be divided according to a certain feature? Yes

3) Which one? Responsibility scopes

4) Are responsibility scopes connected to each other? Yes, definitely, as these are parts of a particular application. Moreover, they interact with each other

5) And what is a [system](https://dictionary.cambridge.org/dictionary/english/system)? A set of related things (areas of responsibility) that interact with each other

Just 5 steps and led to this thesis. Good!

## Back to effector


I specifically highlighted the word dataflow in the beginning. Since state-management is a more familiar one in the JavaScript ecosystem. This leads to misunderstandings. A state is just a unit for building business logic.

Speaking of units. The Effector provides four units that you can use to build business logic of any complexity: event, store, effect, and domain.


## Units:Event

The first and most important. The fact is that we, as frontline operators, live in an *event-driven* environment (DOM). When building the business logic of web applications (those next to DOM) it would be strange to focus on a different model.

Even during the planning with management(PO's, CEO's etc), we could hear phrasing like: "User enters the page and our cool new feature HAPPENS!" (implicit meaning events)

Determination of the [event](https://dictionary.cambridge.org/us/dictionary/english/event) from the dictionary.

## Units:Store

An object for storing values. The default value has to be set (any value **except** undefined). When a repeated value (equivalent to the previous one) arrives, store **will not** trigger an update. 

The handler for incoming events is a reducer (we **do not** mutate the current state), in case of an undefined return in the handler, the update **will not** trigger.

Taking into account the previous approach with the responsibility scopes, the following recommendation can be made: 

*No single stores for the entire application. I am serious.*

Independent easy stores for each responsibility scope. 

[Combining](https://effector.now.sh/docs/api/effector/combine) will not be difficult if necessary.

## Units:Effect

The most difficult unit to understand

Technically, effect has at least one of these attributes:

 -influence on the environment outside the system (server requests, local storage, etc.)

- being influenced by the environment (process.env)


But, conceptually, if an event is a thing that successfully triggers **every time**, then the effect also provides a way to handle **exceptions** (i.e. no guarantee that the handler will be completed successfully).

When could we catch exceptions?

-network requests

-work from localStorage

-interaction with third-party API

-a random code fragment where a developer needs  to write an explicit throw

The effect provides us with a handler in which all such questionable code fragments will be stored. 

Thus, by executing the handler function, the effect emits an event about success ([.done](https://effector.dev/docs/api/effector/effect#done)) or about failure ([.fail](https://effector.dev/docs/api/effector/effect/#fail)). During the execution, a Boolean [.pending](https://effector.dev/docs/api/effector/effect/#pending) field is also available, which will clearly indicate whether or not the effect is in progress. 

For those who don't care about the outcome, the [.finally](https://effector.dev/docs/api/effector/effect/#finally) event is kindly provided and is **always** emitted.

## Regular units

All three units mentioned above are regular. 

This is an important clarification as this term will be used for the short term from now.

## Units:Domain

Domain is a namespace for all regular units. 

It provides hooks for creating regular units that are linked to this domain. This is useful for bulk operations. 
A domain can be freely created within a domain. All units within a domain can be output through [domain.history](https://effector.dev/docs/api/effector/domain#history).

P.S. domains are required for SSR, as well as when writing tests that cover most of our system scenarios.

## Data preparation

Events distribute data on our system. 
From time to time we need to prepare this data: add some static value to the data or multiply the number that came into the data by two. 

For such tasks there are three things that can be needed:

1) Perhaps the most "flat" version for data preparation between the regular unit which is a sender and the regular unit which is a receiver is the **fn** field in the [sample](https://effector.dev/docs/api/effector/sample) operator. But I will return to it in a couple of chapters, because everything is in order.

2) The other options are methods of the event itself. The first of them, [event.map](https://effector.dev/docs/api/effector/event#mapfn), allows to transform payload, which came to the event as you like with only one limitation: the function-transformer must be clean (i.e., it does not contain side effects). This event method will return a new event, which will be directly related to the original immediate call as soon as the original was triggered.

3) And the last option is [event.prepend](https://effector.dev/docs/api/effector/event#prependfn). If we interact with .map as a post-processor, then .prepend, on the contrary, will be the pre-processor to the original event. Accordingly, it will return an event that will execute a transformer function and then immediately call the original event. What is the use for this? 

For example, the effect of getting the balance of a certain currency. The handler is the same for all currencies, the difference will only be in the static code of the currency. Thus, it is possible to create a set of "prepended" events, the function-transformer of which pushes the static values of the currency in the call argument and solve the problem.

## Store data preparation

Data from stores are also worth to be prepared sometimes. Store like an event has a [store.map](https://effector.dev/docs/api/effector/store#mapfn-state-state-laststate-t--t) method, where you can transform the store data according to the function inside. Such a store is called a computed store. 

It will be calculated only if the original one is updated. No more and no less. 

Usecase? For example, you need a store in the form of an associative array (key-value) and an ordinary array of objects.

## Dataflow. Beginning

We have managed to touch upon how to process data within one regular unit. What about when there is more than one unit?

That's where the most interesting part starts - declarative connection of the units! 
The first simplest operator is [forward](https://effector.dev/docs/api/effector/forward). 
Its api is quite clear: fields from and to, receiving any regular unit. Its execution means that the to field is explicitly subscribed to a trigger (change of value in the store or event call) of the field from and will be triggered respectively afterwards.

## Dataflow. Filtering

We have data processing, as well as a simple unit connection. What if units do not want to connect without following some rules? Here comes to the [guard](https://effector.dev/docs/api/effector/guard). An operator with three fields: source, filter, target.

Source is a regular unit that initiates communication. 

Filter is the rule in their communication. It either accepts a predicate function that checks the data coming from the source is truthy. In addition to the predicate function can take a Boolean store.

Target is a regular unit that receives data from the source as soon as the filter returns truthy values.



But what if the filtering is not enough and you need not only filter but transform payload in some way in case of truthy? The event.filterMap will help you here.


Okay, this is all cool, but you're looking at 1-to-1 unit links, but what if one event needs to connect to many events with different conditions depending on the recipient?

And there is a recipe here! The split operator is at your service.

## Dataflow. Signals

A frequent case when units need to be linked not just directly or even not by a condition, but by a signal! Or, to be more precise, by the trigger of any regular unit. 

The most obvious example is a component mount (a mount is suddenly an event) to take data from a certain store and call an effect. 


```js
sample({
  source: $store,
  clock: mount,
  fn: someCombinatorFn,
  target: effectFx
})
```

Clock is the key field. This is where the necessary signal is placed.

As I promised before, we will return to the way of data preparation through [sample](https://effector.dev/docs/api/effector/sample).

The thing is that besides these three fields, there is an optional field fn in the sample - combinator function. It accepts two arguments. payload from source and payload from clock (if not - undefined). Further, we are free to combine and transform these values according to the task at hand, without going beyond the purity of this function, of course.

## Dataflow organization

We learned how to build data routes of any complexity through the system. But dataflow organization is still questionable. I propose the simplest and most naive option - the division by responsibility scopes.

Accordingly, we have a folder with all the business logic. It is divided into folders by corresponding responsibility scopes. 

Each responsibility scope contains 2 files (less often than 3, when the store(s) are in a separate file).

The first is an index file with declarations of all the units of the effector (createEvent, createStore, createEffect). 

The second one is an init file, which **will not export anything**, but only import it. The content of this file is the following:

1) Effect handlers

2) Store handlers of the respective scope

3) Interaction between units from the neighboring responsibility scopes (forward, guard, split, sample). When you think about which responsibility scope to place the connection, just ask yourself the question: "Who initiated this connection? Place it there. 


So, in the root of the folder with all business logic, we create a root init-file, import into it init files from all responsibility scopes. Then we import this root file into the root of the application and initialize the graph of the entire application statically! 

Have we built a graph? It turns out that we have. 

P.S. If you feel that the responsibility scope files are starting to grow a lot, it's not a bad approach, but rather you missed the moment when the responsibility scope turned into several ones.

P.P.S I also described in a more detailed way [here](https://effector.dev/docs/conventions/best-practices/)

## Reuse and environment-dependent code

From time to time, there are situations where we may use some features for our dataflow or even events for multiple responsibility scopes.

What can we do? Where to put it? In utils? 
*No way!*
We have a responsibility scope called app! Just like the others, it stores a code specific to the responsibility scope called the application. 

The same story with bindings. Bindings for the reaction provide such a thing as Gate. Where to create them? In a specific responsibility scope or in a view?

You should create them in your responsibility scope, called an application as well. Because this is a specific code for a particular application.

Same story with the init file. Those links where the trigger of a gate (mount, component annuity, or component renderer, where the gate has updated its properties) is the initiator should be placed there(/app/init). 


Thus, during testing, you will see clearly which events should be called explicitly (there is no view layer like react in business logic tests).

## Testing

I purposely used the word combination "responsibility scope" instead of the short word domain, so as not to confuse you. As a domain is an effector unit.

Talking about business logic testing with normal coverage rather than single tests, a domain becomes necessary. 

1) We, as developers, can create one domain for the whole system. 

2) Replace the explicit imports of createEvent, createStore, createEffect with myDomain.createEvent, and so on. This way the whole system becomes patronized by a single domain and can be forked - `fork(domain, config)`

3) This function takes on the domain and the optional config, where you can explicitly specify handlers for which effects you want to mock the `handlers` key, as well as explicitly specify the values of stores for tests with the `values` key

4) Calling the fork function will return the scope (`const scope = fork(domain, config)`) - the virtual instance of your domain.

5) Now all we have to do is to select the initial event of the scenario, which we want to test by passing it to the function `allSettled` with the first argument, and with the second argument before payload with which this script should start. Since the whole scenario chain can take more time than one tick, the call to allSettled needs to be done

6) Through `scope.getState($store)` we check the state of our system after the script under test, probably check the event/effect calls by our testing library (e.g. jest).

7) You can test your entire system!

## Project to start with

I think without practical examples it was a bit difficult for you to take it.
For such purposes, at the end of the summer, I made a [workshop application](https://github.com/YanLobat/effector-workshop) for Odessa.js and everyone.  It is broken down into branches. In the master of the boilerplate, and then you can navigate through the chapters, looking into the pull requests, looking at what has changed.