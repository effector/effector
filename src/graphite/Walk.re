%raw
"/*@flow*/";

open FullDatatype;

/* exception UnsupportedContext(string); */
let stepArg = (ctx: Ctx.ctx('a)) =>
  switch (ctx |. Ctx.type_) {
  | 21 => %raw
          "ctx.data.result"
  | 22 => %raw
          "ctx.data.payload"
  | 24
  | 25 => %raw
          "ctx.data.value"
  | _ => %raw
         "(()=>{throw new Error('RunContext is not supported')})()"
  };

let singleEmit = (arg, single, ctx, transactions) => {
  Cmd.cmdUnT(single);
  Ctx.emit(. [%raw "single.data.fullName"], arg);
};

let singleFilter = (arg, single, ctx, transactions) => {
  Cmd.cmdUnT(single);
  Ctx.getType(ctx);
  /* WARN! there was try catch wrapper */
  let isChanged: bool = [%raw "single.data.filter(arg, ctx)"];
  Ctx.filter(. arg, isChanged);
};

let singleStep =
  (.
    single: Cmd.cmd,
    ctx: Ctx.ctx(int),
    transactions: array((. unit) => unit),
  ) => (
    {
      let arg = stepArg(ctx);
      let r: Ctx.ctxg =
        switch (Cmd.cmdUnT(single)) {
        | Cmd.EmitType =>
          let em = singleEmit(arg, single, ctx, transactions);
          let emg: Ctx.ctxg = Ctx.EmitG(em);
          emg;
        | Cmd.FilterType =>
          let out: Ctx.ctxg = [%raw
            {|(() => {
           try {
            const isChanged = single.data.filter(arg, ctx)
            return Ctx.filter(arg, isChanged)
           } catch (err) {
            console.error(err)
            return
           }
          })()|}
          ];
          out;
        | Cmd.RunType =>
          let transCtx = [%raw "single.data.transactionContext"];
          if (transCtx) {
            let _ = Js.Array.push(transCtx, transactions);
            ();
          };
          Ctx.EmitG(Ctx.emit(. [%raw "single.data.fullName"], arg));
        | Cmd.UpdateType =>
          let newCtx = Ctx.update(. arg);
          let _ = [%raw "single.data.store.set(arg)"];
          Ctx.UpdateG(newCtx);
        | Cmd.ComputeType =>
          let newCtx =
            Ctx.compute(.
              [|[%raw "undefined"], arg, [%raw "ctx"]|],
              [%raw "null"],
              [%raw "null"],
              false,
              true,
              true,
            );
          let fr: Ctx.ctxg = [%raw
            {|(()=>{
          try {
           const result = single.data.reduce(undefined, arg, newCtx)
           newCtx.data.result = result
           newCtx.data.isNone = result === undefined
          } catch (err) {
           newCtx.data.isError = true
           newCtx.data.error = err
           newCtx.data.isChanged = false
          }
          if (!newCtx.data.isChanged) return
          return newCtx
       })()|}
          ];
          Js.log(newCtx);
          fr;
        };
      r;
      %raw
      {|r = r[0]|};
      r;
    }: Ctx.ctxg
  );