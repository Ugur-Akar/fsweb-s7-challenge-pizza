import React from "react";
import { useState } from "react";
import { useEffect } from "react";


function Ingredients(props){
    const pizzaIngredients = props.pizzaIngredients;
    const onInputChange = props.onInputChange;
    const pizza = props.pizza;
    const [isNeeded, setIsNeeded] = useState(true);

    const ingredientList = pizzaIngredients.map((ing) => {
        return (
            <label id={"malzemeler-checkbox"} key={ing}>
                <input 
                type="checkbox" 
                onChange={onInputChange} 
                value={pizzaIngredients.indexOf(ing)} 
                id={ing} name="ingredients" 
                checked = {pizza.ingredients[pizzaIngredients.indexOf(ing)]}
                />
                {ing}
                <br/>
                <br/>
            </label>
        )
    });

    useEffect(() => {
        if(pizza.ingredientCount < 4 | pizza.ingredientCount >= 10){
            setIsNeeded(true);
        }
        else{
            setIsNeeded(false);
        }
    }, [pizza]);


    return (
        <div className="ek-malzemeler">
        <b>Ek Malzemeler<span className="asterisk" hidden={!isNeeded}> *</span></b><br/>
        <p>4 ile 10 arası</p>

        <div className="ingredient-select">
            {ingredientList}
        </div>
    </div>
    );
}

export default Ingredients;