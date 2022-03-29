const fs = require('fs');
const path = require('path');

const verifyExistence = (resp)  => fs.existsSync(resp);
    

const verifyExtension = (resp) => path.extname(resp) === '.md';
        
  
const verifyPath = (resp) => path.isAbsolute(resp);
       
 
const AbsoluteTransform = (resp) => path.resolve(resp);

  exports.verifyExtension = verifyExtension;
  exports.verifyExistence = verifyExistence;
  exports.verifyPath = verifyPath;
  exports.AbsoluteTransform = AbsoluteTransform;

