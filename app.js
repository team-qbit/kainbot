const Discord = require('discord.js');
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
const healer = new Character('의무병', '의무병은 팀을 치료해줍니다.', '의료막사', 'D', 15, 2, 3, 5);
const dolgyuk = new Character('돌격병', '팀의 최전방에서 적들을 공격합니다.', '따발총', 'D', 25, 3, 0, 1);

const bomber = new Character('폭탄투척병', '멀리서 폭탄을 투척합니다.', '폭탄비', 'B', 15, 12, 0, 1);
const ninja = new Character('닌자', '가장 마지막 슬롯에 있는 적에게 피해를 줍니다.', '뒤치기', 'B', 20, 8, 0, 1);

const hacker = new Character('해커', '가장 공격력이 높은 적의 공격력을 감소시킵니다.', '해킹', 'A', 15, 10, 0, 1);
const drone = new Character('드론조정병', '일정 시간마다 드론을 띄워 체력이 가장 많은 적을 공격합니다.', '와인드업', 'A', 15,12, 0, 1);

const jagaChiyou = new Character('전투의무병', '자신을 계속해서 회복하며 싸웁니다.', '자가치유', 'S', 30, 8, 4, 1);

const normalCharacters = [bobyung, healer, dolgyuk];
const goodCharacters = [bomber, ninja, hacker, drone];
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

const stages = [
    {
        number : 1,
        monsters : [slime],
        heart : 3,
        reward : {
            gold : 100,
            diamond : 1
        }
    }
];

client.on('messageCreate', (msg) => {
    if(!msg.content.startsWith('알피야 ')) return;
    if(msg.channel.type == 'dm') return;
    if(msg.author.bot) return;
    const userId = msg.author.id;
    const splittedMessage = msg.content.split(' ');

    if(msg.content == '알피야 테스트') msg.reply('히힛');

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
})


client.login("OTE1OTc4NjQ5MzY1Mjc0NjQ1.YajdmA.Mjr142WTCbAPXAN-m3KNVwBFHc0");