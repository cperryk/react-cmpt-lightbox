# react-cmpt-lightbox

A stateless React component for wrapping any content in a lightbox. Based on the properties you pass to it, the lightbox may display a close button, a left (back) arrow, and a next (right) arrow.

React-cmpt-lightbox works with Browserify. It injects CSS onto the page using [sassify](https://github.com/davidguttman/sassify).

The arrow are SVG; this requires no static assets.

If the lightbox is bigger than the window, the user can scroll it.

## Usage

```
import Lightbox from 'react-cmpt-lightbox';

// ...

<Lightbox onClose={handleLightboxClose} onNext={handleNext} onBack={handleBack}>
  <div>Some arbitrary content.</div>
</Lightbox>
```

Note: The lightbox does NOT close itself. You must pass it a close function to it. This function should update the state of a parent component and re-render it so that it includes no lightbox.


## Props
* __onClose__: Func. Setting this will make an X button will appear in the top-right corner of the box. This function will run when that button is clicked. This function will also fire if the user hits the escape key while the lightbox is open.
* __onNext__: Func. Setting this will display an arrow to the left of the lightbox. This function will fire when the user clicks that arrow or presses the left arrow key.
* __onBack__: Func. Setting this will display an arrow to the right of the lightbox. This function will fire when the user clicks that arrow or presses the right arrow key.


## CSS

BODY will receive the class `int-lightbox-activated` when the lightbox is activated. This class will be removed when the component unmounts. All this class does is set `overflow-y` to `hidden` to prevent the user from scrolling the page while the lightbox is active.

To tweak the darkness or shade of the shim:
```
.int-lightbox-cell{
  background: rgba(0, 0, 0, 0.8);
}
```

To tweak the space between the lightbox and and its contents:
```
.int-lightbox-contents-inner{
  margin: 1.75em;
}
```

For more, check out `lightbox.scss`.
