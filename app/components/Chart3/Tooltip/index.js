/**
*
* Tooltip
*
*/

import React from 'react';
import BubbleOver from './BubbleOver';
import BubbleOverWrapper from './BubbleOverWrapper';

function Tooltip(props) {
  const { data, toolTip, chartHeight, mousePosition, paddingTop } = props;
  const selected = data.get(toolTip);
  const month = selected.get('monthName');
  const year = selected.get('year');
  const temp = selected.get('temp').toFixed(2);
  const variance = selected.get('variance').toFixed(2);
  const bottom = `${(chartHeight - paddingTop) - (mousePosition.get('y') - 20)}px`;
  const left = `${mousePosition.get('x') + 35}px`;
  const details = () =>
    (<ul>
      <li>{month} {year}</li>
      <li>temperature: {temp}</li>
      <li>variance: {variance}</li>
    </ul>);
  const content = () => {
    return (<BubbleOverWrapper
      x={selected.get('x')}
      y={mousePosition.get('y')}
      chartHeight={chartHeight - paddingTop}
      style={{ bottom, left }}
    >
      <BubbleOver>
        {details()}
      </BubbleOver>
    </BubbleOverWrapper>);
  };
  if (!selected.get('render')) {
    return null;
  }
  return content();
}

// bottom: ${props => (props.chartHeight - (props.y - 20))}px;
// left:${props => props.x - 73}px;


Tooltip.propTypes = {

};

export default Tooltip;
