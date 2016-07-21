import React from 'react';
require('./lightbox.scss');
const addClass = (ele, cls) => {if(!hasClass(ele, cls)) ele.className += cls;};
const removeClass = (e, c) => e.className = e.className.replace(new RegExp('(?:^|s)' + c + '(?!S)'), '');
const hasClass = (element, cls) => (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;

export default React.createClass({
  propTypes: {
    onClose: React.PropTypes.func,
    onBack: React.PropTypes.func,
    onNext: React.PropTypes.func,
  },
  componentDidMount: function(){
    addClass(document.body, 'int-lightbox-activated');
    window.addEventListener('keydown', this.handleKeyDown);
  },
  componentWillUnmount: function(){
    removeClass(document.body, 'int-lightbox-activated');
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  render: function(){
    const {onClose, children, onBack, onNext} = this.props;
    const left_arr = onBack ?
      <div className="int-lightbox-arr int-lightbox-leftarr">
        <Triangle fill="white" onClick={onBack}/>
      </div> : '';
    const right_arr = onNext ?
      <div className="int-lightbox-arr int-lightbox-rightarr">
        <Triangle fill="white" direction="right" onClick={onNext}/>
      </div> : '';
    const close_btn = onClose ? <button className="int-lightbox-btn-ex" onClick={onClose}>x</button> : '';
    return (
      <div className="int-lightbox">
        <div className="int-lightbox-outer">
          <div className="int-lightbox-inner">
            <div className="int-lightbox-row">
              <div className="int-lightbox-cell" onClick={this.onOutClick}>
                <div className="int-lightbox-content-wrapper">
                  <div className="int-lightbox-content-outer">
                    <div className="int-lightbox-row">
                      {left_arr}
                      <div className="int-lightbox-contents">
                        <div className="int-lightbox-contents-inner">
                          {close_btn}
                          {children}
                        </div>
                      </div>
                      {right_arr}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  onOutClick: function(e){
    if(this.props.onClose && hasClass(e.target, 'int-lightbox-cell')){
      this.props.onClose();
    }
  },
  handleKeyDown: function(e){
    if(e.keyCode === 27 && this.props.onClose){ // escape key
      this.props.onClose();
    }
    else if(e.keyCode === 37 && this.props.onBack){
      this.props.onBack();
    }
    else if(e.keyCode == 39 && this.props.onNext){
      this.props.onNext();
    }
  }
});

function Triangle({width=35, height=35, fill="black", direction='left', onClick}){
  const rotate_degrees = {left: 0, top: 90, right: 180, bottom: 270}[direction];
  const cx = width / 2;
  const cy = height / 2;
  const transform_string = `rotate(${rotate_degrees} ${cx} ${cy})`;
  const style = {fill};
  return (
    <svg width="35" height="35" onClick={onClick}>
      <polygon points="0,17.5 35,0 35,35, 0,17.5" style={style} transform={transform_string}/>
    </svg>
  );
}
