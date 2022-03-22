import React from "react";
import "./login.css";

import Logo from "../../assets/logo/black.png";
function Login() {
  return (
    <div>
      <div className="login-bg"></div>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-mono">
        <div>
          <div className="relative w-48 h-48 mx-auto">
            <span className="image-span">
              <img
                sizes="100vw"
                srcSet={Logo}
                src={Logo}
                decoding="async"
                data-nimg="fill"
                // className="logo-img"
              />
              {/* <noscript><img sizes="100vw" srcSet="/_next/image?url=%2Fimages%2Fblocksmith_logo.png&amp;w=640&amp;q=75 640w, /_next/image?url=%2Fimages%2Fblocksmith_logo.png&amp;w=750&amp;q=75 750w, /_next/image?url=%2Fimages%2Fblocksmith_logo.png&amp;w=828&amp;q=75 828w, /_next/image?url=%2Fimages%2Fblocksmith_logo.png&amp;w=1080&amp;q=75 1080w, /_next/image?url=%2Fimages%2Fblocksmith_logo.png&amp;w=1200&amp;q=75 1200w, /_next/image?url=%2Fimages%2Fblocksmith_logo.png&amp;w=1920&amp;q=75 1920w, /_next/image?url=%2Fimages%2Fblocksmith_logo.png&amp;w=2048&amp;q=75 2048w, /_next/image?url=%2Fimages%2Fblocksmith_logo.png&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=%2Fimages%2Fblocksmith_logo.png&amp;w=3840&amp;q=75" decoding="async" data-nimg="fill" style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%" loading="lazy"/></noscript> */}
            </span>
          </div>
          <div className="flex text-4xl items-center flex-shrink-0 px-4 text-black justify-center">
            ENIGMA v1.0
          </div>
          <div className="flex justify-center text-xs text-black">
            By NEARverse Labs
          </div>
        </div>
        <div className="mt-16 sm:mx-auto sm:max-w-md justify-center">
          <div className="flex justify-center text-sm text-black mb-7">
            Keep track of all your whitelists. Never miss a mint
          </div>
          <div className="flex justify-center items-center">
            <button className="w-48 flex justify-center py-2 px-4 rounded-md font-medium text-white login-btn">
              <a href="https://discord.com/api/oauth2/authorize?client_id=951522291894870067&redirect_uri=http%3A%2F%2F3.93.4.240%3A3000%2Faccount_check&response_type=code&scope=identify">
                Login with Discord{" "}
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
