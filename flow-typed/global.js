//@flow

declare export var __DEV__: boolean

export type $Spread<A, B, C = {}, D = {}> = /*::
  {
    ...$Exact<$ReadOnly<A>>,
    ...$Exact<B>,
    ...$Exact<C>,
    ...$Exact<D>,
  }
type ____noop1<A, B, C, D> =
*/ A & B & C & D

declare export var assign: $Facebookism$Idx
declare export var merge: $Facebookism$Merge

declare export var flowType: $Flow$DebugPrint
declare export var flowSleep: $Flow$DebugSleep
declare export var flowThrow: $Flow$DebugThrow


export /*::opaque*/
type White = 'white';

export /*::opaque*/
type Black = 'black';

export /*::opaque*/
type Red = 'red';

export /*::opaque*/
type Green = 'green';

export /*::opaque*/
type Blue = 'blue';

export
type $SLor
  = ( White
    & Black
    & Red
    & Green
    & Blue )

export
type $Color
  = ( White
    | Black
    | Red
    | Green
    | Blue )

export
type $Spectre
  = ( White
    & Black
    & Red
    & Green
    & Blue )
  | ( White
    & Red
    & Green
    & Blue )
  | ( White
    & Black
    & Green
    & Blue )
  | ( White
    & Black
    & Red
    & Blue )
  | ( White
    & Black
    & Red
    & Green )
  | ( Black
    & Red
    & Green
    & Blue )

