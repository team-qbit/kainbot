function playStage(stages, User, msg, userId, splittedMessage, MessageButton, MessageActionRow, MessageEmbed, client){
    const stage = stages;
    let turnResults = ''
    if(isNaN(splittedMessage[2])){
        msg.reply('`알피야 플레이 [스테이지수]`를 입력해주세요.')
        return;
    }
    const stageNum = splittedMessage[2] - 1;
    User.findOne({userId : userId})
    .then(user => {
        if(user == null){
            msg.reply('가입되지 않은 사용자입니다. `알피야 회원가입`으로 가입 후 즐겨주세요!');
            return;
        }
        if(stage[stageNum].heart > user.heart){
            msg.reply('하트가 부족합니다! 조금만 기다려주세요!');
            return;
        }
        if(user.highestStage + 1 < splittedMessage[2]){
            msg.reply('아직 `' + stageNum + ' 스테이지`를 클리어하지 않았습니다.');
            return;
        }
        const characterNames = [];
        for(const key in user.team){
            if(user.team[key] != '빈 슬롯'){
                characterNames.push(user.team[key]);
            }
        }
        if(characterNames.length == 0){
            msg.reply('현재 배치되어있는 캐릭터가 없습니다! `알피야 배치`로 캐릭터를 배치해조세요!');
            return;
        }
        msg.reply('전투를 진행 중입니다...');
        function play(){
            user.heart -= stage[stageNum].heart;
            const characters = [];
            for(const characterName of characterNames){
                for(const key in user.owningCharacters){
                    const character = user.owningCharacters[key];
                    if(characterName == character.name){
                        characters.push(character);
                        console.log(characters)
                    }
                }
            }
            const monsters = stage[stageNum].monsters;
            let checker = 0;
            let turnChecker = 1;
            function fight(){
                for(const character of characters){
                    if(monsters.length == 0){
                        if(stage[stageNum].number > user.highestStage){
                            user.highestStage = stage[stageNum].number;
                        }
                        user.gold += stage[stageNum].reward.gold;
                        user.diamond += stage[stageNum].reward.diamond;
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('fightInfo')
                            .setLabel('전투 상세 정보 보기')
                            .setStyle('PRIMARY'),
                    ); 
                    const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('**🎉 클리어 성공!!**')
                    .setURL('https://discord.js.org/')
                    .setAuthor('전투 보상', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsYFIJ5PjQUSpiJsMf_pWtM7xen2efVP7OFU-A_J-KOiS5e2EBgDOEi3yZl4R9r1zCEGQ&usqp=CAU', 'https://discord.js.org')
                    .setDescription(`🪙 ${stage[stageNum].reward.gold} 💎 ${stage[stageNum].reward.diamond}`)
                    .setThumbnail('https://www.pngitem.com/pimgs/m/49-491416_winning-success-achievement-must-win-battles-icon-hd.png')
                        msg.reply({ embeds: [embed], components: [row] });
                        checker++;
                        user.save();
                        return;
                    }
                    monsters[0].hp -= character.attack;
                    if(monsters[0].hp < 1){
                        monsters.splice(0, 1);
                    }
                }
                for(const monster of monsters){
                    if(characters.length == 0){
                        msg.reply('**⚔ 클리어 실패**');
                        checker++;
                        return;
                    }
                    characters[0].hp -= monster.attack;
                    if(characters[0].hp < 1){
                        characters.splice(0, 1);
                    }
                }
                let teamTurnResult = '';
                let enemyTurnResult = '';
                for(const character of characters){
                    teamTurnResult += (character.name + " ");
                }
                for(const monster of monsters){
                    enemyTurnResult += (monster.name + " ");
                }
                turnResults += (`***${turnChecker} 번째 턴 결과 (살아있는 유닛)***\n> **아군**: ${teamTurnResult}\n> **적군**: ${enemyTurnResult}\n`);
            }
            
            while(checker == 0){
                fight();
                turnChecker++
            }
        }
        const wait = require('util').promisify(setTimeout);
        wait(3000).then(play);
    })
    client.on('interactionCreate', interaction => {
        if(interaction.customId == 'fightInfo'){
            interaction.update({content: turnResults,components:[],embeds:[]});
            //interaction.reply({content:JSON.stringify(interaction.user)});
        }
    })
}

exports.playStage = playStage;