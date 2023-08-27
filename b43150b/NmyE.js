import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import jsCookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

import Button from '../ui/button';
import { useAuthContext } from '../../context/auth';
import {
  GEN_SIGNABLE_MESSAGE,
  LINK_ANOTHER_WALLET,
  LINK_DISCORD,
  LINK_WALLET,
  ME_QUERY,
  SET_PRIMARY_WALLET,
  UNLINK_DISCORD,
  UNLINK_WALLET,
} from '../../lib/queries/auth';
import { MergeModal } from './merge-modal';
import { IS_SERVER } from '../../lib/constants';
import { Modal } from '@nextui-org/react';
import { truncate } from '../../lib/utils';
import Hide from '../ui/hide';
import { CgClose } from 'react-icons/cg';

function WalletOptions() {
  const { setVisible } = useWalletModal();
  const { disconnect, publicKey, connect, wallet, signMessage, connected } =
    useWallet();
  const auth = useAuthContext();
  const [open, setOpen] = useState(false);
  const [linkingAnotherWallet, setLinkingWallet] = useState(false);
  const [getMessage] = useMutation(GEN_SIGNABLE_MESSAGE);

  const [setWalletPrimary] = useMutation(SET_PRIMARY_WALLET,{
     onCompleted({setWalletAsPrimary}) {
      auth.dispatch({
        type: 'LOGIN',
        payload: { ...auth.state, ...setWalletAsPrimary },
      });
      toast.success("Successfully Changed Your Primary Wallet!");
    },
    onError(msg) {
      toast.error(msg?.message || 'Something went wrong!');
    },
    refetchQueries: [ME_QUERY],
  })

  const [linkAnotherWallet] = useMutation(LINK_ANOTHER_WALLET, {
    onCompleted() {
      setLinkingWallet(false);
      // setOpen(false);
      toast.success('Wallet Added Successfully!');
    },
    onError(msg) {
      setLinkingWallet(false);
      toast.error(msg?.message || 'Something went wrong!');
    },
    refetchQueries: [ME_QUERY],
  });

  const [unlinkWallet] = useMutation(UNLINK_WALLET, {
    async onCompleted({ unlinkWallet }) {
      // console.log(jsCookie.get('wallet'), unlinkWallet, publicKey.toString());
      if (
        jsCookie.get(wallet) &&
        jsCookie.get(wallet) === unlinkWallet.walletAddress
      ) {
        await disconnect();
        jsCookie.set('wallet', null);
      }
      auth.dispatch({
        type: 'LOGIN',
        payload: { ...auth.state, ...unlinkWallet },
      });
      toast.success('Your wallet account unlinked!');
    },
    async onError(msg) {
      if (
        jsCookie.get(wallet) &&
        jsCookie.get(wallet) === publicKey?.toString()
      ) {
        await disconnect();
      }
      toast.error(msg?.message || 'Something went wrong!');
    },
    refetchQueries: [ME_QUERY],
  });

  const handleAddPrimaryWallet = async (wallet) => {
    if (wallet) {
      await setWalletPrimary({ variables: { address: wallet } });

      setOpen(false);
    } else {
      setVisible(true);
    }
  };

  const primaryWallet = auth?.state?.walletAddress || '';

  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    if (isClicked) {
      handleAddWallet();
    }
  }, [connected]);

  async function handleAddWallet() {
    if (!wallet) {
      setClicked(true);
      return setVisible(true);
    }

    if (!publicKey || !connected) {
      return await connect();
    }

    if (
      auth.state.wallets.some((wallet) => wallet.address === publicKey.toString())
    ) {
      setOpen(false);
      return toast.error('Wallet Already Linked');
    }

    setLinkingWallet(true);

    const {
      data: { generateSignMessage: message },
    } = await getMessage({
      variables: { wallet: publicKey.toString() },
    });

    const signed = await signMessage(new TextEncoder().encode(message)).catch(
      () => null
    );

    if (!signed) {
      setLinkingWallet(false);
      setClicked(false);
      return toast.error('Failed To Sign Message');
    }

    const signedBase64 = signed.toString('base64');

    const resp = await linkAnotherWallet({
      variables: { address: publicKey.toString(), signature: signedBase64 },
    });
    setLinkingWallet(false);
    // setOpen(false);
    setClicked(false);
  }

  async function handleUnlinkWallet(address) {
    await unlinkWallet({ variables: { wallet: address } });
    setOpen(false);
  }

  return (
    <div className="">
      <Button onClick={() => setOpen(true)} className="text-sm">
        Add/Manage Wallet
      </Button>
      <Modal
        className="!bg-transparent !rounded"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Modal.Body className="bg-[#13131A] text-white border border-[#252330ED] pb-5 flex flex-col rounded">
          <button
            onClick={() => setOpen(false)}
            className="absolute right-3 top-3 active:opacity-50"
          >
            <CgClose />
          </button>
          <h3 className="text text-xl font-semibold text-center">
            Manage Wallet
          </h3>
          <div className="mt-4">
            {auth?.state?.wallets?.map((wallet) => (
                <div
                  key={wallet.address}
                  className="flex justify-between items-center mt-3"
                >
                  <p className="relative">
                    {truncate(wallet.address, {
                      keep: 6,
                      suffix: `...${wallet.address.substr(40)}`,
                    })}
                  </p>
                  <Hide open={primaryWallet === wallet.address}>
                    <p className=" bg-gray-800/50 p-1 rounded px-2 text-sm font-bold ">
                      Primary
                    </p>
                  </Hide>

                  <div className="flex gap-1">
                    <Button
                      // loading={unlinkLoading}
                      onClick={() => handleUnlinkWallet(wallet.address)}
                      className="text-sm bg-red-800 !py-1"
                    >
                      Unlink
                    </Button>
                    <Hide open={primaryWallet !== wallet.address}>
                      <Button
                        onClick={() => handleAddPrimaryWallet(wallet.address)}
                        className="text-sm py-0 !px-3"
                      >
                        Set Primary
                      </Button>
                    </Hide>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-6 flex flex-col items-center">
            <Hide open={publicKey}>
              <p className=" bg-gray-800/50 p-1 rounded-full px-2 text-sm font-semibold mb-2 w-max">
                {truncate(publicKey?.toString(),{keep: 8,suffix: '...'})}
                {publicKey?.toString().substr(publicKey?.toString().length-5)}
              </p>
            </Hide>
            <Button
              loading={linkingAnotherWallet}
              onClick={handleAddWallet}
              className="text-sm w-full"
            >
              Add Another Wallet
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

const AccountLinking = () => {
  const { query } = useRouter();
  const router = useRouter();
  const auth = useAuthContext();
  const authContext = useAuthContext();
  const [isMobile, setIsMobile] = useState(
    !IS_SERVER() && window.innerWidth <= 640
  );
  const [discordLinked, setDiscordLinked] = useState(false);
  const [discordButtonText, setDiscordButtonText] = useState(
    isMobile ? 'Unlink Discord' : 'Discord Linked'
  );

  const [mergePopupOpen, setMergePopupOpen] = useState();

  const [linkDiscord] = useMutation(LINK_DISCORD, {
    onCompleted({ linkDiscord }) {
      if (linkDiscord?.isLinked) {
        router.push('/profile');
        setDiscordLinked(true);
        toast.success('Your discord account added to your profile!');
      } else if (linkDiscord?.mergeable) {
        setMergePopupOpen('Discord');
      }
    },
    onError(msg) {
      router.push('/profile');
      toast.error(msg?.message || 'Something went wrong!');
    },
    refetchQueries: [ME_QUERY],
  });

  const [unlinkDiscord] = useMutation(UNLINK_DISCORD, {
    onCompleted({ unlinkDiscord }) {
      authContext.dispatch({
        type: 'LOGIN',
        payload: { ...auth.state, ...unlinkDiscord },
      });
      setDiscordLinked(false);
      toast.success('Your discord account unlinked!');
    },
    onError(msg) {
      toast.error(msg?.message || 'Something went wrong!');
    },
    refetchQueries: [ME_QUERY],
  });

  useEffect(() => {
    if (auth?.state?.discordUserId) setDiscordLinked(true);
    // if (auth?.state?.walletAddress) setWalletLinked(true);
  }, [auth?.state]);

  useEffect(() => {
    if (!query.code) return;
    linkDiscord({ variables: { code: query.code } });
  }, [query?.code]);

  return (
    <section className="space-y-4 ">
      {!discordLinked ? (
        <a href={process.env.NX_DISCORD_ACCOUNT_LINK_URL}>
          <Button className="max-w-lg self-end text-sm w-full">
            Link Discord
          </Button>
        </a>
      ) : (
        <Button
          onClick={unlinkDiscord}
          onMouseOver={() => setDiscordButtonText('Unlink Discord')}
          onMouseLeave={() => setDiscordButtonText('Discord Linked')}
          className="max-w-lg self-end text-sm hover:bg-red-700 w-40"
        >
          {discordButtonText}
        </Button>
      )}
      <WalletOptions />
      <MergeModal
        typeOfLink={mergePopupOpen}
        onClose={() => setMergePopupOpen(false)}
      />
    </section>
  );
};

export default AccountLinking;
