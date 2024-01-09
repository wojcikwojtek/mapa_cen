import React, { useRef, useState } from 'react'
import { Price } from '../../entities/price'
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import APIClient from '../../services/api-client';
import useUserStore from '../../store';

interface Props{
    priceInfo:Price;
}

const apiClient=new APIClient();

const ProductItem = ({priceInfo}:Props) => {
    const userStore=useUserStore();
    const [showAddComment,setShowAddComment]=useState(false);
    const [showComments,setShowComments]=useState(false);
    // const [guestComment, setGuestComment] = useState('');
    const [positiveOpinionIsGiven,setPositiveOpinionIsGiven]=useState(false);
    const [negativeOpinionIsGiven,setNegativeOpinionIsGiven]=useState(false);


    const commentRef=useRef<HTMLInputElement>(null);
    const handleInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
       //dodawanie komentarza
    //    setGuestComment(commentRef.current?.value||'');
       setShowAddComment(false);
        }
      };
    const handleLikeOpinionClick=()=>{
        setPositiveOpinionIsGiven(!positiveOpinionIsGiven);
        setNegativeOpinionIsGiven(false);
        console.log("halo");
        console.log(userStore.userId);
        console.log(priceInfo.priceId);
        apiClient.updateOpinionForPrice(userStore.userId,priceInfo.priceId,true);
    }
    const handleDislikeOpinionClick=()=>{
        setNegativeOpinionIsGiven(!negativeOpinionIsGiven);
        setPositiveOpinionIsGiven(false);
        apiClient.updateOpinionForPrice(userStore.userId,priceInfo.priceId,false);
    }
  
  return (
    <div className='listItem' >
      <p style={{display:'flex',justifyContent:'',width:'100%',marginBottom:'5px'}}>
       <span style={{marginRight:'10px'}}>2022-05-10 </span>
       <span style={{marginRight:'10px'}}>cena {priceInfo.priceValue}zł</span>
       <div className='flexCenter' style={{marginRight:'10px'}}>
        <div style={{cursor:'pointer'}} onClick={handleLikeOpinionClick}><BiLike size={20}  color="green"/></div>
        {positiveOpinionIsGiven ? (priceInfo.upvotes+1) :priceInfo.upvotes}
        </div>
        <div className='flexCenter' style={{marginRight:'10px'}}>
        <div style={{cursor:'pointer'}} onClick={handleDislikeOpinionClick}><BiDislike size={20}  color="red"/></div>
        {negativeOpinionIsGiven ? (priceInfo.downvotes+1) :priceInfo.downvotes}
        </div>
      </p>
      <p>
        address {priceInfo.shopAddress}
      </p>

      <div className='commentWrapper'>
      <p onClick={()=>setShowAddComment(!showAddComment)}>{!showAddComment?'dodaj komentarz':'anuluj'}</p>
      <p onClick={()=>setShowComments(!showComments)}>{!showComments?'zobacz komentarze':'schowaj komentarze'}</p>
      </div>
      {showAddComment && <input type='text' ref={commentRef}  
      placeholder='komentarz' onKeyDown={(e)=>handleInputChange(e)}/>}
      {showComments && 
       priceInfo.comments.map(comment=>
        <div style={{display:'flex',flexDirection:'column',height:'60px',marginTop:'10px',padding:'5px'}}>
        <hr style={{width:'100%',height:'1px'}}/>
        
        <p>
        <strong>{comment.username}: </strong>
        <span>{comment.date}</span>
        <br></br>
        </p>
        <div style={{display:'flex',width:'100%',height:'100%'}}>
        <div style={{flexGrow:1}}><p>{comment.content}</p></div>
        <div className='flexCenter' style={{width:'20%'}}>
        {comment.picture&&<img height='100%' src={comment.picture}/>}
        </div>
        </div>
        </div>)
      }
      </div>
  )
}

export default ProductItem