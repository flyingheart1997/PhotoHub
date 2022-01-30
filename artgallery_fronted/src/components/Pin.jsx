import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdGetApp } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
// import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { IoMdHeart } from 'react-icons/io';

import { client, urlFor } from '../client';

const Pin = ({ pin }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();

  // const { postedBy, image, _id, destination } = pin;
  const { postedBy, image, _id} = pin;

  const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload();
      });
  };

  let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?.googleId);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user?.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.googleId,
          },
        }])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    } 
    
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className=" relative cursor-zoom-in hover:scale-105 pt-2 w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img className="rounded-lg w-full h-full " src={(urlFor(image).url())} alt="user-post" />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-1 z-50"
            style={{ height: '100%' }}
          >
            <div className="flex items-center pt-1 justify-between">
              <div className="flex  hover:scale-105 pl-1 gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white p-2 rounded-md flex items-center justify-center text-dark text-xl opacity-70 hover:opacity-100 hover:shadow-md outline-none"
                ><MdGetApp />
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button type="button" className='bg-white  hover:scale-105 flex items-center gap-2 text-black font-bold pl-2 pr-2 pt-1 pb-1 rounded-md opacity-70 hover:opacity-100 hover:shadow-md'>
                <IoMdHeart/>
                  {pin?.save?.length}  
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className='bg-white p-2 rounded-md flex  hover:scale-105 items-center justify-center text-dark text-xl opacity-70 hover:opacity-100 hover:shadow-md outline-none'>
                <IoMdHeart/>
                
                  {pin?.save?.length}   {savingPost ? '' : ''}
                </button>
              )}
            </div>
            <div className=" flex justify-between items-center gap-2 w-full">
              {/* {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-3 pr-3 rounded-full opacity-50 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  {' '}
                  <BsFillArrowUpRightCircleFill />
                  {destination?.slice(8, 17)}...
                </a>
              ) : undefined} */}
              
              <Link to={`/user-profile/${postedBy?._id}`} className="flex pr-3 gap-2 mt-7 items-center opacity-70 hover:opacity-100 hover:shadow-md">
                <img
                  className="w-5 h-5 rounded-full object-cover"
                  src={postedBy?.image}
                  alt="user-profile"
                />
                <p className="font-sm text-white">{postedBy?.userName?.slice(0, 7)}...</p>
              </Link>
              

              {
                postedBy?._id === user?.googleId && (
                <button
                  type="button"
                  onClick={(e) => {
                  e.stopPropagation();
                  deletePin(_id);
              }}
                  className="bg-white p-2  hover:scale-105 rounded-md w-9 h-6 mt-7 flex items-center justify-center text-dark opacity-70 hover:opacity-100 outline-none">
                  <AiTwotoneDelete />
                </button>
            )
          }
            </div>
          </div>
        )}
      </div>
      {/* <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{postedBy?.userName?.slice(0, 7)}...</p>
      </Link> */}
    </div>
  );
};

export default Pin;

