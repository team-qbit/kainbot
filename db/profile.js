function profile(User, userId, msg, MessageButton, MessageActionRow, MessageEmbed, client){
    let page = {};
    User.findOne({userId : userId})
            .then(user => {
                page[userId] = 0;
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

                client.on('interactionCreate', interaction => {
                    //console.log(interaction);
                    a = interaction;
                    const userId = interaction.user.id;
                    if(interaction.customId == 'moreInfo'){
                        interaction.update({content:'asdf',components:[],embeds:[]});
                        //interaction.reply({content:JSON.stringify(interaction.user)});
                    }
                    if(interaction.customId.startsWith('nextPage')&&interaction.customId != 'nextPage'+userId){
                        interaction.update({});
                        console.log('어딜남의꺼를;');
                    }
                    if(interaction.customId == 'nextPage'+userId){
                        page[userId]++;
                        const nowPage = page[userId];
                        let content = '';
                        const embed = new MessageEmbed()
                                .setColor('#0099ff')
                                .setAuthor('Character Stats', 'https://www.pngitem.com/pimgs/m/115-1153891_grim-reaper-icon-rpg-character-icon-png-transparent.png');
                        let row = [new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setCustomId('nextPage'+userId)
                                        .setLabel('다음 페이지 ▶')
                                        .setStyle('PRIMARY')
                                )];
                        const update = {components:row,embeds:[embed]}
                        User.findOne({userId : userId}).then(user=>{
                            const team = user.owningCharacters;
                            if(team.length==0){
                                content = '캐릭터가 아직 없으시네요!\n\u200b\n`도움말: 알피야 뽑기 [일반/고급/최고급]`';
                                row[0].components[0].setDisabled(true);
                            }else if(team[nowPage-1]==undefined){
                                content = '더 이상 캐릭터가 없으시네요!';
                                row[0].components[0].setDisabled(true);
                            }else{
                                const character = team[nowPage-1];
                                content = `**${character.name}**\n설명: ${character.description}\n스킬: ${character.skill}\n랭크: ${character.rank}\n체력: ${character.hp}\n공격력: ${character.attack}\n치유력: ${character.heal}\n레벨: ${character.level}`;
                                delete update.components;
                            }
                            embed.setDescription(content);
                            interaction.update(update);
                        });
                    }
                });
                //msg.reply('골드: `' + user.gold + '`개\n다이아: `' + user.diamond + '`개\n캐릭터: `'+ owningCharacter + '`\n클리어 스테이지: `' + user.highestStage + '`\n하트: `' + user.heart + '`개')
    })
}

exports.profile = profile;