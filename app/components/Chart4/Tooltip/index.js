/**
*
* Tooltip
*
*/

import React from 'react';
import BubbleOver from './BubbleOver';
import BubbleOverWrapper from './BubbleOverWrapper';

function Tooltip(props) {
  const { nodes, selected } = props;
  const country = nodes[selected].country;
  const details = () =>
    (<ul>
      <li>{country}</li>
    </ul>);
  const content = () => (<BubbleOverWrapper
    style={{ left: nodes[selected].x - 60, top: nodes[selected].y - 105 }}
  >
    <BubbleOver>
      {details()}
    </BubbleOver>
  </BubbleOverWrapper>);
  return content();
}

Tooltip.propTypes = {

};

export default Tooltip;
