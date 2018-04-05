//@flow
/* eslint-disable flowtype/space-after-type-colon,no-unused-vars */
type Task<A> = (a: A) => void

type Canceller = Task<void>
type Emit<A> = Task<void>

type Event<A> = (task: Task<A>) => Canceller

type EventT<A, B> = (e1: Event<A>) => Event<B>

const noop: Canceller = () => {}

export function canceller(a: Canceller, b: Canceller): Canceller {
  if (a === noop) {
    if (b === noop) return noop
    return b
  } else if (b === noop) return a
  return () => {
    a()
    b()
  }
}

export function pure<A>(a: A): Event<A> {
  return (task: Task<A>): Canceller => {
    task(a)
    return noop
  }
}

export function map<A, B>(f: (a: A) => B): EventT<A, B> {
  return (e: Event<A>): Event<B> => (task: Task<B>): Canceller =>
    e(a => {
      task(f(a))
    })
}

export function never<A>(task: Task<A>): Canceller {
  return noop
}

export function apply<A, B>(e1: Event<(b: A) => B>): EventT<A, B> {
  return (e2: Event<A>): Event<B> => (task: Task<B>): Canceller => {
    let fn_latest, a_latest
    let fn_fired = false,
        a_fired = false

    const cancel1 = e1(fn => {
      fn_latest = fn
      fn_fired = true

      if (a_fired) {
        task(fn_latest(a_latest))
      }
    })

    const cancel2 = e2(a => {
      a_latest = a
      a_fired = true

      if (fn_fired) {
        task(fn_latest(a_latest))
      }
    })

    return canceller(cancel1, cancel2)
  }
}

export function merge<A>(e1: Event<A>): EventT<A, A> {
  return (e2: Event<A>): Event<A> => (task: Task<A>): Canceller => {
    const cancel1 = e1(task)
    const cancel2 = e2(task)

    return canceller(cancel1, cancel2)
  }
}

export function fold<A, B>(f: (a: A) => (b: B) => B) {
  return (e: Event<A>) => (b: B): Event<B> => (task: Task<B>): Canceller => {
    let result = b

    return e(a => {
      task((result = f(a)(result)))
    })
  }
}

export function filter<A, B /*: $Subtype<A>*/, P /*: $Pred<1>*/>(
  p: P,
): EventT<A, B> {
  return (e: Event<A>) => (task: Task<B>) =>
    e(a => {
      if (p(a)) {
        const b: B = (a: any)
        task(b)
      }
    })
}

export function sampleOn<A, B>(e1: Event<A>): EventT<(a: A) => B, B> {
  return (e2: Event<(a: A) => B>): Event<B> => (task: Task<B>) => {
    let latest
    let fired = false

    const cancel1 = e1(a => {
      latest = a
      fired = true
    })

    const cancel2 = e2(f => {
      if (fired) {
        task(f(latest))
      }
    })

    return canceller(cancel1, cancel2)
  }
}

function cancelF<A>(f: (a: A) => Canceller): Task<A> {
  return (a: A) => {
    f(a)()
  }
}

export function subscribe<A>(e: Event<A>) {
  return (f: (a: A) => Canceller) => {
    const cancel = cancelF(f)
    return () => e(cancel)
  }
}

export function keepLatest<A>(e: Event<Event<A>>): Event<A> {
  return (task: Task<A>) => {
    let cancelInner

    const cancelOuter = e(inner => {
      cancelInner && cancelInner()
      cancelInner = inner(task)
    })

    return () => {
      cancelInner && cancelInner()
      cancelOuter()
    }
  }
}

interface Ev<A> {
  /*::+*/ event: Event<A>;
  push(a: A): Emit<A>;
}

class EvType<A> implements Ev<A> {
  subs: Task<A>[] = []
  event(task: Task<A>): Canceller {
    this.subs.push(task)
    return () => {
      const index = this.subs.indexOf(task)
      if (index >= 0) {
        this.subs.splice(index, 1)
      }
    }
  }
  push(a: A): Emit<A> {
    return () => {
      for (let i = 0; i < this.subs.length; i++) {
        this.subs[i](a)
      }
    }
  }
  constructor() {
    //$off
    this.push = this.push.bind(this)
    //$off
    this.event = this.event.bind(this)
  }
}

export function create<A>(): Ev<A> {
  const tasks: Task<A>[] = []
  return {
    event(task: Task<A>): Canceller {
      tasks.push(task)
      return () => {
        const index = tasks.indexOf(task)
        if (index >= 0) {
          tasks.splice(index, 1)
        }
      }
    },
    push(a: A): Emit<A> {
      return () => {
        for (let i = 0; i < tasks.length; i++) {
          tasks[i](a)
        }
      }
    },
  }
}

export function fix<A>(
  f: (
    e: Event<A>,
  ) => {
    input: Event<A>,
    output: Event<A>,
  },
): Event<A> {
  const {event, push} = create()
  const {input, output} = f(event)
  const task1: Task<A> = (a: A) => {
    push(a)()
  }
  return (task: Task<A>): Canceller => {
    const cancel1 = input(task1)
    const cancel2 = output(task)

    return canceller(cancel1, cancel2)
  }
}

export function count<A>(e: Event<A>): Event<number> {
  let i = 0
  return (task: Task<number>) =>
    e(a => {
      task(++i)
    })
}

export function interval(n: number): Event<number> {
  return (task: Task<number>) => {
    const currentInterval = setInterval(() => {
      task(new Date().getTime())
    }, n)
    return () => {
      clearInterval(currentInterval)
    }
  }
}

export function animationFrame(task: Task<void>): Canceller {
  let cancelled = false
  const runRaf = () => {
    task()
    if (!cancelled) {
      loop()
    }
  }
  function loop() {
    window.requestAnimationFrame(runRaf)
  }
  loop()
  return () => {
    cancelled = true
  }
}

export function withTime<A>(e: Event<A>): Event<{time: number, value: A}> {
  return task =>
    e(a => {
      const time = new Date().getTime()
      task({time, value: a})
    })
}
