function profile(User, userId, msg, MessageButton, MessageActionRow, MessageEmbed){
    User.findOne({userId : userId})
            .then(user => {
                if(user == null){
                    msg.reply('가입되지 않은 사용자입니다. `알피야 회원가입`으로 가입 후 즐겨주세요!');
                    return;
                }
                let owningCharacter = '';
                let checker = 0;
                /*for(const character of user.owningCharacters){
                    owningCharacter += character.name;
                    checker++
                    if(checker != user.owningCharacters.length){
                        owningCharacter += ', ';
                    }
                }*/
                const row = new MessageActionRow()
			    .addComponents(
				    new MessageButton()
					    .setCustomId('nextPage'+userId)
					    .setLabel('캐릭터 정보 ▶')
					    .setStyle('PRIMARY')
			    );
                const content = `:coin:  **${user.gold}개**\n:gem:  **${user.diamond}개**\n:trophy:  **Stage_${user.highestStage}**\n:heart:  **${user.heart}개**`;
                const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setAuthor('User Stats', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsYFIJ5PjQUSpiJsMf_pWtM7xen2efVP7OFU-A_J-KOiS5e2EBgDOEi3yZl4R9r1zCEGQ&usqp=CAU')
                .setDescription(content);
                msg.reply({embeds:[embed],components:[row]})
                //msg.reply('골드: `' + user.gold + '`개\n다이아: `' + user.diamond + '`개\n캐릭터: `'+ owningCharacter + '`\n클리어 스테이지: `' + user.highestStage + '`\n하트: `' + user.heart + '`개')
    })
}

exports.profile = profile;