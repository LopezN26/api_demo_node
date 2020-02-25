/**
 * Gestion des opération CRUD
 * 
 */

 const mytable = require ('../db/db.mytable.model');

 // Opérations CRUD
 exports.getAll= async(req,res)=>{
     await mytable.find()
         .exec()
         .then( record => {
             if(!record){
                 return res.status(404).send('No records found...')
             }
            res.send(record)
         })
         .catch((err)=>{
            res.status(500)
         })
     
 }

 exports.getById= async(req,res)=>{

    if (!req.params.id)
    {
        return res.status (400).json({
            message: "No ID specified..."
        })
    }

    await mytable.findById(req.params.id)

    .then ((answer)=>{ 
        if(!answer){ //si retour de requete false
            return res.status(404).json({
                message: "record not found with ID" + req.body.id
            })
        }
        res.json(answer); //recupere et affiche l'objet
    })
    .catch((err)=>{
        if(err.kind === 'ObjectId') //si erreur se produit sur l'id de l'objet
        {
            return res.status(404).json({
                message: "record not found with ID" + req.body.id
            })
        }
        //return res.status(500).json({
        //    message: "Error delete record with ID" + req.body.id
        //})
    })
    
}

 exports.create =async(req,res)=>{
     // On vérifie si les données existe
    if (!req.body)
    {
        return res.status (400).json({
            message: "No datas to record in database"
        })
    }
    // Création de l'enregistrement
        const rec = new mytable({
            name: req.body.name,
            age: req.body.age,
            presence: req.body.presence
        })
        rec.save()
        .then( (record)=>{
            res.send(record);
        })
        
    .catch((err)=> {
        res.status(500).json({
            message: err.message || "error  when catching new record",
        })
    })
 }

 exports.update = async(req,res)=>{
      // On vérifie si les données existe
    if (!req.params.id)
    {
        return res.status (400).json({
            message: "No ID specified..."
        })
    }
    
    await mytable.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        age: req.body.age,
        presence: req.body.presence
    })
    .then ((recUpd)=>{ 
        if(!recUpd){ //si retour de requete false
            return res.status(404).json({
                message: "record not found with ID" + req.body.id
            })
        }
        res.json(recUpd); //recupere et affiche l'objet a modifier avant modif
    })
    .catch((err)=>{
        if(err.kind === 'ObjectId')
        {
            return res.status(404).json({
                message: "record not found with ID" + req.body.id
            })
        }
        return res.status(500).json({
            message: "Error updating record with ID" + req.body.id
        })
    })
 }


 exports.delete = async(req,res)=>{
    // On vérifie si les données existe
  if (!req.params.id)
  {
      return res.status (400).json({
          message: "No ID specified..."
      })
  }
  
  await mytable.findByIdAndDelete(req.params.id)
  .then ((recUpd)=>{ 
      if(!recUpd){ //si retour de requete false
          return res.status(404).json({
              message: "record not found with ID" + req.body.id
          })
      }
      res.json(recUpd); //recupere et affiche l'objet a effacer
  })
  .catch((err)=>{
      if(err.kind === 'ObjectId') //si erreur se produit sur l'id de l'objet
      {
          return res.status(404).json({
              message: "record not found with ID" + req.body.id
          })
      }
      return res.status(500).json({
          message: "Error delete record with ID" + req.body.id
      })
  })
}