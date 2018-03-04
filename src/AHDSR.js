//@flow

declare class Stream<t> {
  map<s>(fn: (_: t) => s): Stream<s>;
  chain<s>(fn: (_: t) => Stream<s>): Stream<s>;
}

declare class AHDSR<Attack, Hold, Decay, Sustain, Release> {
  /*::+*/ attack: Attack;
  /*::+*/ hold: Hold;
  /*::+*/ decay: Decay;
  /*::+*/ sustain: Sustain;
  /*::+*/ release: Release;

  /*::+*/ attackStream: Stream<Attack>;
  /*::+*/ holdStream: Stream<Hold>;
  /*::+*/ decayStream: Stream<Decay>;
  /*::+*/ sustainStream: Stream<Sustain>;
  /*::+*/ releaseStream: Stream<Release>;

  beforeFirstCall(): Attack;
  beforeEveryCall(attack: Attack): Hold;
  call(hold: Hold): Decay;
  afterEveryCall(decay: Decay): Sustain;
  afterLastCall(release: Release): void;

  beforeFirstCallStream(none: Stream<void>): Stream<Attack>;
  beforeEveryCallStream(attack: Stream<Attack>): Stream<Hold>;
  callStream(hold: Stream<Hold>): Stream<Sustain>;
  afterEveryCallStream(decay: Stream<Decay>): Stream<Release>;
  afterLastCallStream(release: Stream<Release>): Stream<void>;
}

class ApiSingleton {
  current: {
    orgId: number,
    hasAuth: boolean,
  } = {orgId: -1, hasAuth: false}
  admin: {
    invites: Set<string>,
  } = {invites: new Set()}
}

declare class ApiRequest<Params, Result, Error> extends AHDSR<
  ApiSingleton,
  Params,
  Promise<Result>,
  void,
  void,
> {
  beforeFirstCall(): ApiSingleton;
  done(): Promise<Result>;
  fail(): Promise<Error>;
  // constructor(fn: (params: Params) => Promise<Result>): this;
  //use(params: Params)
}
const api = new ApiSingleton()
const state = {
  getState() {
    return api
  },
}
;(async function init() {
  const req = new class Request extends ApiRequest<{foo: string}, void, Error> {
    beforeFirstCall() {
      return state.getState()
    }
    call = hold => Promise.resolve(hold)
  }()
})()
