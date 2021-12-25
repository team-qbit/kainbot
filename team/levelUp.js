function levelUp(User, userId, splittedMessage, msg){
    User.findOne({userId : userId})
    .then(user => {
        if(user == null){
            msg.reply('가입되지 않은 사용자입니다. `알피야 회원가입`으로 가입 후 즐겨주세요!');
            return;
        }
        if(splittedMessage.length != 4){
            msg.reply('올바른 형식으로 입력해주세요! `알피야 레벨업 [캐릭터명] [경험치 파편 개수]`');
            return;
        }
        const piece = Number(splittedMessage[3]);
        if(isNaN(piece) || !Number.isInteger(piece) || piece < 0){
            msg.reply('경험치 파편의 개수는 0 혹은 자연수여야합니다!');
            return;
        }
        const userPiece = user.piece;
        if(userPiece < piece){
            msg.reply('경험치 파편이 부족합니다!');
            return
        }
        for(const character of user.owningCharacters){ 
            if(character.name == splittedMessage[2]){
                const requiredGold = 1000 + character.level * 100;
                if(user.gold < requiredGold){
                    msg.reply('강화를 위한 골드가 부족합니다!\n필요 골드: `' + requiredGold + '`골드');
                    return;
                }
                user.gold -= requiredGold;
                const percentLv = [1, 5, 10, 15, 20, 30, 40, 50];
                let percent = 0;
                let extraPercent = 2 * Number(piece);
                for(let i = 0; i < 7; i++){
                    if(character.level < percentLv[i + 1]){
                        percent = 100 - 10 * i;
                        break;
                    }
                }
                let finalPercent =  percent + extraPercent;
                if(finalPercent > 100){
                    finalPercent = 100;
                }
                const rn = Math.floor(Math.random() * 100);
                if(rn < finalPercent){
                    character.level++;
                    const specUpPercent = 1 + character.level * 0.1;
                    for(const key in character){
                        const specs = ["hp", "attack", "heal"];
                        if(specs.includes(key)){
                            character[key] = Math.round(character[key] * specUpPercent);
                        }
                    };
                    for(let i = 0; i < user.owningCharacters.length ; i++){
                        user.markModified("owningCharacters");
                    }
                    user.save().then(()=>{
                        msg.reply(`레벨업 성공! ✨ (${percent}% + ${extraPercent}%)`);
                    })
                }else{
                    user.save();
                    msg.reply('레벨업 실패ㅜㅜ.. 😢');
                    return;
                }
                return;
            }
        }
        msg.reply('선택하신 캐릭터가 없습니다!');
    });
}

exports.levelUp = levelUp;