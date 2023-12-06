import React from "react";
import {Route, Switch} from "react-router-dom";
import HomePage from "./HomePage";
import PizzaOrderForm from "./PizzaOrderForm";
import Header from "../layout/Header";
import SuccessPage from "./SuccessPage";

function PageBody(){
    const successPath = "/success";
    const orderPath = "/pizza";

    return (
        <Switch>
            <Route path = "/" name = "HomePage" exact>
                <HomePage />
            </Route>
            <Route path = {orderPath} name = "PizzaOrder">
                <Header />
                <PizzaOrderForm successPath={successPath}/>
            </Route>
            <Route path = {successPath} name = "Success">
                <Header />
                <SuccessPage />
            </Route>
            <Route path = "*">
                404
            </Route>
        </Switch>
    )
}
export default PageBody;