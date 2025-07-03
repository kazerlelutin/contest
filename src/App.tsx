/** @jsxImportSource react **/
import Router from "./router/Router";

export default function App(props: any) {

  return (
    <>
      <head>
        <title>Contest</title>
        <meta name="description" content="Contest" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/public/index.css" />
      </head>
      <div className="container">
        <header className="header">
          <h1>
            <a href="/">Contest</a>
          </h1>
        </header>
        <main className="main">
          <Router {...props} /> 
        </main>
        <footer className="footer">
          MO5
        </footer>
      </div>
  
    </>
  );
}
