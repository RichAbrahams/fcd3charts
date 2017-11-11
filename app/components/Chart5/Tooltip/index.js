/**
*
* Tooltip
*
*/

import React from 'react';
import BubbleOver from './BubbleOver';
import BubbleOverWrapper from './BubbleOverWrapper';

function Tooltip(props) {
  const { selected } = props;
  const { name, id, mass, recclass, reclat, reclong, year } = selected.properties;
  const date = new Date(year);
  const dateText = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const details = () =>
    (<ul>
      <li>{`Name: ${name}`}</li>
      <li>{`ID: ${id}`}</li>
      <li>{`Date: ${dateText}`}</li>
      <li>{`Class: ${recclass}`}</li>
      <li>{`Mass: ${mass}`}</li>
      <li>{`Lat: ${reclat}`}</li>
      <li>{`Long: ${reclong}`}</li>
    </ul>);
  const content = () => (<BubbleOverWrapper
    style={{ left: selected.x - 94, top: selected.y - 215 }}
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

