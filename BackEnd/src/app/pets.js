export const pets = [
    {
        nome_pet: "Egg",
        caminho_pet: "Egg.gif",
        desc_pet: "Um ovo misterioso e curioso.",
        ponto_pet: 0,
        raridade_pet: "Comum",
        peso_pet: 0,
        evolucao: false
    },
    {
        nome_pet: "Gentle Bunny",
        caminho_pet: "GentleBunny.gif",
        desc_pet: "Um coelhinho elegante e charmoso.",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.6,
        evolucao: false
    },
    {
        nome_pet: "Monkey Black",
        caminho_pet: "Black.gif",
        desc_pet: "Um macaco misterioso e sombrio.",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.2,
        evolucao: false
    },
    {
        nome_pet: "Golden Shadow Monkey",
        caminho_pet: "Dourado_black.gif",
        desc_pet: "Um macaco dourado com mistérios ocultos.",
        ponto_pet: 100,
        raridade_pet: "Lendário",
        peso_pet: 0.005,
        evolucao: false
    },
    {
        nome_pet: "Pink Power Monkey",
        caminho_pet: "Power_Pink.gif",
        desc_pet: "Um macaco rosa cheio de energia.",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.1,
        evolucao: false
    },
    {
        nome_pet: "Cute Purple Monkey",
        caminho_pet: "Roxinho.gif",
        desc_pet: "Um adorável macaco roxo.",
        ponto_pet: 100,
        raridade_pet: "Raro",  // Alterado para "Raro"
        peso_pet: 0.4,
        evolucao: false
    },
    {
        nome_pet: "Happy Rainbow Monkey",
        caminho_pet: "Animadinha.gif",
        desc_pet: "Um macaco alegre com um arco-íris.",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.6,
        evolucao: false
    },
    {
        nome_pet: "Avatar Monkey",
        caminho_pet: "Avatar.gif",
        desc_pet: "Um macaco que controla os elementos.",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.1,
        evolucao: false
    },
];

const sorteioComBaseNoPeso = (pets) => {
    const pesoTotal = pets.reduce((acc, pet) => acc + pet.peso_pet, 0);
    const sorteioAleatorio = Math.random() * pesoTotal;  // Sorteio aleatório entre 0 e o peso total
    console.log('Sorteio Aleatório:', sorteioAleatorio);

    let TodosPetsChance = 0;

    for (const pet of pets) {
        TodosPetsChance += pet.peso_pet;
        console.log(`Pet: ${pet.nome_pet}, Chance Acumulada: ${TodosPetsChance}`);
        if (sorteioAleatorio < TodosPetsChance) {
            return pet;  // Retorna o pet sorteado
        }
    }
};

console.log(pets);
console.log(sorteioComBaseNoPeso(pets));
