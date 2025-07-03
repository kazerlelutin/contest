/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { hydrateRoot } from 'react-dom/client'
import App from './App.js'

// Récupérer les props initiales depuis le serveur
const initialProps = (window as any).__INITIAL_PROPS__ || {};


hydrateRoot(document, <App {...initialProps} />)