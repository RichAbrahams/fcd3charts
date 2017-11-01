/**
 *
 * Asynchronously loads the component for Chart4
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
