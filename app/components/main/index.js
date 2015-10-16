var React = require('react');
var Router = require('react-router');

var Main = React.createClass({
	mixins: [Router.Navigation, Router.State],

	render: function() {
		return (
			<div>
				<h1>Last Deploy</h1>
			</div>
		);
	}
});

module.exports = Main;