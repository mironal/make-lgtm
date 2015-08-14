'use strict';

var LgtmComponent = React.createClass({
  getInitialState: function() {
    return {imgPath: undefined, lgtm: {text: "LGTM!", fontSize: 5.0}};
  },
  handleChangeImagePath: function(path) {
    this.setState(path);
  },
  handleChangeLGTM: function(lgtm) {
    this.setState({lgtm: lgtm});
  },
  render: function() {
    return (
      <div id="main">
        <LgtmImageBox
          imgPath={this.state.imgPath}
          onChangeImagePath={this.handleChangeImagePath}
        />
        {this.state.imgPath ? <LgtmText lgtm={this.state.lgtm} /> : null}
        <LgtmConfigForm
          lgtm={this.state.lgtm}
          onChangeLGTM={this.handleChangeLGTM} />
      </div>
    );
  }
});

var LgtmImageBox = React.createClass({
  preventDefault: function(e) {
    e.preventDefault();
  },
  handleDrop: function(e) {
    e.preventDefault();

    if (e.dataTransfer.files.length > 0) {

      var file = e.dataTransfer.files[0];
      var type = file.type;
      if (type.startsWith("image/")) {
        var filePath = file.path;
        this.props.onChangeImagePath({imgPath: filePath});
      }
    }
  },
  handleContextMenu: function(e) {
    e.preventDefault();

    var remote = require('remote');
    var Menu = remote.require('menu');
    var MenuItem = remote.require('menu-item');

    var menu = new Menu();
    if (this.refs.image) {

      var _this = this;
      menu.append(new MenuItem({label: "Copy Image to Clipboard", click: function() {
        var imageDOM = React.findDOMNode(_this.refs.image);
        if (!imageDOM) {
          console.error("image DOM not found.");
          return;
        }
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
    }

    menu.popup(remote.getCurrentWindow());
  },
  render: function() {
    return (
      <div
        onDrop={this.handleDrop}
        onDragEnter={this.preventDefault}
        onDragOver={this.preventDefault}
        onContextMenu={this.handleContextMenu}
        >
        {( this.props.imgPath ? function() {
          return <img src={this.props.imgPath} ref="image" />
        } : function() {
          return <p id="dropzone">Drop image here!</p>
        }).call(this)}
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
  <LgtmComponent />,
  document.getElementById('content')
);

