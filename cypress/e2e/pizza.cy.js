/// <reference types="cypress" />
const homeURL = "localhost:3000/";
const orderURL = "pizza";
const successURL = "success";

describe("Pizza Order Test", () => {
    beforeEach(() => {
        cy.visit(homeURL + orderURL);
    })
    
    it("Name Input Test", () => {
        cy.get("[data-cy=name-input]").type("İsim girdisi").should("have.value", "İsim girdisi");
    })

    it("Radio Test", () => {
        cy.get("[data-cy=radio]").check();
    })
})


describe("Total Test", () => {

    before(() => {
        cy.visit(homeURL);
    });

    it("Total Test", () => {
        cy.get("[data-cy=home-button]").click();
        cy.url().should("include", homeURL+orderURL);//order page test

        cy.get("[data-cy=radio]").check();//radio test

        cy.get("[data-cy=name-input]").type("İsim girdisi").should("have.value", "İsim girdisi");//name input test

        cy.get('.react-select__control').click()
            .get('.react-select__menu').find('.react-select__option')
            .first().click();//react select test

        cy.get('#order-button').should("have.attr", "disabled");//button first control

        randomIngredients(5);//random ingredient seçiliyor
        
        cy.get('#order-button').should("not.have.attr", "disabled");//button second control

        cy.get('#order-button').click();
        cy.url().should("include", homeURL+successURL);//success page test
    });

    
})

function getRandomNumber(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomIngredients(tries){
    cy.get('.ingredient-select > label').then(list => {

        let usedNumbers = [];
        let index;

        for(let i = 0; i < tries; i++){
            do{
                index = getRandomNumber(0, list.length - 1);
            }   while(usedNumbers.includes(index));

            usedNumbers.push(index);
            
            cy.get('.ingredient-select > label').eq(index).click();
        }
    })
}



