import { Component } from 'preact';
import { Router } from 'preact-router';
import Helmet from 'preact-helmet';

import Header from './header';
import Home from '../routes/home';
import { createApolloFetch } from 'apollo-fetch';
const uri = 'http://msdeus.site/lab10';
const apolloFetch = createApolloFetch({ uri });

export default class App extends Component {


	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	getGeolocation() {
		if ('geolocation' in navigator) {
			console.log('has geolocation');


			const success = position => {
				const query = `
					mutation {
  						updateUser(name: "Mercedes Retolaza", latitude: "${position.coords.latitude}", longitude: "${position.coords.longitude}")
  						{
   							name latitude longitude
  						}
					}
				`;

				apolloFetch({ query })
					.then(result => {
						console.log('qweiqiw', result.data.updateUser);
						this.setState({ currPosition: result.data.updateUser });
					})
					.catch(error => {
					});
			};

			const error = err => {
				console.log('error', err);
			};

			const loc = navigator.geolocation.getCurrentPosition(
				success,
				error,
				{
					maximumAge: 1000000,
					timeout: 1000,
					enableHighAccurancy: true
				}
			);

			const watcher = navigator.geolocation.watchPosition(
				success,
				error,
				{
					maximumAge: 0,
					enableHighAccurancy: true
				}
			);
		}
		else {
			console.log('doesnt have geolocation');
		}
	}

	setGeolocation() {
		console.log('setGeoloc');
		const query = `
			query {
				allUsers { name latitude longitude }
			}
		`;
		apolloFetch({ query })
			.then(result => {
				this.setState({ posList: result.data.allUsers });
			});
	}

	constructor(props) {
		super(props);

		this.state = {
			currPosition: {},
			posList: []
		};
	}

	componentDidMount() {
		this.getGeolocation();
		setInterval(this.setGeolocation.bind(this), 1000);
	}

	render() {
		return (
			<div id="app">
				<noscript>Put Sample code here for execution when JavaScript is Disabled</noscript>
				<Helmet
					title="Laboratorio Radar"
					noscript={[
						{ innerHTML: `<link rel="stylesheet" type="text/css" href="foo.css" />` }
					]}
					link={[
						{ rel: 'apple-touch-icon', href: '../assets/icons/apple-touch-icon.png' },
						{ rel: 'icon', sizes: '192x192', href: '../assets/icons/android-chrome-192x192' }
					]}
				/>
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" posList={this.state.posList} currPosition={this.state.currPosition} />
				</Router>
			</div>
		);
	}
}
