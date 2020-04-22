---
id: best-practices
title: Best practices
---

Effector provides you pretty powerful tooling to migrate all the remaining logic from views to your models(events, effects, stores and their connections in general)

Here are some advices on buildling UI without stress:

## Store handlers

Despite your stores having an option to be mapped(`store.map`) multiple times, you definitely should avoid handling any events by a mapped store, since this is a big semantic inconsistency.

## File Structure

Each model should contain from 2 to 3 files(depends on your preferences).

First of them is `index` file which exports only the public interface of your model. Public interface means your events and effects which are used in views directly.

The second one is `state` file which exports only model store and mapped stores based on it if they are present.

And the last is an `init` file. Init file exports nothing, it only imports events, stores from different models. This is a place where you initialize your effects, to keep other modules pure. Just after that, you start buildling the dataflow of the model (connecting Units aka `forward`, `sample`, `guard`, `merge`, `split`)
