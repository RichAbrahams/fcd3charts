import styled from 'styled-components';

const BubbleOver = styled.div`
position: relative;
width: 110px;
height: 65px;
padding: 10px;
background: #333;
-webkit-border-radius: 10px;
-moz-border-radius: 10px;
border-radius: 10px;
  color: white;
  font-size: 0.8rem;
  :after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 15px 16px 0;
    border-color: #333 transparent;
    display: block;
    width: 0;
    z-index: 2;
    bottom: -15px;
    left: 49px;
  }
  & ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`;

export default BubbleOver;
