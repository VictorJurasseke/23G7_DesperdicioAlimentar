+// COMUM = 0.5
// RARO = 0.3
// ÉPICO = 0.08
// LENDARIO = 0.05

0.05

const pets = [
    {
        nome_pet: "Cookie",
        caminho_pet: "GentleBunny.gif",
        desc_pet: "Um coelhinho elegante e charmoso!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Golden",
        caminho_pet: "Dourado_black.gif",
        desc_pet: "Um macaco com mistérios ocultos!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.05,
        evolucao: 1
    },
    {
        nome_pet: "Power Pink",
        caminho_pet: "Power_Pink.gif",
        desc_pet: "Um macaco rosa cheio de energia!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Trufa",
        caminho_pet: "Roxinho.gif",
        desc_pet: "Um adorável amiguinho roxo!",
        ponto_pet: 100,
        raridade_pet: "Raro",  // Alterado para "Raro"
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Avatar",
        caminho_pet: "Avatar.gif",
        desc_pet: "Um macaco que controla os elementos!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Apple",
        caminho_pet: "BloodRabbit.gif",
        desc_pet: "Maçã é sua fruta favorita!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Cherry Blossom",
        caminho_pet: "BlackWhiteRabbit.gif",
        desc_pet: "A coelhinha que ama brincar!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Meia-Noite",
        caminho_pet: "BlackRedRabbit.gif",
        desc_pet: "Um coelhinho que adora dormir!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Lucca",
        caminho_pet: "BlackOrangePorcupine.gif",
        desc_pet: "Um porco-espinho radical!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Ben-10",
        caminho_pet: "Ben10.gif",
        desc_pet: "Ele pode se transformar no que quiser!",
        ponto_pet: 100,
        raridade_pet: "Lendário",
        peso_pet: 0.05,
        evolucao: 1
    },
    {
        nome_pet: "BatMacaco",
        caminho_pet: "Batman.gif",
        desc_pet: "O macaquinho que protege a cidade de Gotham City!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Anjinho",
        caminho_pet: "AngelOwl.gif",
        desc_pet: "Uma corujinha que ama voar!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Dante",
        caminho_pet: "AngelDemonRabbit.gif",
        desc_pet: "Um coelhinho muito inteligente!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Bambu",
        caminho_pet: "AllGreenRabbit.gif",
        desc_pet: "Sua comida favorita é alface!.",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Jack",
        caminho_pet: "BrownRabbitJacket.gif",
        desc_pet: "Um coelhinho que ama dançar!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Capitão Coelho",
        caminho_pet: "CapitaoAmericaRabbit.gif",
        desc_pet: "O coelhinho que ajuda a salvar o mundo!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Catarina",
        caminho_pet: "CatarinaOwl.gif",
        desc_pet: "Uma corujinha muito amigável!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Chapolin",
        caminho_pet: "ChapolinRabbit.gif",
        desc_pet: "Um macaquinho muito engraçado!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Chaves",
        caminho_pet: "ChavesRabbit.gif",
        desc_pet: "Um macaco muito divertido!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Coringa",
        caminho_pet: "CoringaRabbit.gif",
        desc_pet: "O coelhinho que amedronta a cidade de Gotham City!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Cowboy",
        caminho_pet: "CowboyRabbit.gif",
        desc_pet: "Um coelhinho que adora andar a cavalo!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "CR7",
        caminho_pet: "CR7Rabbit.gif",
        desc_pet: "O coelhinho craque no futebol!",
        ponto_pet: 100,
        raridade_pet: "Lendário",
        peso_pet: 0.05,
        evolucao: 1
    },
    {
        nome_pet: "Cupido",
        caminho_pet: "CupidMonkey.gif",
        desc_pet: "Um macaquinho que espalha amor!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Zuzu",
        caminho_pet: "DarkBlueOwl.gif",
        desc_pet: "O melhor amigo da Coruja Catarina!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "DeadPool",
        caminho_pet: "DeadPoolRabbit.gif",
        desc_pet: "Apesar de bagunceiro, tem um bom coração!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Pixie",
        caminho_pet: "DegradeRabbit.gif",
        desc_pet: "Um coelho mágico nas cores!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Dick Vigarista",
        caminho_pet: "DickVigaristaRabbit.gif",
        desc_pet: "Um vilão cômico!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Trovão",
        caminho_pet: "DragonRabbit.gif",
        desc_pet: "Um coelho poderoso e feroz!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Kayk",
        caminho_pet: "DrakeRabbit.gif",
        desc_pet: "Um coelho com o estilo brasileiro!.",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Lumi",
        caminho_pet: "ETMonkey.gif",
        desc_pet: "Um macaquinho de outro planeta!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Flora",
        caminho_pet: "FairyRabbit.gif",
        desc_pet: "Uma coelhinha um tanto quanto mágica!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Finn",
        caminho_pet: "FinnRabbit.gif",
        desc_pet: "Ele adora se aventurar com seu amigo Jake!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Sol",
        caminho_pet: "FireRabbit.gif",
        desc_pet: "Ele irá aquecer seu coração!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Flash",
        caminho_pet: "FlashRabbit.gif",
        desc_pet: "O coelhinho mais rápido de todos!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Bolinho",
        caminho_pet: "FofisPorcupine.gif",
        desc_pet: "Esse porco-espinho adora piqueniques!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Misty",
        caminho_pet: "GiroFlexRabbit.gif",
        desc_pet: "Um coelho que adora festejar!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Goku",
        caminho_pet: "GokuRabbit.gif",
        desc_pet: "Seu guerreiro Saiyajin favorito!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Flame",
        caminho_pet: "GoldenBlackMonkey.gif",
        desc_pet: "O melhor amigo do coelho Kaiser!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Kaiser",
        caminho_pet: "GoldenBlackRabbit.gif",
        desc_pet: "O melhor amigo do macaco Flame!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Aurum",
        caminho_pet: "GoldRabbit.gif",
        desc_pet: "Aurum é inteiro feito de ouro!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Verdinho",
        caminho_pet: "GreenBlackRabbit.gif",
        desc_pet: "Sua comida favorita é brócolis!",
        ponto_pet: 100,
        raridade_pet: "Lendário",
        peso_pet: 0.05,
        evolucao: 1
    },
    {
        nome_pet: "Guardião",
        caminho_pet: "GuardiaoSecretoRabbit.gif",
        desc_pet: "O coelho misterioso que protege o mundo dos coelhos!.",
        ponto_pet: 100,
        raridade_pet: "Lendário",
        peso_pet: 0.05,
        evolucao: 1
    },
    {
        nome_pet: "Hulk",
        caminho_pet: "HulkRabbit.gif",
        desc_pet: "Um macaco verde e forte!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Macaco de Ferro",
        caminho_pet: "IronManMonkey.gif",
        desc_pet: "O icônico herói de ferro!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Kakashi",
        caminho_pet: "KakashiRabbit.gif",
        desc_pet: "O macaco do mundo dos ninjas!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Kawaii",
        caminho_pet: "KawaiiRabbit.gif",
        desc_pet: "A coelha fofa querida por todos!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Kiko",
        caminho_pet: "KikoRabbit.gif",
        desc_pet: "O macaco bochechudo!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "King",
        caminho_pet: "KingMonkey.gif",
        desc_pet: "O macaco rei do mundo dos macacos!",
        ponto_pet: 100,
        raridade_pet: "Lendário",
        peso_pet: 0.05,
        evolucao: 1
    },
    {
        nome_pet: "Kuririn",
        caminho_pet: "KuririnMonkey.gif",
        desc_pet: "Um macaco pequeno e forte!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Lanterna Verde",
        caminho_pet: "LanternaVerdeRabbit.gif",
        desc_pet: "O macaco do anel mágico!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Lucky",
        caminho_pet: "LuckyMonkey.gif",
        desc_pet: "O macaco da sorte!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Luigi",
        caminho_pet: "LuigiMonkey.gif",
        desc_pet: "O macaco dos video-games!",
        ponto_pet: 100,
        raridade_pet: "Lendário",
        peso_pet: 0.05,
        evolucao: 1
    },
    {
        nome_pet: "Mágico",
        caminho_pet: "MagicoRabbit.gif",
        desc_pet: "O macaco que carrega surpresas em sua cartola!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Mario",
        caminho_pet: "MarioMonkey.gif",
        desc_pet: "O macaco dos video-games!",
        ponto_pet: 100,
        raridade_pet: "Lendário",
        peso_pet: 0.05,
        evolucao: 1
    },
    {
        nome_pet: "Mascara",
        caminho_pet: "MascaraMonkey.gif",
        desc_pet: "O macaco divertido que se transforma com uma máscara!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Messi",
        caminho_pet: "MessiRabbit.gif",
        desc_pet: "O coelho camisa 10 da argentina! ",
        ponto_pet: 100,
        raridade_pet: "Lendário",
        peso_pet: 0.05,
        evolucao: 1
    },
    {
        nome_pet: "Mickey",
        caminho_pet: "MickeyRabbit.gif",
        desc_pet: "Um coelho-ratinho animado!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Minion",
        caminho_pet: "MinionRabbit.gif",
        desc_pet: "Banana!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Money",
        caminho_pet: "MoneyManRabbit.gif",
        desc_pet: "O coelhinho mais rico de todos!",
        ponto_pet: 100,
        raridade_pet: "Lendário",
        peso_pet: 0.05,
        evolucao: 1
    },
    {
        nome_pet: "Animadinha",
        caminho_pet: "MonkeyAnimadinha.gif",
        desc_pet: "Uma macaca cheia de alegria!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Carinhoso",
        caminho_pet: "MonkeyCarinhoso.gif",
        desc_pet: "Um macaco carinhoso e cheio de amor!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Fumaça",
        caminho_pet: "MonkeyCinzento.gif",
        desc_pet: "Um macaquinho cinzento!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Duende",
        caminho_pet: "MonkeyDuende.gif",
        desc_pet: "O macaco vilão do mundo dos macacos!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Zangadinho",
        caminho_pet: "MonkeyZangadinho.gif",
        desc_pet: "Um macaco fofo e zangado!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Naruto",
        caminho_pet: "NarutoRabbit.gif",
        desc_pet: "O coelho ninja!",
        ponto_pet: 100,
        raridade_pet: "Lendário",
        peso_pet: 0.05,
        evolucao: 1
    },
    {
        nome_pet: "Papai Noel",
        caminho_pet: "NatalMonkey.gif",
        desc_pet: "O velhinho do natal no mundo dos macacos!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Neymar",
        caminho_pet: "NeymarRabbit.gif",
        desc_pet: "O melhor dos jogadores!",
        ponto_pet: 100,
        raridade_pet: "Lendário",
        peso_pet: 0.05,
        evolucao: 1
    },
    {
        nome_pet: "Noturno",
        caminho_pet: "NoturnoRabbit.gif",
        desc_pet: "O coelho herói especial!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Vovô",
        caminho_pet: "OldRabbit.gif",
        desc_pet: "Um velhinho coelho doce cheio de amor!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Peão de Rodeio",
        caminho_pet: "PeaoDeRodeioRabbit.gif",
        desc_pet: "O coelho que firma nos touros!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Perna Longa",
        caminho_pet: "PernalongaRabbit.gif",
        desc_pet: "Um coelhinho Looney Tunes!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Pica Pau",
        caminho_pet: "PicaPauRabbit.gif",
        desc_pet: "O coelhinho do cabelo vermelho!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Pikachu",
        caminho_pet: "PikachuRabbit.gif",
        desc_pet: "O coelho do choque! ",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Militar",
        caminho_pet: "PMRabbit.gif",               
        desc_pet: "O coelho de farda!",
        ponto_pet: 100,
        raridade_pet: "Lendário",
        peso_pet: 0.05,
        evolucao: 1
    },
    {
        nome_pet: "Pooh",
        caminho_pet: "PoohMonkey.gif",
        desc_pet: "Um macaco fofo que adora mel!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Fantasma",
        caminho_pet: "PossuidoMonkey.gif",
        desc_pet: "O macaco do além!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Escuridão",
        caminho_pet: "PossuidoRabbit.gif",
        desc_pet: "Um coelho das trevas!",
        ponto_pet: 100,
        raridade_pet: "Lendário",
        peso_pet: 0.05,
        evolucao: 1
    },
    {
        nome_pet: "Power Blue",
        caminho_pet: "PowerBlue.gif",
        desc_pet: "Um macaco azul cheio de energia!!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Power Green",
        caminho_pet: "PowerGreen.gif",
        desc_pet: "Um macaco verde cheio de energia!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Power Red",
        caminho_pet: "PowerRed.gif",
        desc_pet: "Um macaco vermelho cheio de energia!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Pluma",
        caminho_pet: "PurpleGreenModernRabbit.gif",
        desc_pet: "Um coelhinho com a energia leve e feliz!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Luna",
        caminho_pet: "PurpleGreenPorcupine.gif",
        desc_pet: "Cintilante como a lua!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Uvinha",
        caminho_pet: "PurpleMonkey.gif",
        desc_pet: "Um macaco roxinho como uma pequena uva!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Lily",
        caminho_pet: "PurplePinkRabbit.gif",
        desc_pet: "Uma coelha em homenagem a flor lírio!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Maromba",
        caminho_pet: "RabbitBombado.gif",
        desc_pet: "O coelho musculoso!.",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Rosalie",
        caminho_pet: "WhitePink.gif",
        desc_pet: "Uma coelha delicada e elegante!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Wolverine",
        caminho_pet: "Wolverine.gif",
        desc_pet: "O coelho de garras afiadas!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Zumbi",
        caminho_pet: "Zumbi.gif",
        desc_pet: "Um coelho morto vivo!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Ruby",
        caminho_pet: "RainbowRabbit.gif",
        desc_pet: "Um coelho que adora festas!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Pop",
        caminho_pet: "RedWhiteMonkey.gif",
        desc_pet: "Um macaco branco e vermelho como uma pipoca doce!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Tomatinho",
        caminho_pet: "RedWhiteRabbit.gif",
        desc_pet: "Um coelho com tons vermelhos como um tomate cereja!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Robin",
        caminho_pet: "RobinRabbit.gif",
        desc_pet: "O coelho líder dos heróis!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Sansão",
        caminho_pet: "SansaoRabbit.gif",
        desc_pet: "O clássico coelho azul da mônica!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Sasuke",
        caminho_pet: "SasukeRabbit.gif",
        desc_pet: "Um coelho do mundo dos ninjas!",
        ponto_pet: 100,
        raridade_pet: "Lendário",
        peso_pet: 0.05,
        evolucao: 1
    },
    {
        nome_pet: "Mistério",
        caminho_pet: "SeitaRabbit.gif",
        desc_pet: "Um coelho cheio de segredos!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Sparkle",
        caminho_pet: "ShinningRabbit.gif",
        desc_pet: "Um coelho que brilha como as estrelas!",
        ponto_pet: 100,
        raridade_pet: "Lendário",
        peso_pet: 0.05,
        evolucao: 1
    },
    {
        nome_pet: "Ametista",
        caminho_pet: "SimbolRabbit.gif",
        desc_pet: "Um coelho que possui elementos especiais!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Smurf",
        caminho_pet: "SmurfMonkey.gif",
        desc_pet: "Um macaco do mundo dos baixinhos azuis!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "Soldier",
        caminho_pet: "SoldadoRabbit.gif",
        desc_pet: "Um coelho das leis!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Sonic",
        caminho_pet: "SonicRabbit.gif",
        desc_pet: "Um coelho muito veloz!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Macaco Aranha",
        caminho_pet: "SpiderMonkey.gif",
        desc_pet: "Um macaco com os poderes da teia!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Bob Esponja",
        caminho_pet: "SpongeBobRabbit.gif",
        desc_pet: "O coelho da fenda do biquíni!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },
    {
        nome_pet: "SuperCoelho",
        caminho_pet: "SupermanRabbit.gif",
        desc_pet: "O coelho protetor da cidade dos coelhos!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Tigrão",
        caminho_pet: "TigraoMonkey.gif",
        desc_pet: "Um macaco que pode ser um tigre!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "TV",
        caminho_pet: "TVRabbit.gif",
        desc_pet: "Um coelho que teleporta, assim como mudar de canal!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Vegeta",
        caminho_pet: "VegetaRabbit.gif",
        desc_pet: "Um coelho sério com poderes extraordinários!",
        ponto_pet: 100,
        raridade_pet: "Épico",
        peso_pet: 0.08,
        evolucao: 1
    },
    {
        nome_pet: "Mares",
        caminho_pet: "WaterRabbit.gif",
        desc_pet: "Um coelho que tem o poder de controlar a água!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Pedro",
        caminho_pet: "WhiteGreenRabbit.gif",
        desc_pet: "O coelhinho torcedor do Palmeiras!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Nuvem",
        caminho_pet: "WhiteRabbit.gif",
        desc_pet: "Um coelhinho fofo como as nuvens!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Anti-Inverno",
        caminho_pet: "Winter1Rabbit.gif",
        desc_pet: "Um coelho que odeia frio!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Friento",
        caminho_pet: "Winter2Rabbit.gif",
        desc_pet: "Um coelho que fica estiloso no frio!",
        ponto_pet: 100,
        raridade_pet: "Comum",
        peso_pet: 0.5,
        evolucao: 1
    },
    {
        nome_pet: "Preguiçoso",
        caminho_pet: "YellowManMonkey.gif",
        desc_pet: "Um macaco que vive cansado!",
        ponto_pet: 100,
        raridade_pet: "Raro",
        peso_pet: 0.3,
        evolucao: 1
    },

];

const sorteioComBaseNoPeso = (pets, ID_pet = null) => {
    const pesoTotal = pets.reduce((acc, pet) => acc + pet.peso_pet, 0);
    let sorteado = null;

    while (!sorteado) {
        const sorteioAleatorio = Math.random() * pesoTotal; // Sorteio aleatório entre 0 e o peso total
        console.log('Sorteio Aleatório:', sorteioAleatorio);

        let chanceAcumulada = 0;

        for (const pet of pets) {
            chanceAcumulada += pet.peso_pet;
            console.log(`Pet: ${pet.nome_pet}, Chance Acumulada: ${chanceAcumulada}`);

            // Verifica se o sorteio caiu no intervalo de chances do pet atual
            if (sorteioAleatorio < chanceAcumulada) {
                if (ID_pet === null || pet.ID_pet !== ID_pet) {
                    sorteado = pet; // Sorteia um pet diferente, caso não seja o pet atual
                }
                break;
            }
        }

        // Se o sorteio ainda não encontrou um pet válido (diferente do anterior), tenta novamente
        if (sorteado && ID_pet !== null && sorteado.ID_pet === ID_pet) {
            sorteado = null; // Força nova tentativa se o pet sorteado for o mesmo do anterior
        }
    }

    return sorteado; // Retorna o pet sorteado
};




module.exports= {sorteioComBaseNoPeso, pets}

const fs = require('fs');
const path =  require('path')



// Verifica se o nome das pasta estão ok

const lerPasta = () => {
    const Pasta = 'C:/Users/yugit/Documents/GitHub/23G7_DesperdicioAlimentar/BackEnd/public/PetsClientes';
    
    fs.readdir(Pasta, (err, arquivos) => {
        if (err) {
            console.log("Deu erro:", err);
            return err;
        }

        // Recupera apenas os nomes dos arquivos (sem o caminho completo)
        arquivos = arquivos.map((arquivo) => path.basename(arquivo));

        // Verifica quais arquivos da pasta correspondem aos caminhos de 'caminho_pet' no array
        pets.forEach((pet) => {
            const petCaminho = pet.caminho_pet;
            if (arquivos.includes(petCaminho)) {
            
            } else {
                console.log(`O arquivo ${petCaminho} está faltando ou com nome errado.`);
            }
        });
    });
}

// lerPasta();