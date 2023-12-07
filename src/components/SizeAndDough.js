import React from "react";
import Select from "react-select";
import { useEffect } from "react";
import { useState } from "react";


function SizeAndDough(props){
    let boyutText = "Boyut Seç";
    let hamurText = "Hamur Seç";
    const options = [
        {target:{value: "İnce", name:"dough"}, label:"İnce"},
        {target:{value: "Orta", name:"dough"}, label:"Orta"}, 
        {target:{value: "Kalın", name:"dough"}, label:"Kalın"}
    ];
    const pizza = props.pizza;
    const onInputChange = props.onInputChange;
    const [sizeNeeded, setSizeNeeded] = useState(true);
    const [doughNeeded, setDoughNeeded] = useState(true);

    useEffect(() => {
        if(pizza.size !== ""){
            setSizeNeeded(false);
        }
        if(pizza.dough !== ""){
            setDoughNeeded(false);
        }
        
    }, [pizza]);

    return (
        <div className = "flex-container">
            <div className="selection-form">
                <label  id = "size-radio">
                    <b>{boyutText}<span className="asterisk" hidden={!sizeNeeded}> *</span></b> <br/>

                    <input 
                        type = "radio"
                        value = "Küçük"
                        onChange = {onInputChange}
                        checked = {pizza.size === "Küçük"}
                        id = "küçük-boyut"
                        name = "size"
                        data-cy="radio"
                    />
                    <span>   Küçük</span>
                    <br/>
                    <br/>
                    <input 
                        type = "radio"
                        value = "Orta"
                        onChange = {onInputChange}
                        checked = {pizza.size === "Orta"}
                        id = "orta-boyut"
                        name = "size"
                    />
                    <span>   Orta</span>
                    <br/>
                    <br/>
                    <input 
                        type = "radio"
                        value = "Büyük"
                        onChange = {onInputChange}
                        checked = {pizza.size === "Büyük"}
                        id = "büyük-boyut"
                        name = "size"
                    />
                    <span>   Büyük</span>
                    <br/>
                    <br/>
                </label>
            </div>

            <div className="selection-form">
                <label id = "dough-select" data-cy="select-box">
                    <b>{hamurText}<span className="asterisk" hidden={!doughNeeded}> *</span></b><br />
                    <Select options={options} onChange={onInputChange} isSearchable = {false} placeholder="Hamur Seçiniz" classNamePrefix={"react-select"}/>
                </label>
            </div>
        </div>
    )
}

export default SizeAndDough;