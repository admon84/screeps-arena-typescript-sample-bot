import { getCore } from './Core';
import { runSample } from './managers/Sample';

export function loop() {
  const core = getCore();
  core.run();

  runSample(core);
}
