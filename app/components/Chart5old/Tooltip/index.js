/**
*
* Tooltip
*
*/

import React from 'react';
import BubbleOver from './BubbleOver';
import BubbleOverWrapper from './BubbleOverWrapper';

function Tooltip(props) {
  const { meteorites, tooltip } = props;
  const selected = meteorites[tooltip.index];
  const { name, reclong, reclat, mass, year } = selected.properties;
  const date = new Date(year);
  const details = () =>
    (<ul>
      <li>{`Name: ${name}`}</li>
      <li>{`Date: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</li>
      <li>{`Mass: ${mass}`}</li>
      <li>{`Long: ${reclong}`}</li>
      <li>{`Lat: ${reclat}`}</li>

    </ul>);
  const content = () => (<BubbleOverWrapper
    style={{ left: tooltip.x, top: tooltip.y }}
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
