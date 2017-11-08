import styled from 'styled-components';
/* eslint prefer-template:0 */

export default styled.circle`
  shape-rendering: auto;
  transition: r 500ms;
  transform-origin: ${(props) => (props.cx) + 'px'} ${(props) => (props.cy) + 'px'};
  :hover {
    r: 10px;
  }
`;
