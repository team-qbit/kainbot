function signUp(userId, User, msg){
    User.findOne({userId : userId})
        .then(user => {
            if(user != null){
                msg.reply('이미 가입된 사용자입니다!');
                return;
            }
            const userModel = new User();
            userModel.userId = userId;
            userModel.heart = 60;
            userModel.gold = 1000;
            userModel.diamond = 0;
            userModel.highestStage = 0;
            userModel.team = {
                0 : '빈 슬롯',
                1 : '빈 슬롯',
                2 : '빈 슬롯',
                3 : '빈 슬롯'
            };
            userModel.item = {};
            userModel.owningCharacters = [];
            userModel.save().then(() => {
                console.log('신규 유저 등록');
                msg.reply('🎈 회원가입이 완료됐습니다! 가입 기념 선물로 `1000골드`가 증정됐습니다!');
            })
        })
}

exports.signUp = signUp;