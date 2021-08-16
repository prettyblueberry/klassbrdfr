import 'src/config/KlassroomConfig'

import * as React from "react";
import * as ReactDOM from "react-dom";
import momentReact from 'react-moment';
import * as moment from 'moment';

// Translations
import { I18nextProvider } from "react-i18next";
import translations from "./i18n/translations";
// Store, data storages
import { Provider } from "react-redux";
import store from "./store/store";
// Components
import App from "./components/containers/main/App/App";






// Routers
import { BrowserRouter } from 'react-router-dom';
import {ModalProvider} from "./components/containers/modals/_system/ModalAPI";

import {CoordinatesProvider} from "./components/containers/coordinates";

//console.log(KRClient.getInstance())

momentReact.globalLocale = 'en';
moment.locale('en');

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<I18nextProvider i18n={translations}>
				<CoordinatesProvider>
					<ModalProvider>
						<div style={{height:"100%"}}>

							<App/>
						</div>
					</ModalProvider>
				</CoordinatesProvider>
			</I18nextProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById("app"),
);
