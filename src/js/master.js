import * as $ from 'jquery';
import * as M from 'materialize-css';

require('jquery-lazy');
require('jquery-lazy/plugins/jquery.lazy.av');

$(() => {
	$('.lazy').lazy();

	M.Sidenav.init(document.querySelector('.sidenav'));

	M.Collapsible.init(document.querySelector('.collapsible'));
})