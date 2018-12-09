declare module 'estree' {
  declare export interface Position {
    +line: number;
    +column: number;
  }
  declare export interface SourceLocation {
    +source: string | null;
    +start: Position;
    +end: Position;
  }
  declare export interface Node {
    +type: string;
    +loc: SourceLocation | null;
  }
  declare export interface Statement extends Node {}
  declare export interface Expression extends Node {}
  declare export interface Literal extends Expression {
    +type: 'Literal';
    +value: string | boolean | null | number | RegExp;
  }

  declare export interface Directive extends Node {
    +type: 'ExpressionStatement';
    +expression: Literal;
    +directive: string;
  }
  declare export interface Program extends Node {
    +type: 'Program';
    +body: $ReadOnlyArray<Directive | Statement>;
  }
}
