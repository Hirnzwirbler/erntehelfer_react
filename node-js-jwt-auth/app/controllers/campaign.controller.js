const db = require("../models");
const Campaign = db.campaign;
const User = db.user;

exports.addCampaign= (userId, campaignId) => {
    return User.findByPK(campaignId)
        .then((user) => {
            if(!user){
                console.log("User not found!");
                return null
            }
            return Campaign.findByPK(userId)
                .then((campaign) =>{
                    if(!campaign){
                        console.log("Campaign not found!");
                        return null;
                    }

                    user.addCampaign(campaign);
                    console.log(`>> added User id=${user.id} to Campaign id=${campaign.id}`);
                    return tag;
                });
        })
        .catch((err) => {
            console.log(">> Error while adding User to Campaign: ", err);
        });
};