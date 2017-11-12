/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Chart1 from 'containers/Chart1/Loadable';
import Chart2 from 'containers/Chart2/Loadable';
import Chart3 from 'containers/Chart3/Loadable';
import Chart4 from 'containers/Chart4/Loadable';
import Chart5 from 'containers/Chart5/Loadable';
import NavBar from 'containers/NavBar';
import Footer from 'components/Footer';
import Wrapper from './Wrapper';

export default function App() {
  return (
    <Wrapper className="root">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Chart1} />
        <Route path="/chart2" component={Chart2} />
        <Route path="/chart3" component={Chart3} />
        <Route path="/chart4" component={Chart4} />
        <Route path="/chart5" component={Chart5} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </Wrapper>
  );
}
