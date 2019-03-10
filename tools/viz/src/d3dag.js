//@flow
import {
  dagStratify,
  dagConnect,
  sugiyama,
  decrossOpt,
  twolayerOpt,
  decrossTwoLayer,
  layeringSimplex,
  layeringLongestPath,
  layeringCoffmanGraham,
  coordVert,
  coordMinCurve,
  coordGreedy,
  coordCenter,
  //$todo
} from 'd3-dag'

/**
 * couple of valid ways to configure
 * pretty opaque library 'd3-dag'
 *
 * assumed that we need exactly one property
 * of each export here
 */

export const sources = {
  grafo: dagStratify(),
  xShape: dagStratify(),
  zherebko: dagConnect().linkData(() => ({})),
}
export const layerings = {
  simplex: layeringSimplex(), // slow
  longestPath: layeringLongestPath(), // fast
  coffmanGraham: layeringCoffmanGraham(), // medium
}
export const decrossings = {
  optimal: decrossOpt(), // slow
  twoLayerOpt: decrossTwoLayer().order(twolayerOpt()), //medium
  twoLayer: decrossTwoLayer(), // fast
}
export const coords = {
  vertical: coordVert(), //slow
  minimumCurves: coordMinCurve(), //slow
  greedy: coordGreedy(), //medium
  center: coordCenter(), //fast
}
export const layouts = {sugiyama}
