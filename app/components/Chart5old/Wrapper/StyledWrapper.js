import styled from 'styled-components';

const Wrapper = styled.div`
  overflow: hidden;
  background: #4169E1;
  cursor: ${(props) => props.dragging ? 'grabbing' : 'cursor'};
`;

export default Wrapper;
