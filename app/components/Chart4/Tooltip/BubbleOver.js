import styled from 'styled-components';

const BubbleOver = styled.div`
position: relative;
width: 110px;
height: 55px;
padding: 5px;
background: rgba(134, 168, 216, 0.8);
-webkit-border-radius: 10px;
-moz-border-radius: 10px;
border-radius: 10px;
color: #333;
font-size: 0.8rem;
font-weight: bolder;
display: flex;
justify-content: center;
align-items: center;
  :after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 15px 15px 0;
    border-color: rgba(134, 168, 216, 0.8) transparent;
    display: block;
    width: 0;
    z-index: 1;
    bottom: -15px;
    left: 45px;
  }
  & ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: center;
  }
`;

export default BubbleOver;
