import React from 'react';
import {render} from 'react-dom';
import Lightbox from '../';
import loremIpsum from 'lorem-ipsum';

const handleClose = ()=> window.alert('closed');

const goTest = (lightbox)=> render(<Test lightbox={lightbox}/>, document.getElementById('root'));
const tests = [
  {
    label: 'Should open an unescapable lightbox because onClose is not defined',
    lightbox: <Lightbox>Test</Lightbox>
  },
  {
    label: 'Should open a lightbox that can be escaped via the X button or escape key.',
    lightbox: <Lightbox onClose={()=>goTest()}>Test</Lightbox>
  },
  {
    label: 'Should open a lightbox with arrows. When arrows are clicked OR the arrow keys are pressed, an alert should appear.',
    lightbox:
      <Lightbox
        onClose={()=>goTest()}
        onNext={()=>alert('next')}
        onBack={()=>alert('back')}
      >Click!</Lightbox>
  },
  {
    label: 'Should open a lightbox with much content. The window should be able to scroll.',
    lightbox: <Lightbox onClose={()=>goTest()}>
      <div style={{width: 500}}>{loremIpsum({count: 100, units: 'sentences'})}</div>
    </Lightbox>
  }
];
const Test = ({lightbox})=>{
  console.log('go test', lightbox);
  const lightbox_node = lightbox ? lightbox : '';
  const btns =  tests.map((test, index) => <li key={index}><button onClick={()=>goTest(test.lightbox)}>{test.label}</button></li>);
  return (
    <div>
      <ol>
        {btns}
      </ol>
      {lightbox_node}
    </div>
  );
};

goTest();
