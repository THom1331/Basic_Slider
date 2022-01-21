// Manipulation du DOM
const images = document.querySelectorAll('.cont-slides img');
const suivant = document.querySelector('.right');
const precedent = document.querySelector('.left');
const cercles = document.querySelectorAll('.cercle');

let index = 0;

// Ajouter un évènement au clic sur le bouton droit
suivant.addEventListener('click', slideSuivante);
// On créé la fonction ensuite
function slideSuivante(){
    // On récupère la première image de notre tableau d'images
    if(index < 2){
        images[index].classList.remove('active');
        index++;
        images[index].classList.add('active');
    } else if(index === 2){
        // Quand on arrive à la fin, on veut pouvoir retourner au début de notre slider. Retour à la première image donc index = 0
        images[index].classList.remove('active');
        index = 0;
        images[index].classList.add('active');
    }

    // On vient gérer le lien entre les chevrons et le tableau de cercles
    for(let i = 0; i < cercles.length; i++){
        // Actualiser les cerches à chaque clique
        // Si le cercle sur lequel on clique a un attribut data-clic égal à l'index, alors on lui ajoute la class active-cercle
        if(cercles[i].getAttribute('data-clic') - 1 === index){
            cercles[i].classList.add('active-cercle');
        }else{
            cercles[i].classList.remove('active-cercle');
        }

    }
}

// On passe à la fonction précédente

precedent.addEventListener('click', slidePrecedente);

function slidePrecedente(){
    if(index > 0){
        images[index].classList.remove('active');
        index--; // index - 1
        images[index].classList.add('active');
    } else if(index === 0){
        images[index].classList.remove('active');
        index = 2;
        images[index].classList.add('active');
    }

    for(let i = 0; i < cercles.length; i++){
        if(cercles[i].getAttribute('data-clic') - 1 === index){
            cercles[i].classList.add('active-cercle');
        } else {
            cercles[i].classList.remove('active-cercle');
        }
    }
}


// Gérer l'évènement par le clavier : https://keycode.info/

document.addEventListener('keydown', keyPressed);
function keyPressed(e){
    // e = objet de l'évènement
    // KeyCode est une des propriété de notre objet e. 
    if(e.keyCode === 37){
        slidePrecedente();
    } else if(e.keyCode === 39){
        slideSuivante();
    }
}

// Les cercles

cercles.forEach(cercle =>{
    // On va écouter un évènement sur chaque cercle
    cercle.addEventListener('click', function(){
        // Dès qu'on va cliquer sur un cercle, on va envoyer une boucle for
        for(let i = 0; i < cercles.length; i++){
            // Au clique : enlève la class active-cercle sur tous les cercles
            cercles[i].classList.remove('active-cercle');
        }
        // Une fois que la class active cercle est retirée, je veux récupérer le cercle sur lequel je clique et lui ajouter la class active-cercle. Comme ça, on s'assure que seul le cercle sur lequel on clique est actif. 
        // this = pointeur nous permettant de cibler l'élément sur lequel on clique.
        this.classList.add('active-cercle');

        // On va venir gérer l'affichage des images en fonction des cercles
        // On fait disparaître l'image sur laquelle on était
        images[index].classList.remove('active');
        // On dit que l'index est égal à la valeur de l'attribut data-clic du cercle sur lequel on vient de cliquer. 
        index = this.getAttribute('data-clic') - 1;
        // On met la class active sur l'image correspondante au nouvel index, qui correspond lui-même au data-clic du cercle cliqué
        images[index].classList.add('active');
    })
})

