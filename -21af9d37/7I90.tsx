import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaArrowRight, FaTimes } from 'react-icons/fa';
import DiscordLogin from '../components/login/discordLogin';
import ExtensionLogin from '../components/login/extension-login';
import MobileLogin from '../components/login/mobile-login';
import TwitterLogin from '../components/login/twitter-login';
import Footer from '../components/ui/footer';
import Nav from '../components/ui/nav';
import { useAuthContext } from '../context/auth';
import useHandleState from '../hooks/useHandleState';
import { IS_SERVER } from '../lib/constants';
import { siteSeoData } from '../lib/site-seo-data';
import { getFullLocalUrl, isPhantomInstalled, isUAMobile } from '../lib/utils';
// import {useSearchParams} from 'react-router-dom';

const Login = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const auth = useAuthContext();
  const router = useRouter();
  const isInstalled = isPhantomInstalled();
  const isMobile = !IS_SERVER() && isUAMobile();
  const { query } = useRouter();

  const authContext = useAuthContext();
  // const [discordLinked, setDiscordLinked] = useState(false);
  // const [walletLinked, setWalletLinked] = useState(false);
  // const [twitterLinked, setTwitterLinked] = useState(false);

  const [linkedState, handleLinked] = useHandleState({
    discordLinked: false,
    walletLinked: false,
    twitterLinked: false,
  });

  const { discordLinked, twitterLinked, walletLinked } = linkedState;
  const [discordButtonText, setDiscordButtonText] = useState(
    isMobile ? 'Unlink Discord' : 'Discord Linked'
  );

  const [mergePopupOpen, setMergePopupOpen] = useState();

  const { dispatch } = useAuthContext();

  useEffect(() => {
    console.log(auth.state);
    if (auth?.state?.discordUserId) {
      handleLinked('discordLinked', true);
      router.replace('/login', undefined, { shallow: true });
    }
    if (auth?.state?.walletAddress) handleLinked('walletLinked', true);

    if (auth.state.twitterUserId) {
      handleLinked('twitterLinked', true);
      router.replace('/login', undefined, { shallow: true });
    }

    if (auth?.state?.discordUserId && auth?.state?.walletAddress) {
      router.push(query.from?.[0] || '/');
    }
  }, [auth?.state]);

  return (
    <>
      <NextSeo
        canonical={getFullLocalUrl(router.pathname)}
        title={siteSeoData.login.title}
        description={siteSeoData.login.description}
      />
      {/* @ts-ignore */}
      <Nav />
      <main className="max-w-[600px] border border-[#252330ED] shadow-sm md:min-w-[395px] space-y-3 bg-backgrounds-darker-bg p-8 rounded-xl flex items-left justify-center my-32 flex-col space-y-4 mx-auto">
        <h1 className="text-[30px] font-medium leading-snug">
          Sign in to Moonly
        </h1>
        <p className="font-light text-sm leading-6 my-8 text-gray-300">
          Some Moonly features will require you to <br /> link Discord and
          Twitter in order to work.
          <br /> However, they are optional.
        </p>
        <div>
          <div className="flex flex-row mt-6">
            {!isInstalled && isMobile ? <MobileLogin /> : <ExtensionLogin />}
            {walletLinked && (
              <div className="ml-6 my-auto flex">
                <p className="font-light text-sm">
                  <span className="text-sm text-green-600 mr-2">✓</span> linked
                </p>
              </div>
            )}
            {!walletLinked && (
              <div className="ml-6 my-auto flex">
                <FaTimes size={12} className="mr-2 my-auto text-red-700" />
                <p className="font-light text-sm">Not linked</p>
              </div>
            )}
          </div>
          {/* <p className="font-light text-gray-400 text-xs ml-20 mt-2">
            (required<span className="text-red-700">*</span>)
          </p> */}
        </div>
        <div>
          <div className="flex flex-row mt-4">
            <DiscordLogin />
            {discordLinked && (
              <div className="ml-6 my-auto flex">
                <p className="font-light text-sm">
                  <span className="text-sm text-green-600 mr-2">✓</span> linked
                </p>
              </div>
            )}
            {!discordLinked && (
              <div className="ml-6 my-auto flex">
                <FaTimes size={12} className="mr-2 my-auto text-red-700" />
                <p className="font-light text-sm">Not linked</p>
              </div>
            )}
          </div>
          {/* <p className="font-light text-gray-400 text-xs ml-20 mt-2">
            (optional)
          </p> */}
          <div className="flex flex-row mt-4">
            <TwitterLogin />
            {twitterLinked && (
              <div className="ml-6 my-auto flex">
                <p className="font-light text-sm">
                  <span className="text-sm text-green-600 mr-2">✓</span> linked
                </p>
              </div>
            )}
            {!twitterLinked && (
              <div className="ml-6 my-auto flex">
                <FaTimes size={12} className="mr-2 my-auto text-red-700" />
                <p className="font-light text-sm">Not linked</p>
              </div>
            )}
          </div>
        </div>
        {discordLinked ||
          (walletLinked && (
            <>
              <p className="font-light text-gray-400 text-xs ml-24">OR</p>
              <div className="flex text-gray-300 hover:text-gray-100">
                <p className="font-light text-xs text-center my-auto">
                  <FaArrowRight />
                </p>
                <Link
                  href={query.from?.[0] || '/'}
                  className="font-light text-sm text-center ml-2 my-auto"
                >
                  Proceed to the Moonly website
                </Link>
              </div>
            </>
          ))}
      </main>
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  // const hasHolderPermission = await userHasPermission({
  //   req,
  //   res,
  //   role: 'HOLDER',
  // });
  // if (hasHolderPermission) return redirectTo('/profile');
  // const hasUserPermission = await userHasPermission({ req, res, role: 'USER' });
  // if (hasUserPermission) return redirectTo('/profile');
  return { props: {} };
}

export default Login;
