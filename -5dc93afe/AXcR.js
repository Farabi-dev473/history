import { gql } from '@apollo/client';

export const LOG_IN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      name
      role
      id
      email
      walletAddress
      discordUserId
      hasRequiredDiscordPermission
    }
  }
`;

export const AUTH_CHECK = gql`
  query AuthCheck($role: String!) {
    authCheck(role: $role) {
      isAuthenticated
    }
  }
`;

export const SAVE_WALLET = gql`
  mutation SaveWallet($wallet: String!) {
    saveWallet(wallet: $wallet) {
      token
      name
      userName
      showProfile
      bio
      avatar
      role
      id
      email
      walletAddress
      discordUserId
      hasRequiredDiscordPermission
      autoAlert {
        id
      }
      wallets {
        id
        address
      }
    }
  }
`;

export const SAVE_USER = gql`
  mutation SaveUser(
    $name: String
    $email: String
    $userName: String
    $avatar: String
    $uploaded_image: Upload
    $bio: String
    $showProfile: Boolean
  ) {
    saveUser(
      name: $name
      email: $email
      userName: $userName
      avatar: $avatar
      bio: $bio
      showProfile: $showProfile
      uploaded_image: $uploaded_image
    ) {
      name
      userName
      showProfile
      role
      id
      email
      walletAddress
      discordUserId
      hasRequiredDiscordPermission
      avatar
      bio
    }
  }
`;

export const ME_QUERY = gql`
  query MeQuery {
    me {
      token
      name
      userName
      showProfile
      role
      id
      email
      walletAddress
      discordUserId
      bio
      avatar
      hasRequiredDiscordPermission
      wallets {
        id
        address
      }
    }
  }
`;

export const LINK_DISCORD = gql`
  mutation LinkDiscord($code: String!) {
    linkDiscord(code: $code) {
      isLinked
      mergeable
    }
  }
`;

export const LINK_ANOTHER_WALLET = gql`
  mutation LinkAnotherWallet($address: String!, $signature: String!) {
    linkAnotherWallet(address: $address, signature: $signature) {
      id
      address
    }
  }
`;

export const UNLINK_DISCORD = gql`
  mutation UnlinkDiscord {
    unlinkDiscord {
      name
      role
      id
      email
      walletAddress
      discordUserId
      hasRequiredDiscordPermission
    }
  }
`;

export const LOG_IN_WITH_DISCORD = gql`
  mutation LoginDiscord($code: String!) {
    loginDiscord(code: $code) {
      token
      name
      userName
      bio
      avatar
      role
      id
      email
      walletAddress
      discordUserId
      hasRequiredDiscordPermission
    }
  }
`;

export const LOG_IN_WITH_TWITTER = gql`
  mutation LoginTwitter($code: String!) {
    loginTwitter(code: $code) {
      token
      name
      userName
      bio
      avatar
      role
      id
      email
      walletAddress
      twitterUserId
      twitterUserName
      twitterDisplayName
    }
  }
`;

export const LINK_TWITTER = gql`
  mutation LinkTwitter($code: String!) {
    linkTwitter(code: $code) {
      isLinked
      mergeable
    }
  }
`;

export const LINK_WALLET = gql`
  mutation LinkWallet($wallet: String!) {
    linkWallet(wallet: $wallet) {
      isLinked
      mergeable
    }
  }
`;

export const UNLINK_WALLET = gql`
  mutation UnlinkWallet($wallet: String!) {
    unlinkWallet(wallet: $wallet) {
      name
      role
      id
      email
      walletAddress
      discordUserId
      hasRequiredDiscordPermission
    }
  }
`;
export const SAVE_PRIVATE_KEY = gql`
  mutation CreatePrivateKey($key: String!) {
    createPrivateKey(key: $key) {
      id
    }
  }
`;

export const DELETE_PRIVATE_KEY = gql`
  mutation CreatePrivateKey($id: String!) {
    deletePrivateKey(id: $id) {
      id
      key
    }
  }
`;

export const GET_PRIVATE_KEY = gql`
  query GetPrivateKey($id: String!) {
    getPrivateKey(id: $id) {
      key
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile($userName: String!) {
    getUserProfile(userName: $userName) {
      name
      userName
      showProfile
      avatar
      bio
      discordUserId
      hasRequiredDiscordPermission
    }
  }
`;

export const MERGE_ACCOUNT = gql`
  mutation MergeAccount {
    mergeAccount {
      name
      userName
      showProfile
      role
      email
      walletAddress
      discordUserId
      hasRequiredDiscordPermission
      bio
      avatar
    }
  }
`;

export const GEN_SIGNABLE_MESSAGE = gql`
  mutation GetSignableMessage($wallet: String!) {
    generateSignMessage(wallet: $wallet)
  }
`;


export const SET_PRIMARY_WALLET = gql`
mutation SetWalletAsPrimary($address: String!) {
  setWalletAsPrimary(address: $address) {
    token
    walletAddress
  }
}
`
