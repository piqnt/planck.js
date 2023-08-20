import { CollidePolygons } from './collision/shape/CollidePolygon';
import { SettingsInternal as Settings } from './Settings';
import { Sweep } from './common/Sweep';
import { DynamicTree } from './collision/DynamicTree';
import { Manifold } from './collision/Manifold';
import { Distance } from './collision/Distance';
import { TimeOfImpact } from './collision/TimeOfImpact';
import { stats } from './util/stats';

/** @deprecated Merged with main namespace */
export const internal = {
  CollidePolygons,
  Settings,
  Sweep,
  Manifold,
  Distance,
  TimeOfImpact,
  DynamicTree,
  stats
};
