'use strict';

var LgtmImageBox = React.createClass({
  getInitialState: function() {
    return {imgPath: "Tether-00180.jpg", lgtm: {text: "LGTM!", fontSize: 5.0}};
  },
  handleChangeLGTM: function(lgtm) {
    this.setState({lgtm: lgtm});
  },
  render: function() {
    return (
      <div id="main">
        <img src={this.state.imgPath} ref="image"/>
        <LgtmText lgtm={this.state.lgtm} />
        <LgtmConfigForm lgtm={this.state.lgtm} onChangeLGTM={this.handleChangeLGTM} />
      </div>
    );
  }
});

var LgtmConfigForm = React.createClass({
  handleChange: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value.trim();
    var fontSize = React.findDOMNode(this.refs.fontSize).value.trim();

    this.props.onChangeLGTM({text: text, fontSize: fontSize});
  },
  render: function(){
    var lgtm = this.props.lgtm;
    return (
      <form onChange={this.handleChange}>
        <input type="text" defaultValue={lgtm.text} placeholder="text" ref="text" />
        <input type="text" defaultValue={lgtm.fontSize} placeholder="font size [em]" ref="fontSize" />
      </form>
    );
  }
});

var LgtmText = React.createClass({
  getInitialState: function() {
    return {top: 0, left: 0};
  },
  handleDragEnd: function(e) {
    this.setState({top: e.clientY, left: e.clientX});
  },
  render: function() {
    var spanStyle = {
      top: this.state.top,
      left: this.state.left,
      fontSize: this.props.lgtm.fontSize + "em"
    };
    return (
      <span id="lgtm" style={spanStyle} draggable="true" onDrag={this.handleDrag} onDragEnd={this.handleDragEnd} onDragStart={this.handleDragStart}>{this.props.lgtm.text}</span>
    );
  }
});

var component = React.render(
  <LgtmImageBox />,
  document.getElementById('content')
);

var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');

var menu = new Menu();
menu.append(new MenuItem({label: "Copy Image to Clipboard", click: function() {
  var imageDOM = React.findDOMNode(component.refs.image);
  var rect = {
    x: imageDOM.x,
    y: imageDOM.y,
    width: imageDOM.width,
    height: imageDOM.height
  };
  remote.getCurrentWindow().capturePage(rect, function(img) {
    var clipboard = remote.require('clipboard');
    clipboard.writeImage(img);
  });
}}));

window.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);

