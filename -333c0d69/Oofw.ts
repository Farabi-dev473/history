import { Role } from './schema/TwitterSpace';

export enum ConditionType {
  ABOVE = 'ABOVE',
  BELOW = 'BELOW',
  EQUAL = 'EQUAL',
}

export enum OperationType {
  AND = 'AND',
  OR = 'OR',
}

export interface CheckSingleBlockArg {
  condition: string;
  targetPoint: number;
  value: number;
}

export interface MeState {
  [key: string]: number;
}

export interface Condition {
  data_point: string;
  condition: ConditionType;
  value: number;
  operation: OperationType | null;
}

export interface MintType {
  mint: string;
  owner: string;
  amount: string;
}

export interface ExchangeCodeResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface TwitterUser {
  username: string;
  displayName: string;
  avatarUrl: string;
  stayedTimeInSec?: number;
  userTypeInSpace: Role;
}

export interface HoldingRequirement {
  nftId?: string;
  traitId: number;
  numOfNFT: number;
  twitterSpaceId: string;
  anyNFT: boolean;
  anyTrait: boolean;
}
