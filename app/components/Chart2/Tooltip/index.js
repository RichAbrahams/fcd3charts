/**
*
* Tooltip
*
*/

import React from 'react';
import BubbleOver from './BubbleOver';
import BubbleUnder from './BubbleUnder';
import BubbleOverWrapper from './BubbleOverWrapper';
import BubbleUnderWrapper from './BubbleUnderWrapper';

function Tooltip(props) {
  const { data, toolTip, svgHeight } = props;
  const selected = data[toolTip.index];
  const details = () =>
    (<ul>
      <li>Name: {selected.Name}</li>
      <li>Nationality: {selected.Nationality}</li>
      <li>Ranking: {selected.Place}</li>
      <li>Time: {selected.Time}</li>
      <li>Doping: {selected.Doping || 'no allegations'}</li>
    </ul>);
  const content = () => {
    const elements = toolTip.y > svgHeight / 2 ?
      (<BubbleOverWrapper x={toolTip.x} y={toolTip.y} svgHeight={svgHeight}>
        <BubbleOver>
          {details()}
        </BubbleOver>
      </BubbleOverWrapper>)
       :
      (<BubbleUnderWrapper x={toolTip.x} y={toolTip.y} svgHeight={svgHeight}>
        <BubbleUnder>
          {details()}
        </BubbleUnder>
      </BubbleUnderWrapper>);
    return elements;
  };

  return content();
}

Tooltip.propTypes = {

};

export default Tooltip;
