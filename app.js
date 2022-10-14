
    // Create Dino Constructor
    function Dino(species, weight, height, diet, where, when, fact){
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;

        this.displayInfo = function displayInfo(){
            const dinoInfo = [this.species, this.weight, this.height, this.diet, this.where, this.when, this.fact];
            return dinoInfo;
        };
    };

    Dino.prototype.addImage = function (){
        this.image = "images/" + this.species.toLowerCase() + ".png";
    }

    

    Dino.prototype.nameCompare = function (name){
        if(this.species.length > name.length){
            this.fact = 'My name has more letters than yours!';
        }
        else if(this.species.length < name.length){
            this.fact = "Your name is too long to read...";
        }
        else{
            this.fact = "We have the same number of letters in our name";
        }
    }
    

    Dino.prototype.weightCompare = function(weight){
        if(this.weight > weight){
            this.fact = "You are tiny compared to me";
        }
        else if(this.weight < weight){
            this.fact = "How can you be this huge?!";
        }
        else{
            this.fact = "We are the same size";
        }
    }


    Dino.prototype.dietCompare = function(diet){
        if(this.diet === diet){
            this.fact = "How can a mere human have the same diet as a dinosaur?!";
        }
        else{
            this.fact = "You eat bad food... maybe you should change your diet?";
        }
    }


    // Create Dino Objects
    const Triceratops = new Dino("Triceratops", 13000, 114, "Herbavor", "North America", "Late Cretaceous", "First discovered in 1889 by Othniel Charles Marsh");
    const TRex = new Dino("Tyrannosaurus Rex", 11905, 144, "Carnivor", "North America", "Late Cretaceous", "The largest known skull measures in at 5 feet long.");
    const Anklyosaurus = new Dino("Anklyosaurus", 10500, 55, "Herbavor", "North America", "Late Cretaceous", "Anklyosaurus survived for approximately 135 million years.");
    const Brachiosaurus = new Dino("Brachiosaurus", 70000, 372, "Herbavor", "North America", "Late Jurasic", "An asteroid was named 9954 Brachiosaurus in 1991.");
    const Stegosaurus = new Dino("Stegosaurus", 11600, 79, "Herbavor", "North America, Europe, Asia", "Late Jurasic to Early Cretaceous", "The Stegosaurus had between 17 and 22 seperate places and flat spines.");
    const Elasmosaurus = new Dino("Elasmosaurus", 16000, 59, "carnivor", "North America", "Late Cretaceous", "Elasmosaurus was a marine reptile first discovered in Kansas.");
    const Pteranodon = new Dino("Pteranodon", 44, 20, "Carnivor", "North America", "Late Cretaceous", "Actually a flying reptile, the Pteranodon is not a dinosaur.");
    const Pigeon = new Dino("Pigeon", 0.5, 9, "Herbavor", "World Wide", "Holocene", "All birds are living dinosaurs.");



    // Create Human Object
    const human = {
        name: "tmp",
        height: '0',
        weight: '0',
        diet: 'omnivore'
    };


//check if the number is between min and max numbers
function between(x, range1, range2){
    if(x >= range1 && x <= range2){
        return true;
    }
    else{
        return false;
    }
}

// Use IIFE to get human data from form
const btn = document.getElementById('btn');
btn.addEventListener("click", (function(){

    
    return function(){
        let name = document.getElementById("name").value;
        let feet = document.getElementById("feet").value;
        let inches = document.getElementById("inches").value;
        let weight = document.getElementById("weight").value;
        let diet = document.getElementById("diet").value;

        if(name && between(feet, 0, 10) && between(inches,0,11) && between(weight,0,150000) && diet){
            human.name = name;
            human.height = `${feet}\'${inches}\'\'`;
            human.weight = weight;
            human.diet = diet;
            
            //remove form
            let form = document.getElementById("dino-compare");
            form.remove();
            //add tiles;
            addGrids();
            
        }
        else{
            alert("Please enter the missing values\nfeet(0-10)\ninches(0-12)\nweight(0-1500)");
        };
    }
})());

//add comparison facts:




      

//create Dinosaurs tiles
function createDiv(object){

    const grid = document.getElementById("grid");
    const div = document.createElement("div");
    div.classList.add("grid-item");
    
    object.addImage();
    const img = document.createElement("img");
    img.src = object.image;
    
    const h3 = document.createElement("h3");
    h3.innerHTML = object.species

    const p = document.createElement("p");
    p.innerHTML = object.fact;
    div.appendChild(h3);
    div.appendChild(img);
    
    div.appendChild(p);
    
    grid.appendChild(div);

}


//create Human Tile
function createHumanDiv(){
    const grid = document.getElementById("grid");
    const div = document.createElement("div");
    div.classList.add("grid-item");
    const img = document.createElement("img");
    img.src = "images/human.png";

    const h3 = document.createElement("h3");
    h3.innerHTML = human.name;
    div.appendChild(h3);
    div.appendChild(img);
    

    grid.appendChild(div);
}


//add All tiles
function addGrids(){
    //for adding grids
    let myArray = Array.from(Array(8).keys());
    //for comparing
    let myArray2 = Array.from(Array(8).keys());
    let dinoDict = {};

    dinoDict[0] = Triceratops;
    dinoDict[1] = TRex;
    dinoDict[2] = Anklyosaurus;
    dinoDict[3] = Brachiosaurus;
    dinoDict[4] = Stegosaurus;
    dinoDict[5] = Elasmosaurus;
    dinoDict[6] = Pteranodon;
    dinoDict[7] = Pigeon;

    let count = 0;
    let dinoFactCount = 0;

    while(dinoFactCount < 3){
        let randomDino = Math.floor(Math.random() * myArray2.length);
            if(dinoFactCount === 0 && dinoDict[myArray2[randomDino]] !== Pigeon){
                dinoDict[myArray2[randomDino]].dietCompare(human.diet);
                dinoFactCount++;
            }
            else if(dinoFactCount === 1 && dinoDict[myArray2[randomDino]] !== Pigeon){
                dinoDict[myArray2[randomDino]].nameCompare(human.name);
                dinoFactCount++;
            }
            else if(dinoFactCount === 2 && dinoDict[myArray2[randomDino]] !== Pigeon){
                dinoDict[myArray2[randomDino]].weightCompare(human.weight);
                dinoFactCount++;
            }
            myArray2.splice(randomDino,1);
        }

    while(count < 9){
        if(count == 4){
            createHumanDiv();
        }
        else{
            let indexChosen = Math.floor(Math.random() * myArray.length);
            createDiv(dinoDict[myArray[indexChosen]]);
            myArray.splice(indexChosen,1);
        }
        count++;
    }
    
}
