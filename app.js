//create Dinosaurs tiles; This function will be called to create tiles for each dinosaur.
function createDiv(object){
    //select main grid
    const grid = document.getElementById("grid");
    //create tile for dinosaurs
    const div = document.createElement("div");
    //change its class to grid-item, to have the formatted css.
    div.classList.add("grid-item");
    //function that will set the image source to the object's image name.
    object.addImage();
    //create the image element to add to the tile.
    const img = document.createElement("img");
    img.src = object.image;
    //create h3 with the name of the object (Dinosaur).
    const h3 = document.createElement("h3");
    h3.innerHTML = object.species
    //create paragraph and set the text to the object's fact.
    const p = document.createElement("p");
    p.innerHTML = object.fact;
    //add the elements: name, image, and the fact to the div.
    div.appendChild(h3);
    div.appendChild(img);
    div.appendChild(p);
    //add the div to the grid
    grid.appendChild(div);

}

//create Human Tile; This function will be called to create the human tile in the 5 position.
function createHumanDiv(){
    //select main grid
    const grid = document.getElementById("grid");
    //create new tile and set its class to grid-item so it shows the correct format.
    const div = document.createElement("div");
    div.classList.add("grid-item");
    //create img for the human to add it as background.
    const img = document.createElement("img");
    img.src = "images/human.png";
    //h3 element to use for the name of the human.
    const h3 = document.createElement("h3");
    h3.innerHTML = human.name;
    //add the name and the image to the div.
    div.appendChild(h3);
    div.appendChild(img);
    //add the tile to the main grid.
    grid.appendChild(div);
}


//Add All tiles; This function will call the above functions to create tiles for dinosaurs and for the human.
function addGrids(){
    //This array will create elements from 0-7 to choose dinosaurs randomly from the dict.
    let myArray = Array.from(Array(8).keys());
    //This array will create elements from 0-7 to make sure that the fact changed for the dinosaur is not the pigeon and not the same dinosaur.
    let myArray2 = Array.from(Array(8).keys());
    //dinosaurs dictionary to select dinosaur randomly by choosing a random index from the arrays above.
    let dinoDict = {};
    //add all dinosaurs objects with indices from 0-7 to the dict
    dinoDict[0] = Triceratops;
    dinoDict[1] = TRex;
    dinoDict[2] = Anklyosaurus;
    dinoDict[3] = Brachiosaurus;
    dinoDict[4] = Stegosaurus;
    dinoDict[5] = Elasmosaurus;
    dinoDict[6] = Pteranodon;
    dinoDict[7] = Pigeon;
    //this count is used to make sure that the 5th element, the middle tile, will be reserved for the human tile.
    let count = 0;
    //This count is to make sure that the fact changed for the dinosaurs will only change 3 dinosaurs using the three comparison methods.
    let dinoFactCount = 0;
    //Change 3 facts from dinosaurs randomly but don't change the same dinosaur or the pigeon.
    //the while loop will run until it changes 3 dinosaurs facts.
    while(dinoFactCount < 3){
        //select random dinosaur by generating random index from my array; I could change the array to hold indices from 0 - 6 so that I don't select the pigeon and I won't have to compare.
        let randomDino = Math.floor(Math.random() * myArray2.length);
        //select the dinosaur object randomly by index from my dictionary, and use the compare method to change its fact.
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
            //remove the index for that dinosaur from myArray2 so that I don't select it again.
            myArray2.splice(randomDino,1);
        }
    //This while loop will use the functions createDiv and createHumanDiv and they will be added to the grid.
    while(count < 9){
        //if the count is 4 (5th element) create the human tile.
            if(count == 4){
                createHumanDiv();
            }
            //otherwise create the dinosaurs tiles randomly
            else{
                //select random index from 0-7
                let indexChosen = Math.floor(Math.random() * myArray.length);
                //select the dinosaur object from the dict, and create it.
                createDiv(dinoDict[myArray[indexChosen]]);
                //remove the index for the created dinosaur object to not select it again.
                myArray.splice(indexChosen,1);
            }
            //continue until everything is created.
            count++;
        }

}





// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact){
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    //this function is created to test that all information shows up correctly. but never used after.
    this.displayInfo = function displayInfo(){
        const dinoInfo = [this.species, this.weight, this.height, this.diet, this.where, this.when, this.fact];
        return dinoInfo;
    };
};
//Added image property to create image elements with object's name as the images files have the same name as the species'.
Dino.prototype.addImage = function (){
    this.image = "images/" + this.species.toLowerCase() + ".png";
}


//name comparison method to change one dino fact.
Dino.prototype.nameCompare = function (name){
    //if the dinos name has more letters than the human's change the fact..
    if(this.species.length > name.length){
        this.fact = 'My name has more letters than yours!';
    }
    //if the human has more letters change the fact to this..
    else if(this.species.length < name.length){
        this.fact = "Your name is too long to read...";
    }
    //if they're equal, change it to the fact below.
    else{
        this.fact = "We have the same number of letters in our name";
    }
}

//weight comparison to change 
Dino.prototype.weightCompare = function(weight){
    //compare dinosaur weight with the human.
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

//compare the diets between the dinosaur and the human.
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
//this will be used to accept human heigh (feet between 0-10) and inches between(0, 11) and weight is set high so that the comparison methods will show different results.
function between(x, range1, range2){
    if(x >= range1 && x <= range2){
        return true;
    }
    else{
        return false;
    }
}

//select the button compare me!
const btn = document.getElementById('btn');
//add even listener, when clicked it will use IIFE to create the 9 tiles.
btn.addEventListener("click", (function(){


    return function(){
        //retrieve the data for the human from the form.
        let name = document.getElementById("name").value;
        let feet = document.getElementById("feet").value;
        let inches = document.getElementById("inches").value;
        let weight = document.getElementById("weight").value;
        let diet = document.getElementById("diet").value;
        //check if the form elements are all entered and meet the conditions.
        if(name && between(feet, 0, 10) && between(inches,0,11) && between(weight,0,150000) && diet){
            //set the values for the human object.
            human.name = name;
            human.height = `${feet}\'${inches}\'\'`;
            human.weight = weight;
            human.diet = diet;
            
            //remove form after clicking 
            let form = document.getElementById("dino-compare");
            form.remove();
            //add add all tiles;
            addGrids();
            
        }
        else{
            alert("Please enter the missing values\nfeet(0-10)\ninches(0-12)\nweight(0-150000)");
        };
    }
})());
