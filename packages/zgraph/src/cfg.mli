module type X = sig
  type jx  (* extension at join point *)
  type fx  (* extension at fork point *)
  type nx  (* extension at non-fork/join nodes *)
  val jx : unit -> jx
  val fx : unit -> fx
  val nx : unit -> nx
end
