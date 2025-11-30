const TextModule =require('../database/schema');
const { ApiError } = require('../middleware/error');
const countWords = (editedText, orignalText) => {
  const editedWordsArray = editedText.trim().split(/\s+/);
  const originalWordsArray = orignalText.trim().split(/\s+/);
  const removedArray = []; //this is for removed words
  const addedArray=[] //this is for added words
  const editedCount = {}; //here i keep count of edited words example in "rubul is a coder, who is great" {is:2}
  const originalCount = {};// here i keep count of original words .

  //process to add edited count
  editedWordsArray.forEach(word => {
      editedCount[word] = (editedCount[word] || 0) + 1;
  });
//process to add origin count
  originalWordsArray.forEach(word => {
    originalCount[word] = (originalCount[word] || 0) + 1;
  });

  // Compare and find removed words
  for (const word in originalCount) {
    const removedTimes = originalCount[word] - (editedCount[word] || 0);
    if (removedTimes > 0) {
      for (let i = 0; i < removedTimes; i++) {
        removedArray.push(word);
      }
    }

  }
  //compare and find added words
  for(const word in editedCount){
    const addedTimes=editedCount[word]-(originalCount[word] || 0)
    if(addedTimes>0){
        for(let i=0;i<addedTimes;i++){
            addedArray.push(word)
        }
    }
  }
  return {removedArray,addedArray}
};
const saveText=async(req,res)=>{
    try{
        const {editedText,orignalText}=req.body;
        const editedLength=editedText.trim().length
        const orignalLength=orignalText.trim().length;
        const {addedArray,removedArray}=countWords(editedText,orignalText)
        const newVersion=await TextModule.create({
            oldLength:orignalLength,
            newLength:editedLength,
            removedWords:removedArray,
            addedWords:addedArray,
            text:editedText
        })
        res.status(200).json({message:'successfully created a version ',data:newVersion})
    }catch(e){
        throw new ApiError(500,'something went wrong')
    }
        

}

const getHistory=async(req,res)=>{
    try{
        const versions =await TextModule.find()
        res.status(200).json({message:'successfully fetch all version history',data:versions})
    }catch(e){
        throw new ApiError(500,'something went wrong')
    }
    
}
module.exports ={saveText,getHistory}