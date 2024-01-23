import React, {  ChangeEvent, useEffect, useRef, useState } from 'react'
import { Price } from '../../entities/price'
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import APIClient from '../../services/api-client';
import useUserStore from '../../store';

interface Props{
    regionId:number;
    priceInfo:Price;
    updateComponent:()=>void;
}

const apiClient=new APIClient();

const ProductItem = ({priceInfo,regionId,updateComponent}:Props) => {
    const userStore=useUserStore();
    const [showAddComment,setShowAddComment]=useState(false);
    const [showComments,setShowComments]=useState(false);
    const [newCommentPhoto, setNewCommentPhoto] = useState<File | null>(null);
    const [positiveOpinions,setPositiveOpinions]=useState(priceInfo.upvotes);
    const [negativeOpinions,setNegativeOpinions]=useState(priceInfo.downvotes);
   
    


    const commentRef=useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && commentRef.current != undefined) {
       apiClient.addComment(regionId,priceInfo.priceId,userStore.userId,commentRef.current?.value,newCommentPhoto||undefined)
       .then(()=>{
        updateComponent();
       }
       );
       setShowComments(true);
       setShowAddComment(false);
      }
      };

      useEffect(() => {
        if (showAddComment) {
          commentRef.current?.focus();
        }
      }, [showAddComment]);

      useEffect(()=>{
        setPositiveOpinions(priceInfo.upvotes); 
        setNegativeOpinions(priceInfo.downvotes); 
      },[priceInfo]);

    

  const handleAddPhoto = (e: ChangeEvent<HTMLInputElement>) =>  {
    if(e.target.files){
      const file = e.target.files[0];  
      setNewCommentPhoto(file);
    }
  };

  const handleCustomButtonClick = () => {
    if(fileInputRef.current){
      fileInputRef.current.click();
    }
  };

    const handleLikeOpinionClick=()=>{
        apiClient.updateOpinionForPrice(userStore.userId,priceInfo.priceId,true)
        .then(res=>{
          if(res){
            updateComponent();
          }
          else{
            updateComponent();  
          }
          });
          
    }
    const handleDislikeOpinionClick=()=>{
        apiClient.updateOpinionForPrice(userStore.userId,priceInfo.priceId,false)
        .then(res=>{
          if(res){
            updateComponent();  
          }
          else{
            updateComponent();  
          }
        });
        
    }
  
  return (
    <div className='listItem' >
      <p style={{display:'flex',justifyContent:'',width:'100%',marginBottom:'5px'}}>
       <span style={{marginRight:'10px'}}>2022-05-10 </span>
       <span style={{marginRight:'10px'}}>cena {priceInfo.priceValue}zł</span>
       <div className='flexCenter' style={{marginRight:'10px'}}>
        <div style={{cursor:'pointer'}} onClick={handleLikeOpinionClick}><BiLike size={20}  color="green"/></div>
        {positiveOpinions}
        {/* {positiveOpinionIsGiven ? (priceInfo.upvotes) :priceInfo.upvotes} */}
        </div>
        <div className='flexCenter' style={{marginRight:'10px'}}>
        <div style={{cursor:'pointer'}} onClick={handleDislikeOpinionClick}><BiDislike size={20}  color="red"/></div>
        {negativeOpinions}
        {/* {negativeOpinionIsGiven ? (priceInfo.downvotes) :priceInfo.downvotes} */}
        </div>
      </p>
      <p>
        address {priceInfo.shopAddress}
      </p>

      <div className='commentWrapper'>
      <p onClick={()=>setShowAddComment(!showAddComment)}>{!showAddComment?'dodaj komentarz':'anuluj'}</p>
      <p onClick={()=>setShowComments(!showComments)}>{!showComments?'zobacz komentarze':'schowaj komentarze'}</p>
      </div>
      {showAddComment && 
      <>
      <input type='text'  ref={commentRef}  
      placeholder='komentarz' onKeyDown={(e)=>{handleInputChange(e)}}/>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleAddPhoto}
      />
      <button onClick={handleCustomButtonClick}>Załącz zdjęcie</button>
      </>
      }
      {showComments && 
       priceInfo.comments.map(comment=>
        <>
        <hr style={{width:'100%',height:'1px',marginTop:'10px'}}/>
        <div style={{display:'flex',height:'60px',marginTop:'10px',padding:'5px'}}>
        <div style={{display:'flex',flexDirection:'column',width:'100%',height:'100%'}}>
        <p>
        <strong>{comment.username}: </strong>
        <span>{comment.date}</span>
        <br></br>
        </p>
        
        <div style={{flexGrow:1}}><p>{comment.content}</p></div>
        </div>
        <div className='flexCenter' style={{width:'20%',paddingRight:'10px',cursor:'pointer'}}>
        {comment.picture&&<img height='100%' width='70px' style={{marginBottom:'0px'}} 
         src={`data:image/png;base64,${arrayBufferToBase64(comment.picture)}`}/>}
        </div>
        </div>
        </>)
      }
      </div>
  )
}

function arrayBufferToBase64(buffer:ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default ProductItem;
