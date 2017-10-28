import styled from 'styled-components';

const BubbleUnder = styled.div`
position: relative;
width: 190px;
height: 135px;
padding: 8px;
background: #333;
-webkit-border-radius: 5px;
-moz-border-radius: 5px;
border-radius: 5px;
  color: white;
  font-size: 0.8rem;
:after {
  content: '';
  position: absolute;
  border-style: solid;
  border-width: 0 17px 14px;
  border-color: #333 transparent;
  display: block;
  width: 0;
  z-index: 1;
  top: -14px;
  left: 86px;
}
& ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
`;

export default BubbleUnder;
