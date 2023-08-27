import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaDiscord } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../context/auth';
import { LINK_TWITTER, LOG_IN_WITH_TWITTER, ME_QUERY } from '../../lib/queries/auth';
import Button from '../ui/button';

const TwitterLogin = ({registered}) => {
  const router = useRouter();
  const { query } = useRouter();
  const from = query.from || '/';
  const authContext = useAuthContext();
  const [loginTwitter] = useMutation(LOG_IN_WITH_TWITTER, {
    onCompleted({ loginTwitter }) {
        console.log(loginTwitter)
      authContext.dispatch({ type: 'LOGIN', payload: loginTwitter });
      toast.success('Login successful');
    },
    onError(err) {
      toast.error(
        err.message || 'Something went wrong! Maybe your credentials are wrong?'
      );
    },
  });


  const [linkTwitter] = useMutation(LINK_TWITTER, {
    onCompleted({ linkTwitter }) {
      if (linkTwitter?.isLinked) {
        toast.success('Your twitter account added to your profile!');
      } else if (linkTwitter?.mergeable) {
      }
    },
    onError(msg) {
      toast.error(msg?.message || 'Something went wrong!');
    },
    refetchQueries: [ME_QUERY],
  });

  console.log(authContext)

  useEffect(() => {
    if (query.code && authContext.state.walletAddress){
        loginTwitter({ variables: { code: query.code } });
      return
    }else if(query.code && !authContext.state.walletAddress){
      console.log("2")
      loginTwitter({ variables: { code: query.code } });
    }
    
  }, [query?.code]);

  return (
    <a href={authContext.state.walletAddress ? process.env.TWITTER_ACCOUNT_LINK_REDIRECT_URL : process.env.TWITTER_LOGIN_REDIRECT_URL}>
      <Button className="text-sm whitespace-nowrap bg-[#5865F2] min-w-[240px]">
        <FaDiscord size={28} className="mr-2" /> Sign in with Twitter
      </Button>
    </a>
  );
};

export default TwitterLogin;
