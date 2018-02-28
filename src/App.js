import React, { Component, Fragment } from 'react';
import GoodsPage from './GoodsPage';
import CategoriesPage from './CategoriesPage';
const ReactRouterDom = require("react-router-dom");
const Router = ReactRouterDom.BrowserRouter;
const Route = ReactRouterDom.Route;
const Link = ReactRouterDom.Link;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: "goods"
        }
    }

    changeView(e) {
        
    }

    render() {
        return (
            <Router>
                <Fragment>

                    <div className="title">
                        Каталог товаров
                    </div>

                    <nav>
                        <div className="menu">
                            <Link to="/">
                                <div className="link">
                                    Товары
                                </div>
                            </Link>
                        </div>
                        <div className="menu">
                            <Link to="/categories">
                                <div className="link">
                                    Категории
                                </div>
                            </Link>
                        </div>
                    </nav>

                    <Route exact path="/" component={GoodsPage} />
                    <Route path="/categories" component={CategoriesPage} />

                    <footer>
                        <hr/>
                    </footer>

                </Fragment>
            </Router>
        );
    }
}

export default App;
