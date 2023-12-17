// faire un porogramme qui affiche un rectangle dans le terminal



// rectangle.js


function createRectangle(width, height) {
    // Vérifier si les arguments sont valides
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        console.log("Veuillez fournir des dimensions valides (entiers positifs).");
        return;
    }

    // Dessiner le rectangle
    for (let i = 0; i < height; i++) {
        if (width === 1 && height === 1) {
            // Cas spécial pour un rectangle de taille 1x1
            console.log('o');
        } else if (i === 0 || i === height - 1) {
            // Première et dernière ligne : afficher des coins
            console.log('o' + '-'.repeat(Math.max(width - 2, 0)) + 'o');
        } else {
            // Lignes intermédiaires : afficher des côtés
            console.log('|' + ' '.repeat(Math.max(width - 2, 0)) + '|');
        }
    }
}

// Récupérer les arguments en ligne de commande
const args = process.argv.slice(2);

// Extraire la largeur et la hauteur à partir des arguments
const width = parseInt(args[0]);
const height = parseInt(args[1]);

// Appeler la fonction pour créer le rectangle
createRectangle(width, height);