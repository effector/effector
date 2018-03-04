
type item = string
type tree =
    Item of item
  | Section of tree list;;

type path =
    Top
  | Node of tree list * path * tree list;;

type location = Loc of tree * path;;

let lst1 = Section[
  Section[Item "a"; Item "*"; Item "b"];
  Item "+";
  Section[Item "c"; Item "*"; Item "d"];
]

let go_left (Loc(t,p)) = match p with
    Top -> failwith "left of top"
  | Node(l::left,up,right) -> Loc(l,Node(left,up,t::right))
  | Node([],up,right) -> failwith "left of first";;

let go_right (Loc(t,p)) = match p with
    Top -> failwith "right of top"
  | Node(left,up,r::right) -> Loc(r,Node(t::left,up,right))
  | _ -> failwith "right of last";;

let go_up (Loc(t,p)) = match p with
    Top -> failwith "up of top"
  | Node(left,up,right) -> Loc(Section(left @ (t::right)),up);;

let go_down (Loc(t,p)) = match t with
    Item(_) -> failwith "down of item"
  | Section(t1::trees) -> Loc(t1,Node([],p,trees))
  | _ -> failwith "down of empty";;

let change (Loc(_,p)) t = Loc(t,p);;

let insert_right (Loc(t,p)) r = match p with
    Top -> failwith "insert of top"
  | Node(left,up,right) -> Loc(t,Node(left,up,r::right));;

let insert_left (Loc(t,p)) l = match p with
    Top -> failwith "insert of top"
  | Node(left,up,right) -> Loc(t,Node(l::left,up,right));;

let insert_down (Loc(t,p)) t1 = match t with
    Item(_) -> failwith "down of item"
  | Section(sons) -> Loc(t1,Node([],p,sons));;

(* let nth loc = function
    1 -> go_down(loc)
  | n -> if n>0
    then go_right(nth (n-1))
    else failwith "nth expects a positive integer";; *)

let delete (Loc(_,p)) = match p with
    Top -> failwith "delete of top"
  | Node(left,up,r::right) -> Loc(r,Node(left,up,right))
  | Node(l::left,up,[]) -> Loc(l,Node(left,up,[]))
  | Node([],up,[]) -> Loc(Section[],up);;

let () = Js.log lst1
