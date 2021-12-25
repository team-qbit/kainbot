function gatcha(User, msg, userId, splittedMessage, normalCharacters, goodCharacters, legendCharacters){
    User.findOne({userId : userId})
        .then(user => {
            if(user == null){
                msg.reply('가입되지 않은 사용자입니다. `알피야 회원가입`으로 가입 후 즐겨주세요!');
                return;
            }
            let gatchaType;
            if(splittedMessage[2] == '일반'){
                if(user.gold < 100){
                    msg.reply('돈이 부족합니다!\n필요한 돈: `100골드`');
                    return;
                }
                gatchaType = normalCharacters;
            }
            if(splittedMessage[2] == '고급'){
                if(user.diamond < 100){
                    msg.reply('다이아가 부족합니다!\n필요한 다이아: `100개`');
                    return;
                }
                gatchaType = goodCharacters;
            }
            if(splittedMessage[2] == '최고급'){
                if(user.diamond < 100){
                    msg.reply('다이아가 부족합니다!\n필요한 다이아: `1000개`');
                    return;
                }
                gatchaType = legendCharacters;
            }
            const types = ['일반', '고급','최고급'];
            if(!types.includes(splittedMessage[2])){
                msg.reply('뽑기 종류에는 `일반`, `고급`, `최고급`이 있습니다!');
                return;
            }
            const randomNum = Math.floor(Math.random() * gatchaType.length);
            user.gold -= 100;
            for(const character of user.owningCharacters){
                if(character.name == gatchaType[randomNum].name){
                    msg.reply('이미 소유하고 있는 캐릭터가 나왔습니다!\n' + '남은 골드: `' + user.gold + '`');
                    user.save()
                    return;
                }
            }
            user.owningCharacters = [gatchaType[randomNum], ...user.owningCharacters];
            user.save()
            msg.reply(gatchaType[randomNum].name + "을 뽑았습니다!\n" + '남은 골드: `' + user.gold + '`') //최댓값은 제외, 최솟값은 포함
        })
}

exports.gatcha = gatcha;