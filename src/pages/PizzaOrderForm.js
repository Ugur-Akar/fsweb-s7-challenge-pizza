import React, { useEffect, useState } from "react";
import axios from "axios"
import * as Yup from "yup";
import "../styles/PizzaOrderForm.css";
import SizeAndDough from "../components/SizeAndDough";
import Ingredients from "../components/Ingredients";
import Submit from "../components/Submit";
import { useHistory } from "react-router-dom/";

function PizzaOrderForm(props){
    const pizzaName = "Position Absolute Acılı Pizza";
    const pizzaPrice = 85.50;
    const pizzaDescription = "Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay"+
    "Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay" + 
    "Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay" + 
    "Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay Pizza detay";
    const pizzaIngredients = ["Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara",
        "Soğan", "Domates", "Mısır", "Sucuk",
        "Jalepeno", "Sarımsak", "Biber", "Salam",
        "Ananas", "Kabak"
    ];
    const ingredientCost = 5;
    const sizeCosts = [
        {value:"Küçük", cost:0},
        {value:"Orta", cost:10},
        {value:"Büyük", cost:20}
    ];
    const doughCosts = [
        {value:"İnce", cost:0},
        {value:"Orta", cost:10},
        {value:"Kalın", cost:20}
    ];

    const successPath = props.successPath;

    let initArr = [];
    let history = useHistory();

    pizzaIngredients.forEach(ingredient => {
        initArr.push(false);
    });

    const initPizza = {
        pizzaName: pizzaName,
        price: pizzaPrice,
        description: pizzaDescription,
        ingredients: [...initArr],
        ingredientCount: 0,
        ingredientList: [],
        size: "",
        dough: "",
        name: "",
        note: "",
        totalPrice: 0
    }
    
    const [nameNeeded, setNameNeeded] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [pizza, setPizza] = useState(initPizza);
    const [errState, setErrState] = useState({
        size:"",
        dough:"",
        ingredients:"",
        name:"",
        note:""
    });

    //Handler Functions
    const onSubmitHandler = (e) => {
        e.preventDefault();
        
        if(isValid){
            axios.post("https://reqres.in/api/orders", pizza)
                .then(r => {
                    let obj = {...r.data, orderAmount: e.target.value};
                    console.log(obj);
                    history.push(successPath);
                })
                .catch(e => {
                    console.log(e);
                    alert(e);
                })
        }
    }

    const onInputChange = (e) => {
        let key = e.target.name;

        if(key !== "ingredients"){
            const value = e.target.value;
            
            yupReach(key, value);

            setPizza({...pizza, [key]:value});
        }
        else{
            key = "ingredientCount";
            let index = pizzaIngredients.indexOf(e.target.id);
            let tmpArr = [...pizza.ingredients];
            tmpArr[index] = !tmpArr[index];

            let ingC = tmpArr.reduce((acc, element) => element === true ? acc + 1 : acc + 0, 0);

            yupReach(key,ingC);

            let iList = [];
            for(let i = 0; i < tmpArr.length; i++){
                if(tmpArr[i]){
                    iList.push(pizzaIngredients[i]);
                }
            }

            setPizza({...pizza, ingredients: tmpArr, ingredientCount: ingC, ingredientList: [...iList]});
        }
    };

    //Yup
    const formSchema = Yup.object().shape({
        size: Yup
            .string()
            .required("Büyüklük Seç")
            .oneOf(["Küçük", "Orta", "Büyük"]),
        dough: Yup
            .string()
            .required("Hamur Tipi Seç")
            .oneOf(["İnce", "Orta", "Kalın"]),
        ingredientCount: Yup
            .number()
            .min(4, "En az 4 malzeme seç")
            .max(10, "En fazla 10 malzeme seçebilirsin"),
        name: Yup
            .string()
            .required("İsim gir")
            .min(2,"En az 2 karakter"),
        note: Yup
            .string()
    });

    function yupReach(key, value){
        Yup.reach(formSchema, key).validate(value)
            .then(r => {
                setErrState({...errState, [key]: ""});
            })
            .catch(e => {
                setErrState({...errState, [key]: e.message});
            })
    }

    useEffect(() => {
        formSchema.isValid(pizza)
        .then(r => {
            setIsValid(r);
        })

        if(pizza.name !== "" & pizza.name.length >= 2){
            setNameNeeded(false);
        }else{
            setNameNeeded(true);
        }
    }, [pizza]);

    const updateTotalPrice = (sum) => {
        setPizza({...pizza, totalPrice:sum});
    };


    return (
        <form className="order-container" id = "pizza-form">
            <div className = "pizza-info">
                <h2>{pizza.pizzaName}</h2>
                <h3>{pizza.price} tl</h3>
                <p>{pizza.description}</p>
            </div>
            
            <SizeAndDough onInputChange = {onInputChange} pizza={pizza}/>

            <br/>

            <Ingredients onInputChange={onInputChange} pizzaIngredients={pizzaIngredients} pizza={pizza} />

            <br/>
            <br/>
            <br/>

            <label>
                <b><span className="name-note">İsim:</span><span className="asterisk name-note" hidden={!nameNeeded}>   *</span></b>
                <br/>
                <input type = "text" id="name-input" onChange={onInputChange} name="name" className="input-bar" data-cy="name-input"/>
            </label>

            <br/>
            <br/>

            <label>
                <b><span className="name-note" >Sipariş Notu:</span></b>
                <br/>

                <input type="text" id="special-text" name="note" onChange={onInputChange} className="input-bar" data-cy="note-input"/>
            </label>

            <hr/>
            <br/>
            <br/>

            <Submit 
                onSubmitHandler={onSubmitHandler} isValid={isValid} 
                pizza={pizza} pizzaPrice={pizzaPrice} 
                ingredientCost = {ingredientCost} sizeCosts={sizeCosts} doughCosts={doughCosts} 
                updateTotalPrice={updateTotalPrice}
            />

        </form>
    )
}

export default PizzaOrderForm;