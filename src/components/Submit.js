import React, { useEffect, useState } from "react";


function Submit(props){
    const minOrderAmount = 1;
    const onSubmitHandler = props.onSubmitHandler;
    const isValid = props.isValid;
    const pizza = props.pizza;
    const ingredientCost = props.ingredientCost;
    const sizeCosts = [...props.sizeCosts];
    const doughCosts = [...props.doughCosts];

    const [orderAmount, setOrderAmount] = useState(minOrderAmount);
    const [price , setPrice] = useState(pizza.price);
    const [ingredientPrice, setIP] = useState(0);
    
    useEffect(() => {
        let num = ingredientCost * pizza.ingredientCount;

        const sc = sizeCosts.find((element) => element.value === pizza.size);
        sc !== undefined ? num += sc.cost : num += 0;
        const dc = doughCosts.find((element) => element.value === pizza.dough);
        dc !== undefined ? num += dc.cost : num += 0;
        setIP(num);
        
        num += pizza.price;
        setPrice(num);

    }, [pizza]);

    useEffect(() => {
        updateTP();
    }, [orderAmount]);

    useEffect(() => {
        updateTP();
    }, [price]);

    function updateTP(){
        let num = price;
        num *= orderAmount;
        props.updateTotalPrice(num);
    }

    const onOrderAmountClick = (e) => {
        e.preventDefault();
        if(e.target.value === "+"){
            setOrderAmount(orderAmount + 1);
        }
        else{
            if(orderAmount > minOrderAmount){
                setOrderAmount(orderAmount - 1);
            }
            else{
                setOrderAmount(minOrderAmount);
            }
        }
    }

    return (
        <div className="submit-container flex-container">

            <div className="count-div">
                <button value="-" onClick={onOrderAmountClick}>-</button>
                <span>{orderAmount}</span>
                <button value="+" onClick={onOrderAmountClick}>+</button>
            </div>
            
            <div className="order-sum"> 
   
                <h2>Sipariş Toplamı</h2>
                <br/>

                <span className="price-string" style={{color: "rgb(41 41 41 / 70%)"}}>Seçimler</span>
                <span className="price" style={{color: "rgb(41 41 41 / 70%)"}}>{ingredientPrice}</span>
                <br/>
                <span className="price-string" style={{color: "#CE2829"}}>Toplam</span>
                <span className="price" style={{color: "#CE2829"}}>{pizza.totalPrice}</span>

                <br/>
                <br/>

                <div>
                    <button disabled={!isValid} id="order-button" onClick={onSubmitHandler} value={orderAmount}> SİPARİŞ VER </button>
                </div>
                
            </div>

        </div>
    )
}

export default Submit;