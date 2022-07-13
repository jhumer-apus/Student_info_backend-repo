
var db = require('../helpers/db.js');

//database queries
var dbQueries={
    getData: (id)=>{
        const select_query = id === "undefined"? `SELECT * FROM STUDENT_INFO;`:`SELECT * FROM STUDENT_INFO WHERE id=?`;
        return db.connect(function(err) {
            if (err) throw err;
            return new Promise((resolve,reject) => {
        
                db.query(select_query, [parseInt(id)], function (err, result) {
                    if (err) {
                        reject(err);
                        throw err;
                    }
                    if(id === "undefined"){
                        resolve(result)
                    }
                    else{
                        const [data]= result;
                        resolve(data)
                    }   
                });         
            })
        });
    }
    ,
    postData: (data)=>{
        const insert_query =  `INSERT INTO STUDENT_INFO(id, student_data) VALUE(?,?);`;
        const student_data_stringify = JSON.stringify(data.student_data);
        return db.connect(function(err) {
            if (err) throw err;
            return new Promise((resolve,reject) => {
                if (err) {
                    reject(err);
                    throw err;
                }
                db.query(insert_query, [data.id, student_data_stringify]);
                resolve({msg:"Created Student"})
            })
        });
    }
    ,
    deleteData: (data) => {
        const delete_query = `DELETE FROM STUDENT_INFO WHERE ID = ?;`;
        return db.connect(function (err) {
            if (err)
                throw err;
            return new Promise((resolve, reject) => {
                db.query(delete_query, [parseInt(data)], function (err) {
                    if (err)
                        reject(err);
                    resolve();
                });
            });
        });
    }
}

dbQueries.updateData= (id,updated_data)=>{
    const update_query = `UPDATE STUDENT_INFO SET student_data = ? WHERE id = ?;`;   
    return dbQueries.getData(id).then(function(student) {
        db.query(update_query,[updated_data, parseInt(student.id)], function(err){
            if (err) reject(err);
            return 
        });
    });
}

module.exports = dbQueries;