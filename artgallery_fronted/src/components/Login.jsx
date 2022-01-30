import React from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
// import shareVideo from '../assets/share.mp4'
import logo from '../assets/Photo.png'
import logo2 from '../assets/logo2.png'
import { client } from '../client';

const Login = () => {
    const navigate = useNavigate();
    const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };
    return (
        <div className="flex justify-start items-center flex-col h-screen">
          <div className=" relative w-full h-full">
            {/* <video
              src={shareVideo}
              type="video/mp4"
              loop
              controls={false}
              muted
              autoPlay
              className="w-full h-full object-cover"
            /> */}
    
            <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-white">
            <div className="items-center hover:rotate-180">
                <img src={logo2} width="50px" alt="logo" />
              </div>
              <div className="p-5 items-center">
                <img src={logo} width="130px" alt="logo" />
              </div>
    
              <div className="shadow-2xl">
                <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className="bg-sky-700 hover:scale-105 flex justify-center pr-3 text-white items-center p-2 rounded-lg cursor-pointer outline-none"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <FcGoogle className="mr-3" /> Sign in with google
                    </button>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy="single_host_origin"
                />
              </div>
            </div>
          </div>
        </div>
      );
    };
    

export default Login
