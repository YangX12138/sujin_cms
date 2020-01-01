import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from './components/common/Loading/Loading';

const Cover = lazy(() => import('./containers/Cover/Cover'));
const Article = lazy(() => import('./containers/Article/Article'));
const UpdateArticle = lazy(() => import('./containers/Article/UpdateArticle'));

const Routers = () => {
    return (
        <Suspense fallback={ <Loading /> }>
            <Switch>
                <Route 
                    path="/cover" 
                    component={ Cover }
                />
                <Route
                    path="/article/add"
                    component={ UpdateArticle }
                />
                <Route
                    path="/article/:id"
                    component={ UpdateArticle }
                />
                <Route 
                    path="/article"
                    component={ Article }
                />
            </Switch>
        </Suspense>
    )
}

export default Routers;