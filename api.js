import {
   md,
  validateOpt,
  statsArray,
  validateStats,
  } from "./index.js";

   export  const mdLinks = (files, options = { validate: false }) => {
        return new Promise((resolve, reject) => {
        let allLinks = [];
        md(files, allLinks);
        if (allLinks.length > 0) {
          if (!options.validate) {
            resolve(validateOpt(allLinks)).then((r) => console.log(r));
             }  else if (options.validate === false && options.stats === true) {
            resolve(statsArray(totalMdLinks));
        } else if (options.validate === true && options.stats === true) {
            validateStats(totalMdLinks)
            .then(r=>console.log(r))
        } else {
          reject(new Error("No se ha encontrado ningún link. Pruebe con otro archivo:"));
        }
       }
      }).catch((err) => {err});
         
    };
    
   

    
              
                

  