var React = require('react');
var Router = require('react-router');
var Main = require('components/main');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (	
	<Route name="thiagor">
		<Route name="home" path="/" handler={Main} />
	</Route>
);