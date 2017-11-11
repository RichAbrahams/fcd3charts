/**
 *
 * Asynchronously loads the component for Chart4
 *
 */

import Loadable from 'react-loadable';

import LoadingIndicator from 'components/Loading';

export default Loadable({
  loader: () => import('./index'),
  loading: LoadingIndicator,
  delay: 5000,
});
