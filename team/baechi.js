//붸취 너무해ㅠ
function baechi(splittedMessage, User, msg, userId){
    if(splittedMessage.length == 3){
        if(splittedMessage[2] == '해제'){
            User.findOne({userId : userId})
            .then(user => {
                if(user == null){
                    msg.reply('가입되지 않은 사용자입니다. `알피야 회원가입`으로 가입 후 즐겨주세요!');
                    return;
                }
                for(const i in user.team){
                    user.team[i] = '빈 슬롯'; 
                }
                user.markModified("team");
                user.save().then(() => {
                    msg.reply('덱이 초기화됐습니다!');
                }) 
            })
            return;
        }
    }
    if(splittedMessage.length != 4){
        msg.reply('올바른 명령어를 입력해주세요! `알피야 배치 [캐릭터명] [자리수]`');
        return;
    }
    User.findOne({userId : userId})
    .then(user => {
        if(user == null){
            msg.reply('가입되지 않은 사용자입니다. `알피야 회원가입`으로 가입 후 즐겨주세요!');
            return;
        }
        let characterNames = [];
        for(const character of user.owningCharacters){
            characterNames = [character.name, ...characterNames];
        }
        if(!characterNames.includes(splittedMessage[2])){
            msg.reply('선택하신 캐릭터를 보유하고 있지 않습니다!');
            return;
        }
        const numbers = ['1', '2', '3', '4']
        if(!numbers.includes(splittedMessage[3])){
            msg.reply('1부터 4까지 중의 한 가지 숫자를 적어주세요.');
            return;
        }
        const num = splittedMessage[3]-1;
        if(user.team[num] != '빈 슬롯'){
            msg.reply('이미 해당 슬롯에 캐릭터가 배치되어 있습니다.! `알피야 배치 해제`로 배치를 해제 후 캐릭터를 배치해주세요!');
            return;
        }
        for(const character in user.team){
            if(user.team[character] == splittedMessage[2]){
                msg.reply('이미 해당 캐릭터가 이미 덱에 배치되어 있습니다!');
                return;
            }
        }
        user.team[splittedMessage[3]-1] = splittedMessage[2];
        user.markModified("team");
        user.save().then(() => {
            msg.reply(splittedMessage[3] + '번 슬롯에 `' + splittedMessage[2] + '`이/가 배치됐습니다!');
        })
    })
}

exports.baechi = baechi;