import styled from 'styled-components';

const BubbleWrapper = styled.div`
  position: absolute;
  top: ${props => props.y + 30}px;
  left:${props => props.x - 100}px;
`;

export default BubbleWrapper;
