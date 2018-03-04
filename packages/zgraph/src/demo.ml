


module Rtl = struct
  type rtl
  type exp
end

module Base = struct
  type uid
  type label = uid * string (* (unique id, assembly-code name) *)
  type graph
  type zgraph
end

type 'a btree = Empty | Node of 'a * 'a btree * 'a btree

let rec member x btree =
   match btree with
     Empty -> false
   | Node(y, left, right) ->
       if x = y then true else
       if x < y then member x left else member x right

let rec insert x btree =
   match btree with
     Empty -> Node(x, Empty, Empty)
   | Node(y, left, right) ->
       if x <= y then Node(y, insert x left, right)
                 else Node(y, left, insert x right)
exception Unbound_variable of string
type expression =
     Const of float
   | Var of string
   | Sum of expression * expression    (* e1 + e2 *)
   | Diff of expression * expression   (* e1 - e2 *)
   | Prod of expression * expression   (* e1 * e2 *)
   | Quot of expression * expression   (* e1 / e2 *)

let rec eval env exp =
   match exp with
     Const c -> c
   | Var v ->
       (try List.assoc v env with Not_found -> raise(Unbound_variable v))
   | Sum(f, g) -> eval env f +. eval env g
   | Diff(f, g) -> eval env f -. eval env g
   | Prod(f, g) -> eval env f *. eval env g
   | Quot(f, g) -> eval env f /. eval env g

let rec deriv exp dv =
   match exp with
     Const c -> Const 0.0
   | Var v -> if v = dv then Const 1.0 else Const 0.0
   | Sum(f, g) -> Sum(deriv f dv, deriv g dv)
   | Diff(f, g) -> Diff(deriv f dv, deriv g dv)
   | Prod(f, g) -> Sum(Prod(f, deriv g dv), Prod(deriv f dv, g))
   | Quot(f, g) -> Quot(Diff(Prod(deriv f dv, g), Prod(f, deriv g dv)),
                        Prod(g, g))

module IntMap = Map.Make(struct
  type t = int
  let compare (x : int) y = compare x y
end)

let test () =
  let m = ref IntMap.empty in
  let count = 1000000 in
  for i = 0 to count do
    m := IntMap.add i i !m
  done;
  for i = 0 to count do
    ignore (IntMap.find i !m)
  done

let () = test()

(* module type ZNode = sig
  val entry : Base.graph -> Base.zgraph (* focus on edge out of entry *)
  val exit : Base.graph -> Base.zgraph (* focus on edge into default exit *)
  val focus : Base.uid -> Base.graph -> Base.zgraph (* focus on edge out of node with uid *)
  val unfocus : Base.zgraph -> Base.graph (* lose focus *)
  val empty : Base.graph (* entry and exit *)
end *)

let mm : ModuleExample.OrderedString.t = ""

let lb = (0, "lb")
(* module ZGraph : Base = struct
  type uid = number
  type machine (* target-machine info (see below) *)
  type label = machine -> label -> nodes

  type nodes = Base.zgraph -> Base.zgraph (* sequence of nodes *)
  type instruction = Rtl.rtl -> nodes
  type branch = machine -> label -> nodes
  type cbranch = machine -> Rtl.exp -> ifso:label -> ifnot:label -> nodes
  type first = Entry
            | Label of label * local (* * Spans.t option ref*)
  and local = Local of bool (* compiler-generated label? *)
  type middle = Instruction of Rtl.rtl
  type last = Exit
  | Branch of Rtl.rtl * label
  | Cbranch of Rtl.rtl * label * label (* true, false *)
  (* | Call of call *)
  | Return of Rtl.rtl
  type zblock = head * tail
  and head = First of first | Head of head * middle
  and tail = Last of last | Tail of middle * tail
  type block = first * tail
  type graph = block Map.Make(ZNode)
  type zgraph = zblock * block Map
end *)


(* type call = machine -> Rtl.exp -> altrets:contedge list ->
unwinds_to:contedge list -> cuts_to:contedge list ->
aborts:bool -> uses:regs -> defs:regs -> kills:regs ->
reads:string list option -> writes:string list option ->
spans:Spans.t option -> succ_assn:Rtl.rtl -> nodes
type return = Rtl.rtl -> uses:regs -> nodes *)

(* let _ = (sum myTree) |> Js.log *)
let () = Js.log "Hello, BuckleScript"