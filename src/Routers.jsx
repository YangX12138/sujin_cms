import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cover from './containers/Cover/Cover';
import Article from './containers/Article/Article';
import UpdateArticle from './containers/Article/UpdateArticle';

const Routers = () => {
    return (
        <Switch>
            <Route
                exact
                path="/"
                component={Cover}
            />
            <Route
                path="/article/add"
                component={UpdateArticle}
            />
            <Route
                path="/article/:id"
                component={UpdateArticle}
            />
            <Route
                path="/article"
                component={Article}
            />
        </Switch>
    )
}

export default Routers;