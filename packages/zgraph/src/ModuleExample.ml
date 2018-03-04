module type MySig = sig
  type t = int
  val x: int
end
module MyModule: MySig = struct
  type t = int
  let x = 10
end
module MyModuleNest = struct
  module NestedModule = struct
     let msg = "hello"
  end
end

type comparison = Less | Equal | Greater

module type ORDERED_TYPE =
   sig
     type t
     val compare: t -> t -> comparison
   end;;

module Set: functor (Elt : ORDERED_TYPE) ->
    sig
      type element = Elt.t
      type set = element list
      val empty : 'a list
      val add : Elt.t -> Elt.t list -> Elt.t list
      val member : Elt.t -> Elt.t list -> bool
    end =
   functor (Elt: ORDERED_TYPE) ->
     struct
       type element = Elt.t
       type set = element list
       let empty = []
       let rec add x s =
         match s with
           [] -> [x]
         | hd::tl ->
            match Elt.compare x hd with
              Equal   -> s         (* x is already in s *)
            | Less    -> x :: s    (* x is smaller than all elements of s *)
            | Greater -> hd :: add x tl
       let rec member x s =
         match s with
           [] -> false
         | hd::tl ->
             match Elt.compare x hd with
               Equal   -> true     (* x belongs to s *)
             | Less    -> false    (* x is smaller than all elements of s *)
             | Greater -> member x tl
     end;;

module OrderedString : sig
  type t = string
  val compare : 'a -> 'a -> comparison
end =
   struct
     type t = string
     let compare x y = if x = y then Equal else if x < y then Less else Greater
   end;;