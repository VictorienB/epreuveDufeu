// Créez un programme qui reçoit une expression arithmétique dans une chaîne de caractères et en retourne le résultat après l’avoir calculé.



function calculateExpression(expression) {
    // Utilisez la fonction eval pour évaluer l'expression
    // Attention : eval peut être dangereux avec des données non fiables, mais ici nous supposons que l'expression est valide.
    try {
        const result = eval(expression);
        console.log(result);
    } catch (error) {
        console.error("Erreur lors de l'évaluation de l'expression :", error.message);
    }
}

// Récupérer l'expression à partir des arguments en ligne de commande
//const args = process.argv.slice(2);
//const expression = args[0];

// Appeler la fonction pour calculer l'expression
//calculateExpression(expression);

//////////////////

// Deuxieme solution sans fonction eval


function calculateExpression(expression) {
    const tokens = tokenize(expression);
    const result = evaluate(tokens);
    
    console.log(result);
}

function tokenize(expression) {
    const regex = /([+\-*/%()])|\s+|(\d+(\.\d+)?)|([a-zA-Z]+)/g;
    const tokens = [];
    let match;

    while ((match = regex.exec(expression)) !== null) {
        tokens.push(match[1] || match[2]);
    }

    return tokens;
}

function evaluate(tokens) {
    const output = [];
    const operators = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '%': 2,
    };
    const stack = [];

    for (const token of tokens) {
        if (!isNaN(parseFloat(token))) {
            // Si le token est un nombre, le placer directement dans la sortie
            output.push(parseFloat(token));
        } else if (token in operators) {
            // Gérer les opérateurs avec une file d'attente
            while (stack.length && operators[stack[stack.length - 1]] >= operators[token]) {
                output.push(stack.pop());
            }
            stack.push(token);
        } else if (token === '(') {
            // Si c'est une parenthèse ouvrante, la placer sur la pile
            stack.push(token);
        } else if (token === ')') {
            // Si c'est une parenthèse fermante, dépiler jusqu'à la parenthèse ouvrante
            while (stack.length && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop(); // Enlever la parenthèse ouvrante de la pile
        }
    }

    // Dépiler le reste de la pile
    while (stack.length) {
        output.push(stack.pop());
    }

    // Évaluer l'expression en utilisant une pile
    const resultStack = [];
    for (const token of output) {
        if (!isNaN(parseFloat(token))) {
            resultStack.push(parseFloat(token));
        } else {
            const b = resultStack.pop();
            const a = resultStack.pop();
            switch (token) {
                case '+':
                    resultStack.push(a + b);
                    break;
                case '-':
                    resultStack.push(a - b);
                    break;
                case '*':
                    resultStack.push(a * b);
                    break;
                case '/':
                    resultStack.push(a / b);
                    break;
                case '%':
                    resultStack.push(a % b);
                    break;
            }
        }
    }

    return resultStack[0];
}

// Récupérer l'expression à partir des arguments en ligne de commande
const args = process.argv.slice(2);
const expression = args[0];

// Appeler la fonction pour calculer l'expression
calculateExpression(expression);

