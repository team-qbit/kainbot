function profile(User, userId, msg){
    User.findOne({userId : userId})
            .then(user => {
                if(user == null){
                    msg.reply('가입되지 않은 사용자입니다. `알피야 회원가입`으로 가입 후 즐겨주세요!');
                    return;
                }
                let owningCharacter = '';
                let checker = 0;
                for(const character of user.owningCharacters){
                    owningCharacter += character.name;
                    checker++
                    if(checker != user.owningCharacters.length){
                        owningCharacter += ', ';
                    }
                }
                msg.reply('골드: `' + user.gold + '`개\n다이아: `' + user.diamond + '`개\n캐릭터: `'+ owningCharacter + '`\n클리어 스테이지: `' + user.highestStage + '`\n하트: `' + user.heart + '`개')
    })
}

exports.profile = profile;