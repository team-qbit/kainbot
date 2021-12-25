const Discord = require('discord.js');
const { MessageActionRow, MessageButton,MessageSelectMenu } = require('discord.js');
const client = new Discord.Client({ intents: [ Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES ] });
const User = require('./db/db')
const giveHeart = require('./db/giveHeart');

setInterval(() => {
    giveHeart.giveHeart(User);
}, 180000);

client.on('ready', () => {
    console.log('로그인 완료!');
    client.user.setActivity('한디리 해커톤 | 프로젝트 베타');
});



class Character {
    constructor(name, description, skill, rank, hp, attack, heal, level){
        this.name = name;
        this.description = description;
        this.skill = skill;
        this.rank = rank;
        this.hp = hp;
        this.attack = attack;
        this.heal = heal;
        this.level = level;
    }
}; 

const bobyung = new Character('보병', '보병은 밸런스가 준수한 유닛입니다.', '총기난사', 'D', 20, 3, 0, 1);
const healer = new Character('의무병', '의무병은 팀을 치료해줍니다.', '의료막사', 'D', 15, 2, 5, 1);
const dolgyuk = new Character('돌격병', '팀의 최전방에서 적들을 공격합니다.', '따발총', 'D', 25, 3, 0, 1);
const archer = new Character('궁수', '궁수의 화살은 절대 빗나가지 않습니다. 일정시간동안 자신의 공격속도를 올립니다.', '바람은 느끼는것..', 'C', 20, 2, 0, 1)

const bomber = new Character('폭탄투척병', '멀리서 폭탄을 투척합니다.', '폭탄비', 'B', 15, 12, 0, 1);
const ninja = new Character('닌자', '가장 마지막 슬롯에 있는 적에게 피해를 줍니다.', '뒤치기', 'B', 20, 8, 0, 1);

const hacker = new Character('해커', '가장 공격력이 높은 적의 공격력을 감소시킵니다.', '해킹', 'A', 15, 10, 0, 1);
const sniper = new Character('저격수', '저격수는 적을 놓친 적이 없습니다. 그의 저격에서 벗어날 수 있는 사람은 없죠. 스킬 사용시, 저격수의 총알이 강화되어 강한 데미지를 넣습니다!', '헤드샷', 'A', 10, 5, 0, 1);
const hunter = new Character('사냥꾼', '도시 근처 숲에서 사냥을 해오던 그는 어느날 갑작스런 습격에 자신의 동료와 가족들을 지키기 위해 전장으로 뛰어들었습니다. 스킬 사용시 그물을 던져 적 중 한명의 공격력을 0으로 만듭니다.', '사냥용 그물 투척', 'A', 20, 4, 3, 1);
const drone = new Character('드론조정병', '일정 시간마다 드론을 띄워 체력이 가장 많은 적을 공격합니다.', '와인드업', 'A', 15,12, 0, 1);
const scarecrow = new Character('허수아비', '허수아비는 원래 농장에서 새를 쫓는 일을 하였지만, 사람들을 돕고 싶다는 생각에 전장에 앞장서게 되었습니다. 스킬 사용시 5초간 100의 피해를 흡수하는 방패를 소환합니다.', '허수아비의 보호', 'A', 30, 2, 0, 1);

const jagaChiyou = new Character('전투의무병', '자신을 계속해서 회복하며 싸웁니다.', '자가치유', 'S', 30, 8, 4, 1);

const normalCharacters = [bobyung, healer, dolgyuk, archer];
const goodCharacters = [bomber, ninja, hacker, drone, hunter, sniper, scarecrow];
const legendCharacters = [jagaChiyou];

class Monster {
    constructor(name, hp, attack, heal){
        this.name = name;
        this.hp = hp;
        this.attack = attack;
        this.heal = heal;
    }
}

const slime = new Monster('슬라임', 20, 2, 0);
const dom = new Monster('도마뱀', 25, 3, 0);
const icedom = new Monster('얼음 도마뱀', 25, 3, 2);
const icebear = new Monster('눈곰', 35, 5, 3);
const raplesia = new Monster('식인 라플레시아', 40, 2, 3);
const oldtree = new Monster('천년 된 나무', 30, 5, 5);
const stoneGolem = new Monster('스톤 골렘', 45, 8, 0);
const goblin = new Monster('고블린', 30, 3, 4);
const ikryong = new Monster('익룡', 40, 5, 1);
const dragon = new Monster('드래곤', 50, 10, 1);
const blueDragon = new Monster('청룡', 60, 12, 3);
const whiteDragon = new Monster('백룡', 55, 15, 2);


const stages = [
    {
        number : 1,
        monsters : [slime],
        heart : 3,
        reward : {
            gold : 100,
            diamond : 1
        }
    },
    {
        number : 2,
        monsters : [slime, slime, dom],
        heart : 3,
        reward : {
            gold : 100,
            diamond : 1
        }
    },
    {
        number : 3,
        monsters : [slime, slime, dom, dom],
        heart : 3,
        reward : {
            gold : 100,
            diamond : 1
        }
    },
    {
        number : 4,
        monsters : [slime, slime, icedom],
        heart : 4,
        reward : {
            gold : 110,
            diamond : 1
        }
    },
    {
        number : 5,
        monsters : [slime, slime, icedom, icedom],
        heart : 4,
        reward : {
            gold : 110,
            diamond : 1
        }
    },
    {
        number : 6,
        monsters : [slime, icedom, icedom, icebear],
        heart : 4,
        reward : {
            gold : 110,
            diamond : 1
        }
    },
    {
        number : 7,
        monsters : [slime, slime, icedom, icedom, icebear, icebear],
        heart : 4,
        reward : {
            gold : 110,
            diamond : 1
        }
    },
    {
        number : 8,
        monsters : [slime, slime, raplesia],
        heart : 4,
        reward : {
            gold : 120,
            diamond : 2
        }
    },
    {
        number : 9,
        monsters : [raplesia, raplesia, raplesia],
        heart : 4,
        reward : {
            gold : 120,
            diamond : 2
        }
    },
    {
        number : 10,
        monsters : [raplesia, oldtree],
        heart : 4,
        reward : {
            gold : 120,
            diamond : 2
        }
    },
    {
        number : 11,
        monsters : [raplesia, raplesia, oldtree],
        heart : 4,
        reward : {
            gold : 120,
            diamond : 2
        }
    },
    {
        number : 12,
        monsters : [raplesia, raplesia, oldtree, oldtree],
        heart : 4,
        reward : {
            gold : 120,
            diamond : 2
        }
    },
    {
        number : 13,
        monsters : [raplesia, raplesia, oldtree, stoneGolem],
        heart : 5,
        reward : {
            gold : 130,
            diamond : 2
        }
    },
    {
        number : 14,
        monsters : [raplesia, raplesia, oldtree, stoneGolem, goblin],
        heart : 5,
        reward : {
            gold : 130,
            diamond : 2
        }
    },
    {
        number : 15,
        monsters : [raplesia, raplesia, stoneGolem, goblin, stoneGolem],
        heart : 5,
        reward : {
            gold : 130,
            diamond : 2
        }
    },
    {
        number : 14,
        monsters : [slime, raplesia, raplesia, oldtree, goblin, goblin, goblin],
        heart : 5,
        reward : {
            gold : 130,
            diamond : 2
        }
    },
];


client.on('messageCreate', (msg) => {
    if(msg.content.startsWith('ev ')){
        try{
            msg.reply(JSON.stringify(eval(msg.content.replace('ev ',''))));
        }catch(e){
            msg.reply(JSON.stringify(e,null,4));
        }
    }
    if(!msg.content.startsWith('알피야 ')) return;
    if(msg.channel.type == 'dm') return;
    if(msg.author.bot) return;
    const userId = msg.author.id;
    const splittedMessage = msg.content.split(' ');

    
    if(msg.content == '알피야 테스트'){
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('playGame')
                .setPlaceholder('전투 준비!')
                .addOptions([
                    {
                        label: '🎯 공격하기',
                        value: 'attack'
                    },
                    {
                        label: '🚽 도망가기',
                        value: 'runaway',
                    },
                    {
                        label: '🛒 가방',
                        value: 'bag',
                    },
                ])
        );
            msg.reply({ content: '테스트!', components: [row] });
        }

    //회원가입
    if(msg.content == '알피야 회원가입'){
        const dbSign = require('./db/signUp');
        dbSign.signUp(userId, User, msg);
    }

    //내정보
    if(msg.content == '알피야 내정보'){
        const profile = require('./db/profile');
        profile.profile(User, userId, msg)
    }

    //뽑기
    if(msg.content.startsWith('알피야 뽑기')){
        const gatcha = require('./team/gatcha');
        gatcha.gatcha(User, msg, userId, splittedMessage, normalCharacters, goodCharacters, legendCharacters);
    }
    
    //배치하기
    if(msg.content.startsWith('알피야 배치')){
        const baechi = require('./team/baechi');
        baechi.baechi(splittedMessage, User, msg, userId);
    }

    //플레이하기
    if(msg.content.startsWith('알피야 플레이')){
        const playStage = require('./play/playStage');
        playStage.playStage(stages, User, msg, userId, splittedMessage);
    }

    //레벨업
    if(msg.content.startsWith('알피야 레벨업')){
        const levelUp = require('./team/levelUp');
        levelUp.levelUp(User, userId, splittedMessage, msg);
    }
});

client.on('interactionCreate', interaction => {
    //console.log(interaction);
    a = interaction;
    console.log(Object.keys(interaction))
    if(interaction.customId == 'playGame'){
        interaction.reply({content:interaction.values[0]});
    }
});


client.login(process.env.TOKEN);