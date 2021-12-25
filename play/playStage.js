function playStage(stages, User, msg, userId, splittedMessage){
    const stage = stages;
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
        user.heart -= stage[stageNum].heart;
        const characters = [];
        for(const key in user.owningCharacters){
            const character = user.owningCharacters[key];
            if(characterNames.includes(character.name)){
                characters.push(character);
            }
        }
        const monsters = stage[stageNum].monsters;
        let checker = 0;
        function fight(){
            for(const monster of monsters){
                characters[0].hp -= monster.attack;
                if(characters[0].hp < 1){
                    characters.splice(0, 1);
                }
                if(characters.length == 0){
                    msg.reply('**⚔ 클리어 실패**');
                    checker++;
                    return;
                }
            }
            for(const character of characters){
                monsters[0].hp -= character.attack;
                if(monsters[0].hp < 1){
                    monsters.splice(0, 1);
                }
                if(monsters.length == 0){
                    if(stage[stageNum].number > user.highestStage){
                        user.highestStage = stage[stageNum].number;
                    }
                    user.gold += stage[stageNum].reward.gold;
                    user.diamond += stage[stageNum].reward.diamond;
                    msg.reply('**🎉 클리어 성공!!**\n보상: \n골드 `' + stage[stageNum].reward.gold +'개`\n다이아 `' + stage[stageNum].reward.diamond + '개`');
                    checker++;
                    user.save();
                    return;
                }
            }
        }
        while(checker == 0){
            fight();
        }
    })
}

exports.playStage = playStage;