function giveHeart(User){
    User.find((err, users)=>{
        users.forEach((user => {
            if(user.heart != 60){
                user.heart += 1;
            }
        }))
    })
}

exports.giveHeart = giveHeart;