Effector provides you pretty powerful tooling to migrate all the remaining logic from views to your models(events, effects, stores and their connections in general)

Here are some advice on buildling stress relief UI:

## Stores handlers

Despite your stores have an option to be mapped(`store.map`) multiple times, you definitely should avoid handling any events by a mapped store. Since this is a big semantic inconsistency.

## File Structure

Each model should contain from 2 to 3 files(depend on your preferences).

First of them is `index` file which exports only the public interface of your model. Public interface means your events and effects which are used in views directly.

The second one is `state` file which exports only model store and mapped stores based on it if they are present.

And the last but not the least is `init` file. Init file exports NOTHING, it only imports events, stores from different models as well. This is a place where you initialize your effects first, then set some handlers on your model store. Just after that, you start buildling the dataflow for the model (connecting Units aka `forward`, `sample`, `guard`, `merge`, `split`)
