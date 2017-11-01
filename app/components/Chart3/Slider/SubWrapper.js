import styled from 'styled-components';

const Wrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  margin-right: ${(props) => props.marginRight}px;
  align-items: center;
`;

export default Wrapper;
