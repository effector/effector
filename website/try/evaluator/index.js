import {loadEngine} from './loadEngine';
import {prepareRuntime} from './prepareRuntime';
import {evalExpr} from './evalExpr';

export async function evaluator(code) {
  const effector = await loadEngine();
  const env = prepareRuntime(effector);
  return evalExpr(code, env);
}
