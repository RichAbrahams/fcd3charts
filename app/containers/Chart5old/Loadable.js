/**
 *
 * Asynchronously loads the component for Chart5
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
