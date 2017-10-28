/**
*
* Plots
*
*/

import React from 'react';
import shortId from 'shortid';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Circle from './styledCircle';
import G from './G';

function Plots(props) {
  const { data, xScale, yScale, paddingLeft, paddingTop, toggleTooltip } = props;
  const plot = data.map((item, index) =>
    (<Circle
      className="plot"
      r={5}
      cx={xScale(item.timeBehindFastest)}
      cy={yScale(item.Place)}
      key={shortId.generate()}
      fill={item.Doping ? 'rgb(191, 42, 35)' : 'rgb(166, 173, 60)'}
      onMouseEnter={() => toggleTooltip({
        x: xScale(item.timeBehindFastest) + paddingLeft,
        y: yScale(item.Place) + paddingTop,
        index,
      })}
      onMouseLeave={() => toggleTooltip()}
    />)
  );
  return (
    <G transform={`translate(${paddingLeft}, ${paddingTop})`} className="plotGroup">
      <ReactCSSTransitionGroup
        component="g"
        transitionName="animation"
        transitionAppear
        transitionAppearTimeout={4000}
        transitionEnter={false}
        transitionLeave={false}
      >
        {plot}
      </ReactCSSTransitionGroup>
    </G>
  );
}

Plots.propTypes = {

};

export default Plots;
