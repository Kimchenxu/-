function dianZan(uid,bv){
    let jiLu = database.get("点赞记录",uid,bv);
    if (jiLu){
        let dianZanShu = database.jian('点赞数',bv,1);
        database.delete('点赞数',uid,bv);
        document.getElementById('dzs').innerText = dianZanShu;

    } else{
        let dianZanShu = database.jian('点赞数',bv,1);
        database.add('点赞数',uid,bv);
        document.getElementById('dzs').innerText = dianZanShu;

    }
    return 
}