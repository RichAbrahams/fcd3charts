import styled from 'styled-components';

const BubbleOver = styled.div`
position: relative;
width: 175px;
height: 170px;
padding: 0px;
background: #61A4FF;
-webkit-border-radius: 10px;
-moz-border-radius: 10px;
border-radius: 10px;
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
    border-color: #61A4FF transparent;
    display: block;
    width: 0;
    z-index: 1;
    bottom: -15px;
    left: 72px;
  }
  & ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: center;
  }
`;

export default BubbleOver;
